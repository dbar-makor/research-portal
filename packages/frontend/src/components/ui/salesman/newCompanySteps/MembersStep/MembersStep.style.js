import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	fieldWrapper: {
		'marginBottom': 16,
		'marginLeft': 10,
		'& path': {
			fill: 'fff',
		},
	},
	addIconWrapper: {
		marginLeft: 14,
	},
	addIcon: {
		fill: '#FFFFFF',
		fontSize: '18px',
		height: 28,
		width: 28,
	},
	checkIconWrapper: {
		marginLeft: 14,
	},
	checkIcon: {
		// fontSize: '25px',
		'height': 36,
		'width': 36,
		'& path': {
			fill: '#fff',
		},
	},
	paddingBottom20px: { paddingBottom: '20px' },
	textFieldStyle: {
		'borderColor': '#A5AFC233',
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiInputBase-input': {
			fontFamily: 'inter',
			fontSize: '.MuiInputBase-input',
			borderRadius: '8px',
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
	},

	chip: {
		margin: '6px',
	},
});
export default useStyles;
