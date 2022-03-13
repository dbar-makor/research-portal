
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';
import SubHeader from '../../Reusables/SubHeader';
// import dataStats from "../../../config/statisticsConfig.json";
import AllPublicationsStatColumn from './AllPublicationsStatColumn';
import AllPublicationsTabs from './AllPublicationsTabs';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import * as utilsAction from '../../../redux/utils/utilsSlice';

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

const useStyles = makeStyles({
	page: {
		margin: '4.3vh auto 0 auto',
	},
	contentWrapper: {
		margin: '0 auto',
		display: 'flex',
	},
	statisticsColumn: {
		marginTop: '2vh',
		padding: 20,
		height: 700,
		// minWidth: 320,
		// flexDirection: "column",
		// justifyContent: "flexStart",
		border: '1px solid #ECEEF2',
		borderRadius: 8,
	},
	publicationsColumn: {
		marginTop: '2vh',
		marginLeft: '1vw',
	},

});


function AllPublications() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [statistics, setStatistics] = useState({});
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(utilsAction.getUtilsAsync());
		}
	}, []);

	async function fetchStatistics() {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.USER}/statistics`);
			if (res.status === 201 || res.status === 200) {
				setStatistics(res.data);
			}
		} catch (error) {
			/* eslint no-console: 0 */
				console.log('get statistics', res.data);
				setStatistics(res.data);
			}
		}
  
	useEffect(() => {
		fetchStatistics();
	}, []);

	return Object.keys(statistics).length ? (
		<Grid container justifyContent="center">
			<Grid item xs={10} className={classes.page}>
				<SubHeader title="All Articles" />
			</Grid>
			<Grid container>
				<Grid item xs={10} className={classes.contentWrapper}>
					{/* <Grid container > */}
					<Grid item xs={3} className={classes.statisticsColumn}>
						<AllPublicationsStatColumn
							publishedFieldLabels={publishedFieldLabels}
							publishedFields={publishedFields}
							draftFieldLabels={draftFieldLabels}
							draftFields={draftFields}
							statistics={statistics}
						/>
					</Grid>
					{/* </Grid> */}

					{/* <Grid container > */}
					<Grid item xs={9} className={classes.publicationsColumn}>
						<AllPublicationsTabs fetchStatistics={fetchStatistics} />
					</Grid>
					{/* </Grid> */}
				</Grid>
			</Grid>
		</Grid>
	) : (
		<></>
	);
}

export default AllPublications;
