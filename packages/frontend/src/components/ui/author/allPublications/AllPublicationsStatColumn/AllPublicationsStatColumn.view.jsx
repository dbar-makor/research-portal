import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import useStyles from './AllPublicationsStatColumn.style';

const AllPublicationsStatColumnView = (props) => {
	const classes = useStyles();
	const pubStatistics = props.statistics.published;
	const draftStatistics = props.statistics.drafts;

	return (
		<>
			<Typography className={classes.statisticsTitle}>Total Statistics</Typography>
			<Grid container className={classes.publishedSection}>
				<Typography className={classes.statisticsSubtitle}>Published</Typography>
				{props.publishedFieldLabels.map((field, index) => (
					<Grid container key={field} className={classes.statRow}>
						<Typography className={classes.fieldLabel}>{field}</Typography>
						{pubStatistics[props.publishedFields[index]] ? (
							<Typography>
								{isNaN(pubStatistics[props.publishedFields[index]])
									? pubStatistics[props.publishedFields[index]]
									: pubStatistics[props.publishedFields[index]].toLocaleString()}
							</Typography>
						) : (
							<Typography>-</Typography>
						)}
					</Grid>
				))}
			</Grid>
			<Grid container className={classes.draftsSection}>
				<Typography className={classes.statisticsSubtitle}>Drafts</Typography>
				{props.draftFieldLabels.map((field, index) => (
					<Grid container key={field} className={classes.statRow}>
						<Typography className={classes.fieldLabel}>{field}</Typography>
						{pubStatistics[props.publishedFields[index]] ? (
							<Typography>
								{isNaN(draftStatistics[props.draftFields[index]])
									? draftStatistics[props.draftFields[index]]
									: draftStatistics[props.draftFields[index]].toLocaleString()}
							</Typography>
						) : (
							<Typography>-</Typography>
						)}
					</Grid>
				))}
			</Grid>
		</>
	);
};

AllPublicationsStatColumnView.displayName = 'AllPublicationsStatColumnView';
AllPublicationsStatColumnView.defaultProps = {};

export default React.memo(AllPublicationsStatColumnView);
