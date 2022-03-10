import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useState } from 'react';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import { BinButton, EditButton } from '../../../styles/MainStyles';
import EditIcon from '@material-ui/icons/Edit';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/IconTrash.svg';
import axios from 'axios';
import DeleteAlert from '../../Reusables/DeleteAlert';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectChosenResearch, getChosenResearchAsync } from '../../../redux/researches/chosenResearchSlice';
import * as actionSnackBar from '../../../redux/SnackBar/action';
// import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { ReactComponent as EmptyFile } from '../../../assets/icons/fileEmpty.svg';

//after changes, this component shows a single publication card

function truncateString(string, wordsNo) {
	const descrptionArr = string.split(' ');
	const descriptionLength = descrptionArr.length;
	descrptionArr.splice(wordsNo);
	const newDescription = descrptionArr.join(' ');
	if (descriptionLength > wordsNo) return `${newDescription}...`;
	return newDescription;
}

function PublicationsTab({ publication, fetchPublications, fetchStatistics }) {
	const classes = useStyles();
	const [openAlert, setOpenAlert] = useState(false);
	const [redirectMarker, setRedirectMarker] = useState(false);
	const [deleteID, setDeleteID] = useState('');

	const history = useHistory();
	const dispatch = useDispatch();
	const chosenResearch = useSelector(selectChosenResearch);

	useEffect(() => {
		if (chosenResearch && chosenResearch.type === 'live' && redirectMarker) {
			setRedirectMarker(false);
			//change routing!
			history.push('/new-article');
		} else if (chosenResearch && chosenResearch.type === 'dead' && redirectMarker) {
			setRedirectMarker(false);
			//change routing!
			history.push('/upload-article');
		}
	}, [chosenResearch]);

	async function asyncDelete() {
		try {
			const res = await axios.delete(`${BASE_URL}${END_POINT.PUBLICATION}/${deleteID}`);
			if (res.status === 201 || res.status === 200) {
				console.log('delete successful');
				fetchPublications();
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully deleted', 2000));
				fetchStatistics();
			}
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'Delete failed', 2000));
		}
	}

	function handleEdit(id) {
		dispatch(getChosenResearchAsync(id));
		setRedirectMarker(true);
	}

	const handleCloseAlert = () => {
		setOpenAlert(false);
	};

	function deletePublication() {
		console.log('id deletePublication', deleteID);
		asyncDelete(deleteID);
		setOpenAlert(false);
		setDeleteID('');
	}

	function handleDeleteBtn(id) {
		setOpenAlert(true);
		setDeleteID(id);
	}

	const handlePublish = async (id) => {
		try {
			const res = await axios.put(`${BASE_URL}${END_POINT.PUBLICATION}${END_POINT.PUBLISH}/${id}`);
			if (res.status === 201 || res.status === 200) {
				console.log('delete successful');
				fetchPublications();
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully published', 2000));
				fetchStatistics();
			}
		} catch (error) {
			console.log(error);
			dispatch(actionSnackBar.setSnackBar('error', 'publish failed', 2000));
		}
	};

	function chooseImage(publication) {
		let image = '';
		let url = '';
		if (publication?.attachments?.length) {
			image = publication.attachments.find((attachment) => attachment.file_type === 'main_bg');
			const imageName = image && image.file_name_system;
			url = `${BASE_URL}${END_POINT.ASSETS}/${encodeURIComponent(imageName)}`;
		}
		return url;
	}
	return (
		<>
			<Grid item xs={4} className={classes.cardWrapper} key={publication.id}>
				<Grid container className={classes.card}>
					<Grid
						item
						xs={12}
						className={classes.upperHalf}
						style={{
							backgroundImage: chooseImage(publication)
								? `url(${chooseImage(publication)})`
								: 'none',
							backgroundColor: '#74b2f0',
						}}
					>
						{
							publication.status === 'published' ? (
								<Grid className={classes.viewsBox}>
									<VisibilityIcon></VisibilityIcon>
									{publication.views}
								</Grid>
							) : null
							// (
							//   <Grid
							//     className={`${classes.viewsBox} ${classes.draftBox}`}
							//     onClick={() => {
							//       handlePublish(publication.id)
							//     }}
							//   >
							//     Publish
							//   </Grid>
							// )
						}

						{publication.type === 'dead' ? (
							<Grid className={classes.typeIndicator}>
								{publication.title_video ? (
									<PlayArrowIcon className={classes.typeIcon} />
								) : (
									<EmptyFile className={classes.typeIcon} />
								)}
							</Grid>
						) : (
							<></>
						)}
					</Grid>
					<Grid item xs={12} className={classes.backdrop}>
						<BinButton className={classes.binBtn} onClick={() => handleDeleteBtn(publication.id)}>
							<DeleteIcon />
						</BinButton>
						<EditButton className={classes.editBtn} onClick={() => handleEdit(publication.id)}>
							<EditIcon />
						</EditButton>
					</Grid>
					<Grid item xs={12} className={classes.lowerHalf}>
						<Typography variant="h5" className={classes.pubTitle}>
							{publication.title}
						</Typography>
						<Typography>{truncateString(publication.description, 10)}</Typography>
					</Grid>
				</Grid>
			</Grid>
			<DeleteAlert
				open={openAlert}
				handleClose={handleCloseAlert}
				itemName={publication.title}
				itemId={publication.id}
				itemCategory="Publication"
				deleteItem={deletePublication}
			/>
		</>
	);
}

export default PublicationsTab;

const useStyles = makeStyles((theme) => ({
	cardWrapper: {
		minWidth: 250,
		maxWidth: 350,
		marginRight: 16,
		marginBottom: 16,
	},
	card: {
		// flexDirection: "column",
		// maxWidth: 350,
		//minWidth: 280,
		height: 370,
		position: 'relative',
	},
	upperHalf: {
		display: 'flex',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		justifyContent: 'flex-end',
		height: 200,
		borderRadius: '8px 8px 0 0',
		position: 'relative',
	},
	viewsBox: {
		'backgroundColor': '#fff',
		'display': 'flex',
		'alignItems': 'center',
		'justifyContent': 'space-evenly',
		'padding': '3px 14px 3px 14px',
		'height': 26,
		'marginTop': 20,
		'marginRight': 20,
		'borderRadius': 16,
		'fontSize': 20,
		'zIndex': 3,
		'color': '#1C67FF',
		'& svg': {
			height: 22,
			// marginRight: 5,
			// marginTop: 5
		},
	},
	typeIndicator: {
		backgroundColor: '#fff',
		borderRadius: '50%',
		// alignSelf: "flex-end",
		position: 'absolute',
		left: 10,
		bottom: 10,
		// display: "flex",

		// width: 20,
		// height: 20,
		// padding:
	},
	typeIcon: {
		padding: '8px 10px 5px 10px',
	},
	draftBox: {
		color: '#fff',
		backgroundColor: '#1C67FF',
		padding: '5px 14px 5px 14px',
		fontSize: 16,
	},

	lowerHalf: {
		display: 'flex',
		backgroundColor: '#fff',
		flexDirection: 'column',
		height: 170,
		padding: '12px 25px 24px 16px ',
		borderLeft: '2px solid #ECEEF2',
		borderRight: '2px solid #ECEEF2',
		borderBottom: '2px solid #ECEEF2',
		borderRadius: '0 0 8px 8px',
		overflowY: 'hidden',
	},
	pubTitle: {
		marginBottom: 16,
		fontWeight: '600',
	},
	backdrop: {
		'zIndex': '2',
		'width': 'inherit',
		'height': 'inherit',
		'position': 'absolute',
		'opacity': 0,
		'transition': 'opacity 0.7s',
		'display': 'flex',
		'alignItems': 'center',
		'justifyContent': 'center',
		'height': 200,
		'width': 380,
		'top': 0,
		'left': 0,
		'borderRadius': '8px 8px 0 0',

		'&:hover': {
			'opacity': 1,
			'backgroundColor': 'rgba(0,0,0,0.2)',
			'-webkit-backdrop-filter': 'blur(7px)',
			'backdropFilter': 'blur(7px)',
			//filter: "blur(10px)",
		},
	},
	// open:{

	// },
	binBtn: {
		'backgroundColor': '#fff',
		'marginRight': 12,
		'padding': '9px 11px',
		'backgroundColor': '#fff',
		'& path': {
			fill: 'red',
		},
		'&:hover': {
			'backgroundColor': 'red',
			'& path': {
				fill: '#fff',
			},
		},
	},
	editBtn: {
		'backgroundColor': '#fff',
		'& path': {
			fill: '#000',
		},
		'&:hover': {
			'backgroundColor': '#000',
			'& path': {
				fill: '#fff',
			},
		},
	},
}));
