import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
	statisticsTitle: {
		fontSize: 24,
		marginBottom: 20,
	},
	publishedSection: {
		marginBottom: 20,
		paddingBottom: 20,
		borderBottom: '1px solid #ECEEF2',
	},
	draftsSection: {},
	statisticsSubtitle: {
		color: '#868DA2',
		fontSize: 16,
		marginBottom: 12,
	},
	statRow: {
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	fieldLabel: {
		fontWeight: 600,
	},
});

const AllPublicationsStatColumn = ({
	publishedFieldLabels,
	publishedFields,
	draftFieldLabels,
	draftFields,
	statistics,
}) => {
	const classes = useStyles();
	const pubStatistics = statistics.published;
	const draftStatistics = statistics.drafts;

	return (
		<>
			<Typography className={classes.statisticsTitle}>Total Statistics</Typography>
			<Grid container className={classes.publishedSection}>
				<Typography className={classes.statisticsSubtitle}>Published</Typography>
				{publishedFieldLabels.map((field, index) => (
					<Grid container key={field} className={classes.statRow}>
						<Typography className={classes.fieldLabel}>{field}</Typography>
						{pubStatistics[publishedFields[index]] ? (
							<Typography>
								{isNaN(pubStatistics[publishedFields[index]])
									? pubStatistics[publishedFields[index]]
									: pubStatistics[publishedFields[index]].toLocaleString()}
							</Typography>
						) : (
							<Typography>-</Typography>
						)}
					</Grid>
				))}
			</Grid>
			<Grid container className={classes.draftsSection}>
				<Typography className={classes.statisticsSubtitle}>Drafts</Typography>
				{draftFieldLabels.map((field, index) => (
					<Grid container key={field} className={classes.statRow}>
						<Typography className={classes.fieldLabel}>{field}</Typography>
						{pubStatistics[publishedFields[index]] ? (
							<Typography>
								{isNaN(draftStatistics[draftFields[index]])
									? draftStatistics[draftFields[index]]
									: draftStatistics[draftFields[index]].toLocaleString()}
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

export default AllPublicationsStatColumn;
