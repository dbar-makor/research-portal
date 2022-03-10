import { useState, useEffect } from 'react';
import { Grid, Typography, IconButton, TextField } from '@material-ui/core';
import { format } from 'date-fns';
import { useStyles } from '../../../styles/InfoStyles';
import { EditIconButton } from '../../../styles/MainStyles';
import EditIcon from '@material-ui/icons/Edit';
import { ReactComponent as EditDone } from '../../../assets/icons/IconEditDone.svg';
import DateInputUnit from '../../Reusables/DateInputUnit';
import { useSelector, useDispatch } from 'react-redux';
import { Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { formatDistance, isValid } from 'date-fns';
import { validateProspectTrial } from '../../Reusables/validationFunctions';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import * as actionSnackBar from '../../../redux/SnackBar/action';
import {
	selectSearch,
	selectType,
	selectStatus,
	selectOffset,
	selectLimit,
	getCompaniesDataAsync,
} from '../../../redux/companies/companiesSlice';
import { getChosenCompanyAsync } from '../../../redux/companies/chosenCompanySlice';

function InitialCompanyStateBlock(props) {
	const classes = useStyles();
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
	const type = useSelector(selectType);
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
		console.log('key', value);
		const stateCopy = { ...stateToUpdate, [key]: value };
		setStateToUpdate(stateCopy);

		validateProspectTrial({ [key]: value }, errors, setErrors, stateCopy);
	};

	const sendUpdatedTrial = async (id) => {
		console.log('errors', errors);
		console.log('stateToUpdate', stateToUpdate);
		const trialToSend = { ...stateToUpdate };
		console.log('trialToSend', trialToSend);
		setTrialEditMode(false);
		for (const [key, value] of Object.entries(errors)) {
			console.log('key', key);
			console.log('value', value);
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
		console.log('trialToSend AFTER', trialToSend);
		try {
			const res = await axios.put(`${BASE_URL}${END_POINT.PROSPECT}/${id}`, trialToSend);
			if (res.status === 201) {
				console.log('reeeees', res);
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully updated', 2000));
				dispatch(getChosenCompanyAsync(id));
				dispatch(getCompaniesDataAsync(offset, limit, search, type, status));
				setErrors({ ...errors, ales_agent: '', start_at: '', end_at: '' });
			}
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'Update failed', 2000));
		}
	};

	const datesAreOnSameDay = (first, second) => {
		console.log('first', first);
		console.log('second', second);
		return (
			first.getFullYear() === second.getFullYear() &&
			first.getMonth() === second.getMonth() &&
			first.getDate() === second.getDate()
		);
	};

	useEffect(() => {
		console.log('new Date(stateToUpdate.start_at)', new Date(stateToUpdate.start_at));
		console.log('new Date(stateToUpdate.end_at)', new Date(stateToUpdate.end_at));
		// console.log('datesAreOnSameDay', datesAreOnSameDay(new Date(stateToUpdate.start_at) === new Date(stateToUpdate.end_at)))
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
			console.log(
				'datesAreOnSameDay',
				datesAreOnSameDay(new Date(stateToUpdate.start_at), new Date(stateToUpdate.end_at)),
			);
			setTrialPeriod('1 day');
		} else {
			setTrialPeriod('-');
		}
		console.log('stateToUpdate', stateToUpdate);
	}, [stateToUpdate.start_at, stateToUpdate.end_at]);

	useEffect(() => {
		console.log('trialPeriod', trialPeriod);
	}, [trialPeriod]);

	return props ? (
		<Grid container>
			<Grid item xs={12}>
				{props.type === 'prospect' ? (
					<Grid container justifyContent="space-between" alignItems="center">
						<Typography className={classes.blockHeader}>{props.title.replaceAll('_', ' ')}</Typography>
						{trialEditMode ? (
							<IconButton onClick={() => sendUpdatedTrial(props.id)} className={classes.editDoneBtn}>
								<EditDone />
							</IconButton>
						) : (
							<EditIconButton onClick={() => setTrialEditMode(true)}>
								<EditIcon style={{ fontSize: '18px' }} />
							</EditIconButton>
						)}
					</Grid>
				) : (
					<Typography className={classes.blockHeader}>{props.title.replaceAll('_', ' ')}</Typography>
				)}
			</Grid>
			<Grid item xs={12} className={classes.marginBottom8}>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item xs={3}>
						<Typography className={classes.fieldName}>Agent</Typography>
					</Grid>
					<Grid item xs={8}>
						{trialEditMode ? (
							<Autocomplete
								className={classes.salesAutocomplete}
								name="sales_agent"
								options={salesmenArr}
								value={stateToUpdate.sales_agent}
								inputValue={inputValue}
								// onBlur={() => sendUpdatedCompany()}
								getOptionSelected={(option, value) => option.name === value.name}
								popupIcon={<SearchIcon style={{ color: '#1C67FF', fontSize: '18px' }} />}
								getOptionLabel={(option) => {
									return option.name;
								}}
								// error={errors.country}
								onChange={(e, newValue) => handleTrialChange('sales_agent', newValue)}
								onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
								renderInput={(params) => (
									<TextField
										{...params}
										style={{ width: '100%' }}
										autoComplete="off"
										{...(errors.sales_agent && {
											error: true,
											helperText: errors.sales_agent,
										})}
										// InputProps={{
										//   startAdornment:  <InputAdornment position="start"> <LocationIcon />
										//   </InputAdornment>
										// }}
									/>
								)}
							/>
						) : (
							<Grid container justifyContent="flex-end">
								<Typography className={classes.fieldContent}>
									{props.sales_agent && props.sales_agent.name}
								</Typography>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} className={classes.marginBottom8}>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item>
						<Typography className={classes.fieldName}>Start Date</Typography>
					</Grid>
					<Grid item xs={7}>
						<Grid container justifyContent="flex-end">
							{trialEditMode ? (
								<DateInputUnit
									label=""
									value={stateToUpdate.start_at}
									onChange={(date) => handleTrialChange('start_at', date)}
									inputVariant="standard"
									iconFontSize="17px"
									datePickerClass={classes.datePickerClass}
									error={errors['start_at']}
								/>
							) : (
								<Typography className={classes.fieldContent}>
									{format(new Date(props.start_at), 'dd MMM, yyyy')}
								</Typography>
							)}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{props.title === 'prospect_trial' && (
				<>
					<Grid item xs={12} className={classes.marginBottom8}>
						<Grid container justifyContent="space-between" alignItems="center">
							<Grid item>
								<Typography className={classes.fieldName}>End Date</Typography>
							</Grid>
							<Grid item xs={7}>
								<Grid container justifyContent="flex-end">
									{trialEditMode ? (
										<DateInputUnit
											label=""
											value={stateToUpdate.end_at}
											onChange={(date) => handleTrialChange('end_at', date)}
											inputVariant="standard"
											iconFontSize="17px"
											datePickerClass={classes.datePickerClass}
											error={errors['end_at']}
										/>
									) : (
										<Typography className={classes.fieldContent}>
											{format(new Date(props.end_at), 'dd MMM, yyyy')}
										</Typography>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} className={classes.marginBottom8}>
						<Grid container justifyContent="space-between" alignItems="center">
							<Grid item>
								<Typography className={classes.fieldName}>Trial Period</Typography>
							</Grid>
							<Grid item>
								<Typography className={classes.fieldContent}>{trialPeriod}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</>
			)}
		</Grid>
	) : null;
}

export default InitialCompanyStateBlock;
