import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL, END_POINT } from '../../../../../../utils/constants';
import axios from 'axios';
import * as actionSnackBar from '../../../../../../redux/SnackBar/action';

import AllInvoicesView from './AllInvoices.view';

const periodicity = [
	{ value: 'All', name: 'All' },
	{ value: 'approved', name: 'Approved' },
	{ value: 'pending', name: 'Pending' },
	{ value: 'rejected', name: 'Rejected' },
];
const AllInvoices = () => {
	const dispatch = useDispatch();

	const [invoiceRows, setInvoiceRows] = useState(null);
	const [companiesNames, setCompaniesNames] = useState(null);
	const [inputCompanyName, setInputCompanyName] = useState('');

	const [invoiceId, setInvoiceId] = useState('');
	const [transactionStatus, setTransactionStatus] = useState('');
	const [periodRange, setPeriodRange] = useState({ from: '', to: '' });
	const [loadingInvoices, setLoadingInvoices] = useState(true);

	const [filters, setFilters] = useState({
		from: null,
		to: null,
		status: '',
		company_id: '',
		invoice_id: '',
	});

	const setFrom = (from) => {
		setPeriodRange((prevState) => ({ ...prevState, from: from }));
		setFilters((prevState) => ({ ...prevState, from: from }));
	};

	const setTo = (to) => {
		setPeriodRange((prevState) => ({ ...prevState, to: to }));
		setFilters((prevState) => ({ ...prevState, to: to }));
	};

	const hendlerForInvoiceId = (e) => {
		if (e.key && e.key === 'Enter') {
			setFilters({ ...filters, invoice_id: invoiceId });
		}
	};

	const inputHandler = (e, type) => {
		switch (type) {
			case 'STATUS':
				setTransactionStatus(e.target.name);
				setFilters({ ...filters, status: e.target.value });
				break;
			case 'INVOICE_ID':
				setFilters({ ...filters, invoice_id: invoiceId });
				break;
			case 'COMPANY_NAME':
				e !== null
					? setFilters({ ...filters, company_id: e.id })
					: setFilters({ ...filters, company_id: '' });
				break;
			default:
				break;
		}
	};

	const getAllInvoicesAsync = async () => {
		try {
			const params = {};
			Object.entries(filters).forEach(([key, value]) => {
				if (key === 'from') {
					if (value !== null && value !== 'DD/MM/YYYY' && value !== '') {
						params[key] = value.split('/').reverse().join('-');
					} else {
						return;
					}
				} else if (key === 'to') {
					if (value !== null && value !== 'DD/MM/YYYY' && value !== '') {
						params[key] = value.split('/').reverse().join('-');
					} else {
						return;
					}
				} else {
					if (value !== '' && value !== null && value !== 'All') {
						params[key] = value;
					} else {
						return;
					}
				}
			});
			const resp = await axios.get(`${BASE_URL}${END_POINT.INVOICE}`, { params });
			if (resp.status === 200) {
				setLoadingInvoices(false);
				setInvoiceRows(resp.data.invoices);
			}
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', 'Fail Loading invoices', 2000));
		}
	};

	const getCompaniesNames = async () => {
		try {
			const resp = await axios.get(`${BASE_URL}${END_POINT.COMPANY}`);
			if (resp.status === 200) {
				const companies = resp.data.company.map((company) => {
					const obj = {};
					Object.entries(company).forEach(([key, value]) => {
						if (key === 'name' || key === 'id') {
							obj[key] = value;
						}
					});
					return obj;
				});
				setCompaniesNames(companies);
			}
		} catch (err) {
			/* eslint no-console: "off" */
			console.log(err);
		}
	};

	useEffect(() => {
		getAllInvoicesAsync();
		getCompaniesNames();
	}, [filters]);

	return (
		<AllInvoicesView
			periodRange={periodRange}
			setFrom={setFrom}
			setTo={setTo}
			transactionStatus={transactionStatus}
			inputHandler={inputHandler}
			periodicity={periodicity}
			companiesNames={companiesNames}
			filters={filters}
			inputCompanyName={inputCompanyName}
			setInputCompanyName={setInputCompanyName}
			invoiceId={invoiceId}
			setInvoiceId={setInvoiceId}
			hendlerForInvoiceId={hendlerForInvoiceId}
			loadingInvoices={loadingInvoices}
			invoiceRows={invoiceRows}
		></AllInvoicesView>
	);
};

AllInvoices.displayName = 'AllInvoices';
AllInvoices.defaultProps = {};

export default React.memo(AllInvoices);
