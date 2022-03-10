import { Button, Collapse, SvgIcon, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	divider: {
		backgroundColor: '#EDEFF3',
		height: '1px',
		width: '100%',
		marginTop: 20,
	},
	searchIcon: {
		'& path': {
			fill: '#1C67FF',
		},
	},
	sortSelect: {
		'width': '100%',
		'borderRadius': '8px',
		'border': '1px solid #A5AFC233',
		'color': '#00000',
		'fontSize': 16,
		'textAlign': 'left',
		'backgroundColor': '#ffffff',
		'& .MuiSelect-icon': {
			color: '#007FFF',
			fontSize: 20,
			top: 'calc(50% - 10px)',
			right: 4,
		},
		'& .MuiSelect-select:focus': {
			backgroundColor: '#ffffff',
		},
		'& .MuiSelect-selectMenu': {
			borderColor: 'none',
		},
		'& .MuiSelect-select.MuiSelect-select': {
			marginLeft: '18px',
		},
	},
	sortDropdownStyle: {
		'border': 'none',
		'borderRadius': '0px',
		'color': '#00000',
		'backgroundColor': '#ffff',
		'margin': '42px 0px 0px -16px',
		'transition': 0,
		'& .MuiListItem-root.Mui-selected': {
			color: '#007FFF',
			backgroundColor: '#ffff',
		},
	},
	autherFont: {
		fontSize: 16,
		color: '#868DA2',
	},
	title: {
		fontSize: '32px',
		fontWeight: 'bold',
	},
	breadCrumbs: {
		fontSize: 14,
		color: '#868DA2',
		cursor: 'pointer',
	},
	contentTypo: {
		fontSize: 20,
		color: '#000000',
	},
	contentGrid: {
		marginTop: 10,
		paddingBlock: 6,
		backgroundColor: '#02007914',
		borderRadius: '8px',
	},
	fileEmptyIcon: {
		'& path': { fill: '#1B63F5' },
	},
	contentName: {
		'fontSize': 16,
		'marginLeft': 8,
		'color': '#001858',
		'&:hover': {
			textDecoration: 'underline',
			color: '#0000FF',
		},
	},
	calendarIcon: {
		'lineHeight': '0px',
		'& path': { stroke: '#1B63F5' },
	},
	commentSec: {
		fontWeight: 'bold',
		fontSize: 18,
	},

	commentWriter: {
		fontSize: 12,
		color: '#868DA2',
	},
	replay: {
		'textDecoration': 'underline',
		'color': '#1C67FF',
		'fontSize': 12,
		'&:hover': {
			cursor: 'pointer',
		},
	},
	repliesNo: {
		'textDecoration': 'underline',
		'fontSize': 12,
		'fontWeight': 'bold',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	some: {
		minHeight: '261px',
		miמWidth: '100%',
	},
	textField: {
		'width': '100%',
		'& .MuiOutlinedInput-root': {
			'backgroundColor': '#FFFFFF',
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
			'paddingInline': '11px',
			'height': '10px',
			'&::placeholder': {
				color: '#868DA2',
				opacity: 1,
			},
		},
		'& .MuiInputLabel-outlined': {
			transform: 'translate(12px, 12px) scale(1)',
		},
	},
	selectFormControl: {
		'& .MuiInputLabel-root': {
			transform: 'translate(0, 9px) scale(1)',
		},
		'& label + .MuiInput-formControl': {
			marginTop: '0px',
		},
	},
}));

export const StyledButton = withStyles((theme) => ({
	root: {
		'width': '138px',
		'height': '30px',
		'textTransform': 'none',
		'fontWeight': 400,
		'backgroundColor': '#1C67FF',
		'borderRadius': 21,
		'color': '#F2F2F2',
		'&:hover': {
			backgroundColor: '#1c67ffb3',
		},
	},
}))(Button);

export const StyledCancelButton = withStyles((theme) => ({
	root: {
		'width': '138px',
		'height': '30px',
		'textTransform': 'none',
		'fontWeight': 400,
		'backgroundColor': '#ffffff',
		'borderRadius': 21,
		'border': '1px solid #000',
		'color': '#000',
		'&:hover': {
			backgroundColor: '#BABABA',
			color: '#000',
		},
	},
}))(Button);

export const StyledCollape = withStyles((theme) => ({
	root: {
		'width': 'auto',
		'&  .MuiCollapse-wrapperInner ': {
			display: 'flex',
			justifyContent: 'flex-end',
		},
	},
}))(Collapse);

export const StyledTextField = withStyles({
	root: {
		'width': '100%',
		'& .MuiOutlinedInput-root': {
			'backgroundColor': '#FFFFFF',
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
			'paddingInline': '11px',
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
