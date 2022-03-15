import { Grid, Typography, makeStyles } from '@material-ui/core';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	date: {
		fontSize: [13, '!important'],
		fontWeight: 100,
		color: '#868DA2',
	},
	author: {
		fontSize: [13, '!important'],
		fontWeight: 100,
		color: '#868DA2',
		position: 'absolute',
		bottom: 30,
	},
	title: {
		fontSize: [30, '!important'],
		fontWeight: 'bold',
		color: '#0F0F0F',
	},
	rightHalf: {
		height: '220px',
		position: 'relative',
		paddingLeft: '20px',
	},
	cardWrapper: {
		minWidth: 250,
		maxWidth: 350,
		marginRight: 16,
		marginBottom: 16,
	},
	card: {
		height: 370,
		position: 'relative',
	},
	sideHalf: {
		display: 'flex',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		justifyContent: 'flex-end',
		height: 350,
		borderRadius: '8px',
		position: 'relative',
	},
	noImage: {
		backgroundColor: 'rgb(116, 178, 240)',
		width: '485px',
		height: '220px',
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
			marginRight: 5,
			marginTop: 5,
		},
	},
	typeIndicator: {
		backgroundColor: '#fff',
		borderRadius: '50%',
		position: 'absolute',
		left: 10,
		bottom: 10,
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
	},
	pubTitle: {
		marginBottom: 16,
		fontWeight: '600',
	},
	backdrop: {
		'zIndex': '2',
		// 'width': 'inherit',
		// 'height': 'inherit',
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
		},
	},

	binBtn: {
		'backgroundColor': '#fff',
		'marginRight': 12,
		'padding': '9px 11px',
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
});

const BigPublication = ({ publication }) => {
	const classes = useStyles();

	const chooseImage = (publication) => {
		let image = '';
		let url = '';
		if (publication.attachments.length) {
			image = publication.attachments.find((attachment) => attachment.file_type === 'main_bg');
			const imageName = image && image.file_name_system;
			if (!imageName) return 0;
			url = `${BASE_URL}${END_POINT.ASSETS}/${encodeURIComponent(imageName)}`;
		}
		return url;
	};

	const truncateDescription = (string) => {
		const descrptionArr = string.split(' ');
		const descriptionLength = descrptionArr.length;
		descrptionArr.splice(14);
		const newDescription = descrptionArr.join(' ');
		if (descriptionLength > 15) return `${newDescription}...`;
		return newDescription;
	};

	return (
		<Grid item xs={12} key={publication.id} style={{ padding: 14 }}>
			<Grid container>
				<Grid item xs={6}>
					<Link
						to={{
							pathname: `article/${publication.id}`,
							state: {
								applied: true,
							},
						}}
					>
						<Grid
							item
							xs={12}
							className={classes.sideHalf}
							style={{
								backgroundImage: chooseImage(publication)
									? `url(${chooseImage(publication)})`
									: 'none',
								backgroundColor: '#74b2f0',
							}}
						></Grid>
					</Link>
				</Grid>

				<Grid item xs={6} className={classes.rightHalf}>
					<Grid container direction="column" xs={12}>
						<Grid
							item
							className={classes.outerColumn}
							container
							direction="column"
							alignItems="flex-end"
							justify="flex-start"
						>
							<Typography variant="body2" className={classes.date}>
								{format(new Date(publication.published_at), 'dd MMM, yyyy')}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="h5" className={classes.title}>
								{publication.title}
							</Typography>
							<Typography variant="body2" component="h2">
								{truncateDescription(publication.description)}
							</Typography>
							<Grid item direction="column" align="left" justify="flex-end">
								<Typography variant="body2" component="h2" className={classes.author}>
									{publication.name}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default BigPublication;
