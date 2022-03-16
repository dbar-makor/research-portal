import React from 'react';
import { Divider, Grid, IconButton, Popover, TableCell, TableRow, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { format } from 'date-fns';
import { withStyles } from '@material-ui/styles';

//import useStyles from './ContractRow.style';

const ContractRowView = (props) => {

  return (
		<TableRow>
			<TableCell style={{ textAlign: 'center' }}>
				<FiberManualRecordIcon
					style={{ color: props.contract.status === false ? '#FF3939' : '#00CA80', fontSize: '12px' }}
				/>
			</TableCell>
			<TableCell style={{ color: props.contract.signed === true ? '#00CA80' : '#FF3939' }}>
				{props.contract.signed === true ? 'Signed' : 'Unsigned'}
			</TableCell>
			<TableCell style={{ width: 215 }}>{`${format(
				new Date(props.contract.start_at),
				'dd MMM , yyyy',
			)} - ${format(new Date(props.contract.end_at), 'dd MMM, yyyy')}`}</TableCell>
			<TableCell style={{ textTransform: 'capitalize' }}>{props.contract.company_name}</TableCell>
			<TableCell
				style={{ width: 100, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
			>
				{props.contract.company_country.length > 6
					? `${props.contract.company_country.slice(0, 6)}...`
					: props.contract.company_country}
			</TableCell>
			<TableCell style={{ textTransform: 'capitalize' }}>
				{props.contract.periodicity === 'fully' ? 'Yearly' : props.contract.periodicity}
			</TableCell>
			<TableCell
				style={{ textAlign: 'right' }}
			>{`${props.contract.currency.symbol}${props.contract.amount}`}</TableCell>
			<TableCell style={{ fontWeight: 'bold', textAlign: 'right' }}>{`${
				props.contract.currency.symbol
			}${props.calcYearlyCost(props.contract.amount, props.contract.periodicity)}`}</TableCell>
			<TableCell style={{ textAlign: 'center' }}>
				<IconButton size="small">
					<MoreVertIcon fontSize="small" style={{ color: '#B8C3D8' }} onClick={props.handleClick} />
				</IconButton>
				<StyledPop
					id={props.id}
					open={props.open}
					anchorEl={props.anchorEl}
					onClose={props.handleClose}
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
							<Grid container spacing={1} direction="column">
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
										onClick={() => props.contractEditMainRef.current.openModal()}
									>
										Edit
									</Typography>
								</Grid>
								<Grid item style={{ cursor: 'pointer' }} onClick={props.handleClose}>
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
};

ContractRowView.displayName = 'ContractRowView';
ContractRowView.defaultProps = {};

export default React.memo(ContractRowView);
const StyledPop = withStyles({
	root: {
		'& .MuiPopover-paper': {
			minHeight: '190px',
			minWidth: 140,
		},
	},
})(Popover);