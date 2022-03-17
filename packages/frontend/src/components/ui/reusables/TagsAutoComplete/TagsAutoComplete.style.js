import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	chipContainer: {
		marginTop: '10px',
	},
	chipItem: {
		marginBottom: '5px',
		marginRight: '3px',
	},
	chip: {
		backgroundColor: '#EDEFF3',
		border: 'none',
	},
	arrowIcon: {
		'& .MuiSvgIcon-root': {
			color: '#1C67FF',
		},
	},
});

export default useStyles;
