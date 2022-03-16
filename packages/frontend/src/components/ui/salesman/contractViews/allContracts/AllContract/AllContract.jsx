import React,{ useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL, END_POINT } from '../../../../../../utils/constants';
import axios from 'axios';
import * as actionSnackBar from '../../../../../../redux/SnackBar/action';

import AllContractView from './AllContract.view';
const periodicity = [
	{ value: 'All', name: 'All' },
	{ value: 'fully', name: 'Yearly' },
	{ value: 'half', name: 'Half' },
	{ value: 'quarterly', name: 'Quarterly' },
	{ value: 'monthly', name: 'Monthly' },
];
const contractStatus = [
	{ value: 'All', name: 'All' },
	{ value: 'true', name: 'Signed' },
	{ value: 'false', name: 'Unsigned' },
];
const AllContract = () => {
  const dispatch = useDispatch();

	const [loadingContract, setLoadingContract] = useState(true);

	const [contractsRows, setContractsRows] = useState(null);

	const [companiesNames, setCompaniesNames] = useState(null);
	const [inputCompanyName, setInputCompanyName] = useState('');

	const [filterdPeriod, setFilterdPeriod] = useState('');
	const [status, setStatus] = useState('');
	const [periodRange, setPeriodRange] = useState({ from: '', to: '' });

	const [filters, setFilters] = useState({
		from: null,
		to: null,
		period: '',
		signed: '',
		company_id: '',
	});

	const setFrom = (from) => {
		setPeriodRange((prevState) => ({ ...prevState, from: from }));
		setFilters((prevState) => ({ ...prevState, from: from }));
	};

	const setTo = (to) => {
		setPeriodRange((prevState) => ({ ...prevState, to: to }));
		setFilters((prevState) => ({ ...prevState, to: to }));
	};

	const inputHandler = (e, type) => {
		switch (type) {
			case 'PERIOD':
				setFilterdPeriod(e.target.name);
				setFilters({ ...filters, period: e.target.value });
				break;
			case 'STATUS':
				setStatus(e.target.name);
				setFilters({ ...filters, signed: e.target.value });
				break;
			case 'COMPANY_NAME':
				e !== null
					? setFilters({ ...filters, company_id: e.id })
					: setFilters({ ...filters, company_id: '' });
				break;
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

	const getAllContractAsync = async (filters) => {
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

			const resp = await axios.get(`${BASE_URL}${END_POINT.CONTRACT}`, { params });
			if (resp.status === 200) {
				setLoadingContract(false);
				setContractsRows(resp.data.contract);
			}
		} catch (err) {
			console.log(err);
			dispatch(actionSnackBar.setSnackBar('error', 'Fail Loading Contracts', 2000));
		}
	};

	useEffect(() => {
		getAllContractAsync(filters);
		getCompaniesNames();
	}, []);

	useEffect(() => {
		getAllContractAsync(filters);
	}, [filters]);

	return <AllContractView
		periodRange={periodRange}
		setFrom={setFrom}
		setTo={setTo}
		filterdPeriod={filterdPeriod}
		inputHandler={inputHandler}
		periodicity={periodicity}
		status={status}
		contractStatus={contractStatus}
		companiesNames={companiesNames}
		filters={filters}
		inputCompanyName={inputCompanyName}
		setInputCompanyName={setInputCompanyName}
		loadingContract={loadingContract}
		contractsRows={contractsRows}
	></AllContractView>;
};

AllContract.displayName = 'AllContract';
AllContract.defaultProps = {};

export default React.memo(AllContract);
