import { BASE_URL, END_POINT } from '../../../utils/constants';
import { ReactComponent as Signed } from '../../../assets/icons/signed.svg';
import { ReactComponent as NotSigned } from '../../../assets/icons/notSigned.svg';
import { ReactComponent as Pending } from '../../../assets/icons/pending.svg';
import { ReactComponent as Rejected } from '../../../assets/icons/rejected.svg';
import { ReactComponent as Approved } from '../../../assets/icons/approved.svg';
import { ReactComponent as Paper } from '../../../assets/icons/paper.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/IconSearch.svg';
import { useState } from 'react';
import { format } from 'date-fns';
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
import { useStyles, StyledTextField } from '../../../styles/ContarctsModalStyles';
import { withStyles } from '@material-ui/styles';
import PaymentButtonBar from './PaymentButtonBar';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as actionSnackBar from '../../../redux/SnackBar/action';

function ContractRow(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { contract, clientName } = props;
	const [filterInvoices, setFilterInvoices] = useState(contract.invoices);

	const [open, setOpen] = useState(false);

	const searchInvoice = (value) => {
		const debaunceSearch = setTimeout(() => {
			if (value !== '') {
				const filterInvoice = contract.invoices.filter(
					(i) => i.id.slice(0, 6).includes(value) || i.id.slice(0, 6).toUpperCase().includes(value),
				);
				setFilterInvoices(filterInvoice);
			} else {
				setFilterInvoices(contract.invoices);
			}
		}, 500);
		return () => clearTimeout(debaunceSearch);
	};

	const calcYearlyCost = (amount, period) => {
		if (period === 'fully') {
			return amount;
		} else if (period === 'half') {
			return amount * 2;
		} else if (period === 'quarterly') {
			return amount * 3;
		} else if (period === 'monthly') {
			return amount * 12;
		}
	};

	const calcPaymentProgress = (invoices) => {
		let cnt = 0;
		if (invoices.length > 0) {
			invoices.forEach((invoice) => {
				if (invoice.status === 'approved') {
					cnt++;
				}
			});
			return ((cnt / invoices.length) * 100).toFixed();
		}
		return 0;
	};

	const openInvoices = () => {
		setOpen(!open);
	};

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

	return (
		<>
			<TableRow style={{ backgroundColor: open ? '#f3f7ff' : '#ffffff' }}>
				<StyledTableCell>{`${format(new Date(contract.start_at), 'dd MMM, yyyy')}-${format(
					new Date(contract.end_at),
					'dd MMM, yyy',
				)}`}</StyledTableCell>
				<StyledTableCell>{contract.agent}</StyledTableCell>
				<StyledTableCell>{contract.members}</StyledTableCell>
				<StyledTableCell style={{ textTransform: 'capitalize' }}>
					{contract.periodicity}
				</StyledTableCell>
				<StyledTableCell>{`${
					contract.currency.symbol
				}${contract.amount.toLocaleString()}`}</StyledTableCell>
				<StyledTableCell style={{ textAlign: 'center' }}>{`${
					contract.currency.symbol
				}${calcYearlyCost(contract.amount, contract.periodicity)}`}</StyledTableCell>
				<StyledTableCell style={{ textAlign: 'center' }}>
					{contract.signed ? <Signed /> : <NotSigned />}
				</StyledTableCell>
				<StyledTableCell style={{ padding: '0px', textAlign: 'center' }}>
					<Grid container alignItems="center">
						<Grid item xs={12} alignItems="center">
							<PaymentButtonBar
								precentage={calcPaymentProgress(contract.invoices)}
								openInvoices={openInvoices}
								isOpen={open}
								contract={contract}
								clientName={clientName}
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
													onChange={(e) => searchInvoice(e.target.value)}
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
										{filterInvoices &&
											filterInvoices.map((invoice, idx) => (
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
														contract.currency.symbol
													}${invoice.amount.toLocaleString()}`}</TableCell>
													<TableCell style={{ textAlign: 'center' }}>
														<IconButton
															size="small"
															onClick={() => showInvoice(invoice.id)}
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
}

const StyledTableCell = withStyles(() => ({
	root: {
		textAlign: 'left',
		padding: '10px 0px 10px 2px',
	},
}))(TableCell);

export default ContractRow;
