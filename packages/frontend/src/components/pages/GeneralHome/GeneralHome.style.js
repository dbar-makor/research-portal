import { makeStyles } from '@material-ui/core/styles';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { styled } from '@mui/material/styles';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import buttonUnstyledClasses from '@mui/base/ButtonUnstyled';

const useStyles = makeStyles({
	header: {
		fontWeight: 700,
	},
	mainWrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F8F8F8',
	},
	horizontalScrollWrapper: {
		'display': 'flex',
		'minHeight': '7.9vh',
		'overflow': 'hidden',
		'&:hover': {
			'overflowX': 'scroll',
			'&::-webkit-scrollbar-track': {
				borderRadius: '10px',
				backgroundColor: '#F3F4F8',
			},
			'&::-webkit-scrollbar': {
				borderRadius: '10px',
				height: '7px',
				zIndex: 2,
				backgroundColor: '#F5F5F5',
			},
			'&::-webkit-scrollbar-thumb': {
				borderRadius: '10px',
				backgroundColor: '#D5DBE7',
			},
		},
	},
	mostClickedIdeasWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#EDF2FB',
		padding: '0 10px 0 10px',
		margin: '10px',
		borderRadius: '8px',
		minWidth: '25.2vh',
		maxHeight: '6vh',
		animation: 'mostClickedIdeas 10s -10s linear infinite',
		willChange: 'transform',
	},
	mostClickedIdeasTitle: {
		color: '#8197ae',
		fontSize: '.9rem',
	},
	mostClickedIdeasContent: {
		color: '#151515',
		fontSize: '1rem',
	},
	carousel: {
		borderRadius: '8px',
		backgroundColor: '#fff',
		border: '2px solid #EDEEF1',
		padding: '8px',
	},
	carouselContect: {
		maxHeight: '6vh',
		textAlign: 'center',
		fontSize: '1.1rem',
		padding: '0 3% 0 3%',
	},
	focusIdeas: {
		padding: '10px',
		borderRadius: '8px',
		backgroundColor: '#fff',
		border: '2px solid #EDEEF1',
	},
	focusIdeasWrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '12px',
		animation: 'latestNews 20s -20s linear infinite',
		marginTop: '10px',
		borderRadius: '8px',
		backgroundColor: '#F3F4F8',
	},
	focusIdeasScroll: {
		'display': 'flex',
		'flexDirection': 'column',
		'minHeight': '36vh',
		'maxHeight': '36vh',
		'overflow': 'hidden',
		'&:hover': {
			'overflowY': 'scroll',
			'&::-webkit-scrollbar-track': {
				borderRadius: '10px',
				backgroundColor: '#F3F4F8',
			},
			'&::-webkit-scrollbar': {
				borderRadius: '10px',
				maxWidth: '7px',
				zIndex: 2,
				backgroundColor: '#F5F5F5',
			},
			'&::-webkit-scrollbar-thumb': {
				borderRadius: '10px',
				backgroundColor: '#D5DBE7',
			},
		},
	},
	focusIdeasDate: {
		fontSize: '.9rem',
		color: '#8197ae',
	},
	focusIdeasContent: {
		color: '#8197ae',
		fontSize: '1.04rem',
		marginTop: '10px',
	},
	lastPublications: {
		borderRadius: '8px',
		backgroundColor: '#fff',
		border: '2px solid #EDEEF1',
		padding: '10px',
		marginBottom: '25px',
	},
	lastPublicationsWrapper: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#EDF2FB',
		padding: '12px',
		borderRadius: '8px',
		marginTop: '10px',
	},
	lastPublicationsTitle: {
		color: '#8197ae',
		fontSize: '.9rem',
	},
	lastPublicationsContent: {
		color: '#151515',
		fontWeight: 'bold',
		fontSize: '1.1rem',
		marginTop: '10px',
	},
	industryRecoursed: {
		marginBottom: '25px',
	},
	industryRecoursedWrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '12px',
		marginTop: '10px',
		borderRadius: '8px',
		border: '2px solid #EDEEF1',
		backgroundColor: '#fff',
	},
	industryRecoursedDate: {
		fontSize: '.9rem',
		color: '#8197ae',
	},
	industryRecoursedContent: {
		color: '#151515',
		fontSize: '1.04rem',
		marginTop: '10px',
	},
	latestNews: {
		padding: '10px',
		marginBottom: '25px',
		borderRadius: '8px',
		backgroundColor: '#fff',
		border: '2px solid #EDEEF1',
	},
	latestNewsScroll: {
		'display': 'flex',
		'flexDirection': 'column',
		'minHeight': '20.1vh',
		'maxHeight': '20.1vh',
		'overflow': 'hidden',
		'&:hover': {
			'overflowY': 'scroll',
			'&::-webkit-scrollbar-track': {
				borderRadius: '10px',
				backgroundColor: '#F3F4F8',
			},
			'&::-webkit-scrollbar': {
				borderRadius: '10px',
				maxWidth: '7px',
				zIndex: 2,
				backgroundColor: '#F5F5F5',
			},
			'&::-webkit-scrollbar-thumb': {
				borderRadius: '10px',
				backgroundColor: '#D5DBE7',
			},
		},
	},
	latestNewsWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'paddingBottom': '4px',
		'margin': '5px',
		'minWidth': '25.2vh',
		'animation': 'latestNews 25s -25s linear infinite',
		'willChange': 'transform',
		'&:not(:last-child)': {
			borderBottom: '1px solid #EDEDF0',
		},
	},
	latestNewsHeader: {
		fontSize: '.9rem',
		color: '#8197ae',
	},
	latestNewsContent: {
		color: '#151515',
		fontSize: '1.04rem',
		marginTop: '10px',
	},
	morningNotes: {
		borderRadius: '8px',
		backgroundColor: '#fff',
		border: '2px solid #EDEEF1',
		padding: '10px',
	},
	morningNotesWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'paddingBottom': '4px',
		'margin': '5px',
		'minWidth': '25.2vh',
		'animation': 'latestNews 30s -30s linear infinite',
		'willChange': 'transform',
		'&:not(:last-child)': {
			borderBottom: '1px solid #EDEDF0',
		},
	},
	morningNotesScroll: {
		'display': 'flex',
		'flexDirection': 'column',
		'minHeight': '19.5vh',
		'maxHeight': '19.5vh',
		'marginTop': '2px',
		'overflow': 'hidden',
		'&:hover': {
			'overflowY': 'scroll',
			'&::-webkit-scrollbar-track': {
				borderRadius: '10px',
				backgroundColor: '#F3F4F8',
			},
			'&::-webkit-scrollbar': {
				borderRadius: '10px',
				maxWidth: '7px',
				zIndex: 2,
				backgroundColor: '#F5F5F5',
			},
			'&::-webkit-scrollbar-thumb': {
				borderRadius: '10px',
				backgroundColor: '#D5DBE7',
			},
		},
	},
	morningNotesDate: {
		fontSize: '.9rem',
		color: '#8197ae',
	},
	morningNotesContent: {
		fontSize: '.9rem',
		color: '#151515',
	},
	events: {
		borderRadius: '8px',
		backgroundColor: '#fff',
		border: '2px solid #EDEEF1',
		padding: '10px',
	},
	eventsWrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '12px',
		marginTop: '10px',
		borderTop: '2px solid #EDEDF0',
	},
	eventsInnerWrapper: {
		'display': 'flex',
		'justifyContent': 'center',
		'&:not(:last-child)': {
			marginBottom: '15px',
		},
	},
	eventsLabel: {
		padding: '5px',
		marginRight: '10px',
		borderRadius: '0 6px 6px 0',
	},
	eventsContentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
	eventsInnerContentWrapper: {
		'display': 'flex',
		'flexDirection': 'row',
		'justifyContent': 'space-between',
		'&:not(:last-child)': {
			marginBottom: '6px',
		},
	},
	eventsHeader: {
		color: '#0F0F0F',
		fontWeight: 'bold',
		fontSize: '.9rem',
	},
});
export default useStyles;

export const Tab = styled(TabUnstyled)`
	font-family: IBM Plex Sans, sans-serif;
	color: #868da2;
	cursor: pointer;
	font-size: 0.875rem;
	background-color: transparent;
	width: 100%;
	border: none;
	border-radius: 30px;
	display: flex;
	justify-content: center;

	&:hover {
		background-color: #1c67ff;
		padding: 6px 6px;
	}

	&:focus {
		border-radius: 30px;
		outline-offset: 2px;
	}

	&.${tabUnstyledClasses.selected} {
		background-color: #1c67ff;
		padding: 6px 6px;
		color: #fff;
	}

	&.${buttonUnstyledClasses.disabled} {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const TabPanel = styled(TabPanelUnstyled)`
	width: 100%;
	font-size: 0.875rem;
`;

export const TabsList = styled(TabsListUnstyled)`
	background-color: #e2ebfc;
	border-radius: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	align-content: space-between;
`;

