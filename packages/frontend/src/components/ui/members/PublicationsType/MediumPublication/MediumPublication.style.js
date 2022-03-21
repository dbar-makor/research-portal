import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	upperHalf: {
		isplay: 'flex',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		justifyContent: 'flex-end',
		height: 320,
		borderRadius: '8px',
		position: 'relative',
	},
	lowerHalf: {
		backgroundColor: '#fff',
		flexDirection: 'column',
		height: 170,
		padding: '12px 10px 12px 5px ',
		justifyContent: 'space-between',
	},
	date: {
		fontSize: '16px',
		color: '#868DA2',
	},
	author: {
		fontSize: '14px',
		color: '#868DA2',
	},
	title: {
		fontWeight: 'bold',
		fontSize: '20px',
		color: '#0f0f0f',
	},
});

export default useStyles;
