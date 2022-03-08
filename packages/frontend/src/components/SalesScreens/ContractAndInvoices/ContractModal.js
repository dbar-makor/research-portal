import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from '../../../styles/ContarctsModalStyles';
import { Dialog, DialogTitle, Grid, IconButton, Typography } from '@material-ui/core';
import ContractAndInvoicesContent from './ContractAndInvoicesContent';

import { useEffect, useState } from 'react';
import SubHeaderModal from '../../Reusables/SubHeaderModal';

function ContractsModal(props) {
  const { onClose, isOpen, client } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      classes={{ paper: classes.contractModalPaper }}
      BackdropProps={{
        classes: {
          root: classes.modalBackDrop,
        },
      }}
    >
      <Grid item xs={12} align="right" style={{ margin: '10px 10px 0px 0px' }}>
        <IconButton size="small" onClick={() => onClose()}>
          <CloseIcon style={{ color: '#000' }} />
        </IconButton>
      </Grid>
      <DialogTitle>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="center">
              <SubHeaderModal title="Contracts & Invoices" />
              <Grid item xs={12}>
                <Typography className={classes.modalSubHeader}>{client.name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ContractAndInvoicesContent clientId={client.id} clientName={client.name} />
          </Grid>
        </Grid>
      </DialogTitle>
    </Dialog>
  );
}

export default ContractsModal;
