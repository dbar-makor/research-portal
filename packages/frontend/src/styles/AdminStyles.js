import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
	adminContainer: {
		marginTop: '4.3vh',
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
}));
