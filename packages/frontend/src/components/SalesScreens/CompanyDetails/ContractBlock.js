import React from 'react';
import { useStyles } from '../../../styles/InfoStyles';
import { selectChosenCompany } from '../../../redux/companies/chosenCompanySlice';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { ReactComponent as GreenCheckIcon } from '../../../assets/icons/IconGreenCheck.svg';
import clsx from 'clsx';
import WarningIcon from '@material-ui/icons/Warning';

function ContractBlock(props) {
	const classes = useStyles();

	const periodToNum = {
		monthly: 12,
		quarterly: 4,
		half: 2,
		fully: 1,
	};

	return (
		// currentContract ?
		<Grid
			container
			className={clsx({
				[classes.currentContractBlock]: props.title === 'current',
			})}
		>
			{props.title === 'current' ? (
				<Grid
					item
					xs={props.contractStatus ? 11 : 8}
					style={{ marginTop: '-28px', backgroundColor: '#F9FAFB' }}
				>
					<Grid container alignItems="center">
						{props.contractStatus ? (
							<>
								{props.contract.signed ? (
									<>
										<GreenCheckIcon style={{ marginLeft: '7px' }} />
										<Typography className={classes.currentContractHeader}>
											Current Contract
										</Typography>
									</>
								) : (
									<>
										<WarningIcon
											style={{ marginLeft: '7px', fill: '#FF3939', fontSize: '20px' }}
										/>
										<Typography className={classes.noCurrentContractHeader}>
											Missing Signature
										</Typography>
									</>
								)}
							</>
						) : (
							<Typography className={classes.noCurrentContractHeader}>
								No Contract Yet
							</Typography>
						)}
					</Grid>
				</Grid>
			) : (
				<Grid item xs={12}>
					<Typography className={classes.blockHeader}>Last Contract</Typography>
				</Grid>
			)}

			<Grid item xs={12} className={classes.marginBottom8}>
				<Grid container justifyContent="space-between">
					<Grid item>
						<Typography className={classes.fieldName}>Agent</Typography>
					</Grid>
					<Grid item>
						<Typography className={classes.fieldContent}>
							{props.contractStatus || props.title === 'last'
								? props.contract.sales_agent.name
								: '-'}
						</Typography>

						{/* <Typography className={classes.fieldContent}>{chosenCompany.prospect_trial.sales_agent.name}</Typography> */}
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} className={classes.marginBottom8}>
				<Grid container justifyContent="space-between">
					<Grid item>
						<Typography className={classes.fieldName}>Since</Typography>
					</Grid>
					<Grid item>
						<Typography className={classes.fieldContent}>
							{props.contractStatus || props.title === 'last'
								? format(new Date(props.contract.start_at), 'dd MMM, yyyy')
								: '-'}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} className={classes.marginBottom8}>
				<Grid container justifyContent="space-between">
					<Grid item>
						<Typography className={classes.fieldName}>Period</Typography>
					</Grid>
					<Grid item>
						<Typography className={classes.fieldContent}>
							{props.contractStatus || props.title === 'last'
								? props.contract.periodicity
								: '-'}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} className={classes.marginBottom8}>
				<Grid container justifyContent="space-between">
					<Grid item>
						<Typography className={classes.fieldName}>Amount</Typography>
					</Grid>
					<Grid item>
						<Typography className={classes.fieldContent}>
							{props.contractStatus || props.title === 'last'
								? `${props.contract.currency.symbol}${props.contract.amount}`
								: '-'}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid container justifyContent="space-between">
					<Grid item>
						<Typography className={classes.yearlyCost}>Yearly Cost</Typography>
					</Grid>
					<Grid item>
						<Typography className={classes.yearlyCostContent}>
							{props.contractStatus || props.title === 'last'
								? `${props.contract.currency.symbol}${(
									props.contract.amount * periodToNum[props.contract.periodicity]
								  ).toLocaleString()}`
								: '-'}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default ContractBlock;
