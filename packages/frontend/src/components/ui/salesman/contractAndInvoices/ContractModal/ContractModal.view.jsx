import React from 'react';
import { Dialog, DialogTitle, Grid, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SubHeaderModal from '../../../../Reusables/SubHeaderModal';
import { useStyles } from '../../../../../styles/ContarctsModalStyles';
import ContractAndInvoicesContent from '../ContractAndInvoicesContent/ContractAndInvoicesContent';


const ContractModalView = (props) => {
	const classes = useStyles();

  return  (
		<Dialog
			open={props.isOpen}
			onClose={() => props.onClose()}
			classes={{ paper: classes.contractModalPaper }}
			BackdropProps={{
				classes: {
					root: classes.modalBackDrop,
				},
			}}
		>
			<Grid item xs={12} align="right" style={{ margin: '10px 10px 0px 0px' }}>
				<IconButton size="small" onClick={() => props.onClose()}>
					<CloseIcon style={{ color: '#000' }} />
				</IconButton>
			</Grid>
			<DialogTitle>
				<Grid container justifyContent="center">
					<Grid item xs={12}>
						<Grid container alignItems="center" justifyContent="center">
							<SubHeaderModal title="Contracts & Invoices" />
							<Grid item xs={12}>
								<Typography className={classes.modalSubHeader}>{props.client.name}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<ContractAndInvoicesContent clientId={props.client.id} clientName={props.client.name} />
					</Grid>
				</Grid>
			</DialogTitle>
		</Dialog>
	);
};

ContractModalView.displayName = 'ContractModalView';
ContractModalView.defaultProps = {};

export default React.memo(ContractModalView);
