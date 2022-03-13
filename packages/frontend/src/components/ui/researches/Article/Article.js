import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	bigTitle: {
		color: '#000000',
		fontSize: '32px',
		fontWeight: 600,
		marginBottom: '15px',
	},
	bigImage: {
		marginBottom: '20px',
	},
	bigAuthorName: {
		color: '#999999',
		fontSize: '14px',
		marginBottom: '30px',
	},
	articleContainer: {
		marginTop: '7vh',
	},
	date: {
		color: '#999999',
	},
}));

export default useStyles;
