import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	pageTitle: {
		color: '#000000',
		fontSize: '32px',
		fontWeight: 600,
		marginBottom: '8vh',
		marginTop: '25px',
		textAlign: 'center',
	},
	formWrapper: {},
	formTitle: {
		fontSize: 16,
		color: '#868DA2',
		marginBottom: 16,
		marginTop: 16,
	},
	formContainer: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	total: {
		color: '#000000',
		fontSize: '1.5rem',
		marginLeft: '30px',
	},
	marginBottom35: {
		marginBottom: '35px',
	},
	submit: {
		marginBottom: '20px',
		padding: '12px',
		fontSize: '20px',
	},
	modalContainer: {
		backgroundColor: '#fff',
		width: '812px',
		position: 'absolute',
		top: '123px',
		left: '554px',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '57px 67px 5px 49px',
		borderRadius: '8px',
		boxShadow: '0px 8px 24px #0018581F',
	},
	modalTitle: {
		color: '#868DA2',
		fontSize: '24px',
		fontWeight: 400,
		marginBottom: '4vh',
		marginTop: '15px',
		fontFamily: 'Inter',
	},
	textFieldStyle: {
		'popupIndicatorOpen': {
			transform: 'rotate(0deg)',
		},
		'borderColor': '#A5AFC233',
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiInputBase-input': {
			fontFamily: 'inter',
			fontSize: '.MuiInputBase-input',
			borderRadius: '8px',
			color: '#0F0F0F',
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
			color: '#868DA2',
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
		'& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
			padding: 2,
		},
		'& .makeStyles-textFieldStyle-453 .MuiInputBase-input': {
			color: 'red',
		},
		'& .MuiOutlinedInput-adornedStart': {
			padding: 0,
		},
	},
	amountStyle: {
		'backgroundColor': '#EDEFF3',
		'borderRadius': '8px',
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
	},
	autoCompleteStyle: {
		'& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
			padding: '1.3px',
		},
		'& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]':
			{
				borderRadius: '8px',
				color: '#0F0F0F',
			},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
		'& .MuiAutocomplete-inputFocused': {
			fontFamily: 'inter',
			fontSize: '.MuiInputBase-input',
			borderRadius: '8px',
		},
	},
	dateStyle: {
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiOutlinedInput-adornedEnd': {
			borderRadius: '8px',
			padding: 0,
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
	},
	divider: {
		marginTop: '20px',
		marginBottom: '30px',
	},
	periodStyle: {
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
		},
		'& .MuiAutocomplete-inputFocused': {
			fontFamily: 'inter',
			fontSize: '.MuiInputBase-input',
			borderRadius: '8px',
		},
	},
	paddingBottom24px: {
		paddingBottom: '24px',
	},
	informationTitle: {
		color: '#0F0F0F',
		fontSize: '20px',
		fontFamily: 'Inter',
		fontWeight: 400,
		textTransform: 'capitalize',
		paddingTop: '40px',
	},
	paddingBottom20px: {
		paddingBottom: '20px',
	},
	paddingRight10px: {
		paddingRight: '10px',
	},
	PaddingLeft10px: {
		paddingLeft: '10px',
	},
	paddingBottom30px: {
		paddingBottom: '30px',
	},
	paddingRight26px: {
		paddingRight: '26px',
	},
	perStyle: {
		fontFamily: 'inter',
		fontSize: '16px',
		fontWeight: 500,
		padding: '10px 0 0 0',
	},
	padding300px: {
		padding: '30px 0',
	},
	yearlyAmount: {
		fontSize: '16px',
		fontFamily: 'inter',
		fontWeight: 400,
		color: '#868DA2',
		paddingTop: '15px',
	},
	boxStyle: {
		backgroundColor: '#EDEFF3',
		borderRadius: '8px',
		padding: 8.6,
	},
	padding3000px: {
		padding: '25px 0 0 0',
	},
	membersContainer: {
		paddingBottom: '20px',
		flexWrap: 'nowrap',
	},
	memberField: {
		paddingLeft: '30px',
	},
	membersStyle: {
		fontSize: '16px',
		fontFamily: 'inter',
		fontWeight: 400,
		color: '#868DA2',
		paddingTop: '10px',
	},
	note: {
		fontSize: '13px',
		fontWeigh: '400',
		lineHeight: '1.4',
		paddingLeft: '30px',
		marginLeft: '14px',
		marginTop: '3px',
	},
	paddingbuttons: {
		padding: '168px 0 30px 0',
	},
	textAlignLast: {
		textAlignLast: 'start',
	},
	cancelStyle: {
		backgroundColor: '#FFFFFF',
		color: '#1C67FF',
		textTransform: 'capitalize',
		fontSize: '16px',
		fontFamily: 'inter',
		fontWeight: 400,
		height: '40px',
		width: '120px',
		borderRadius: '20px',
		border: 'solid 1px #1C67FF',
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
	amountType: {
		color: '#1C67FF',
		fontSize: '20px',
		fontFamily: 'inter',
		textAlignLast: 'center',
	},
	end: {
		textAlignLast: 'end',
	},
}));

export default useStyles;
