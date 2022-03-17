import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	page: {
		position: 'relative',
		height: 650,
	},
	pageTitle: {
		color: '#000000',
		fontSize: '32px',
		fontWeight: 600,
		marginBottom: '8vh',
		marginTop: '25px',
		textAlign: 'center',
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
	textFieldStyle: {
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
	vatGroupWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 25,
	},
	vatGroup: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	indiLabel: {
		fontSize: '16px',
		fontFamily: 'inter',
		fontWeight: 400,
		color: '#868DA2',
		paddingTop: '15px',
	},
	vatLabel1: {
		paddingTop: 0,
		marginRight: 20,
	},
	vatLabel2: {
		marginLeft: 20,
	},
	switch: {
		'width': 22,
		'height': 10,
		'& .MuiSwitch-thumb': {
			width: 12,
			height: 12,
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
		paddingTop: '20px',
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
	divider: {
		backgroundColor: '#EDEFF3',
		borderRadius: '8px',
	},
	padding300px: {
		padding: '30px 0',
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
		paddingBottom: '40px',
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

	amountType: {
		color: '#1C67FF',
		fontSize: '20px',
		fontFamily: 'inter',
		textAlignLast: 'center',
	},

	btnContainer: {},
	comment: {
		color: '#868DA2',
		fontSize: 16,
		marginTop: 25,
	},
}));

export default useStyles;
