import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	statisticsTitle: {
		fontSize: 24,
		marginBottom: 20,
	},
	publishedSection: {
		marginBottom: 20,
		paddingBottom: 20,
		borderBottom: '1px solid #ECEEF2',
	},
	draftsSection: {},
	statisticsSubtitle: {
		color: '#868DA2',
		fontSize: 16,
		marginBottom: 12,
	},
	statRow: {
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	fieldLabel: {
		fontWeight: 600,
	},
});


export default useStyles;
