import { IconButton, Typography, Popover, withStyles, Grid } from '@material-ui/core';
import { useStyles } from '../../../styles/ContarctsModalStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useRef, useState } from 'react';
import ContractEditMain from '../ContractEdit/ContractEditMain';
function PaymentButtonBar(props) {
	const { precentage, openInvoices, isOpen, clientName, contract } = props;
	const classes = useStyles(precentage);
	const [anchorEl, setAnchorEl] = useState(null);

	const contractEditMainRef = useRef();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div style={{ display: 'flex' }}>
			<div className={classes.paymentBar} style={{ cursor: 'pointer' }} onClick={() => openInvoices()}>
				<div className={classes.progressBar}>
					<div>
						<Typography style={{ fontSize: 14, color: '#1C67FF' }}>{`${precentage}%`}</Typography>
					</div>
					<div
						style={{ backgroundColor: '#B8C3D8', width: '90px', height: '5px', borderRadius: 4 }}
					>
						<div
							style={{
								height: '5px',
								width: `${precentage}%`,
								backgroundColor: '#1C67FF',
								borderRadius: 4,
							}}
						></div>
					</div>
				</div>
				{isOpen ? (
					<ExpandLessIcon fontSize="small" style={{ color: '#1C67FF' }} />
				) : (
					<ExpandMoreIcon fontSize="small" style={{ color: '#1C67FF' }} />
				)}
			</div>
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
				<Grid container direction="column" spacing={2} style={{ paddingTop: 12 }}>
					<Grid item xs={11} style={{ marginLeft: '16px' }}>
						<Grid container spacing={1} direction="column">
							<Grid item>
								<Typography className={classes.popHeaders}>Actions</Typography>
							</Grid>
							<Grid item>
								<Typography
									className={classes.popContent}
									onClick={() => contractEditMainRef.current.openModal()}
								>
									Edit
								</Typography>
							</Grid>
							<Grid item>
								<Typography style={{ color: '#FF3939' }} className={classes.popContent}>
									Cancel
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</StyledPop>
			<ContractEditMain ref={contractEditMainRef} contract={contract} clientName={clientName} />
		</div>
	);
}

export default PaymentButtonBar;

const StyledPop = withStyles({
	top: 455,
	root: {
		'& .MuiPopover-paper': {
			minHeight: '100px',
			minWidth: 125,
		},
	},
})(Popover);
