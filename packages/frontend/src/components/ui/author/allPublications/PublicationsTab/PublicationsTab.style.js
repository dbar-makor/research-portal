import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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
		'height': 200,
		'position': 'absolute',
		'opacity': 0,
		'transition': 'opacity 0.7s',
		'display': 'flex',
		'alignItems': 'center',
		'justifyContent': 'center',
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
export default useStyles;
