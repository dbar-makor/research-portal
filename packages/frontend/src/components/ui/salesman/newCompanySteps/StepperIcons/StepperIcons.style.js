import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		backgroundColor: '#ccc',
		zIndex: 1,
		color: '#fff',
		width: 50,
		height: 50,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '2rem',
		// marginTop: "-4vh"
	},
	active: {
		backgroundColor: '#1C67FF',
		color: '#fff',
	},
	completed: {
		backgroundColor: '#FFF',
		color: '#1C67FF',
		border: '1px solid #1C67FF',
	},
});
export default useStyles;
