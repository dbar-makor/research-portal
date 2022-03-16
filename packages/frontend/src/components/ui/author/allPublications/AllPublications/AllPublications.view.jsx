import React from 'react';
import { Grid } from '@material-ui/core';
import SubHeader from '../../../../Reusables/SubHeader';
import AllPublicationsStatColumn from '../AllPublicationsStatColumn/AllPublicationsStatColumn';
import AllPublicationsTabs from '../AllPublicationsTabs/AllPublicationsTabs';

import useStyles from './AllPublications.style';

const publishedFieldLabels = [
	'Posts',
	'Total Words',
	'Average Word Count',
	'Comments',
	'Views',
	'Shares',
	'Most Read',
	'Most Interacted',
];
const publishedFields = [
	'posts',
	'total_words',
	'average_word_count',
	'comments',
	'views',
	'shares',
	'most_read',
	'most_interacted',
];
const draftFieldLabels = ['Saved', 'Total Words', 'Average Word Count'];
const draftFields = ['saved', 'total_words', 'average_word_count'];

const AllPublicationsView = (props) => {
	const classes = useStyles();

	return Object.keys(props.statistics).length ? (
		<Grid container justifyContent="center">
			<Grid item xs={10} className={classes.page}>
				<SubHeader title="All Articles" />
			</Grid>
			<Grid container>
				<Grid item xs={10} className={classes.contentWrapper}>
					<Grid item xs={3} className={classes.statisticsColumn}>
						<AllPublicationsStatColumn
							publishedFieldLabels={publishedFieldLabels}
							publishedFields={publishedFields}
							draftFieldLabels={draftFieldLabels}
							draftFields={draftFields}
							statistics={props.statistics}
						/>
					</Grid>

					<Grid item xs={9} className={classes.publicationsColumn}>
						<AllPublicationsTabs fetchStatistics={props.fetchStatistics} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	) : (
		<></>
	);
};

AllPublicationsView.displayName = 'allPublicationsView';
AllPublicationsView.defaultProps = {};

export default React.memo(AllPublicationsView);
