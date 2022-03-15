import React from 'react';

import { Grid, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import { ReactComponent as Paid } from '../../../../assets/icons/paid.svg';
import { ReactComponent as NotPaid } from '../../../../assets/icons/notPaid.svg';

const StyledTableCell = withStyles(() => ({
	root: {
		color: '#000',
	},
}))(TableCell);

const StyledTableRow = withStyles(() => ({
	root: {
		'&:hover': {
			backgroundColor: '#f0f0f0',
			cursor: 'pointer',
		},
	},
}))(TableRow);

const SubscribersTableView = (props) => {
	const columns = ['Name', 'Email', 'Paid', 'Country'];

	return (
		<Grid item xs={5} style={{ height: 'calc(100vh - 60px)', paddingTop: 50 }}>
			<TableContainer style={{ maxHeight: '80%', overflow: 'auto' }}>
				<Table stickyHeader size="medium">
					<TableHead style={{ backgroundColor: '#bababa' }}>
						<TableRow>
							{columns.map((col, idx) => {
								return (
									<StyledTableCell
										style={{ textAlign: col !== 'Name' ? 'center' : null }}
										key={idx}
									>
										{col}
									</StyledTableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{props.subscribers.map((sub, idx) => {
							return (
								<StyledTableRow key={idx} onClick={() => props.setChosenSubscriber(sub)}>
									{Object.entries(sub).map(([key, value]) => {
										return key === 'full_name' ? (
											<StyledTableCell style={{ width: 140 }}>{value}</StyledTableCell>
										) : key === 'email' ? (
											<StyledTableCell style={{ textAlign: 'center', width: 45 }}>
												{value}
											</StyledTableCell>
										) : key === 'paid' ? (
											<StyledTableCell style={{ textAlign: 'center', width: 30 }}>
												{value === true ? <Paid /> : <NotPaid />}
											</StyledTableCell>
										) : key === 'country' ? (
											<StyledTableCell style={{ textAlign: 'center', width: 40 }}>
												{value}
											</StyledTableCell>
										) : null;
									})}
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
};

SubscribersTableView.displayName = 'SubscribersTableView';
SubscribersTableView.defaultProps = {};

export default React.memo(SubscribersTableView);
