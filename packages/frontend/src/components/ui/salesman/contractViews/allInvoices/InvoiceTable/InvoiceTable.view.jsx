import React from 'react';
import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import { format } from 'date-fns';
import { ReactComponent as Pending } from '../../../../../../assets/icons/pending.svg';
import { ReactComponent as Rejected } from '../../../../../../assets/icons/rejected.svg';
import { ReactComponent as Approved } from '../../../../../../assets/icons/approved.svg';
import { ReactComponent as Paper } from '../../../../../../assets/icons/paper.svg';
import useStyles from './InvoiceTable.style';

const InvoiceTableView = (props) => {
	const classes = useStyles();

  return (<TableContainer className={classes.tableContainer}>
  <Table stickyHeader size="small" className={classes.table}>
    <TableHead style={{ borderBottom: 'none' }}>
      <TableRow>
        {props.headersName.map((header, idx) => {
          return (
            <TableCell
              className={classes.tableCellHeaders}
              key={idx}
              style={{
                textAlign:
                  header === 'Amount'
                    ? 'center'
                    : header === 'Status'
                    ? 'center'
                    : header === 'Download'
                    ? 'center'
                    : 'none',
              }}
            >
              {header}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
    <TableBody>
      {props.invoiceRows &&
        props.invoiceRows.map((invoice, index) => {
          return (
            <TableRow key={index}>
              <TableCell
                style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
              >{`#${invoice.id.slice(0, 6)}`}</TableCell>
              <TableCell style={{ textTransform: 'capitalize' }}>
                {invoice.company_name}
              </TableCell>
              <TableCell>
                {format(new Date(invoice.invoice_date), 'dd MMM, yyyy')}
              </TableCell>
              <TableCell
                style={{ textAlign: 'center' }}
              >{`${invoice.amount}`}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {invoice.status === 'pending' ? (
                  <Pending />
                ) : invoice.status === 'rejected' ? (
                  <Rejected />
                ) : (
                  <Approved />
                )}
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <IconButton size="small" onClick={() => props.showInvoice(invoice.id)}>
                  <Paper />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  </Table>
</TableContainer>
);
};

InvoiceTableView.displayName = 'InvoiceTableView';
InvoiceTableView.defaultProps = {};

export default React.memo(InvoiceTableView);
