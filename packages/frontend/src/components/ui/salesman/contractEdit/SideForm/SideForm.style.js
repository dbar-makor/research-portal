import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	rightColumn: {
		height: '100%',
		justifyContent: 'space-between',
		alignContent: 'space-between',
	},
	sidebarWrapper: {
		height: '80%',
		marginLeft: 20,
		borderRadius: 8,
		border: '1px solid #A5AFC233',
		backgroundColor: '#EDEFF3',
	},
	sidebar: {
		height: '100%',
	},
	progressBarItem: {
		height: '100%',
	},
	progressBarContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: 'inherit',
	},
	progressBar: {
		'& .MuiCircularProgress-svg': {
			color: '#1C67FF',
		},
	},
	progressbarTitle: {
		color: '#868DA2',
		marginTop: 20,
	},
	section: {
		paddingBottom: 20,
	},
	sectionTitle: {
		fontSize: 16,
		color: '#868DA2',
	},
	pdfLink: {
		'fontSize': 14,
		'color': '#868DA2',
		'textDecoration': 'underline',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	divider: {
		margin: '0 auto',
		width: '90%',
	},
	formRow: {
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: 30,
	},
	textField: {
		'& .MuiInputBase-root': {
			color: (props) => (props.activeSidebar ? '#000' : '#868DA2'),
		},
		'& .MuiSvgIcon-root': {
			fill: (props) => (props.activeSidebar ? '#1C67FF' : '#868DA2'),
		},
	},
	send: {
		'textDecoration': 'underline',
		'color': '#868DA2',
		'&:hover': {
			cursor: (props) => (props.activeSidebar ? 'pointer' : 'default'),
		},
	},
}));

export default useStyles;
