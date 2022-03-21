import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	modalContainer: {
		backgroundColor: '#fff',
		width: '30vw',
		position: 'absolute',
		top: '15vh',
		left: '35vw',
		height: '535px',
		flexDirection: 'column',
		alignItems: 'center',
		// paddingLeft: "60px",
		padding: '57px 67px 5px 49px',
		borderRadius: '8px',
		boxShadow: '0px 8px 24px #0018581F',
	},
	textFieldStyle: {
		'borderColor': '#A5AFC233',
		'width': '100%',
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiInputBase-input': {
			'fontFamily': 'inter',
			'fontSize': '14px',
			'borderRadius': '8px',
			'&::placeholder': {
				color: '#868DA2',
				opacity: 1,
			},
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
		'& .makeStyles-textFieldStyle-3 .MuiInputBase-input': {
			paddingRight: '24px',
		},
		'& .MuiOutlinedInput-adornedEnd': {
			padding: 0,
		},
	},
	logIn: {
		'textTransform': 'capitalize',
		'fontSize': '15px',
		'height': '40px',
		'width': '130px',
		'position': 'sticky',
		'top': 0,
		'textAlignLast': 'center',
		'& .MuiButton-root': {
			padding: 0,
		},
		'& .MuiButton-text': {
			padding: 0,
		},
	},
	passwordText: {
		'& .MuiIconButton-root': {
			padding: 0,
		},
	},
	paddingOfGrid: {
		padding: '48px 125px 32px 125px',
	},
	paddingTitle: {
		padding: '16px 0 8px 0',
	},
	portalTitle: {
		color: '#0F0F0F',
		fontSize: '24px',
		fontWeight: 400,
		fontFamily: 'Inter',
	},
	logTitle: {
		paddingBottom: '77px',
		color: '#868DA2',
		fontSize: '14px',
		fontFamily: 'inter',
	},
	paddingBottom16px: {
		paddingBottom: '16px',
	},
	paddingBottom8px: {
		paddingBottom: '8px',
	},
	forgotStyle: {
		textAlign: 'end',
		paddingBottom: '135px',
		color: '#0F0F0F',
	},
	linkStyle: {
		color: '#0F0F0F',
		fontFamily: 'inter',
		fontSize: '14px',
	},
	center: {
		textAlignLast: 'center',
	},
	loginBtn: {},
}));

export default useStyles;
