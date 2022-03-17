import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	stepFormContanier: {
		display: 'flex',
		flexDirection: 'column',
		margin: '10px auto',
	},
	fieldWrapper: {
		marginBottom: 10,
	},
	marginBottom35: {
		marginBottom: '35px',
	},
	textFieldStyle: {
		'height': 63.2,
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
	autoCompleteStyle: {
		'height': 63.2,
		'& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
			padding: '1.3px',
		},
		'& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]':
			{
				borderRadius: '8px',
			},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},

		'& .MuiAutocomplete-popupIndicatorOpen': {
			transform: 'none',
		},
	},
	dateStyle: {
		// height:63.2,
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
	closeButton: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},

	datePicker: {
		'width': '100%',
		'height': 68,
		'& span': {
			marginLeft: 18,
		},

		'& .MuiOutlinedInput-root': {
			'borderRadius': '8px',
			'height': 38,
			// '& .Mui-error':{
			//     borderColor: "#A5AFC233"
			// },

			'& fieldset': {
				borderColor: '#A5AFC233',
			},
			'&:hover fieldset': {
				border: '1px solid #A5AFC233',
			},
			'&.Mui-focused fieldset': {
				border: '1px solid #A5AFC233',
			},
		},
		'& .MuiInputBase-root': {
			'&.Mui-focused fieldset': {},
			'& .MuiButtonBase-root': {
				'paddingRight': 0,
				'&:hover': {
					'backgroundColor': 'transparent',
					'&:focused': {
						backgroundColor: 'transparent',
					},
				},
				//   boxShadow: 'none'
			},
			'& .MuiInputBase-input': {
				'padding': '11px',
				'paddingRight': '0px',
				'&::placeholder': {
					color: '#868DA2',
					opacity: 1,
				},
			},
		},
		'& .MuiIconButton-root': {
			padding: 0,
		},
		'& .MuiOutlinedInput-adornedEnd': {
			paddingRight: '8px',
		},
		'& .MuiFormHelperText-root': {
			'marginLeft': 2,
			'marginTop': 0,
			'&.Mui-error': {
				color: '#FF0221',
				fontSize: 11,
				fontWeight: 500,
				// lineHeight: 1.5
			},
		},
	},
	dropZone: {
		border: '1px solid #EDEFF3',
	},
}));

export default useStyles;
