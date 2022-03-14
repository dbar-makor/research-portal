import React from 'react';
import { format } from 'date-fns';
import { withStyles } from '@material-ui/styles';
import {
	Box,
	Collapse,
	Grid,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import PaymentButtonBar from '../PaymentButtonBar/PaymentButtonBar';
import { ReactComponent as Signed } from '../../../../../assets/icons/signed.svg';
import { ReactComponent as NotSigned } from '../../../../../assets/icons/notSigned.svg';
import { ReactComponent as Pending } from '../../../../../assets/icons/pending.svg';
import { ReactComponent as Rejected } from '../../../../../assets/icons/rejected.svg';
import { ReactComponent as Approved } from '../../../../../assets/icons/approved.svg';
import { ReactComponent as Paper } from '../../../../../assets/icons/paper.svg';
import { ReactComponent as SearchIcon } from '../../../../../assets/icons/IconSearch.svg';

import { useStyles, StyledTextField } from '../../../../../styles/ContarctsModalStyles';

const ContractRowView = (props) => {
	const classes=useStyles();
  return (
		<>
			<TableRow style={{ backgroundColor: open ? '#f3f7ff' : '#ffffff' }}>
				<StyledTableCell>{`${format(new Date(props.contract.start_at), 'dd MMM, yyyy')}-${format(
					new Date(props.contract.end_at),
					'dd MMM, yyy',
				)}`}</StyledTableCell>
				<StyledTableCell>{props.contract.agent}</StyledTableCell>
				<StyledTableCell>{props.contract.members}</StyledTableCell>
				<StyledTableCell style={{ textTransform: 'capitalize' }}>
					{props.contract.periodicity}
				</StyledTableCell>
				<StyledTableCell>{`${
					props.contract.currency.symbol
				}${props.contract.amount.toLocaleString()}`}</StyledTableCell>
				<StyledTableCell style={{ textAlign: 'center' }}>{`${
					props.contract.currency.symbol
				}${props.calcYearlyCost(props.contract.amount, props.contract.periodicity)}`}</StyledTableCell>
				<StyledTableCell style={{ textAlign: 'center' }}>
					{props.contract.signed ? <Signed /> : <NotSigned />}
				</StyledTableCell>
				<StyledTableCell style={{ padding: '0px', textAlign: 'center' }}>
					<Grid container alignItems="center">
						<Grid item xs={12} alignItems="center">
							<PaymentButtonBar
								precentage={props.calcPaymentProgress(props.contract.invoices)}
								openInvoices={props.openInvoices}
								isOpen={open}
								contract={props.contract}
								clientName={props.clientName}
							/>
						</Grid>
					</Grid>
				</StyledTableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{
						paddingBottom: 0,
						paddingTop: 0,
						borderBottom: 'none',
						backgroundColor: '#f9fafb',
					}}
					colSpan={12}
				>
					<Collapse in={open} timeout="10" unmountOnExit>
						<Typography variant="h6" gutterBottom component="div">
							<Box>
								<Grid
									container
									style={{ paddingBlock: 5 }}
									alignItems="center"
									direction="row"
								>
									<Grid item xs={4}>
										<Typography
											style={{ fintSize: 14, color: '#868DA2' }}
											component="div"
										>
											Invoices
										</Typography>
									</Grid>
									<Grid item style={{ marginLeft: 'auto' }}>
										<Grid container alignItems="center" spacing={1}>
											<Grid item>
												<StyledTextField
													variant="outlined"
													onChange={(e) => props.searchInvoice(e.target.value)}
													placeholder="Search"
													InputProps={{
														endAdornment: (
															<SearchIcon className={classes.searchIcon} />
														),
													}}
												/>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
								<Table size="small">
									<TableHead>
										<TableRow>
											<TableCell className={classes.collapseTableHeaders}>
												No.
											</TableCell>
											<TableCell className={classes.collapseTableHeaders}>
												Date
											</TableCell>
											<TableCell className={classes.collapseTableHeaders}>
												Amount
											</TableCell>
											<TableCell
												className={classes.collapseTableHeaders}
												style={{ textAlign: 'center' }}
											>
												View
											</TableCell>
											<TableCell
												className={classes.collapseTableHeaders}
												style={{ textAlign: 'right', paddingRight: '20px' }}
											>
												Status
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{props.filterInvoices &&
											props.filterInvoices.map((invoice, idx) => (
												<TableRow key={idx}>
													<TableCell component="th" scope="row">
														#{invoice.id?.slice(0, 6).toUpperCase()}
													</TableCell>
													<TableCell>
														{format(
															new Date(invoice.invoice_date),
															'dd MMM, yyyy',
														)}
													</TableCell>
													<TableCell style={{ fontWeight: 'bold' }}>{`${
														props.contract.currency.symbol
													}${invoice.amount.toLocaleString()}`}</TableCell>
													<TableCell style={{ textAlign: 'center' }}>
														<IconButton
															size="small"
															onClick={() => props.showInvoice(invoice.id)}
														>
															<Paper />
														</IconButton>
													</TableCell>
													<TableCell style={{ textAlign: 'right' }}>
														{invoice.status === 'approved' ? (
															<Approved />
														) : invoice.status === 'pending' ? (
															<Pending />
														) : (
															<Rejected />
														)}
													</TableCell>
												</TableRow>
											))}
									</TableBody>
								</Table>
							</Box>
						</Typography>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

ContractRowView.displayName = 'ContractRowView';
ContractRowView.defaultProps = {};

export default React.memo(ContractRowView);

const StyledTableCell = withStyles(() => ({
	root: {
		textAlign: 'left',
		padding: '10px 0px 10px 2px',
	},
}))(TableCell);