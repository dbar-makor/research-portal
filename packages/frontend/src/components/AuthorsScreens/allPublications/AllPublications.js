//MUI
import { useEffect, useState } from 'react';
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
const useStyles = makeStyles(() => ({
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
}));

// bigTitle: {
//   color: '#000000',
//   fontSize: '32px',
//   fontWeight: 600,
//   marginBottom: '15px'
// },
// bigImage: {
//   marginBottom: '20px'
// },
// bigDescription: {
//   color: '#000000',
//   fontSize: '20px',
//   fontWeight: 600,
//   marginBottom: '15px'
// },
// bigSubDescription: {
//   color: '#000000',
//   fontSize: '16px',
//   marginBottom: '15px'
// },
// bigAuthorName: {
//   color: '#999999',
//   fontSize: '14px'
// },
// mainArticle: {
//   marginTop: '11vh'
// },
// smallTitle: {
//   color: '#000000',
//   fontSize: '16px',
//   fontWeight: 600,
//   marginBottom: '10px'
// },
// smallArticle: {
//   marginBottom: '10px',
//   cursor: 'pointer'
// },
// smallAuthorName: {
//   color: '#999999',
//   fontSize: '14px'
// },
// bigLink: {
//   color: '#000000',
//   marginRight: '50px',
//   marginTop: '25px'
// },
// smallLink: {
//   textDecoration: 'none'
// },

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
				console.log('get statistics', res.data);
				setStatistics(res.data);
			}
		} catch (error) {
			console.log(error, error.message);
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
