import React from 'react';
import { Dialog, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../../styles/InfoStyles';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/closeIcon.svg';
import { RedFilledButton } from '../../../../styles/MainStyles';


const DeleteAlertView = (props) => {
	const classes = useStyles();

  return (
		<Dialog
			open={props.open}
			onClose={props.handleClose}
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
						<CloseIcon onClick={props.handleClose} className={classes.closeIcon} />
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.deleteTitle}>{`Deleting ${props.itemCategory}`}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography
						className={classes.deleteText}
					>{`Are you sure you want to delete ${props.itemName}?`}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Grid container justifyContent="center">
						<RedFilledButton onClick={() => props.deleteItem(props.itemId)}>Delete</RedFilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
};

DeleteAlertView.displayName = 'DeleteAlertView';
DeleteAlertView.defaultProps = {};

export default React.memo(DeleteAlertView);
