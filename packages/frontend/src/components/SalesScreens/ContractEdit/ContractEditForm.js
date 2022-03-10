import { Grid, Typography, withStyles, Switch, Button, makeStyles, Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AutoCompleteUnit from '../../Reusables/AutoCompleteUnit';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import DateInputUnit from '../../Reusables/DateInputUnit';
import NumberInputUnit from '../../Reusables/NumberInputUnit';
import NumberFormatCustom from '../../../utils/components/NumberFormatCustom';
import { selectChosenCompany } from '../../../redux/companies/chosenCompanySlice';

const chargePeriods = [
	{
		value: 'monthly',
		name: 'Month',
	},
	{
		value: 'quarterly',
		name: 'Quarter',
	},
	{
		value: 'half',
		name: 'Half',
	},
	{
		value: 'fully',
		name: 'Yearly',
	},
];

const periodToNum = {
	monthly: 12,
	quarterly: 4,
	half: 2,
	fully: 1,
};

function ContractEditForm(props) {
	const { contract } = props;
	const classes = useStyles();
	const currenciesArr = useSelector((state) => state.utils.utils.currency);
	const countriesArr = useSelector((state) => state.utils.utils.country);
	const salesmenArr = useSelector((state) => state.utils.utils.sales);
	const chosenCompany = useSelector(selectChosenCompany);
	console.log('chosenCompany', chosenCompany);

	const loggedinSalesPersonBigObject = useSelector((state) => state.auth.userContent);
	const loggedinSalesPerson = {
		id: loggedinSalesPersonBigObject.id,
		name: loggedinSalesPersonBigObject.name,
	};

	const [errors, setErrors] = useState({});
	const [inputValuePeriodicity, setInputValuePeriodicity] = useState(
		chargePeriods.find((p) => p.value === contract.periodicity).name,
	);
	const [inputValueSales, setInputValueSales] = useState(loggedinSalesPerson.name);
	const [inputValueCountry, setInputValueCountry] = useState(chosenCompany.country.name);
	const [inputValueCurrency, setInputValueCurrency] = useState('');

	const [contractForm, setContractForm] = useState({
		companyName: chosenCompany,
		salesMan: loggedinSalesPerson,
		country: chosenCompany.country,
		currency: contract.currency,
		amount: contract.amount,
		periodicity: contract.periodicity,
		date: contract.start_at,
		vat: contract.vat,
		members: contract.members,
	});
	const [loadingUpload, setLoadingUpload] = useState(false);

	const handleContract = (e, fieldIndicator) => {
		let value;
		if (fieldIndicator === 'salesMan') {
			value = e ? e.id : '';
		} else if (fieldIndicator === 'start_at') {
			value = e;
		} else if (fieldIndicator === 'periodicity') {
			value = e ? e.value : '';
		} else if (fieldIndicator === 'currency') {
			value = e ? e.code : '';
		} else {
			value = e.target.value;
		}

		let name;
		if (
			fieldIndicator === 'start_at' ||
			fieldIndicator === 'salesMan' ||
			fieldIndicator === 'country' ||
			fieldIndicator === 'currency' ||
			fieldIndicator === 'periodicity'
		) {
			name = fieldIndicator;
		} else {
			name = e.target.name;
		}

		setContractForm((prev) => ({
			...prev,
			[name]: name === 'members' || name === 'amount' ? Number(value) : value,
		}));
	};

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
									value={contractForm.companyName.name}
									disabled
								/>
							</Grid>
							<Grid item xs={5}>
								{salesmenArr && (
									<AutoCompleteUnit
										className={classes.autoCompleteStyle}
										name="sales"
										fieldForLabel="name"
										label="Sales Agent"
										options={salesmenArr}
										formObject={contractForm}
										handler={handleContract}
										error={errors.sales}
										inputValue={inputValueSales}
										setInputValue={setInputValueSales}
									/>
								)}
							</Grid>
							<Grid item xs={5}>
								{countriesArr && (
									<AutoCompleteUnit
										className={classes.autoCompleteStyle}
										name="country"
										fieldForLabel="country"
										label="country"
										options={countriesArr}
										formObject={contractForm}
										handler={handleContract}
										error={errors.countries}
										inputValue={inputValueCountry}
										setInputValue={setInputValueCountry}
									/>
								)}
							</Grid>
							<Grid item xs={5}>
								{currenciesArr && (
									<AutoCompleteUnit
										className={classes.autoCompleteStyle}
										name="currency"
										label="Currency"
										fieldForLabel="name"
										options={currenciesArr}
										formObject={contractForm}
										handler={handleContract}
										error={errors.currency}
										inputValue={inputValueCurrency}
										setInputValue={setInputValueCurrency}
									/>
								)}{' '}
							</Grid>
							<Grid item xs={4}>
								<NumberInputUnit
									className={classes.textFieldStyle}
									name="amount"
									label="Amount"
									value={contractForm.amount || ''}
									onChange={handleContract}
									error={errors.amount}
									InputProps={{
										// startAdornment: (
										//   <InputAdornment
										//     position="start"
										//     style={{ paddingLeft: 10 }}
										//   >
										//     {contract.currency || ""}
										//   </InputAdornment>
										// ),
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
									formObject={contractForm || ''}
									handler={handleContract}
									options={chargePeriods}
									error={errors.periodicity}
									inputValue={contractForm.periodicity}
									setInputValue={setInputValuePeriodicity}
								/>
							</Grid>
							<Grid item xs={5}>
								<DateInputUnit
									className={classes.dateStyle}
									name="start_at"
									// label="Start Date"
									value={contractForm.start_at || new Date()}
									error={errors['start_at']}
									onChange={(date) => handleContract(date, 'start_at')}
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
								<GreenSwitch checked={contractForm.vat} />
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
									{contractForm.currency && contractForm.amount && contractForm.periodicity
										? `${contractForm.currency.symbol}
                              ${(
			contractForm.amount * periodToNum[contractForm.periodicity]
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
									value={contractForm.members || ''}
									onChange={handleContract}
									error={errors.members}
									InputProps={{
										inputComponent: NumberFormatCustom,
										inputProps: {
											autoComplete: 'off',
											decimalNo: 0,
											minValue: chosenCompany.members
												? chosenCompany.members.length
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
					{/* <Grid item xs={11} style={{ marginTop: 10 }}>
                    <Grid container alignItems="center" justifyContent="flex-end">
                      <Grid item>
                        <Button style={{ borderRadius: 21, color: '#ffffff', textTransform: 'none', backgroundColor: '#1C67FF', width: '191px' }}>Update</Button>
                      </Grid>
                    </Grid>
                  </Grid> */}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default React.memo(ContractEditForm);

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

const useStyles = makeStyles((theme) => ({
	pageTitle: {
		color: '#000000',
		fontSize: '32px',
		fontWeight: 600,
		marginBottom: '8vh',
		marginTop: '25px',
		textAlign: 'center',
	},
	formWrapper: {},
	formTitle: {
		fontSize: 16,
		color: '#868DA2',
		marginBottom: 16,
		marginTop: 16,
	},
	formContainer: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	total: {
		color: '#000000',
		fontSize: '1.5rem',
		marginLeft: '30px',
	},
	marginBottom35: {
		marginBottom: '35px',
	},
	submit: {
		marginBottom: '20px',
		padding: '12px',
		fontSize: '20px',
	},
	modalContainer: {
		backgroundColor: '#fff',
		width: '812px',
		position: 'absolute',
		top: '123px',
		left: '554px',
		// height: "'100%",
		flexDirection: 'column',
		alignItems: 'center',
		// paddingLeft: "60px",
		padding: '57px 67px 5px 49px',
		borderRadius: '8px',
		boxShadow: '0px 8px 24px #0018581F',
	},
	modalTitle: {
		color: '#868DA2',
		fontSize: '24px',
		fontWeight: 400,
		marginBottom: '4vh',
		marginTop: '15px',
		// textAlign: "center",
		fontFamily: 'Inter',
	},
	textFieldStyle: {
		'popupIndicatorOpen': {
			transform: 'rotate(0deg)',
		},
		'borderColor': '#A5AFC233',
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiInputBase-input': {
			fontFamily: 'inter',
			fontSize: '.MuiInputBase-input',
			borderRadius: '8px',
			color: '#0F0F0F',
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
			color: '#868DA2',
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
		'& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
			padding: 2,
		},
		'& .makeStyles-textFieldStyle-453 .MuiInputBase-input': {
			color: 'red',
		},
		'& .MuiOutlinedInput-adornedStart': {
			padding: 0,
		},
	},
	amountStyle: {
		'backgroundColor': '#EDEFF3',
		'borderRadius': '8px',
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiInputBase-input': {
			fontFamily: 'inter',
			fontSize: '.MuiInputBase-input',
			borderRadius: '8px',
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
		},
	},
	autoCompleteStyle: {
		'& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
			padding: '1.3px',
		},
		'& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]':
			{
				borderRadius: '8px',
				color: '#0F0F0F',
			},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
		'& .MuiAutocomplete-inputFocused': {
			fontFamily: 'inter',
			fontSize: '.MuiInputBase-input',
			borderRadius: '8px',
		},
	},
	dateStyle: {
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiOutlinedInput-adornedEnd': {
			borderRadius: '8px',
			padding: 0,
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
	},
	divider: {
		marginTop: '20px',
		marginBottom: '30px',
	},
	periodStyle: {
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
		},
		'& .MuiAutocomplete-inputFocused': {
			fontFamily: 'inter',
			fontSize: '.MuiInputBase-input',
			borderRadius: '8px',
		},
	},
	paddingBottom24px: {
		paddingBottom: '24px',
	},
	informationTitle: {
		color: '#0F0F0F',
		fontSize: '20px',
		fontFamily: 'Inter',
		fontWeight: 400,
		textTransform: 'capitalize',
		paddingTop: '40px',
	},
	paddingBottom20px: {
		paddingBottom: '20px',
	},
	paddingRight10px: {
		paddingRight: '10px',
	},
	PaddingLeft10px: {
		paddingLeft: '10px',
	},
	paddingBottom30px: {
		paddingBottom: '30px',
	},
	paddingRight26px: {
		paddingRight: '26px',
	},
	perStyle: {
		fontFamily: 'inter',
		fontSize: '16px',
		fontWeight: 500,
		padding: '10px 0 0 0',
	},
	divider: {
		backgroundColor: '#0018581F',
		borderRadius: '8px',
	},
	padding300px: {
		padding: '30px 0',
	},
	yearlyAmount: {
		fontSize: '16px',
		fontFamily: 'inter',
		fontWeight: 400,
		color: '#868DA2',
		paddingTop: '15px',
	},
	boxStyle: {
		backgroundColor: '#EDEFF3',
		borderRadius: '8px',
		padding: 8.6,
	},
	padding3000px: {
		padding: '25px 0 0 0',
	},
	membersContainer: {
		paddingBottom: '20px',
		flexWrap: 'nowrap',
	},
	memberField: {
		paddingLeft: '30px',
	},
	membersStyle: {
		fontSize: '16px',
		fontFamily: 'inter',
		fontWeight: 400,
		color: '#868DA2',
		paddingTop: '10px',
	},
	note: {
		fontSize: '13px',
		fontWeigh: '400',
		lineHeight: '1.4',
		paddingLeft: '30px',
		marginLeft: '14px',
		marginTop: '3px',
	},
	paddingbuttons: {
		padding: '168px 0 30px 0',
	},
	textAlignLast: {
		textAlignLast: 'start',
	},
	cancelStyle: {
		backgroundColor: '#FFFFFF',
		color: '#1C67FF',
		textTransform: 'capitalize',
		fontSize: '16px',
		fontFamily: 'inter',
		fontWeight: 400,
		height: '40px',
		width: '120px',
		borderRadius: '20px',
		border: 'solid 1px #1C67FF',
	},
	submitStyle: {
		'backgroundColor': '#1C67FF',
		'color': 'white',
		'textTransform': 'capitalize',
		'fontSize': '16px',
		'fontFamily': 'inter',
		'fontWeight': 400,
		'height': '40px',
		'width': '190px',
		'borderRadius': '20px',
		'textAlignLast': 'start',
		'top': 0,
		'&:hover': {
			backgroundColor: '#1C67FF',
		},
	},
	amountType: {
		color: '#1C67FF',
		fontSize: '20px',
		fontFamily: 'inter',
		textAlignLast: 'center',
	},
	end: {
		textAlignLast: 'end',
	},
}));
