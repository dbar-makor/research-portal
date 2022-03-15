import { Dialog, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../styles/InfoStyles';
import { ReactComponent as CloseIcon } from '../../assets/icons/closeIcon.svg';
import { RedFilledButton } from '../../styles/MainStyles';

const DeleteAlert = (props) => {
	const { open, handleClose, itemName, itemId, itemCategory, deleteItem } = props;
	const classes = useStyles();
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			classes={{ paper: classes.alertModalPaper }}
			BackdropProps={{
				classes: {
					root: classes.modalBackDrop,
				},
			}}
		>
			<Grid container>
				<Grid item xs={12}>
					<Grid container justifyContent="flex-end">
						<CloseIcon onClick={handleClose} className={classes.closeIcon} />
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.deleteTitle}>{`Deleting ${itemCategory}`}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography
						className={classes.deleteText}
					>{`Are you sure you want to delete ${itemName}?`}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Grid container justifyContent="center">
						<RedFilledButton onClick={() => deleteItem(itemId)}>Delete</RedFilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
};

export default DeleteAlert;
