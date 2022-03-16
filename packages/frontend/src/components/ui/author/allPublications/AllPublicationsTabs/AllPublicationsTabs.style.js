import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
	dialogPaper: {
		width: '30vw',
		height: '50vh',
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
export default useStyles;
