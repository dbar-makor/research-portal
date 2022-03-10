import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TabContext from '@material-ui/lab/TabContext';
import PublicationsTab from './PublicationsTab';
import dataResearches from '../../../config/researchesConfig.json';
import TabPanel from './TabPanel';
import Grid from '@material-ui/core/Grid';
import { AddButton } from '../../../styles/MainStyles';
import AddIcon from '@material-ui/icons/Add';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import axios from 'axios';
import AuthorsNewArticleModal from '../AuthorsNewArticleModal';

function a11yProps(index) {
	return {
		'id': `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

function AllPublicationsTabs({ fetchStatistics }) {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [publications, setPublications] = useState([]);
	const publishedResearches = publications.filter((research) => research.status === 'published');
	const draftResearches = publications.filter((research) => research.status === 'draft');
	const [openNewPublication, setOpenNewPublication] = useState(false);
	//const [statistics, setStatistics] = useState({})

	const handleCloseNewPublication = () => {
		setOpenNewPublication(false);
	};

	const handleOpenNewPublication = () => {
		setOpenNewPublication(true);
	};

	async function fetchPublications() {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.USER}/publication`);
			if (res.status === 200) {
				console.log('get successful', res, 'data', res.data);
				setPublications(res.data);
			}
		} catch (error) {
			console.log(error, error.message);
		}
	}

	useEffect(() => {
		fetchPublications();
	}, []);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<TabContext value={value.toString()}>
				<Grid item xs={12}>
					<Grid container className={classes.barWrapper}>
						<Grid item xs={4}>
							<Tabs value={value} onChange={handleChange} className={classes.tabs} aria-label="tabs">
								<Tab label="Published" {...a11yProps(0)} className={classes.tab} />
								<Tab label="Drafts" {...a11yProps(1)} className={classes.tab} />
							</Tabs>
						</Grid>
						<Grid item xs={1}>
							<AddButton className={classes.newBtn} onClick={() => handleOpenNewPublication()}>
								<AddIcon />
								New
							</AddButton>
						</Grid>
					</Grid>
					{publications.length ? (
						<Grid container>
							<TabPanel value={value} index={0} className={classes.tabPanel}>
								{publishedResearches.length ? (
									publishedResearches.map((pub, idx) => {
										return (
											<PublicationsTab
												key={`${pub.title}${idx}`}
												publication={pub}
												fetchPublications={fetchPublications}
												fetchStatistics={fetchStatistics}
											/>
										);
									})
								) : (
									<Typography className={classes.noPublications}>No published publications yet</Typography>
								)}
							</TabPanel>

							<TabPanel value={value} index={1} className={classes.tabPanel}>
								{draftResearches.length ? (
									draftResearches.map((pub, idx) => {
										return (
											<PublicationsTab
												key={`${pub.title}${idx}`}
												publication={pub}
												fetchPublications={fetchPublications}
												fetchStatistics={fetchStatistics}
											/>
										);
									})
								) : (
									<Typography className={classes.noPublications}>No drafts yet</Typography>
								)}
							</TabPanel>
						</Grid>
					) : (
						<Typography className={classes.noPublications}>No publications yet</Typography>
					)}
				</Grid>
				<AuthorsNewArticleModal handleClose={handleCloseNewPublication} open={openNewPublication} />
			</TabContext>
		</div>
	);
}

export default AllPublicationsTabs;

const useStyles = makeStyles((theme) => ({
	// appBar:{
	//   backgroundColor: "#fff",
	//   color: "#000",
	//   boxShadow: "none",
	//   marginLeft: 15,
	// },
	barWrapper: {
		justifyContent: 'space-between',
	},
	newBtn: {
		'borderRadius': 4,
		'padding': '10px 15px 10px 15px',
		'width': 100,
		'display': 'inline-block',
		'marginLeft': -100,
		'color': '#fff',
		'fontSize': 18,
		'& span': {
			display: 'flex',
			justifyContent: 'space-between',
		},
	},
	tabs: {
		'& .MuiTabs-indicator': {
			//borderBottom: "3px solid #1C67FF",
			backgroundColor: '#1C67FF',
		},
	},
	tab: {
		fontWeight: '600',
	},
	tabPanel: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	dialog: {
		// width: "536px",
		// // position: "absolute",
		// // top: "306px",
		// // left: "692px",
		//  height: "469px",
	},
	dialogPaper: {
		width: '30vw',
		height: '50vh',
		// position: "absolute",
		// top: "306px",
		// left: "692px",
		//height: "469px",
	},
	dialogBackDrop: {
		backdropFilter: 'blur(2px)',
		backgroundColor: '#00001e25',
	},
	noPublications: {
		color: '#868DA2',
		fontSize: '18px',
		marginTop: '20px',
	},
}));
