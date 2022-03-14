import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';

import ContractAndInvoicesContentView from './ContractAndInvoicesContent.view';

const rowHeaders = [
	{ name: 'Contract Period', align: 'left', width: 211 },
	{ name: 'Agent', align: 'left', width: 97 },
	{ name: 'Members', align: 'left', width: 86 },
	{ name: 'Period', align: 'left', width: 88 },
	{ name: 'Amount', align: 'left', width: 75 },
	{ name: 'Yearly Cost', align: 'center', width: 91 },
	{ name: 'Signed', align: 'center', width: 90 },
	{ name: 'Payment', align: 'center', width: 90 },
];
const statusValues = [
	{ value: 'all', name: 'All' },
	{ value: 'signed', name: 'Signed' },
	{ value: 'not signed', name: 'Not Signed' },
];

const ContractAndInvoicesContent = (props) => {
	const { clientId, clientName } = props;
	const [sortStatus, setSortStatus] = useState('');
	const [contracts, setContracts] = useState([]);
	const [filterdContract, setFilterContract] = useState([]);

	const filterStatus = (value) => {
		setSortStatus(value);
		if (value === 'all') {
			setFilterContract(contracts);
		} else if (value === 'signed') {
			const filter = contracts.filter((con) => con.signed === true);
			setFilterContract(filter);
		} else {
			const filter = contracts.filter((con) => con.signed === false);
			setFilterContract(filter);
		}
	};

	const getClientContract = async (id) => {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.COMPANY}${END_POINT.CONTRACT}/${id}`);
			if (res.status === 200) {
				await setContracts(res.data);
				await setFilterContract(res.data);
			}
		} catch (err) {
			alert(err.message);
		}
	};

	useEffect(() => {
		getClientContract(clientId);
	}, [clientId]);
	return (
		<ContractAndInvoicesContentView
			sortStatus={sortStatus}
			statusValues={statusValues}
      filterStatus={filterStatus}
      rowHeaders={rowHeaders}
      filterdContract={filterdContract}
      clientName={clientName}
		></ContractAndInvoicesContentView>
	);
};

ContractAndInvoicesContent.displayName = 'ContractAndInvoicesContent';
ContractAndInvoicesContent.defaultProps = {};

export default React.memo(ContractAndInvoicesContent);
