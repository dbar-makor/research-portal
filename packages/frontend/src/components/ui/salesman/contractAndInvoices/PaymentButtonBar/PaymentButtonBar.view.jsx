import React from 'react';
import { useStyles } from '../../../../../styles/ContarctsModalStyles';
import { IconButton, Typography, Popover, withStyles, Grid } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ContractEditMain from '../../../../SalesScreens/ContractEdit/ContractEditMain';

const PaymentButtonBarView = (props) => {
	const classes = useStyles(props.precentage);

	return (
		<div style={{ display: 'flex' }}>
			<div className={classes.paymentBar} style={{ cursor: 'pointer' }} onClick={() => props.openInvoices()}>
				<div className={classes.progressBar}>
					<div>
						<Typography
							style={{ fontSize: 14, color: '#1C67FF' }}
						>{`${props.precentage}%`}</Typography>
					</div>
					<div
						style={{ backgroundColor: '#B8C3D8', width: '90px', height: '5px', borderRadius: 4 }}
					>
						<div
							style={{
								height: '5px',
								width: `${props.precentage}%`,
								backgroundColor: '#1C67FF',
								borderRadius: 4,
							}}
						></div>
					</div>
				</div>
				{props.isOpen ? (
					<ExpandLessIcon fontSize="small" style={{ color: '#1C67FF' }} />
				) : (
					<ExpandMoreIcon fontSize="small" style={{ color: '#1C67FF' }} />
				)}
			</div>
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
				<Grid container direction="column" spacing={2} style={{ paddingTop: 12 }}>
					<Grid item xs={11} style={{ marginLeft: '16px' }}>
						<Grid container spacing={1} direction="column">
							<Grid item>
								<Typography className={classes.popHeaders}>Actions</Typography>
							</Grid>
							<Grid item>
								<Typography
									className={classes.popContent}
									onClick={() => props.contractEditMainRef.current.openModal()}
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
			<ContractEditMain
				ref={props.contractEditMainRef}
				contract={props.contract}
				clientName={props.clientName}
			/>
		</div>
	);
};

PaymentButtonBarView.displayName = 'PaymentButtonBarView';
PaymentButtonBarView.defaultProps = {};

export default React.memo(PaymentButtonBarView);
const StyledPop = withStyles({
	top: 455,
	root: {
		'& .MuiPopover-paper': {
			minHeight: '100px',
			minWidth: 125,
		},
	},
})(Popover);
