import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { formatDistance, isValid } from 'date-fns';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import {
	selectSearch,
	selectType,
	selectStatus,
	selectOffset,
	selectLimit,
	getCompaniesDataAsync,
} from '../../../../../redux/companies/companiesSlice';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';
import { getChosenCompanyAsync } from '../../../../../redux/companies/chosenCompanySlice';
import { validateProspectTrial } from '../../../../Reusables/validationFunctions';
import InitialCompanyStateBlockView from './InitialCompanyStateBlock.view';

const InitialCompanyStateBlock = (props) => {
	console.log('props', props);
	const end_at = props.end_at;
	const id = props.id;
	const sales_agent = props.sales_agent;
	const start_at = props.start_at;
	const title = props.title;
	const trial_period = props.trial_period;
	const type = props.type;
	const dispatch = useDispatch();
	const [trialEditMode, setTrialEditMode] = useState(false);
	const salesmenArr = useSelector((state) => state.utils.utils.sales);
	const [inputValue, setInputValue] = useState('');
	const [stateToUpdate, setStateToUpdate] = useState({
		sales_agent: {
			name: '',
			id: '',
		},
		start_at: '',
		end_at: '',
	});
	const [trialPeriod, setTrialPeriod] = useState('-');
	const [errors, setErrors] = useState({
		sales_agent: '',
		start_at: '',
		end_at: '',
	});
	const search = useSelector(selectSearch);
	const stype = useSelector(selectType);
	const status = useSelector(selectStatus);
	const offset = useSelector(selectOffset);
	const limit = useSelector(selectLimit);

	useEffect(() => {
		setStateToUpdate({
			...stateToUpdate,
			sales_agent: props.sales_agent,
			start_at: props.start_at,
			end_at: props.end_at,
		});
	}, []);

	const handleTrialChange = (key, value) => {
		const stateCopy = { ...stateToUpdate, [key]: value };
		setStateToUpdate(stateCopy);

		validateProspectTrial({ [key]: value }, errors, setErrors, stateCopy);
	};

	const sendUpdatedTrial = async (id) => {
		const trialToSend = { ...stateToUpdate };
		setTrialEditMode(false);
		for (const [key, value] of Object.entries(errors)) {
			if (value) {
				if (key === 'sales_agent') {
					trialToSend[key] = props['sales_agent'].id;
				} else {
					trialToSend[key] = props[key];
				}
			} else {
				if (key === 'sales_agent') {
					trialToSend[key] = stateToUpdate['sales_agent'].id;
				}
			}
		}
		try {
			const res = await axios.put(`${BASE_URL}${END_POINT.PROSPECT}/${id}`, trialToSend);
			if (res.status === 201) {
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully updated', 2000));
				dispatch(getChosenCompanyAsync(id));
				dispatch(getCompaniesDataAsync(offset, limit, search, stype, status));
				setErrors({ ...errors, ales_agent: '', start_at: '', end_at: '' });
			}
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'Update failed', 2000));
		}
	};

	const datesAreOnSameDay = (first, second) => {
		return (
			first.getFullYear() === second.getFullYear() &&
			first.getMonth() === second.getMonth() &&
			first.getDate() === second.getDate()
		);
	};

	useEffect(() => {
		if (
			stateToUpdate.start_at &&
			stateToUpdate.end_at &&
			isValid(new Date(stateToUpdate.start_at)) &&
			isValid(new Date(stateToUpdate.end_at)) &&
			new Date(stateToUpdate.start_at) < new Date(stateToUpdate.end_at)
		) {
			setTrialPeriod(formatDistance(new Date(stateToUpdate.start_at), new Date(stateToUpdate.end_at)));
		} else if (
			stateToUpdate.start_at &&
			stateToUpdate.end_at &&
			isValid(new Date(stateToUpdate.start_at)) &&
			isValid(new Date(stateToUpdate.end_at)) &&
			datesAreOnSameDay(new Date(stateToUpdate.start_at), new Date(stateToUpdate.end_at))
		) {
			setTrialPeriod('1 day');
		} else {
			setTrialPeriod('-');
		}
	}, [stateToUpdate.start_at, stateToUpdate.end_at]);
	return (
		<InitialCompanyStateBlockView
			trialEditMode={trialEditMode}
			sendUpdatedTrial={sendUpdatedTrial}
			setInputValue={setInputValue}
			trialPeriod={trialPeriod}
			setTrialEditMode={setTrialEditMode}
			handleTrialChange={handleTrialChange}
			salesmenArr={salesmenArr}
			stateToUpdate={stateToUpdate}
			inputValue={inputValue}
			errors={errors}
			end_at={end_at}
			id={id}
			sales_agent={sales_agent}
			start_at={start_at}
			title={title}
			trial_period={trial_period}
			type={type}
		></InitialCompanyStateBlockView>
	);
};

InitialCompanyStateBlock.displayName = 'InitialCompanyStateBlock';
InitialCompanyStateBlock.defaultProps = {};

export default React.memo(InitialCompanyStateBlock);
