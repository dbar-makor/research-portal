import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, Typography } from '@material-ui/core';
import { useStyles } from '../../../../../styles/ContarctsModalStyles';
import SelectInputUnit from '../../../reusables/SelectInputUnit/SelectInputUnit';
import ContractRow from '../ContractRow/ContractRow';

const ContractAndInvoicesContentView = (props) => {
	const classes = useStyles();

	return (
		<Grid container>
			<Grid item xs={12}>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item xs={5}>
						<Typography
							style={{ textAlign: 'left', fontSize: '16px' }}
							className={classes.modalHeader}
						>
							History
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<SelectInputUnit
							name="show all"
							label={props.sortStatus !== '' ? '' : 'Sort Status'}
							value={props.sortStatus || ''}
							optionsArray={props.statusValues}
							optionLabelField="name"
							onChange={(e) => props.filterStatus(e.target.value)}
							valueField="value"
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} style={{ paddingTop: '19px' }}>
				<Grid container alignItems="center" style={{ border: '1px solid #EDEEF1', borderRadius: 8 }}>
					<TableContainer style={{ height: 540 }}>
						<Table stickyHeader size="small">
							<TableHead>
								{props.rowHeaders.map((row) => {
									return (
										<HeaderCells
											style={{ textAlign: row.align, width: row.width }}
											key={row.name}
										>
											{row.name}
										</HeaderCells>
									);
								})}
							</TableHead>
							<TableBody>
								{props.filterdContract &&
									props.filterdContract.map((contract, index) => {
										return (
											<ContractRow
												key={index}
												contract={contract}
												status={props.sortStatus}
												clientName={props.clientName}
											/>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Grid>
	);
};

ContractAndInvoicesContentView.displayName = 'ContractAndInvoicesContentView';
ContractAndInvoicesContentView.defaultProps = {};

export default React.memo(ContractAndInvoicesContentView);
const HeaderCells = withStyles(() => ({
	root: {
		padding: '10px 0px 10px 2px',
		color: '#868DA2',
		fontSize: '14px',
		fontWeight: 300,
	},
}))(TableCell);
