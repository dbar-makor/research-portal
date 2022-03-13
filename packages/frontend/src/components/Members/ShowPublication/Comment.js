import { Divider, Grid, Typography, TextField } from '@material-ui/core';
import {
	useStyles,
	StyledCollape,
	StyledCancelButton,
	StyledButton,
} from '../../../styles/PublicationsStyles';
import { ReactComponent as ArrowUp } from '../../../assets/icons/PolygonUp.svg';
import { ReactComponent as ArrowDown } from '../../../assets/icons/PolygonDown.svg';

import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Reply from './Reply';

function Comment(props) {
	const { comment, cmtNo, replyHendler, cmntId, pubId } = props;
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [openReply, setOpenReply] = useState(false);
	const [reply, setReply] = useState({ publication_id: pubId, content: '', comment_id: cmntId });

	const userType = useSelector((state) => state.auth.userContent.type);

	const repalyHendleChange = (content) => {
		replyHendler(content);
		setReply({ ...reply, content: '' });
		if (open === false) {
			setOpen(true);
		}
		setOpenReply(false);
	};

	return (
		<Grid item style={{ paddingTop: 10 }}>
			<Divider className={classes.divider}></Divider>
			<Grid container direction="column" style={{ paddingTop: 18 }}>
				<Grid item xs={12} style={{ paddingBottom: 10 }}>
					<Grid container>
						<Grid item>
							<Typography style={{ fontSize: 14 }}>
								<b>{`${cmtNo}.`} </b>
								{comment.content}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container alignItems="center">
						<Grid item>
							<Typography className={classes.commentWriter}>{`${comment.user.name} | ${format(
								new Date(comment.created_at ? comment.created_at : comment.date),
								'dd.MM.yyy',
							)}`}</Typography>
						</Grid>
						{userType && userType !== 'prospect' ? (
							<Grid item style={{ marginLeft: 15 }}>
								<Typography
									className={classes.replay}
									onClick={() => setOpenReply(!openReply)}
								>
									Reply
								</Typography>
							</Grid>
						) : null}
						{comment.replies.length > 0 && (
							<Grid item style={{ marginLeft: 30 }}>
								<Typography className={classes.repliesNo} onClick={() => setOpen(!open)}>
									{open ? (
										<ArrowUp style={{ margin: '0px 5px 2px 0px' }} />
									) : (
										<ArrowDown style={{ margin: '2px 5px 1px 0px' }} />
									)}
									{`${comment.replies.length} ${
										comment.replies.length > 1 ? 'Replies' : 'Reply'
									}`}
								</Typography>
							</Grid>
						)}
					</Grid>
				</Grid>
				{openReply ? (
					<Grid item>
						<Grid container>
							<Grid xs={12} style={{ paddingTop: 8 }}>
								<TextField
									variant="outlined"
									placeholder="Add a reply..."
									className={classes.textField}
									onChange={(e) => setReply({ ...reply, content: e.target.value })}
									value={reply.content}
								/>
							</Grid>
							<Grid item xs={12} style={{ paddingTop: 10 }}>
								<Grid container alignItems="flex-end" justifyContent="flex-end">
									<Grid item>
										<StyledCancelButton
											style={{ marginRight: 10, width: 70 }}
											onClick={() => setOpenReply(false)}
										>
											Cancel
										</StyledCancelButton>
									</Grid>
									<Grid item>
										<StyledButton
											disabled={reply.content !== '' ? false : true}
											style={{ width: 70 }}
											onClick={() => repalyHendleChange(reply)}
										>
											Reply
										</StyledButton>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				) : null}
				<Grid item xs={12} style={{ paddingTop: 8 }}>
					<Grid container direction="column">
						<StyledCollape timout="10000" in={open}>
							<Grid container justifyContent="flex-end">
								{comment.replies.map((reply, idx) => {
									return <Reply reply={reply} key={idx} />;
								})}
							</Grid>
						</StyledCollape>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Comment;
