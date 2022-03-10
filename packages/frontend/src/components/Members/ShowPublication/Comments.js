import React from 'react';
import { Button, Divider, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionSnackBar from '../../../redux/SnackBar/action';
import {
	useStyles,
	StyledButton,
	StyledTextField,
	StyledCancelButton,
} from '../../../styles/PublicationsStyles';
import Comment from './Comment';
import { BASE_URL, END_POINT } from '../../../utils/constants';

function Comments(props) {
	const { comments, pubId } = props;
	const dispatch = useDispatch();
	const classes = useStyles();
	const [visibleCmnt, setVisibleCmnt] = useState(3);
	const [localComments, setLocalComments] = useState(comments);
	const [openAddCmnt, setOpenAddCmnt] = useState(false);
	const [newComment, setNewComment] = useState({ publication_id: pubId, content: '' });
	const userType = useSelector((state) => state.auth.userContent.type);

	const addComment = async (content) => {
		try {
			let res = await axios.post(`${BASE_URL}${END_POINT.COMMENT}`, content);
			if (res.status === 201) {
				dispatch(actionSnackBar.setSnackBar('success', 'comment successfully', 3000));
				res = await axios.get(`${BASE_URL}${END_POINT.COMMENT}`, { params: { id: pubId } });
				setLocalComments(res.data);
				console.log(res.data);
			}
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', 'Network error', 3000));
		}
		setNewComment({ ...newComment, content: '' });
	};

	const loadMore = () => {
		setVisibleCmnt(visibleCmnt + 3);
	};

	const renderComment = (comment, index) => {
		return (
			<Comment
				pubId={pubId}
				comment={comment}
				key={index}
				cmtNo={index === 0 ? comments.length : comments.length - index}
				replyHendler={(data) => addComment(data)}
				cmntId={comment.id}
			/>
		);
	};

	return (
		<Grid item xs={12}>
			<Divider className={classes.divider}></Divider>
			<Grid container style={{ paddingTop: '25px' }}>
				<Grid item xs={12}>
					<Grid container justifyContent="space-between" alignItems="center">
						<Grid item xs={6}>
							<Typography
								className={classes.commentSec}
							>{`Comments (${comments.length})`}</Typography>
						</Grid>
						{userType && userType != 'prospect' && openAddCmnt !== true ? (
							<Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
								<StyledButton onClick={() => setOpenAddCmnt(!openAddCmnt)}>
									Add Comment
								</StyledButton>
							</Grid>
						) : null}
					</Grid>
				</Grid>
				{openAddCmnt === true ? (
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTextField
									multiline
									value={newComment.content}
									rows={13}
									id="outlined-basic"
									variant="outlined"
									placeholder="Write your comment here..."
									inputProps={{
										classes: { input: classes.some },
									}}
									onChange={(e) =>
										setNewComment({ ...newComment, content: e.target.value })
									}
								/>
							</Grid>
							<Grid item xs={12} style={{ paddingTop: 10 }}>
								<Grid container alignItems="flex-end" justifyContent="flex-end">
									<Grid item style={{ marginRight: 10 }}>
										<StyledCancelButton onClick={() => setOpenAddCmnt(!openAddCmnt)}>
											Cancel
										</StyledCancelButton>
									</Grid>
									<Grid item>
										<StyledButton
											onClick={() => addComment(newComment)}
											disabled={newComment.content != '' ? false : true}
										>
											Comment
										</StyledButton>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				) : null}

				<Grid item xs={12} style={{ paddingBottom: 10 }}>
					<Grid container direction="column">
						{localComments && localComments.slice(0, visibleCmnt).map(renderComment)}
					</Grid>
				</Grid>
				<Grid item xs={12} align="center">
					<Button
						style={{
							color: '#1C67FF',
							textTransform: 'none',
							border: '1px solid #1C67FF',
							borderRadius: '21px',
							fontSize: '12px',
						}}
						onClick={() => loadMore()}
					>
						Load More
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Comments;
