import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL, END_POINT } from '../../../../../../utils/constants';
import * as actionSnackBar from '../../../../../../redux/SnackBar/action';
import InvoiceTableView from './InvoiceTable.view';

const headersName = ['No.', 'Company', 'Date', 'Amount', 'Status', 'Download'];
const InvoiceTable = (props) => {
  const { invoiceRows } = props;
	const dispatch = useDispatch();
	const showInvoice = async (invoiceId) => {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.INVOICE}/pdf/${invoiceId}`, {
				headers: { Accept: 'application/pdf' },
			});

			if (res.status === 200) {
				const pdfString = res.data.pdf;

				const byteCharacters = window.atob(pdfString);
				const byteNumbers = new Array(byteCharacters.length);
				for (let i = 0; i < byteCharacters.length; i++) {
					byteNumbers[i] = byteCharacters.charCodeAt(i);
				}
				const byteArray = new Uint8Array(byteNumbers);
				const file = new Blob([byteArray], { type: 'application/pdf;base64' });
				const fileURL = URL.createObjectURL(file);
				window.open(fileURL);

				dispatch(actionSnackBar.setSnackBar('success', 'Contract successfully created', 2000));
			}
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', 'Failed to create a invoice', 2000));
		}
	};
	return <InvoiceTableView
		headersName={headersName}
		invoiceRows={invoiceRows}
		showInvoice={showInvoice}
	></InvoiceTableView>;
};

InvoiceTable.displayName = 'InvoiceTable';
InvoiceTable.defaultProps = {};

export default React.memo(InvoiceTable);
