import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	bigTitle: {
		color: '#000000',
		fontSize: '32px',
		fontWeight: 600,
		marginBottom: '15px',
	},
	bigImage: {
		marginBottom: '20px',
	},
	bigDescription: {
		color: '#000000',
		fontSize: '20px',
		fontWeight: 600,
		marginBottom: '15px',
	},
	bigSubDescription: {
		color: '#000000',
		fontSize: '16px',
		marginBottom: '15px',
	},
	bigAuthorName: {
		color: '#999999',
		fontSize: '14px',
	},
	mainArticle: {
		marginTop: '11vh',
	},
	smallTitle: {
		color: '#000000',
		fontSize: '16px',
		fontWeight: 600,
		marginBottom: '10px',
	},
	smallArticle: {
		marginBottom: '10px',
		cursor: 'pointer',
	},
	smallAuthorName: {
		color: '#999999',
		fontSize: '14px',
	},
	bigLink: {
		color: '#000000',
		marginRight: '50px',
		marginTop: '25px',
	},
	smallLink: {
		textDecoration: 'none',
	},
}));

export default useStyles;
