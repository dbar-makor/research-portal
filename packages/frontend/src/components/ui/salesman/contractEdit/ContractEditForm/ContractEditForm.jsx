import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { selectChosenCompany } from '../../../../../redux/companies/chosenCompanySlice';

import ContractEditFormView from './ContractEditForm.view';

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
const ContractEditForm = (props) => {
  const { contract } = props;
	const currenciesArr = useSelector((state) => state.utils.utils.currency);
	const countriesArr = useSelector((state) => state.utils.utils.country);
	const salesmenArr = useSelector((state) => state.utils.utils.sales);
	const chosenCompany = useSelector(selectChosenCompany);

	const loggedinSalesPersonBigObject = useSelector((state) => state.auth.userContent);
	const loggedinSalesPerson = {
		id: loggedinSalesPersonBigObject.id,
		name: loggedinSalesPersonBigObject.name,
	};

	// eslint-disable-next-line no-unused-vars
	const [errors, setErrors] = useState({});
	// eslint-disable-next-line no-unused-vars
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
  return <ContractEditFormView
    contractForm={contractForm}
    salesmenArr={salesmenArr}
    handleContract={handleContract}
    errors={errors}
    inputValueSales={inputValueSales}
    setInputValueSales={setInputValueSales}
    countriesArr={countriesArr}
    inputValueCountry={inputValueCountry}
    setInputValueCountry={setInputValueCountry}
    setInputValuePeriodicity={setInputValuePeriodicity}
    currenciesArr={currenciesArr}
    inputValueCurrency={inputValueCurrency}
    setInputValueCurrency={setInputValueCurrency}
    chosenCompany={chosenCompany}
    periodToNum={periodToNum}
  ></ContractEditFormView>;
};

ContractEditForm.displayName = 'ContractEditForm';
ContractEditForm.defaultProps = {};

export default React.memo(ContractEditForm);
