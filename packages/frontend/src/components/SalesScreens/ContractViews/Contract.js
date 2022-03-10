import { useEffect, useState } from 'react';
import { Grid, Typography, makeStyles, Divider } from '@material-ui/core';
import NumberFormatCustom from '../../../utils/components/NumberFormatCustom';
import TextInputUnit from '../../Reusables/TextInputUnit';
import NumberInputUnit from '../../Reusables/NumberInputUnit';
import DateInputUnit from '../../Reusables/DateInputUnit';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import AutoCompleteUnit from '../../Reusables/AutoCompleteUnit';
import { useDispatch, useSelector } from 'react-redux';
import { changeChosenCompany, selectChosenCompany } from '../../../redux/companies/chosenCompanySlice';
import { validateContract, validateEditedContract } from '../../Reusables/validationFunctions';
import { StatusSwitch, FilledButton } from '../../../styles/MainStyles';
import ButtonRow from './ButtonRow';
import { useHistory } from 'react-router-dom';
import * as actionSnackBar from '../../../redux/SnackBar/action';

<<<<<<< HEAD
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
		name: 'Half-year',
	},
	{
		value: 'fully',
		name: 'Year',
	},
];

const periodToNum = {
	monthly: 12,
	quarterly: 4,
	half: 2,
	fully: 1,
};

function Contract({
	setStep,
	setContractCopy,
	stepperMode,
	chosenContract,
	setLoadingSidebar,
	setActiveSidebar,
}) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const loggedinSalesPersonBigObject = useSelector((state) => state.auth.userContent);
	const loggedinSalesPerson = {
		id: loggedinSalesPersonBigObject.id,
		name: loggedinSalesPersonBigObject.name,
	};

	const currenciesArr = useSelector((state) => state.utils.utils.currency);
	const salesmenArr = useSelector((state) => state.utils.utils.sales);
	const chosenCompany = useSelector(selectChosenCompany);
	const initStateContract = {
		id: chosenCompany.id,
		start_at: new Date(),
		sales: loggedinSalesPerson.id,
		vat: false,
	};
	const [contract, setContract] = useState(initStateContract);
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState();
	const [inputValueSales, setInputValueSales] = useState(loggedinSalesPerson.name);
	const [inputValueCurrency, setInputValueCurrency] = useState('');
	const [inputValuePeriodicity, setInputValuePeriodicity] = useState('');

	const handleContract = (value, name) => {
		if (name === 'periodicity') {
			value = value ? value.value : '';
		} else if (name === 'currency') {
			value = value ? value.code : '';
		}

		setContract((prev) => ({
			...prev,
			[name]: name === 'members' || name === 'amount' ? Number(value) : value,
		}));

		if (chosenContract) {
			// in case of editing - this is the validation function
			validateEditedContract({ [name]: value }, errors, setErrors, setValidationResult);
		} else {
			// in case of new contract - this is the validation function
			validateContract({ [name]: value }, errors, setErrors, setValidationResult);
		}
	};

	//useEffect to populate fields in case of editing existing contract
	useEffect(() => {
		if (chosenContract) {
			setContract(chosenContract);
			// setParentValidationResult(true);
			setInputValueSales(chosenContract.sales.name);
			setInputValueCurrency(chosenContract.currency.name);
			const periodicityName = chargePeriods.find(
				(period) => period.value === chosenContract.periodicity,
			).name;
			setInputValuePeriodicity(periodicityName);
		}
	}, [chosenContract]);

	//submitting new contract only (not edited)

	const handleSubmit = async () => {
		try {
			const res = await axios.post(`${BASE_URL}${END_POINT.CONTRACT}`, {
				...contract,
				id: chosenCompany.id,
			});
			if (res.status === 200 || res.status === 201) {
				console.log('post succeded');
				console.log('res', res);
				setContractCopy({ ...contract, contract_id: res.data.id });
				setContract({});
				dispatch(actionSnackBar.setSnackBar('success', 'Contract successfully created', 2000));
				setStep(2);
			}
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', 'Failed to create a contract', 2000));
		}
	};

	//relevant for new contract (not editing)

	const handleCancel = () => {
		dispatch(changeChosenCompany(null));
		history.push('/companies');
	};

	//relevant for editing mode

	const handleUpdate = async () => {
		setLoadingSidebar(true);
		//preparing contract data to put call
		const contractCopy = { ...contract };
		const contract_id = contract.contract_id;
		delete contractCopy.contract_id;
		delete contractCopy.invoices;
		delete contractCopy.signer_user;

		const currency = contract.currency?.code;
		contractCopy.currency = currency;
		const sales = contract.sales?.id;
		contractCopy.sales = sales;
		// const signer_user = contract.signer_user?.id;
		// contractCopy.signer_user = signer_user;
		console.log('contractCopy update function', contractCopy);

		try {
			const res = await axios.put(`${BASE_URL}${END_POINT.CONTRACT}/${contract_id}`, contractCopy);

			if (res.status === 201 || res.status === 200) {
				// dispatch(actionSnackBar.setSnackBar('success', 'Successfully updated', 2000));
				console.log('contract updated successfully');
				setLoadingSidebar(false);
				setActiveSidebar(true);
				setValidationResult(false);
			}
		} catch (error) {
			console.log(error);
			setLoadingSidebar(false);
		}
	};

	return (
		<Grid container className={classes.page}>
			<Grid item xs={12}>
				<Grid container className={classes.formContainer}>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={12} className={classes.paddingBottom24px}>
								<Typography className={classes.informationTitle}>information</Typography>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<Grid container className={classes.paddingBottom20px}>
									<Grid item xs={6} className={classes.paddingRight10px}>
										<TextInputUnit
											className={classes.textFieldStyle}
											name="id"
											label={chosenCompany ? chosenCompany.name : ''}
											value={chosenCompany ? chosenCompany.name : ''}
											formObject={contract}
											handler={(e) => handleContract(e.target.value, 'id')}
											error={errors.id}
										/>
									</Grid>
									<Grid item xs={6} className={classes.PaddingLeft10px}>
										{salesmenArr && (
											<AutoCompleteUnit
												className={classes.textFieldStyle}
												name="sales"
												fieldForLabel="name"
												label="Sales Agent"
												options={salesmenArr}
												formObject={contract}
												handler={(e) => {
													e ? handleContract(e.id, 'sales') : handleContract(e, 'sales');
												}}
												error={errors.sales}
												inputValue={inputValueSales}
												setInputValue={setInputValueSales}
											/>
										)}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<Grid container className={classes.paddingBottom20px}>
									<Grid item xs={6} className={classes.paddingRight10px}>
										<DateInputUnit
											className={classes.dateStyle}
											name="start_at"
											// label="Start Date"
											value={contract['start_at'] || new Date()}
											error={errors['start_at']}
											onChange={(date) => handleContract(date, 'start_at')}
										/>
									</Grid>
									{/* <Grid item xs={1}></Grid> */}
									<Grid item xs={6} className={classes.PaddingLeft10px}>
										{currenciesArr && (
											<AutoCompleteUnit
												className={classes.autoCompleteStyle}
												label="Currency"
												name="currency"
												fieldForLabel="name"
												options={currenciesArr}
												formObject={contract}
												handler={handleContract}
												error={errors.currency}
												inputValue={inputValueCurrency}
												setInputValue={setInputValueCurrency}
											/>
										)}
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container className={classes.paddingBottom30px}>
									<Grid item xs={6} className={classes.paddingRight26px}>
										<NumberInputUnit
											className={classes.textFieldStyle}
											name="amount"
											label="Amount"
											value={contract.amount || ''}
											onChange={(e) => handleContract(e.target.value, 'amount')}
											error={errors.amount}
											InputProps={{
												inputComponent: NumberFormatCustom,
												inputProps: {
													decimalNo: 2,
													minValue: 0,
												},
											}}
										/>
									</Grid>
									<Grid item xs={1}>
										<Typography className={classes.perStyle}>per</Typography>
									</Grid>
									<Grid item xs={5}>
										<AutoCompleteUnit
											className={classes.autoCompleteStyle}
											name="periodicity"
											label="Period"
											valueField="value"
											optionLabelField="name"
											fieldForLabel="name"
											formObject={contract.periodicity || ''}
											handler={handleContract}
											options={chargePeriods}
											error={errors.periodicity}
											inputValue={inputValuePeriodicity}
											setInputValue={setInputValuePeriodicity}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Divider className={classes.divider} />
					</Grid>

					<Grid container>
						<Grid item xs={12} className={`${classes.padding3000px} ${classes.vatGroupWrapper}`}>
							<Divider className={classes.divider} />
							<Grid item xs={6} className={classes.vatGroup}>
								<Typography className={`${classes.indiLabel} ${classes.vatLabel1}`}>Include</Typography>
								<StatusSwitch
									name="vat"
									onChange={(e) => handleContract(e.target.checked, 'vat')}
									checked={contract.vat}
									className={classes.switch}
								/>
								<Typography className={classes.vatLabel2}>VAT</Typography>
							</Grid>

							<Divider className={classes.divider} />
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={12} className={classes.padding3000px}>
							<Grid container className={classes.paddingBottom20px}>
								<Grid item xs={3}>
									<Typography className={classes.indiLabel}>Yearly Amount</Typography>
								</Grid>
								<Grid item xs={6}>
									<Grid container>
										<Grid item xs={12} className={classes.boxStyle}>
											<Typography className={classes.amountType}>
												{contract.currency && contract.amount && contract.periodicity
													? `${
															typeof contract.currency === 'string'
																? currenciesArr.find((currency) => currency.code === contract.currency).symbol
																: contract.currency.symbol
													  }${(contract.amount * periodToNum[contract.periodicity]).toLocaleString()}`
													: '0'}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Divider className={classes.divider} />
			</Grid>

			<Grid container>
				<Grid item xs={12} className={classes.padding3000px}>
					<Grid
						container
						className={classes.membersContainer}
						style={stepperMode ? {} : { paddingBottom: 5 }}
					>
						<Grid item xs={3}>
							<Typography className={classes.membersStyle}>Members</Typography>
						</Grid>
						<Grid container>
							<Grid item xs={6}>
								<Grid item xs={12}>
									<NumberInputUnit
										className={`${classes.memberField} ${classes.textFieldStyle}`}
										name="members"
										value={contract.members || ''}
										onChange={(e) => handleContract(e.target.value, 'members')}
										error={errors.members}
										InputProps={{
											inputComponent: NumberFormatCustom,
											inputProps: {
												autoComplete: 'off',
												decimalNo: 0,
												minValue: chosenCompany.members ? chosenCompany.members.length : 0,
											},
										}}
									/>
								</Grid>
								{chosenCompany && chosenCompany.members && (
									<Grid item xs={12}>
										<Typography className={classes.note}>
											* Minimal No. is {chosenCompany.members.length}
										</Typography>
									</Grid>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{stepperMode ? (
				<Grid container>
					<ButtonRow
						style={{ position: 'absolute', bottom: 0 }}
						validationResult={validationResult}
						handlerLeft={handleCancel}
						handlerRight={handleSubmit}
						textButtonLeft="Cancel"
						textButtonRight="Done"
					/>
				</Grid>
			) : (
				<>
					<Grid container>
						<Divider className={classes.divider} style={{ width: '100%', marginTop: 25 }} />
						<Grid item>
							<Typography className={classes.comment}>*Changes will apply from next payment</Typography>
						</Grid>
					</Grid>
					<Grid container className={classes.btnContainer} justifyContent="flex-end">
						<Grid item xs={4} style={{ marginTop: 15 }}>
							<FilledButton disabled={!validationResult} onClick={handleUpdate}>
								Update
							</FilledButton>
						</Grid>
					</Grid>
				</>
			)}
		</Grid>
	);
}

export default Contract;

const useStyles = makeStyles((theme) => ({
=======
const useStyles = makeStyles({
>>>>>>> 5b020432a068e31cceeef2679c924d1dbd8c26eb
	page: {
		position: 'relative',
		height: 650,
	},
	pageTitle: {
		color: '#000000',
		fontSize: '32px',
		fontWeight: 600,
		marginBottom: '8vh',
		marginTop: '25px',
		textAlign: 'center',
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
	textFieldStyle: {
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
	vatGroupWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 25,
	},
	vatGroup: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	indiLabel: {
		fontSize: '16px',
		fontFamily: 'inter',
		fontWeight: 400,
		color: '#868DA2',
		paddingTop: '15px',
	},
	vatLabel1: {
		paddingTop: 0,
		marginRight: 20,
	},
	vatLabel2: {
		marginLeft: 20,
	},
	switch: {
		'width': 22,
		'height': 10,
		'& .MuiSwitch-thumb': {
			width: 12,
			height: 12,
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
		paddingTop: '20px',
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
		backgroundColor: '#EDEFF3',
		borderRadius: '8px',
	},
	padding300px: {
		padding: '30px 0',
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
		paddingBottom: '40px',
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

	amountType: {
		color: '#1C67FF',
		fontSize: '20px',
		fontFamily: 'inter',
		textAlignLast: 'center',
	},

	btnContainer: {},
	comment: {
		color: '#868DA2',
		fontSize: 16,
		marginTop: 25,
	},
});

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
		name: 'Half-year',
	},
	{
		value: 'fully',
		name: 'Year',
	},
];

const periodToNum = {
	monthly: 12,
	quarterly: 4,
	half: 2,
	fully: 1,
};

function Contract({
	setStep,
	setContractCopy,
	stepperMode,
	chosenContract,
	setLoadingSidebar,
	setActiveSidebar,
}) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const loggedinSalesPersonBigObject = useSelector((state) => state.auth.userContent);
	const loggedinSalesPerson = {
		id: loggedinSalesPersonBigObject.id,
		name: loggedinSalesPersonBigObject.name,
	};

	const currenciesArr = useSelector((state) => state.utils.utils.currency);
	const salesmenArr = useSelector((state) => state.utils.utils.sales);
	const chosenCompany = useSelector(selectChosenCompany);
	const initStateContract = {
		id: chosenCompany.id,
		start_at: new Date(),
		sales: loggedinSalesPerson.id,
		vat: false,
	};
	const [contract, setContract] = useState(initStateContract);
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState();
	const [inputValueSales, setInputValueSales] = useState(loggedinSalesPerson.name);
	const [inputValueCurrency, setInputValueCurrency] = useState('');
	const [inputValuePeriodicity, setInputValuePeriodicity] = useState('');

	const handleContract = (value, name) => {
		if (name === 'periodicity') {
			value = value ? value.value : '';
		} else if (name === 'currency') {
			value = value ? value.code : '';
		}

		setContract((prev) => ({
			...prev,
			[name]: name === 'members' || name === 'amount' ? Number(value) : value,
		}));

		if (chosenContract) {
			// in case of editing - this is the validation function
			validateEditedContract({ [name]: value }, errors, setErrors, setValidationResult);
		} else {
			// in case of new contract - this is the validation function
			validateContract({ [name]: value }, errors, setErrors, setValidationResult);
		}
	};

	//useEffect to populate fields in case of editing existing contract
	useEffect(() => {
		if (chosenContract) {
			setContract(chosenContract);
			// setParentValidationResult(true);
			setInputValueSales(chosenContract.sales.name);
			setInputValueCurrency(chosenContract.currency.name);
			const periodicityName = chargePeriods.find(
				(period) => period.value === chosenContract.periodicity,
			).name;
			setInputValuePeriodicity(periodicityName);
		}
	}, [chosenContract]);

	//submitting new contract only (not edited)

	const handleSubmit = async () => {
		try {
			const res = await axios.post(`${BASE_URL}${END_POINT.CONTRACT}`, {
				...contract,
				id: chosenCompany.id,
			});
			if (res.status === 200 || res.status === 201) {
				setContractCopy({ ...contract, contract_id: res.data.id });
				setContract({});
				dispatch(actionSnackBar.setSnackBar('success', 'Contract successfully created', 2000));
				setStep(2);
			}
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', 'Failed to create a contract', 2000));
		}
	};

	//relevant for new contract (not editing)

	const handleCancel = () => {
		dispatch(changeChosenCompany(null));
		history.push('/companies');
	};

	//relevant for editing mode

	const handleUpdate = async () => {
		setLoadingSidebar(true);
		//preparing contract data to put call
		const contractCopy = { ...contract };
		const contract_id = contract.contract_id;
		delete contractCopy.contract_id;
		delete contractCopy.invoices;
		delete contractCopy.signer_user;

		const currency = contract.currency?.code;
		contractCopy.currency = currency;
		const sales = contract.sales?.id;
		contractCopy.sales = sales;

		try {
			const res = await axios.put(`${BASE_URL}${END_POINT.CONTRACT}/${contract_id}`, contractCopy);

			if (res.status === 201 || res.status === 200) {
				// dispatch(actionSnackBar.setSnackBar('success', 'Successfully updated', 2000));
				setLoadingSidebar(false);
				setActiveSidebar(true);
				setValidationResult(false);
			}
		} catch (error) {
			setLoadingSidebar(false);
		}
	};

	return (
		<Grid container className={classes.page}>
			<Grid item xs={12}>
				<Grid container className={classes.formContainer}>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={12} className={classes.paddingBottom24px}>
								<Typography className={classes.informationTitle}>information</Typography>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<Grid container className={classes.paddingBottom20px}>
									<Grid item xs={6} className={classes.paddingRight10px}>
										<TextInputUnit
											className={classes.textFieldStyle}
											name="id"
											label={chosenCompany ? chosenCompany.name : ''}
											value={chosenCompany ? chosenCompany.name : ''}
											formObject={contract}
											handler={(e) => handleContract(e.target.value, 'id')}
											error={errors.id}
										/>
									</Grid>
									<Grid item xs={6} className={classes.PaddingLeft10px}>
										{salesmenArr && (
											<AutoCompleteUnit
												className={classes.textFieldStyle}
												name="sales"
												fieldForLabel="name"
												label="Sales Agent"
												options={salesmenArr}
												formObject={contract}
												handler={(e) => {
													e
														? handleContract(e.id, 'sales')
														: handleContract(e, 'sales');
												}}
												error={errors.sales}
												inputValue={inputValueSales}
												setInputValue={setInputValueSales}
											/>
										)}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<Grid container className={classes.paddingBottom20px}>
									<Grid item xs={6} className={classes.paddingRight10px}>
										<DateInputUnit
											className={classes.dateStyle}
											name="start_at"
											// label="Start Date"
											value={contract['start_at'] || new Date()}
											error={errors['start_at']}
											onChange={(date) => handleContract(date, 'start_at')}
										/>
									</Grid>
									{/* <Grid item xs={1}></Grid> */}
									<Grid item xs={6} className={classes.PaddingLeft10px}>
										{currenciesArr && (
											<AutoCompleteUnit
												className={classes.autoCompleteStyle}
												label="Currency"
												name="currency"
												fieldForLabel="name"
												options={currenciesArr}
												formObject={contract}
												handler={handleContract}
												error={errors.currency}
												inputValue={inputValueCurrency}
												setInputValue={setInputValueCurrency}
											/>
										)}
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container className={classes.paddingBottom30px}>
									<Grid item xs={6} className={classes.paddingRight26px}>
										<NumberInputUnit
											className={classes.textFieldStyle}
											name="amount"
											label="Amount"
											value={contract.amount || ''}
											onChange={(e) => handleContract(e.target.value, 'amount')}
											error={errors.amount}
											InputProps={{
												inputComponent: NumberFormatCustom,
												inputProps: {
													decimalNo: 2,
													minValue: 0,
												},
											}}
										/>
									</Grid>
									<Grid item xs={1}>
										<Typography className={classes.perStyle}>per</Typography>
									</Grid>
									<Grid item xs={5}>
										<AutoCompleteUnit
											className={classes.autoCompleteStyle}
											name="periodicity"
											label="Period"
											valueField="value"
											optionLabelField="name"
											fieldForLabel="name"
											formObject={contract.periodicity || ''}
											handler={handleContract}
											options={chargePeriods}
											error={errors.periodicity}
											inputValue={inputValuePeriodicity}
											setInputValue={setInputValuePeriodicity}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Divider className={classes.divider} />
					</Grid>

					<Grid container>
						<Grid item xs={12} className={`${classes.padding3000px} ${classes.vatGroupWrapper}`}>
							<Divider className={classes.divider} />
							<Grid item xs={6} className={classes.vatGroup}>
								<Typography className={`${classes.indiLabel} ${classes.vatLabel1}`}>
									Include
								</Typography>
								<StatusSwitch
									name="vat"
									onChange={(e) => handleContract(e.target.checked, 'vat')}
									checked={contract.vat}
									className={classes.switch}
								/>
								<Typography className={classes.vatLabel2}>VAT</Typography>
							</Grid>

							<Divider className={classes.divider} />
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={12} className={classes.padding3000px}>
							<Grid container className={classes.paddingBottom20px}>
								<Grid item xs={3}>
									<Typography className={classes.indiLabel}>Yearly Amount</Typography>
								</Grid>
								<Grid item xs={6}>
									<Grid container>
										<Grid item xs={12} className={classes.boxStyle}>
											<Typography className={classes.amountType}>
												{contract.currency && contract.amount && contract.periodicity
													? `${
															typeof contract.currency === 'string'
																? currenciesArr.find(
																		(currency) =>
																			currency.code ===
																			contract.currency,
																  ).symbol
																: contract.currency.symbol
													  }${(
															contract.amount *
															periodToNum[contract.periodicity]
													  ).toLocaleString()}`
													: '0'}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Divider className={classes.divider} />
			</Grid>

			<Grid container>
				<Grid item xs={12} className={classes.padding3000px}>
					<Grid
						container
						className={classes.membersContainer}
						style={stepperMode ? {} : { paddingBottom: 5 }}
					>
						<Grid item xs={3}>
							<Typography className={classes.membersStyle}>Members</Typography>
						</Grid>
						<Grid container>
							<Grid item xs={6}>
								<Grid item xs={12}>
									<NumberInputUnit
										className={`${classes.memberField} ${classes.textFieldStyle}`}
										name="members"
										value={contract.members || ''}
										onChange={(e) => handleContract(e.target.value, 'members')}
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
								{chosenCompany && chosenCompany.members && (
									<Grid item xs={12}>
										<Typography className={classes.note}>
											* Minimal No. is {chosenCompany.members.length}
										</Typography>
									</Grid>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{stepperMode ? (
				<Grid container>
					<ButtonRow
						style={{ position: 'absolute', bottom: 0 }}
						validationResult={validationResult}
						handlerLeft={handleCancel}
						handlerRight={handleSubmit}
						textButtonLeft="Cancel"
						textButtonRight="Done"
					/>
				</Grid>
			) : (
				<>
					<Grid container>
						<Divider className={classes.divider} style={{ width: '100%', marginTop: 25 }} />
						<Grid item>
							<Typography className={classes.comment}>
								*Changes will apply from next payment
							</Typography>
						</Grid>
					</Grid>
					<Grid container className={classes.btnContainer} justifyContent="flex-end">
						<Grid item xs={4} style={{ marginTop: 15 }}>
							<FilledButton disabled={!validationResult} onClick={handleUpdate}>
								Update
							</FilledButton>
						</Grid>
					</Grid>
				</>
			)}
		</Grid>
	);
}

export default Contract;