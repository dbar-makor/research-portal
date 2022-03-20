import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	headerContainer: {
		position: 'sticky',
		top: 0,
		backgroundColor: ' rgba(0, 0, 0, 1)',
		zIndex: 1200,
	},
	header: {
		backgroundColor: '#000000',
		width: 'inherit',
		flexDirection: 'row',
	},
	divider: {
		backgroundColor: '#353535',
		height: 2,
		width: '100%',
	},
	title: {
		flexGrow: 1,
		color: '##fff',
		fontSize: 16,
	},
	link: {
		textDecoration: 'none',
		color: '#fff',
		// '&:hover': {
		// 	cursor: 'pointer',
		// },
	},
	subTitle: {
		color: '#000000',
		fontSize: '20px',
	},
	styledLinks: {
		fontSize: 16,
		textDecoration: 'none',
		color: '#ffff',
	},
	label: {
		top: -10,
		color: '#686d7d',
	},
	gridSpacing: {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(10),
	},
	formControl: {
		display: 'block',
	},
	select: {
		'marginBottom': '15px',
		'& svg': {
			stroke: '#727789',
			fill: 'transparent',
			paddingTop: '3px',
		},
		'& select': {
			'color': '#fff',
			'border': 'none',
			'outline': 'none',
			'paddingTop': 12,
			'&::placeholder': {
				color: '#fff',
			},
		},
		'& option': {
			paddingBottom: 10,
			color: '#000',
		},
		'& .MuiSelect-nativeInput': {
			opacity: 1,
			color: '#ffff',
			fontSize: '16px',
			backgroundColor: '#000',
			border: 'none',
		},
		'& .MuiInput-underline:after': {
			border: 'none',
		},
	},
	search: {
		'width': '250px',
		'& .MuiFilledInput-root': {
			backgroundColor: '#3e3e3e',
			borderRadius: '5px',
		},
		'& .MuiFilledInput-input': {
			paddingTop: '5px',
			paddingBottom: '5px',
		},
		'& .MuiFilledInput-underline:after': {
			border: 'none',
		},
		'& svg': {
			stroke: '#FFF',
		},
		'& .MuiInputBase-input': {
			'&::placeholder': {
				color: '#fff',
			},
		},
	},
	searchIcon: {
		'& path': {
			fill: '#1C67FF',
		},
	},
}));

export default useStyles;
