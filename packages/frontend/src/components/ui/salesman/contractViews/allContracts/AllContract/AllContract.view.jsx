import React from 'react';
import { useStyles } from '../../../../../../styles/MainStyles';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import RangeDatePicker from '../../../../reusables/RangeDatePicker/RangeDatePicker';
import { ReactComponent as BlueShape } from '../../../../../../assets/icons/blueBorder.svg';
import SelectInputUnit from '../../../../reusables/SelectInputUnit/SelectInputUnit';
import ContractsTable from '../../allContracts/ContractsTable/ContractsTable';
import AutoCompleteUnit from '../../../../reusables/AutoCompleteUnit/AutoCompleteUnit';

//import useStyles from './AllContract.style';

const AllContractView = (props) => {
	const classes = useStyles();

  return (
		<>
			<Grid
				container
				style={{ position: 'absolute', width: '111px', top: 94, left: 140 }}
				flexDirection="column"
			>
				<Grid item xs={12}>
					<BlueShape />
				</Grid>
				<Grid item style={{ paddingTop: 10 }}>
					<Typography style={{ fontSize: 24, color: '#868DA2' }}>Contracts</Typography>
				</Grid>
			</Grid>
			<Grid container style={{ position: 'relative', margin: '60px 0px 0px 350px', width: '70%' }}>
				<Grid item xs={12}>
					<Grid container justifyContent="center" alignItems="center">
						{/* SECTION OF FILTERS */}
						<Grid item xs={9}>
							<Grid container>
								<Grid item xs={2}>
									<RangeDatePicker
										renderFrom={'filters'}
										max_days_allowed={1460}
										from={props.periodRange.from}
										setFrom={props.setFrom}
										to={props.periodRange.to}
										setTo={props.setTo}
									/>
								</Grid>
								<Grid item xs={3} style={{ marginLeft: 105 }}>
									<SelectInputUnit
										className={classes.autoCompleteStyle}
										label={props.filterdPeriod ? '' : 'Period'}
										name="periodicity"
										value={props.filterdPeriod.value}
										onChange={(e) => props.inputHandler(e, 'PERIOD')}
										optionLabelField="name"
										valueField="value"
										placeholder="Type"
										optionsArray={props.periodicity}
										native={false}
									/>
								</Grid>
								<Grid item xs={3} style={{ marginLeft: 15 }}>
									<SelectInputUnit
										className={classes.autoCompleteStyle}
										name="name"
										label={props.status ? '' : 'Contract Status'}
										optionLabelField="name"
										valueField="value"
										placeholder="Type"
										value={props.status.value}
										onChange={(e) => props.inputHandler(e, 'STATUS')}
										optionsArray={props.contractStatus}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={2}>
							{props.companiesNames && (
								<AutoCompleteUnit
									options={props.companiesNames}
									name="companyName"
									label="Search Company"
									formObject={props.filters}
									fieldForLabel="name"
									inputValue={props.inputCompanyName}
									setInputValue={props.setInputCompanyName}
									handler={(e) => props.inputHandler(e, 'COMPANY_NAME')}
								/>
							)}
						</Grid>

						{props.loadingContract && !props.contractsRows && (
							<Grid item xs={12} align="center" style={{ height: 'calc(100vh - 539px)' }}>
								<CircularProgress
									size={40}
									thickness={4}
									value={100}
									style={{ marginTop: '8%' }}
								/>
							</Grid>
						)}
						{props.contractsRows && !props.loadingContract && (
							<Grid item xs={11} style={{ paddingTop: 20 }}>
								<ContractsTable contractsRows={props.contractsRows} />
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

AllContractView.displayName = 'AllContractView';
AllContractView.defaultProps = {};

export default React.memo(AllContractView);
