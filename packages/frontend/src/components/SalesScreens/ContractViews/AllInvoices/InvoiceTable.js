import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL, END_POINT } from '../../../../utils/constants';
import { format } from 'date-fns';
import * as actionSnackBar from '../../../../redux/SnackBar/action';
import { ReactComponent as Pending } from '../../../../assets/icons/pending.svg';
import { ReactComponent as Rejected } from '../../../../assets/icons/rejected.svg';
import { ReactComponent as Approved } from '../../../../assets/icons/approved.svg';
import { ReactComponent as Paper } from '../../../../assets/icons/paper.svg';

import {
	IconButton,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';

const headersName = ['No.', 'Company', 'Date', 'Amount', 'Status', 'Download'];
const useStyles = makeStyles(() => ({
	tableContainer: {
		'maxHeight': 'calc(100vh - 265px)',
		'&::-webkit-scrollbar': {
			width: 5,
		},
		'&::-webkit-scrollbar-track': {
			marginLeft: '250px',
			borderRadius: 4,
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#bababa',
			borderRadius: 8,
		},
		'&::-webkit-scrollbar-track-piece': {
			'&:start': {
				background: 'transparent',
				marginTop: '51px',
			},
			'&:end': {
				background: 'transparent',
				marginBottom: '5px',
			},
		},
	},
	table: {
		'& .MuiTableCell-stickyHeader': {
			backgroundColor: '#ffffff',
		},
		'& .MuiTableBody-root': {
			'& tr:nth-of-type(1)': {
				'& td:nth-child(1)': {
					borderRadius: '8px 0px 0px 0px',
					borderBottom: '1px solid #EDEEF1 ',
					borderTop: '1px solid #EDEEF1 ',
					borderLeft: '1px solid #EDEEF1 ',
				},
				'& td:last-child': {
					borderRadius: '0px 8px 0px 0px',
					borderBottom: '1px solid #EDEEF1 ',
					borderTop: '1px solid #EDEEF1',
				},
				'& td:not(:first-child):not(:last-child)': {
					borderBottom: '1px solid #EDEEF1 ',
					borderTop: '1px solid #EDEEF1 ',
				},
			},
			'& tr:last-child': {
				'& td:nth-child(1)': {
					borderRadius: '0px 0px 0px 8px',
					borderBottom: '1px solid #EDEEF1 ',
					borderTop: '1px solid #EDEEF1 ',
					borderLeft: '1px solid #EDEEF1 ',
				},
				'& td:last-child': {
					borderRadius: '0px 0px 8px 0px',
					borderBottom: '1px solid #EDEEF1 ',
					borderTop: '1px solid #EDEEF1',
				},
				'& td:not(:first-child):not(:last-child)': {
					borderBottom: '1px solid #EDEEF1 ',
					borderTop: '1px solid #EDEEF1 ',
				},
			},
			'& tr:not(:first-child):not(:last-child)': {
				'& td:first-child': {
					borderLeft: '1px solid #EDEEF1 ',
				},
				'& td:last-child': {
					borderRight: '1px solid #EDEEF1 ',
				},
			},
		},
	},
	tableCellHeaders: {
		borderBottom: 'none',
		color: '#868DA2',
		fontWeight: 300,
	},
	tableCellBody: {
		border: 'none',
	},
}));

const InvoiceTable = (props) => {
	const { invoiceRows } = props;
	const dispatch = useDispatch();
	const classes = useStyles();

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
		<TableContainer className={classes.tableContainer}>
			<Table stickyHeader size="small" className={classes.table}>
				<TableHead style={{ borderBottom: 'none' }}>
					<TableRow>
						{headersName.map((header, idx) => {
							return (
								<TableCell
									className={classes.tableCellHeaders}
									key={idx}
									style={{
										textAlign:
											header === 'Amount'
												? 'center'
												: header === 'Status'
												? 'center'
												: header === 'Download'
												? 'center'
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
					{invoiceRows &&
						invoiceRows.map((invoice, index) => {
							return (
								<TableRow key={index}>
									<TableCell
										style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
									>{`#${invoice.id.slice(0, 6)}`}</TableCell>
									<TableCell style={{ textTransform: 'capitalize' }}>
										{invoice.company_name}
									</TableCell>
									<TableCell>
										{format(new Date(invoice.invoice_date), 'dd MMM, yyyy')}
									</TableCell>
									<TableCell
										style={{ textAlign: 'center' }}
									>{`${invoice.amount}`}</TableCell>
									<TableCell style={{ textAlign: 'center' }}>
										{invoice.status === 'pending' ? (
											<Pending />
										) : invoice.status === 'rejected' ? (
											<Rejected />
										) : (
											<Approved />
										)}
									</TableCell>
									<TableCell style={{ textAlign: 'center' }}>
										<IconButton size="small" onClick={() => showInvoice(invoice.id)}>
											<Paper />
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default InvoiceTable;
