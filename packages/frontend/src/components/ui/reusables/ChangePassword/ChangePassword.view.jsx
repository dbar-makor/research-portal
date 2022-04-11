import React from 'react';
import { Dialog, Grid, Typography } from '@material-ui/core';
//import { useStyles } from '../../../../styles/InfoStyles';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/closeIcon.svg';
import { FilledButton, StyledTextField } from '../../../../styles/MainStyles';

import useStyles from './ChangePassword.style';

const ChangePasswordView = (props) => {
	const classes = useStyles();
	return (
		<Dialog
			open={props.chosenModal}
			onClose={props.handleCloseModal}
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
					<Typography className={classes.title}>Change Password</Typography>
				</Grid>
			{/* main content */}
      <Grid item xs={12} container>
					<Grid item xs={6}>
						<StyledTextField
            value={props.oldPass}
            onChange={(e) => props.setInvoiceId(e.target.value)}
            variant="outlined"
            onKeyDown={(e) => props.hendlerForInvoiceId(e, 'INVOICE_ID')}
            fullWidth
            placeholder="Search"
            />
						<StyledTextField />
						<StyledTextField />

					</Grid>
					<Grid item xs={6}>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container justifyContent="center">
						<FilledButton onClick={() => props.deleteItem(props.itemId)}>Delete</FilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
};

ChangePasswordView.displayName = 'ChangePasswordView';
ChangePasswordView.defaultProps = {};

export default React.memo(ChangePasswordView);
