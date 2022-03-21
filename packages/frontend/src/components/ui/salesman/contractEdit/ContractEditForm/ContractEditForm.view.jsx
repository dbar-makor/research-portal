import React from 'react';
import { Grid, Typography, withStyles, Switch, TextField } from '@material-ui/core';
import AutoCompleteUnit from '../../../reusables/AutoCompleteUnit/AutoCompleteUnit';
import NumberInputUnit from '../../../reusables/NumberInputUnit/NumberInputUnit';
import DateInputUnit from '../../../reusables/DateInputUnit/DateInputUnit';
import NumberFormatCustom from '../../../../../utils/components/NumberFormatCustom';

import useStyles from './ContractEditForm.style';
const GreenSwitch = withStyles({
	switchBase: {
		'color': '#FFFFFF',
		'&$checked': {
			color: '#FFFFFF',
		},
		'&$checked + $track': {
			backgroundColor: '#00CA80',
			opacity: 1,
		},
		'& .MuiSwitch-thumb': {
			width: 18,
			height: 18,
			border: '1px solid #EDEFF3',
			marginTop: -1,
		},
	},
	checked: {},
	track: {},
})(Switch);

const StyledTextField = withStyles(() => ({
	root: {
		'width': '100%',
		'& .MuiInputBase-input': {},
		'& .MuiOutlinedInput-root': {
			'borderRadius': 8,
			'height': 40,
			'& :hover': {
				border: 'none',
			},
		},
		'& .MuiInputBase-input.Mui-disabled': {
			opacity: 1,
			color: '#000',
		},
	},
}))(TextField);
const ContractEditFormView = (props) => {
	const classes = useStyles();

  return (
		<Grid container className={classes.formWrapper}>
			<Grid item xs={12}>
				<Typography className={classes.formTitle}>Information</Typography>
			</Grid>
			<Grid item xs={12}>
				<Grid container>
					<Grid item xs={12}>
						<Grid container alignItems="center" spacing={1}>
							<Grid item xs={5}>
								<StyledTextField
									variant="outlined"
									value={props.contractForm.companyName.name}
									disabled
								/>
							</Grid>
							<Grid item xs={5}>
								{props.salesmenArr && (
									<AutoCompleteUnit
										className={classes.autoCompleteStyle}
										name="sales"
										fieldForLabel="name"
										label="Sales Agent"
										options={props.salesmenArr}
										formObject={props.ontractForm}
										handler={props.handleContract}
										error={props.errors.sales}
										inputValue={props.inputValueSales}
										setInputValue={props.setInputValueSales}
									/>
								)}
							</Grid>
							<Grid item xs={5}>
								{props.countriesArr && (
									<AutoCompleteUnit
										className={classes.autoCompleteStyle}
										name="country"
										fieldForLabel="country"
										label="country"
										options={props.countriesArr}
										formObject={props.contractForm}
										handler={props.handleContract}
										error={props.errors.countries}
										inputValue={props.inputValueCountry}
										setInputValue={props.setInputValueCountry}
									/>
								)}
							</Grid>
							<Grid item xs={5}>
								{props.currenciesArr && (
									<AutoCompleteUnit
										className={classes.autoCompleteStyle}
										name="currency"
										label="Currency"
										fieldForLabel="name"
										options={props.currenciesArr}
										formObject={props.contractForm}
										handler={props.handleContract}
										error={props.errors.currency}
										inputValue={props.inputValueCurrency}
										setInputValue={props.setInputValueCurrency}
									/>
								)}
							</Grid>
							<Grid item xs={4}>
								<NumberInputUnit
									className={classes.textFieldStyle}
									name="amount"
									label="Amount"
									value={props.contractForm.amount || ''}
									onChange={props.handleContract}
									error={props.errors.amount}
									InputProps={{
										inputComponent: NumberFormatCustom,
										inputProps: {
											decimalNo: 2,
											minValue: 0,
										},
									}}
								/>{' '}
							</Grid>
							<Grid item xs={1}>
								<Typography style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>
									per
								</Typography>
							</Grid>
							<Grid item xs={5}>
								<AutoCompleteUnit
									className={classes.autoCompleteStyle}
									name="periodicity"
									label="Periodicity"
									valueField="value"
									optionLabelField="name"
									fieldForLabel="name"
									formObject={props.contractForm || ''}
									handler={props.handleContract}
									options={props.chargePeriods}
									error={props.errors.periodicity}
									inputValue={props.contractForm.periodicity}
									setInputValue={props.setInputValuePeriodicity}
								/>
							</Grid>
							<Grid item xs={5}>
								<DateInputUnit
									className={classes.dateStyle}
									name="start_at"
									// label="Start Date"
									value={props.contractForm.start_at || new Date()}
									error={props.errors['start_at']}
									onChange={(date) => props.handleContract(date, 'start_at')}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						xs={11}
						style={{ borderTop: '1px solid #EDEFF3', marginTop: 16, paddingBlock: '20px 5px' }}
					>
						<Grid container alignItems="center">
							<Grid item>
								<GreenSwitch checked={props.contractForm.vat} />
							</Grid>
							<Grid item>
								<Typography style={{ fontSize: 16, fontWeight: 'bold' }}>
									VAT Included
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						xs={11}
						style={{ borderTop: '1px solid #EDEFF3', marginTop: 16, paddingBlock: '20px 5px' }}
					>
						<Grid container alignItems="center">
							<Grid item xs={3}>
								<Typography style={{ fontSize: 16, color: '#868DA2' }}>
									Yearly Amount
								</Typography>
							</Grid>
							<Grid item xs={4} className={classes.boxStyle}>
								<Typography className={classes.amountType}>
									{props.contractForm.currency && props.contractForm.amount && props.contractForm.periodicity
										? `${props.contractForm.currency.symbol}
                              ${(
									props.contractForm.amount * props.periodToNum[props.contractForm.periodicity]
								).toLocaleString()}`
										: '0'}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						xs={11}
						style={{
							borderTop: '1px solid #EDEFF3',
							borderBottom: '1px solid #EDEFF3',
							marginTop: 16,
							paddingBlock: 24,
						}}
					>
						<Grid container alignItems="center">
							<Grid item xs={3}>
								<Typography style={{ fontSize: 16, color: '#868DA2' }}>Members</Typography>
							</Grid>
							<Grid item xs={4}>
								<NumberInputUnit
									className={`${classes.memberField} ${classes.textFieldStyle}`}
									name="members"
									value={props.contractForm.members || ''}
									onChange={props.handleContract}
									error={props.errors.members}
									InputProps={{
										inputComponent: NumberFormatCustom,
										inputProps: {
											autoComplete: 'off',
											decimalNo: 0,
											minValue: props.chosenCompany.members
												? props.chosenCompany.members.length
												: 0,
										},
									}}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={11} style={{ marginTop: 10 }}>
						<Grid container alignItems="center">
							<Grid item>
								<Typography style={{ fontSize: 14, color: '#868DA2' }}>
									*Changes will apply from next payment
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

ContractEditFormView.displayName = 'ContractEditFormView';
ContractEditFormView.defaultProps = {};

export default React.memo(ContractEditFormView);
