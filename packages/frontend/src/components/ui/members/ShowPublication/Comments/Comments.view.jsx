import React from 'react';

import { Button, Divider, Grid, Typography } from '@material-ui/core';
import {
	useStyles,
	StyledButton,
	StyledTextField,
	StyledCancelButton,
} from '../../../../../styles/PublicationsStyles';
import Comment from '../Comment/Comment';

const CommentsView = (props) => {
	const classes = useStyles();

	const renderComment = (comment, index) => {
		return (
			<Comment
				pubId={props.pubId}
				comment={comment}
				key={index}
				cmtNo={index === 0 ? props.comments.length : props.comments.length - index}
				replyHendler={(data) => props.addComment(data)}
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
							>{`Comments (${props.comments.length})`}</Typography>
						</Grid>
						{props.userType && props.userType !== 'prospect' && props.openAddCmnt !== true ? (
							<Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
								<StyledButton onClick={() => props.setOpenAddCmnt(!props.openAddCmnt)}>
									Add Comment
								</StyledButton>
							</Grid>
						) : null}
					</Grid>
				</Grid>
				{props.openAddCmnt === true ? (
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTextField
									multiline
									value={props.newComment.content}
									rows={13}
									id="outlined-basic"
									variant="outlined"
									placeholder="Write your comment here..."
									inputProps={{
										classes: { input: classes.some },
									}}
									onChange={(e) =>
										props.setNewComment({ ...props.newComment, content: e.target.value })
									}
								/>
							</Grid>
							<Grid item xs={12} style={{ paddingTop: 10 }}>
								<Grid container alignItems="flex-end" justifyContent="flex-end">
									<Grid item style={{ marginRight: 10 }}>
										<StyledCancelButton
											onClick={() => props.setOpenAddCmnt(!props.openAddCmnt)}
										>
											Cancel
										</StyledCancelButton>
									</Grid>
									<Grid item>
										<StyledButton
											onClick={() => props.addComment(props.newComment)}
											disabled={props.newComment.content !== '' ? false : true}
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
						{props.localComments &&
							props.localComments.slice(0, props.visibleCmnt).map(renderComment)}
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
						onClick={() => props.loadMore()}
					>
						Load More
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

CommentsView.displayName = 'CommentsView';
CommentsView.defaultProps = {};

export default React.memo(CommentsView);
