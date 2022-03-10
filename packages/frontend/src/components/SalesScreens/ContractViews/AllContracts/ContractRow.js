import {
	Divider,
	Grid,
	IconButton,
	Popover,
	TableCell,
	TableRow,
	Typography,
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { format } from 'date-fns';
import { withStyles } from '@material-ui/styles';
import { useRef, useState } from 'react';

function ContractRow(props) {
	const { contract } = props;
	const [anchorEl, setAnchorEl] = useState(null);

	const contractEditMainRef = useRef();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
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

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	return (
		<TableRow>
			<TableCell style={{ textAlign: 'center' }}>
				<FiberManualRecordIcon
					style={{ color: contract.status === false ? '#FF3939' : '#00CA80', fontSize: '12px' }}
				/>
			</TableCell>
			<TableCell style={{ color: contract.signed === true ? '#00CA80' : '#FF3939' }}>
				{contract.signed === true ? 'Signed' : 'Unsigned'}
			</TableCell>
			<TableCell style={{ width: 215 }}>{`${format(
				new Date(contract.start_at),
				'dd MMM , yyyy',
			)} - ${format(new Date(contract.end_at), 'dd MMM, yyyy')}`}</TableCell>
			<TableCell style={{ textTransform: 'capitalize' }}>{contract.company_name}</TableCell>
			<TableCell
				style={{ width: 100, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
			>
				{contract.company_country.length > 6
					? `${contract.company_country.slice(0, 6)}...`
					: contract.company_country}
			</TableCell>
			<TableCell style={{ textTransform: 'capitalize' }}>
				{contract.periodicity === 'fully' ? 'Yearly' : contract.periodicity}
			</TableCell>
			<TableCell
				style={{ textAlign: 'right' }}
			>{`${contract.currency.symbol}${contract.amount}`}</TableCell>
			<TableCell style={{ fontWeight: 'bold', textAlign: 'right' }}>{`${
				contract.currency.symbol
			}${calcYearlyCost(contract.amount, contract.periodicity)}`}</TableCell>
			<TableCell style={{ textAlign: 'center' }}>
				<IconButton size="small">
					<MoreVertIcon fontSize="small" style={{ color: '#B8C3D8' }} onClick={handleClick} />
				</IconButton>
				<StyledPop
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
				>
					<Grid container direction="column" spacing={2} style={{ paddingTop: 10 }}>
						<Grid item xs={11} style={{ marginLeft: '16px' }}>
							<Grid container spacing={1} spacing={1} direction="column">
								<Grid item>
									<Typography style={{ fontSize: '12px', color: '#B8C3D8' }}>
										Download
									</Typography>
								</Grid>
								<Grid item style={{ cursor: 'pointer' }}>
									<Typography style={{ fontSize: '14px' }}>Contract</Typography>
								</Grid>
								<Grid item style={{ cursor: 'pointer' }}>
									<Typography style={{ fontSize: '14px' }}>All Invoices</Typography>
								</Grid>
								<Grid item>
									<Divider />
								</Grid>
								<Grid item>
									<Typography style={{ fontSize: '12px', color: '#B8C3D8' }}>
										Actions
									</Typography>
								</Grid>
								<Grid item>
									<Typography
										style={{ fontSize: '14px' }}
										onClick={() => contractEditMainRef.current.openModal()}
									>
										Edit
									</Typography>
								</Grid>
								<Grid item style={{ cursor: 'pointer' }} onClick={handleClose}>
									<Typography style={{ fontSize: '14px', color: '#FF3939' }}>
										Cancel
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</StyledPop>
			</TableCell>
		</TableRow>
	);
}

export default ContractRow;

const StyledPop = withStyles({
	root: {
		'& .MuiPopover-paper': {
			minHeight: '190px',
			minWidth: 140,
		},
	},
})(Popover);
