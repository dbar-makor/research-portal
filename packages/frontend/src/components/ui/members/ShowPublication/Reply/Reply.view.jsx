import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../../../styles/PublicationsStyles';
import { format } from 'date-fns';

const ReplyView = (props) => {
	const classes = useStyles();

	return (
		<Grid item xs={11} style={{ paddingTop: 15 }}>
			<Grid container justifyContent="flex-end">
				<Grid item xs={12}>
					<Typography className={classes.commentWriter}>{`${props.reply.user.name} | ${format(
						new Date(props.reply.created_at),
						'dd.MM.yyy',
					)}`}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography style={{ fontSize: 12 }}>{props.reply.content}</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

ReplyView.displayName = 'ReplyView';
ReplyView.defaultProps = {};

export default React.memo(ReplyView);
