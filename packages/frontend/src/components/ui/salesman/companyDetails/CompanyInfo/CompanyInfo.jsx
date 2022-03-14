import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { formatDistance } from 'date-fns';
import axios from 'axios';
import {
	getCompaniesDataAsync,
	selectSearch,
	selectType,
	selectStatus,
	selectOffset,
	selectLimit,
} from '../../../../../redux/companies/companiesSlice';
import {
	selectChosenCompany,
	getChosenCompanyAsync,
	changeChosenCompany,
} from '../../../../../redux/companies/chosenCompanySlice';
import CompanyInfoView from './CompanyInfo.view';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';

const CompanyInfo = () => {
	const currentCompany = useSelector(selectChosenCompany);
	const dispatch = useDispatch();
	const [trialPeriod, setTrialPeriod] = useState();
	const [openAlert, setOpenAlert] = useState(false);
	const search = useSelector(selectSearch);
	const type = useSelector(selectType);
	const status = useSelector(selectStatus);
	const offset = useSelector(selectOffset);
	const limit = useSelector(selectLimit);
	const [chosenCompany, setChosenCompany] = useState(null);
	const countriesArr = useSelector((state) => state.utils.utils.country);
	const [inputValue, setInputValue] = useState('');
	const history = useHistory();
	const [openDialog, setOpenDialog] = useState(false);

	useEffect(() => {
		if (currentCompany) {
			const chosenCompanyCopy = { ...currentCompany, isEditMode: false };
			setChosenCompany(chosenCompanyCopy);
			setInputValue(currentCompany.country.name);
		}
	}, [currentCompany]);

	const handleCloseAlert = () => {
		setOpenAlert(false);
	};
	const handleOpenAlert = () => {
		setOpenAlert(true);
	};

	useEffect(() => {
		if (
			chosenCompany &&
			chosenCompany.prospect_trial &&
			chosenCompany.prospect_trial.start_at &&
			chosenCompany.prospect_trial.end_at
		) {
			setTrialPeriod(
				formatDistance(
					new Date(chosenCompany.prospect_trial.start_at),
					new Date(chosenCompany.prospect_trial.end_at),
				),
			);
		}
	}, [chosenCompany]);

	const currentContractProps = {
		title: 'current',
		contract: chosenCompany && chosenCompany.current_contract && chosenCompany.current_contract,
		contractStatus:
			chosenCompany &&
			chosenCompany.contract_status !== undefined &&
			chosenCompany.contract_status !== null &&
			chosenCompany.contract_status,
	};

	const lastContractProps = {
		title: 'last',
		contract: chosenCompany && chosenCompany.last_contract && chosenCompany.last_contract,
	};

	const prospectTrialProps = {
		id: chosenCompany && chosenCompany.id,
		title: 'prospect_trial',
		type: chosenCompany && chosenCompany.type,
		sales_agent:
			chosenCompany && chosenCompany.prospect_trial && chosenCompany.prospect_trial.sales_agent,
		start_at: chosenCompany && chosenCompany.prospect_trial && chosenCompany.prospect_trial.start_at,
		end_at: chosenCompany && chosenCompany.prospect_trial && chosenCompany.prospect_trial.end_at,
		trial_period: trialPeriod && trialPeriod,
	};

	const companyRegisteredProps = {
		title: 'company_registered',
		sales_agent:
			chosenCompany && chosenCompany.company_registered && chosenCompany.company_registered.sales_agent,
		start_at:
			chosenCompany && chosenCompany.company_registered && chosenCompany.company_registered.start_at,
	};

	const deleteCompany = async (id) => {
		try {
			const res = await axios.delete(`${BASE_URL}${END_POINT.COMPANY}/${id}`);
			if (res.status === 200) {
				handleCloseAlert();
				dispatch(changeChosenCompany(null));
				dispatch(getCompaniesDataAsync(offset, limit, search, type, status));
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully deleted', 2000));
			}
		} catch (error) {
			handleCloseAlert();
			dispatch(actionSnackBar.setSnackBar('error', 'Delete failed', 2000));
		}
	};

	const upgradeToClient = async (id) => {
		try {
			const res = await axios.put(`${BASE_URL}${END_POINT.COMPANY}${END_POINT.UPGRADE}/${id}`);
			if (res.status === 201) {
				dispatch(getChosenCompanyAsync(id));
				dispatch(getCompaniesDataAsync(offset, limit, search, type, status));
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully upgraded', 2000));
			}
		} catch (error) {
			handleCloseAlert();
			dispatch(actionSnackBar.setSnackBar('error', 'Upgrade failed', 2000));
		}
	};

	const updateCompanyField = (key, value) => {
		const companyCopy = { ...chosenCompany };
		companyCopy[key] = value;
		setChosenCompany(companyCopy);
	};

	const sendUpdatedCompany = async () => {
		setChosenCompany({ ...chosenCompany, isEditMode: !chosenCompany.isEditMode });
		const companyCopy = {};
		companyCopy.status = chosenCompany.status;
		companyCopy.country = chosenCompany.country
			? chosenCompany.country.code
			: currentCompany.country.code;
		companyCopy.name = chosenCompany.name ? chosenCompany.name : currentCompany.name;
		try {
			const res = await axios.put(`${BASE_URL}${END_POINT.COMPANY}/${chosenCompany.id}`, companyCopy);
			if (res.status === 201) {
				dispatch(getChosenCompanyAsync(chosenCompany.id));
				dispatch(getCompaniesDataAsync(offset, limit, search, type, status));
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully updated', 2000));
			}
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'Update failed', 2000));
		}
	};

	const openContractDialong = () => {
		setOpenDialog(!openDialog);
	};

	const closeContractDialong = () => {
		setOpenDialog(!openDialog);
	};
	return (
		<CompanyInfoView
			chosenCompany={chosenCompany}
			updateCompanyField={updateCompanyField}
			setChosenCompany={setChosenCompany}
			openAlert={openAlert}
			handleOpenAlert={handleOpenAlert}
			handleCloseAlert={handleCloseAlert}
			deleteCompany={deleteCompany}
			countriesArr={countriesArr}
			inputValue={inputValue}
			setInputValue={setInputValue}
			currentContractProps={currentContractProps}
			lastContractProps={lastContractProps}
			prospectTrialProps={prospectTrialProps}
			companyRegisteredProps={companyRegisteredProps}
			openContractDialong={openContractDialong}
			closeContractDialong={closeContractDialong}
			upgradeToClient={upgradeToClient}
			history={history}
			sendUpdatedCompany={sendUpdatedCompany}
			openDialog={openDialog}		>
			{' '}
		</CompanyInfoView>
	);
};
CompanyInfo.displayName = 'CompanyInfo';
CompanyInfo.defaultProps = {};

export default React.memo(CompanyInfo);
