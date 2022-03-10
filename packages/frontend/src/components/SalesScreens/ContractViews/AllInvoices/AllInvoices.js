import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ReactComponent as BlueShape } from '../../../../assets/icons/blueBorder.svg';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/IconSearch.svg';

import SelectInputUnit from '../../../Reusables/SelectInputUnit';
import { useStyles, StyledTextField, AddButton } from '../../../../styles/MainStyles';
import AutoCompleteUnit from '../../../Reusables/AutoCompleteUnit';
import InvoiceTable from './InvoiceTable';
import RangeDatePicker from '../../../Reusables/RangeDatePicker';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../utils/constants';
import { useDispatch } from 'react-redux';
import * as actionSnackBar from '../../../../redux/SnackBar/action';

const periodicity = [
	{ value: 'All', name: 'All' },
	{ value: 'approved', name: 'Approved' },
	{ value: 'pending', name: 'Pending' },
	{ value: 'rejected', name: 'Rejected' },
];

function AllInvoices() {
	const classes = useStyles();
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

	const hendlerForInvoiceId = (e, value) => {
		if (e.key && e.key === 'Enter') {
			console.log(e.target.value);
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
				console.log(params, 'PARAMS');
			});
			const resp = await axios.get(`${BASE_URL}${END_POINT.INVOICE}`, { params });
			if (resp.status === 200) {
				setLoadingInvoices(false);
				console.log(resp.data);
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
			console.log(err);
		}
	};

	useEffect(() => {
		getAllInvoicesAsync();
		getCompaniesNames();
	}, [filters]);

	return (
		<>
			<Grid
				container
				style={{ position: 'absolute', width: '111px', top: 94, left: 140 }}
				flexDirection="column"
			>
				<Grid item xs={12}>
					<BlueShape />
				</Grid>
				<Grid item style={{ paddingTop: 10 }}>
					<Typography style={{ fontSize: 24, color: '#868DA2' }}>Invoices</Typography>
				</Grid>
			</Grid>
			<Grid container style={{ position: 'relative', margin: '60px 0px 0px 350px', width: '70%' }}>
				<Grid item xs={12}>
					<Grid container justifyContent="center" alignItems="center">
						{/* SECTION OF FILTERS */}
						<Grid item xs={11}>
							<Grid container>
								<Grid item xs={6}>
									<Grid container>
										<Grid item xs={3}>
											<RangeDatePicker
												renderFrom={'filters'}
												max_days_allowed={1460}
												from={periodRange.from}
												setFrom={setFrom}
												to={periodRange.to}
												setTo={setTo}
											/>
										</Grid>
										<Grid item xs={4} style={{ marginLeft: 105 }}>
											<SelectInputUnit
												className={classes.autoCompleteStyle}
												name="name"
												label={transactionStatus ? '' : 'Transaction Status'}
												optionLabelField="name"
												valueField="value"
												placeholder="Type"
												value={transactionStatus.value}
												onChange={(e) => inputHandler(e, 'STATUS')}
												optionsArray={periodicity}
											/>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={6}>
									<Grid container justifyContent="flex-end">
										<Grid item xs={5}>
											{companiesNames && (
												<AutoCompleteUnit
													options={companiesNames}
													name="companyName"
													label="Search Company"
													formObject={filters}
													fieldForLabel="name"
													inputValue={inputCompanyName}
													setInputValue={setInputCompanyName}
													handler={(e) => inputHandler(e, 'COMPANY_NAME')}
												/>
											)}
										</Grid>
										<Grid item xs={4} style={{ marginLeft: 15 }}>
											<StyledTextField
												value={invoiceId}
												onChange={(e) => setInvoiceId(e.target.value)}
												variant="outlined"
												onKeyDown={(e) => hendlerForInvoiceId(e, 'INVOICE_ID')}
												fullWidth
												placeholder="Search"
												InputProps={{
													endAdornment: (
														<SearchIcon
															onClick={(e) => inputHandler(e, 'INVOICE_ID')}
															style={{ cursor: 'pointer' }}
															className={classes.searchIcon}
														/>
													),
												}}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>

						{loadingInvoices && (
							<Grid item xs={12} align="center" style={{ height: 'calc(100vh - 539px)' }}>
								<CircularProgress
									size={40}
									thickness={4}
									value={100}
									style={{ marginTop: '8%' }}
								/>
							</Grid>
						)}
						{invoiceRows && !loadingInvoices && (
							<Grid item xs={11} style={{ paddingTop: 20 }}>
								<InvoiceTable invoiceRows={invoiceRows} />
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}

export default AllInvoices;
