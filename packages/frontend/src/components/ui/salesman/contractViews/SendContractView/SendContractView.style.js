import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	formContainer: {
		position: 'relative',
		height: 600,
	},
	upperSection: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	mainTitle: {
		fontSize: 20,
		marginBottom: 20,
		marginTop: 15,
	},
	pdfLink: {
		'color': '#1C67FF',
		'fontSize': 20,
		'textDecoration': 'underline',
		'fontWeight': 600,
		'marginLeft': 10,
		'&:hover': {
			cursor: 'pointer',
		},
	},
	lowerSection: {
		marginTop: 20,
		marginBottom: 20,
	},
	question: {
		color: '#868DA2',
		size: 16,
		marginBottom: 20,
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	textField: {},
	linkBtn: {
		padding: '6px 55px 6px 55px',
	},
	divider: {
		backgroundColor: '#EDEFF3',
		height: '1px',
		width: '100%',
		marginTop: 20,
	},
	btnWrapper: {
		justifyContent: 'flex-end',
	},
}));

export default useStyles;
