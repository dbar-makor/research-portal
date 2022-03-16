import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import ContractRow from '../ContractRow/ContractRow';

import useStyles from './ContractsTable.style';

const ContractsTableView = (props) => {
	const classes = useStyles();

  return (
		<TableContainer className={classes.tableContainer}>
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
											header === 'Status'
												? 'center'
												: header === 'Actions'
												? 'center'
												: header === 'Amount'
												? 'right'
												: header === 'Yearly Cost'
												? 'right'
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
					{props.contractsRows &&
						props.contractsRows.map((contract, idx) => {
							return <ContractRow contract={contract} key={idx} />;
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

ContractsTableView.displayName = 'ContractsTableView';
ContractsTableView.defaultProps = {};

export default React.memo(ContractsTableView);
