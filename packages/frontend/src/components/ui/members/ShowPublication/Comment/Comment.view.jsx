import React from 'react';

import { Divider, Grid, Typography, TextField } from '@material-ui/core';
import {
	useStyles,
	StyledCollape,
	StyledCancelButton,
	StyledButton,
} from '../../../../../styles/PublicationsStyles';
import { ReactComponent as ArrowUp } from '../../../../../assets/icons/PolygonUp.svg';
import { ReactComponent as ArrowDown } from '../../../../../assets/icons/PolygonDown.svg';

import { format } from 'date-fns';
import Reply from '../Reply/Reply';

const CommentView = (props) => {
	const classes = useStyles();

	return (
		<Grid item style={{ paddingTop: 10 }}>
			<Divider className={classes.divider}></Divider>
			<Grid container direction="column" style={{ paddingTop: 18 }}>
				<Grid item xs={12} style={{ paddingBottom: 10 }}>
					<Grid container>
						<Grid item>
							<Typography style={{ fontSize: 14 }}>
								<b>{`${props.cmtNo}.`} </b>
								{props.comment.content}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container alignItems="center">
						<Grid item>
							<Typography className={classes.commentWriter}>{`${
								props.comment.user.name
							} | ${format(
								new Date(
									props.comment.created_at ? props.comment.created_at : props.comment.date,
								),
								'dd.MM.yyy',
							)}`}</Typography>
						</Grid>
						{props.userType && props.userType !== 'prospect' ? (
							<Grid item style={{ marginLeft: 15 }}>
								<Typography
									className={classes.replay}
									onClick={() => props.setOpenReply(!props.openReply)}
								>
									Reply
								</Typography>
							</Grid>
						) : null}
						{props.comment.replies.length > 0 && (
							<Grid item style={{ marginLeft: 30 }}>
								<Typography
									className={classes.repliesNo}
									onClick={() => props.setOpen(!open)}
								>
									{open ? (
										<ArrowUp style={{ margin: '0px 5px 2px 0px' }} />
									) : (
										<ArrowDown style={{ margin: '2px 5px 1px 0px' }} />
									)}
									{`${props.comment.replies.length} ${
										props.comment.replies.length > 1 ? 'Replies' : 'Reply'
									}`}
								</Typography>
							</Grid>
						)}
					</Grid>
				</Grid>
				{props.openReply ? (
					<Grid item>
						<Grid container>
							<Grid xs={12} style={{ paddingTop: 8 }}>
								<TextField
									variant="outlined"
									placeholder="Add a reply..."
									className={classes.textField}
									onChange={(e) =>
										props.setReply({ ...props.reply, content: e.target.value })
									}
									value={props.reply.content}
								/>
							</Grid>
							<Grid item xs={12} style={{ paddingTop: 10 }}>
								<Grid container alignItems="flex-end" justifyContent="flex-end">
									<Grid item>
										<StyledCancelButton
											style={{ marginRight: 10, width: 70 }}
											onClick={() => props.setOpenReply(false)}
										>
											Cancel
										</StyledCancelButton>
									</Grid>
									<Grid item>
										<StyledButton
											disabled={props.reply.content !== '' ? false : true}
											style={{ width: 70 }}
											onClick={() => props.replyChangeHandler(props.reply)}
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
								{props.comment.replies.map((reply, idx) => {
									return <Reply reply={reply} key={idx} />;
								})}
							</Grid>
						</StyledCollape>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

CommentView.displayName = 'CommentView';
CommentView.defaultProps = {};

export default React.memo(CommentView);
