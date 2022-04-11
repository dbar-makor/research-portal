import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    alertModalPaper: {
		borderRadius: '8px',
		width: '40vw',
		minHeight: '23vh',
		padding: '16px',
	},
    modalBackDrop: {
		backdropFilter: 'blur(2px)',
		backgroundColor: '#00001e25',
	},
    closeIcon: {
		cursor: 'pointer',
	},
    title:{
        textTransform: 'capitalize',
		color: '#868DA2',
		fontWeight: 600,
		fontSize: '24px',
		textAlign: 'center',
		marginBottom: '22px',
    },
});

export default useStyles;
