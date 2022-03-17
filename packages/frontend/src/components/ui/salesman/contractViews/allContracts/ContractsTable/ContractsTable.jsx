import React from 'react';
import ContractsTableView from './ContractsTable.view';
const headersName = [
	'Status',
	'Signaturre',
	'Contract Period',
	'Company',
	'Country',
	'Period',
	'Amount',
	'Yearly Cost',
	'Actions',
];

const ContractsTable = (props) => {
  const { contractsRows } = props;

	return <ContractsTableView
		headersName={headersName}
		contractsRows={contractsRows}
	></ContractsTableView>;
};

ContractsTable.displayName = 'ContractsTable';
ContractsTable.defaultProps = {};

export default React.memo(ContractsTable);
