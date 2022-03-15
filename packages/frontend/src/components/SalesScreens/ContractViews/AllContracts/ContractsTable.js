import {
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';

import ContractRow from './ContractRow';
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

const useStyles = makeStyles({
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
});

const ContractsTable = (props) => {
	const { contractsRows } = props;
	const classes = useStyles();

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
					{contractsRows &&
						contractsRows.map((contract, idx) => {
							return <ContractRow contract={contract} key={idx} />;
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ContractsTable;
