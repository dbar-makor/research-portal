import { Grid, makeStyles } from '@material-ui/core';
import { FilledButton, OutlinedButton } from '../../../styles/MainStyles';

const useStyles = makeStyles({
	// buttonRowWrapper:{
	//     position: "relative",

	// },
	buttonRow: {
		display: 'flex',
		width: '100%',
	},
	btnWrapper: {
		display: 'flex',
	},
	cancelStyle: {
		padding: '7px 39px',
	},
	end: {
		textAlignLast: 'end',
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
});

function ButtonRow({
	validationResult,
	handlerLeft = () => {},
	handlerRight,
	textButtonLeft = '',
	textButtonRight,
	style,
}) {
	const classes = useStyles();

	return (
		<Grid container className={classes.buttonRowWrapper} style={style}>
			<Grid item xs={12}>
				<Grid container justifyContent={'space-between'}>
					<Grid item className={classes.btnWrapper}>
						<OutlinedButton className={classes.cancelStyle} onClick={handlerLeft}>
							{textButtonLeft}
						</OutlinedButton>
					</Grid>

					<Grid item className={classes.btnWrapper}>
						<FilledButton className={classes.submitStyle} onClick={handlerRight} disabled={!validationResult}>
							{textButtonRight}
						</FilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default ButtonRow;

