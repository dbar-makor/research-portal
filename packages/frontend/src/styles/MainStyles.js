import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, TextField, withStyles, Button, IconButton, Switch } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	mainContainer: {
		marginTop: '4.3vh',
	},
	blueShape: {
		backgroundColor: '#1C67FF',
		borderRadius: '8px',
		height: '12px',
		marginBottom: '10px',
	},
	blueShapeModal: {
		backgroundColor: '#1C67FF',
		borderRadius: '8px',
		height: '12px',
		marginBottom: '10px',
		width: '50px',
	},
	title: {
		color: '#868DA2',
		fontSize: '24px',
	},
	progressBarContainer: {
		marginTop: '25vh',
	},
	progressBar: {
		color: '#1C67FF',
	},
	marginBottom32: {
		marginBottom: '32px',
	},
	marginBottom20: {
		marginBottom: '20px',
	},
	searchIcon: {
		'& path': {
			fill: '#1C67FF',
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
	addIcon: {
		fill: '#FFFFFF',
		fontSize: '18px',
	},
	scrollableTableContainer: {
		'maxHeight': '605px',
		'overflowY': 'auto',
		'&::-webkit-scrollbar': {
			width: '3px',
			height: '3px',
		},
		'&::-webkit-scrollbar-track': {
			boxShadow: 'inset 0 0 5px #FFFFFF',
			borderRadius: '10px',
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#868DA2',
			borderRadius: '10px',
		},
	},
	noMatches: {
		fontSize: '18px',
		color: '#868DA2',
	},
	modalHeader: {
		fontSize: '24px',
		textAlign: 'center',
		fontWeight: 200,
		color: '#868DA2',
		marginBottom: '6px',
		textTransform: 'capitalize',
	},
	//footer
	cityName: {
		fontSize: '14px',
		color: '#868DA2',
		paddingRight: 8,
	},
	memberFooter: {
		position: 'relative',
		//width: "100%"
		[theme.breakpoints.only('xs')]: {
			height: '550px',
		},
	},
	memberFooterContainer: {
		height: 'inherit',
		marginLeft: '12vw',
		width: '80vw',
		[theme.breakpoints.only('xs')]: {
			height: 'inherit',
			margin: '20px auto',
		},
	},

	//---
	dateRangeInput: {
		'&.MuiInput-underline.Mui-disabled:before': {
			borderBottom: '1px solid #EBF0F1',
		},
		'fontSize': 14,
		'& .MuiInputBase-input.Mui-disabled': {
			minWidth: 190,
			cursor: 'pointer',
		},
		'& .MuiInputBase-input': {
			color: theme.palette.text.main,
		},
		'&.MuiInput-underline.Mui-disabled.Mui-error:after': {
			borderBottomWidth: '1px',
		},
	},
	dateRangeInputFilter: {
		'&.MuiInput-underline.Mui-disabled:before': {
			borderBottom: '1px solid transparent',
		},
		'fontSize': 17,
		'backgroundColor': '#ffff',
		'border': '1px solid #edeff3',
		'borderRadius': '8px',
		'padding': '3px 0px 3px 8px',
		'& .MuiInputBase-input.Mui-disabled': {
			minWidth: 180,
			cursor: 'pointer',
		},
		'& .MuiInputBase-input': {
			color: theme.palette.text.main,
		},
		'&.MuiInput-underline.Mui-disabled.Mui-error:after': {
			borderBottomWidth: '1px',
		},
		'& .MuiSvgIcon-root': {
			fontSize: 17,
			paddingLeft: 5,
			cursor: 'pointer',
			visibility: 'hidden',
		},
		'&:hover': {
			'& .MuiSvgIcon-root': {
				visibility: (props) => (props.clearable ? 'visible' : ' hidden'),
			},
		},
	},
	calendar: {
		'marginLeft': '-8px',
		'& path': { stroke: '#1B63F5' },
	},
	dateRangePopover: {
		'& > .rdrDefinedRangesWrapper': {
			// dispaly: 'none !important',
			width: '0px',
		},
	},
	//header
	dot: {
		paddingTop: 2,
		fontSize: 20,
	},
	city: {
		color: '#868DA2',
	},
	time: {
		color: '#ffff',
	},
	cityDetails: {
		paddingRight: 10,
		fontSize: 13,
	},
	cityWrapper: {
		margin: '10px auto',
		width: 'fit-content',
	},
}));

export const StyledTextField = withStyles({
	root: {
		'width': '100%',
		'& .MuiOutlinedInput-root': {
			'borderRadius': '8px',
			'& fieldset': {
				borderColor: '#EDEFF3',
			},
			'&:hover fieldset': {
				border: '1px solid #EDEFF3',
			},
			'&.Mui-focused fieldset': {
				border: '1px solid #EDEFF3',
			},
			'& .MuiSelect-select:focus': {
				backgroundColor: 'transparent',
				borderRadius: '8px',
			},
		},
		'& .MuiOutlinedInput-input': {
			'padding': '11px',
			'&::placeholder': {
				color: '#868DA2',
				opacity: 1,
			},
		},

		'& .MuiInputLabel-outlined': {
			transform: 'translate(12px, 12px) scale(1)',
		},
	},
})(TextField);

export const TableTextField = withStyles({
	root: {
		'width': '100%',
		'& .MuiInput-underline:before': {
			borderBottom: '0.5px solid #868DA2', // Semi-transparent underline
		},
		'& .MuiInput-underline:hover:before': {
			borderBottom: '0.5px solid #868DA2', // Solid underline on hover
		},
		'& .MuiInput-underline:after': {
			borderBottom: '1px solid #1C67FF', // Solid underline on focus
		},
		'& .MuiInput-root': {
			'borderRadius': '8px',
			'& fieldset': {
				borderColor: 'transparent',
			},
			'&:hover fieldset': {
				border: '1px solid #EDEFF3',
			},
			'&.Mui-focused fieldset': {
				border: '1px solid #EDEFF3',
			},
			'& .MuiSelect-select:focus': {
				backgroundColor: 'transparent',
				borderRadius: '8px',
			},
		},
		'& .MuiOutlinedInput-input': {
			'padding': '11px',
			'&::placeholder': {
				color: '#868DA2',
				opacity: 1,
			},
		},
		'& .MuiInputBase-root': {
			'&.Mui-disabled': {
				'color': '#0F0F0F',
				'cursor': 'pointer',
				'& .MuiInput-underline:before': {
					borderBottom: 'red', // Semi-transparent underline
				},
			},
		},
		// '&.MuiInputBase-root.Mui-disabled': {
		//   '&.MuiInput-underline:before': {
		//     borderBottom: `transparent` // Semi-transparent underline
		//   },
		// },

		'& .MuiInputLabel-outlined': {
			transform: 'translate(12px, 12px) scale(1)',
		},
	},
})(TextField);

export const StyledAutoComplete = withStyles(() => ({
	popupIndicatorOpen: {
		transform: 'rotate(0deg)',
	},
	root: {
		// '& .MuiFormControl-root ': {
		//   '&:hover': {
		//     backgroundColor: '#212121'
		//   }
		// }
	},
	inputRoot: {
		'&.MuiOutlinedInput-root ': {
			'borderRadius': '8px',
			'border': '1px solid #A5AFC233',
			'&::placeholder': {
				color: '#868DA2',
				opacity: 1,
			},
		},
		// '&.MuiIconButton-root': {
		//   color: '#212529'
		// },

		// color: '#B6B6B6',
		// fontWeight: 300,
		// fontSize: 14,
		// backgroundColor: '#262626',

		// '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
		//   padding: '2px 0px 2px 0px'
		// },
		'&.MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
			padding: '1px',
		},
		'& .MuiOutlinedInput-notchedOutline': {
			// borderColor: '#212121',
			border: 'none',
		},
		'&:hover .MuiOutlinedInput-notchedOutline': {
			// borderColor: '#212121',
			border: 'none',
		},
		'&:focused .MuiOutlinedInput-notchedOutline': {
			// borderColor: '#212121',
			border: 'none',
		},
	},
	listbox: {
		'&::-webkit-scrollbar': {
			width: '3px',
			height: '3px',
		},
		'&::-webkit-scrollbar-track': {
			boxShadow: 'inset 0 0 5px #FFFFFF',
			borderRadius: '10px',
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#868DA2',
			borderRadius: '10px',
		},
	},
	paper: {
		// backgroundColor: '#262626',
		// border: '1px solid #212121',
		// margin: 0,
		// marginTop: 5,
		borderRadius: '8px',
		// padding: 0,
		// width: '100%'
		// },
		// '& .MuiAutocomplete-noOptions': {
		//   color: '#B6B6B6',
		//   fontSize: 14
		// }
	},
	popupIndicator: {
		'&.MuiAutocomplete-popupIndicator': {
			'color': '#1C67FF',
			'& .MuiSvgIcon-root': {
				// width: '0.8em'
			},
		},
	},
	// option: {
	//   '&.MuiAutocomplete-option': {
	//     color: '#B6B6B6',
	//     fontSize: 14
	//   }
	// },
	clearIndicator: {
		'&.MuiAutocomplete-clearIndicator': {
			// color: '#B6B6B6',
			// visibility: "visible",
			'&:hover': {
				// visibility: "visible"
			},
			'& .MuiSvgIcon-fontSizeSmall': {
				// width: '0.6em'
			},
		},
	},
}))(Autocomplete);

export const OutlinedButton = withStyles({
	root: {
		'padding': '7px 14px',
		'backgroundColor': '#FFFFFF',
		'background': 'linear-gradient(to left, #FFFFFF 50%, #1C67FF 50%)',
		'backgroundSize': '200% 100%',
		'backgroundPosition': 'right bottom',
		'transition': 'all .4s ease',
		'border': '1px solid #1C67FF',
		'fontSize': '16px',
		'color': '#1C67FF',
		'borderRadius': '21px',
		'textTransform': 'none',
		'&:hover': {
			backgroundPosition: 'left bottom',
			backgroundColor: '#1C67FF',
			color: '#FFFFFF',
			// transition: '.3s'
		},
		'&:disabled': {
			// backgroundColor: "#6b6b6b",
			borderColor: '#ACB1BF',
			color: '#ACB1BF',
			// borderBottom: "none"
		},
	},
})(Button);

export const FilledButton = withStyles({
	root: {
		'padding': '7px 39px',
		'backgroundColor': '#1C67FF',
		'fontWeight': 400,
		'fontSize': '16px',
		'color': '#FFFFFF',
		'borderRadius': '21px',
		'textTransform': 'none',
		'&:hover': {
			backgroundColor: '#0044CD',
			boxShadow: '0px 6px 10px #00185829',
			transition: '.3s',
		},
		'&.Mui-disabled': {
			backgroundColor: '#ACB1BF',
			color: '#868DA2',
		},
	},
})(Button);

export const AddButton = withStyles({
	root: {
		'padding': '4px',
		'backgroundColor': '#1C67FF',
		'borderRadius': '4px',
		'textTransform': 'none',
		'&:hover': {
			backgroundColor: '#0044CD',
			boxShadow: '0px 4px 8px #00185829',
			transition: '.3s',
		},
		'&:disabled': {
			backgroundColor: '#ACB1BF',
			color: '#868DA2',
		},
	},
})(IconButton);

export const CheckButton = withStyles({
	root: {
		'padding': '4px',
		'backgroundColor': '#00ca80',
		'borderRadius': '4px',
		'textTransform': 'none',
		'&:hover': {
			backgroundColor: '#17DC94',
			boxShadow: '0px 4px 8px #00185829',
			transition: '.3s',
		},
		'&:disabled': {
			backgroundColor: '#ACB1BF',
			color: '#868DA2',
		},
	},
})(IconButton);

export const DotsButton = withStyles({
	root: {
		'color': '#B8C3D8',
		'padding': '1px',
		'&:hover': {
			color: '#ddd',
			transition: '.3s',
		},
		// '&:disabled': {
		//   color: '#868DA2'
		// }
	},
})(IconButton);

export const DeleteButton = withStyles({
	root: {
		'padding': '6px',
		'backgroundColor': '#EDEFF3',
		'borderRadius': '50%',
		'textTransform': 'none',
		'&:hover': {
			backgroundColor: '#6b6b6b33',
			transition: '.3s',
		},
		'&:disabled': {
			backgroundColor: '#6b6b6b',
		},
	},
})(IconButton);

export const DisabledButton = withStyles({
	root: {
		'padding': '6px',
		'backgroundColor': '#EDEFF3',
		'borderRadius': '50%',
		'textTransform': 'none',
		'pointerEvents': 'none',
		'&:hover': {
			backgroundColor: '#EDEFF3',
			transition: '.3s',
		},
	},
})(IconButton);

export const DeleteRowButton = withStyles({
	root: {
		'padding': 0,
		'backgroundColor': 'transparent',
		'& path': {
			padding: 10,
			fill: '#FF3939',
			boxShadow: 'none',
		},
		'&:hover': {
			'backgroundColor': 'transparent',
			'& path': {
				padding: 10,
				// boxShadow: '0px 3px 6px #00000029'
				filter: 'drop-shadow(0px 3px 10px black)',
				transition: '.3s',
			},
			'transition': '.3s',
		},
		'&:disabled': {
			backgroundColor: '#6b6b6b',
		},
	},
})(IconButton);

export const BinButton = withStyles({
	root: {
		'padding': '6px 8px',
		'backgroundColor': '#EDEFF3',
		'borderRadius': '50%',
		'textTransform': 'none',
		'& path': {
			fill: '#868DA2',
		},
		'&:hover': {
			'backgroundColor': '#EDEFF3',
			'boxShadow': '0px 4px 12px #000E3429',
			'transition': '.3s',
			'& path': {
				fill: '#FF3939',
				transition: '.2s',
			},
		},
		'&:disabled': {
			backgroundColor: '#ACB1BF',
		},
	},
})(IconButton);

export const EditDoneButton = withStyles({
	root: {
		'padding': '9px 7px',
		'backgroundColor': '#00CA80',
		'borderRadius': '50%',
		'textTransform': 'none',
		// "& path": {
		//   fill: "#868DA2",
		// },
		'&:hover': {
			backgroundColor: '#17DC94',
			boxShadow: '0px 6px 10px #00654A29',
			transition: '.3s',
			// "& path": {
			//   fill: "#FF3939",
			//   transition: ".2s",
			// },
		},
		'&:disabled': {
			backgroundColor: '#ACB1BF',
		},
	},
})(IconButton);

export const EditButton = withStyles({
	root: {
		'padding': '6px 8px',
		'backgroundColor': '#EDEFF3',
		'borderRadius': '50%',
		'textTransform': 'none',
		'& path': {
			fill: '#868DA2',
		},
		'&:hover': {
			'backgroundColor': '#EDEFF3',
			'transition': '.3s',
			'boxShadow': '0px 4px 10px #000E3429',
			'& path': {
				fill: '#1C67FF',
				transition: '.2s',
			},
		},
		'&:disabled': {
			backgroundColor: '#ACB1BF',
		},
	},
})(IconButton);

export const SmallEditButton = withStyles({
	root: {
		'padding': '3px 4px',
		'backgroundColor': '#EDEFF3',
		'borderRadius': '50%',
		'textTransform': 'none',
		'& path': {
			fill: '#868DA2',
		},
		'&:hover': {
			'backgroundColor': '#EDEFF3',
			'transition': '.3s',
			'boxShadow': '0px 4px 10px #000E3429',
			'& path': {
				fill: '#1C67FF',
				transition: '.2s',
			},
		},
		'&:disabled': {
			backgroundColor: '#ACB1BF',
		},
	},
})(IconButton);

export const EditIconButton = withStyles({
	root: {
		'padding': '3px 4px',
		'backgroundColor': 'transparent',
		'borderRadius': '50%',
		'textTransform': 'none',
		'& path': {
			fill: '#868DA2',
		},
		'&:hover': {
			'backgroundColor': 'transparent',
			'transition': '.3s',
			'boxShadow': 'none',
			'& path': {
				fill: '#1C67FF',
				transition: '.2s',
			},
		},
		'&:disabled': {
			color: '#ACB1BF',
		},
	},
})(IconButton);

export const GreenFilledButton = withStyles({
	root: {
		'padding': '7px 39px',
		'backgroundColor': '#00CA80',
		'color': '#FFFFFF',
		'borderRadius': '21px',
		'textTransform': 'none',
		'fontSize': '16px',
		'&:hover': {
			backgroundColor: '#17DC94',
			boxShadow: '0px 6px 10px #00654A29',
			transition: '.3s',
		},
		'&.Mui-disabled': {
			backgroundColor: '#ACB1BF',
			color: '#868DA2',
		},
	},
})(Button);

export const LightBlueButton = withStyles({
	root: {
		'padding': '3px 9px',
		'backgroundColor': 'transparent',
		'justifyContent': (props) => props.justification,
		'color': '#0F0F0F',
		'borderRadius': '8px',
		'textTransform': 'capitalize',
		'fontWeight': 400,
		'fontSize': '16px',
		'minWidth': '192px',
		// textAlign: 'left',
		'&:hover': {
			'backgroundColor': '#1C67FF10',
			'transition': '.3s',
			'& .moreCategs': {
				backgroundColor: 'transparent',
				transition: '.3s',
			},
		},
		'&.Mui-disabled': {
			backgroundColor: '#ACB1BF',
			color: '#868DA2',
		},
	},
})(Button);

export const LinkButton = withStyles({
	root: {
		'padding': '3px 9px',
		'backgroundColor': 'transparent',
		'color': '#1C67FF',
		'textDecoration': 'underline',
		'borderRadius': '8px',
		'textTransform': 'capitalize',
		'fontWeight': 500,
		'fontSize': '16px',
		'&:hover': {
			backgroundColor: 'transparent',
			textDecoration: 'underline',
		},
		'&.Mui-disabled': {
			backgroundColor: 'transparent',
			color: '#868DA2',
		},
	},
})(Button);

export const StatusSwitch = withStyles({
	root: {
		width: 18,
		height: 6,
		padding: 0,
		// display: 'flex',
		overflow: 'inherit',
	},
	switchBase: {
		'top': -2,
		'padding': 0,
		'left': '-3px',
		'color': '#FF3939',
		'&$checked': {
			color: '#00CA80',
			left: -8,
		},
		'&$checked + $track': {
			backgroundColor: '#E2E4EA',
			opacity: 1,
		},
		// "&.Mui-disabled + .MuiSwitch-track": {
		//   backgroundColor: "#EEEEEE",
		// }
	},
	thumb: {
		width: 10,
		height: 10,
		boxShadow: '0px 1px 2px #00000029',
	},
	checked: {},
	track: {
		backgroundColor: '#E2E4EA',
		opacity: 1,
	},
})(Switch);

export const CompanyStatusSwitch = withStyles({
	root: {
		width: 24,
		height: 12,
		padding: 0,
		// display: 'flex',
		overflow: 'inherit',
	},
	// switchBase: {
	//   top: -2,
	//   padding: 0,
	//   left: '-3px',
	//   color: '#FF3939',
	//   '&$checked': {
	//     color: '#00CA80',
	//     left: -8
	//   },
	//   '&$checked + $track': {
	//     backgroundColor: '#E2E4EA',
	//     opacity: 1
	//   },
	//   // "&.Mui-disabled + .MuiSwitch-track": {
	//   //   backgroundColor: "#EEEEEE",
	//   // }
	// },
	thumb: {
		width: 16,
		height: 16,
		boxShadow: '0px 1px 2px #00000029',
	},
	// checked: {},
	// track: {
	//   backgroundColor: '#E2E4EA',
	//   opacity: 1
	// }
})(StatusSwitch);

export const RedFilledButton = withStyles({
	root: {
		'padding': '7px 39px',
		'backgroundColor': '#FF3939',
		'color': '#FFFFFF',
		'borderRadius': '21px',
		'textTransform': 'none',
		'fontSize': '16px',
		'&:hover': {
			backgroundColor: '#DC2525',
			boxShadow: '0px 6px 10px #58000029',
			transition: '.3s',
		},
		'&.Mui-disabled': {
			backgroundColor: '#ACB1BF',
			color: '#868DA2',
		},
	},
})(Button);
