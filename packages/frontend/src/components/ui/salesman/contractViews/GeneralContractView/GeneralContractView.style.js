import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	modalContainer: {
		backgroundColor: '#fff',
		width: '812px',
		position: 'absolute',
		top: '123px',
		left: '554px',
		height: 800,
		flexDirection: 'column',
		alignItems: 'center',
		// paddingLeft: "60px",
		padding: '20px 30px 5px 30px',
		borderRadius: '8px',
		boxShadow: '0px 8px 24px #0018581F',
	},
	modalBox: {
		// height: 700,
	},
	modalTitle: {
		color: '#868DA2',
		fontSize: '24px',
		fontWeight: 400,
		marginBottom: '5vh',
		marginTop: '15px',
		// textAlign: "center",
		fontFamily: 'Inter',
	},
}));

export default useStyles;
