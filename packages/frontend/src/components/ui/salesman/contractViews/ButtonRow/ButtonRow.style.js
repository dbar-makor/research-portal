import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	buttonRow: {
		display: 'flex',
		width: '100%',
	},
	btnWrapper: {
		display: 'flex',
	},
	cancelStyle: {
		padding: '7px 39px',
	},
	end: {
		textAlignLast: 'end',
	},
	submitStyle: {
		'backgroundColor': '#1C67FF',
		'color': 'white',
		'textTransform': 'capitalize',
		'fontSize': '16px',
		'fontFamily': 'inter',
		'fontWeight': 400,
		'height': '40px',
		'width': '190px',
		'borderRadius': '20px',
		'textAlignLast': 'start',
		'top': 0,
		'&:hover': {
			backgroundColor: '#1C67FF',
		},
	},
}));

export default useStyles;
