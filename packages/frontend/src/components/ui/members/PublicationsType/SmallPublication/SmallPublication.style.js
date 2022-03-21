import { makeStyles } from '@material-ui/core/styles';

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
	cardWrapper: {
		minWidth: 250,
		maxWidth: 350,
		marginRight: 16,
		marginBottom: 16,
	},
	title: {
		fontSize: [20, '!important'],
		fontWeight: 'bold',
		color: '#0F0F0F',
	},
	rightHalf: {
		position: 'relative',
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
		height: 150,
		borderRadius: '8px',
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
			//filter: "blur(10px)",
		},
	},
	// open:{

	// },
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

export default useStyles;
