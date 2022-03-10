import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	infoContainer: {
		border: '1px solid #A5AFC233',
		borderRadius: '8px',
		backgroundColor: '#F9FAFB',
		padding: '18px 22px',
		marginTop: '56px',
	},
	membersContainer: {
		border: '1px solid #A5AFC233',
		borderRadius: '8px',
		backgroundColor: '#F9FAFB',
		padding: '18px 0px 0px 0px',
		marginTop: '16px',
	},
	companyName: {
		color: '#0F0F0F',
		fontSize: '20px',
		fontWeight: '600',
		textTransform: 'capitalize',
	},
	statusActive: {
		color: '#00CA80',
	},
	statusInactive: {
		color: '#FF3939',
	},
	activeMember: {
		fill: '#00CA80',
		fontSize: '14px',
	},
	inactiveMember: {
		fill: '#FF3939',
		fontSize: '14px',
	},
	blockHeader: {
		color: '#B8C3D8',
		fontSize: '14px',
		marginBottom: '6px',
		textTransform: 'capitalize',
		// marginTop: '30px'
	},
	fieldName: {
		color: '#868DA2',
		fontSize: '16px',
		textTransform: 'capitalize',
	},
	fieldContent: {
		color: '#0F0F0F',
		fontSize: '16px',
	},
	locationName: {
		color: '#0F0F0F',
		fontSize: '16px',
		marginLeft: '10px',
	},
	marginBottom8: {
		marginBottom: '8px',
	},
	membersHeader: {
		paddingLeft: '22px',
		paddingRight: '22px',
	},
	membersTabActive: {
		fontSize: '14px',
		fontWeight: 600,
		color: '#0F0F0F',
		cursor: 'pointer',
	},
	membersTab: {
		fontSize: '14px',
		color: '#0F0F0F',
		cursor: 'pointer',
	},
	membersDivider: {
		backgroundColor: '#B8C3D8',
		width: '1px',
		height: '22px',
		marginRight: '16px',
	},
	searchField: {
		'& .MuiOutlinedInput-input': {
			'padding': '8px',
			'&::placeholder': {
				color: '#868DA2',
				fontSize: '14px',
				opacity: 1,
			},
		},
	},
	searchIcon: {
		'& path': {
			fill: '#001858',
		},
	},
	signBtn: {
		padding: '7px 13px',
	},
	upgradeBtn: {
		padding: '7px 13px',
	},
	logsButton: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	currentContractBlock: {
		border: '1px solid #B8C3D8',
		borderRadius: '8px',
		padding: '16px',
	},
	yearlyCost: {
		color: '#868DA2',
		fontWeight: 600,
	},
	yearlyCostContent: {
		color: '#0F0F0F',
		fontWeight: 600,
	},
	currentContractHeader: {
		color: '#00CA80',
		fontSize: '14px',
		fontWeight: 500,
		marginLeft: '10px',
		// paddingRight: '3px'
	},
	noCurrentContractHeader: {
		color: '#FF3939',
		fontSize: '14px',
		fontWeight: 500,
		marginLeft: '13px',
	},
	infoDivider: {
		width: '100%',
		height: '1px',
		backgroundColor: '#E8EBF0',
		marginTop: '22px',
	},
	moreCategories: {
		backgroundColor: '#E2E4EA',
		borderRadius: '50%',
		padding: '2px 5px',
		color: '#001858',
		fontSize: '14px',
	},
	closeIcon: {
		cursor: 'pointer',
	},
	categoriesModal: {
		backgroundColor: '#FFFFFF',
		width: '812px',
		position: 'absolute',
		top: '100px',
		// left: "554px",
		height: '85vh',
		// overflowY: "scroll",
		// flexDirection: "column",
		alignItems: 'center',
		// paddingLeft: "60px",
		padding: '18px 0 32px 40px',
		borderRadius: '8px',
		boxShadow: '0px 8px 24px #0018581F',
	},
	contractModalPaper: {
		minWidth: 'calc(100vw - 1300px)',
		minHeight: 'calc(100vh - 500px)',
		borderRadius: '8px',
	},
	alertModalPaper: {
		borderRadius: '8px',
		width: '24vw',
		minHeight: '23vh',
		padding: '16px',
	},

	addMemberModalPaper: {
		borderRadius: '8px',
		width: '30vw',
		minHeight: '23vh',
		padding: '16px',
	},
	modalBackDrop: {
		backdropFilter: 'blur(2px)',
		backgroundColor: '#00001e25',
	},
	categoriesModalBox: {
		padding: '20px',
	},
	blueShape: {
		backgroundColor: '#1C67FF',
		borderRadius: '8px',
		height: '12px',
		marginBottom: '10px',
	},
	editCats: {
		fontSize: '24px',
		color: '#868DA2',
		fontWeight: 400,
		marginBottom: '5px',
	},
	memberName: {
		color: '#1C67FF',
		fontWeight: 600,
		fontSize: '16px',
		marginBottom: '30px',
	},
	saveBtn: {
		marginTop: '150px',
	},
	chipContainer: {
		// marginTop: '15px',
		// height: '200px'
	},
	chipItem: {
		marginTop: '4px',
		marginRight: '4px',
	},
	scrollableMembersTable: {
		'maxHeight': '173px',
		'overflow': 'auto',
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
	deleteTitle: {
		textTransform: 'capitalize',
		color: '#FF3939',
		fontWeight: 600,
		fontSize: '24px',
		textAlign: 'center',
		marginBottom: '22px',
	},
	deleteText: {
		color: '#0F0F0F',
		fontSize: '16px',
		textAlign: 'center',
		marginBottom: '60px',
	},
	noMembers: {
		padding: '16px',
		color: '#868DA2',
	},
	addMemberBtn: {
		padding: '0px 13px',
	},
	addIcon: {
		fill: '#FFFFFF',
		fontSize: '20px',
	},
	addMember: {
		color: '#868DA2',
		fontSize: '24px',
		textAlign: 'center',
		marginBottom: '5px',
	},
	addTo: {
		color: '#B8C3D8',
		fontSize: '16px',
		fontWeight: 600,
		textAlign: 'center',
		marginBottom: '35px',
	},
	fieldWrapper: {
		height: 63.2,
		marginBottom: '16px',
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
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
		'& .MuiFormHelperText-root.Mui-error': {
			marginLeft: '3px',
			marginTop: '0px',
		},
	},
	addBtn: {
		marginTop: '40px',
	},
	editDoneBtn: {
		'padding': '0px',
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	salesAutocomplete: {
		'& .MuiAutocomplete-popupIndicatorOpen': {
			transform: 'rotate(0deg)',
		},
		'&.MuiAutocomplete-hasPopupIcon': {
			'&.MuiAutocomplete-hasClearIcon': {
				'&.MuiAutocomplete-inputRoot': {
					paddingRight: '5px',
				},
			},
		},
	},
	datePickerClass: {
		'& .MuiButtonBase-root': {
			padding: '8px',
		},
	},
	userInfoBlock: {
		marginTop: '10px',
	},
	disabledInput: {
		'color': '#0F0F0F',
		'cursor': 'pointer',
		'&.MuiInput-underline:before': {
			borderBottom: 'transparent',
		},
		'&.MuiInput-underline:hover:before': {
			borderBottom: 'transparent',
		},
	},
	memberRow: {
		'cursor': 'pointer',
		'&:hover': {
			backgroundColor: '#EDEFF3',
			transition: '.3s',
		},
	},
	memberRowSelected: {
		backgroundColor: '#EDEFF3',
	},
}));
