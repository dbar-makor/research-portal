import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	author: {
		fontSize: [13, '!important'],
		fontWeight: 100,
		color: '#868DA2',
	},
	wrapper: {
		width: 240,
	},
	title: {
		fontSize: [20, '!important'],
		fontWeight: 'bold',
		color: '#0F0F0F',
	},
	upperHalf: {
		display: 'flex',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		justifyContent: 'flex-end',
		height: 160,
		borderRadius: '8px',
		position: 'relative',
	},
	lowerHalf: {
		backgroundColor: '#fff',
		flexDirection: 'column',
		height: 170,
		padding: '12px 0px 12px 5px ',
		justifyContent: 'space-between',
	},
});

export default useStyles;
