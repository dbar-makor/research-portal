import { useStyles } from '../../../styles/AllNotificationStyle';
import { Grid, Typography } from '@material-ui/core';
import { ReactComponent as FoldedPaper } from '../../../assets/icons/FoldedPaper.svg';
import { ReactComponent as Like } from '../../../assets/icons/Like.svg';

import { useHistory } from 'react-router';
import { parseISO, formatDistanceToNow } from 'date-fns';

function chooseIcon(type) {
	switch (type) {
		case 'new publication':
			return <FoldedPaper style={{ transform: 'scale(1.6)' }} />;
		default:
			return <Like />;
	}
}

const shortify = (string) => {
	if (string.length > 30) {
		return `${string.slice(0, 29)} ...`;
	} else {
		return string;
	}
};

const TimeAgo = (timestamp) => {
	let timeAgo = '';
	if (timestamp) {
		const date = parseISO(timestamp);
		const timePeriod = formatDistanceToNow(date);
		timeAgo = `${timePeriod} ago`;
		return timeAgo;
	}
};

function NotificationBox({ content, isRead }) {
	const classes = useStyles();
	const history = useHistory();

	const handleClick = () => {
		history.push(`/article/${content.publication_id}`);
	};

	//    console.log("content", content)
	return (
		<Grid
			item
			xs={12}
			className={classes.singleNotItem}
			style={{ backgroundColor: isRead ? '#fff' : '#F3F7FF' }}
			onClick={handleClick}
		>
			<Grid container className={classes.singleNotContainer}>
				<Grid item xs={2} className={classes.iconItem}>
					<Grid container className={classes.iconContainer}>
						{chooseIcon(content.type)}
					</Grid>
				</Grid>
				<Grid item xs={10} className={classes.contentItem}>
					<Grid container className={classes.contentContainer}>
						{/* <Grid item xs={12}> */}
						<Grid item xs={12}>
							<Grid container className={classes.notTopRow}>
								<Grid item>
									<Typography className={classes.notType}>{content.type}</Typography>
								</Grid>
								<Grid item>
									<Typography className={classes.notTime}>
										{TimeAgo(content.time)}
									</Typography>
									{/* <Typography className={classes.notTime}>{format(new Date(content.time) , 'dd MMM , yyyy')}</Typography> */}
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Typography className={classes.notTitle}> {shortify(content.title)}</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography className={classes.notCategories}> {content.categories} </Typography>
						</Grid>

						{/* </Grid> */}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default NotificationBox;
