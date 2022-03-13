import { useEffect, useState } from 'react';
import { Grid, Typography, Divider, TextField } from '@material-ui/core';
import { useStyles } from '../../../styles/InfoStyles';
import {
	GreenFilledButton,
	BinButton,
	EditButton,
	LinkButton,
	FilledButton,
	CompanyStatusSwitch,
	EditDoneButton,
} from '../../../styles/MainStyles';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/IconTrash.svg';
import { ReactComponent as LocationIcon } from '../../../assets/icons/iconLocation.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/IconEdit.svg';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import clsx from 'clsx';
import InitialCompanyStateBlock from './InitialCompanyStateBlock';
import { formatDistance } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectChosenCompany,
	getChosenCompanyAsync,
	changeChosenCompany,
} from '../../../redux/companies/chosenCompanySlice';
import ContractBlock from './ContractBlock';
import DeleteAlert from '../../Reusables/DeleteAlert';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import axios from 'axios';
import {
	getCompaniesDataAsync,
	selectSearch,
	selectType,
	selectStatus,
	selectOffset,
	selectLimit,
} from '../../../redux/companies/companiesSlice';
import { Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { ReactComponent as WhiteCheckIcon } from '../../../assets/icons/IconWhiteCheck.svg';
import { useHistory } from 'react-router';
import ContractsModal from '../ContractAndInvoices/ContractModal';
import * as actionSnackBar from '../../../redux/SnackBar/action';

function CompanyInfo() {
	const currentCompany = useSelector(selectChosenCompany);
	const classes = useStyles();
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
	// const [companyToSend, setCompanyToSend] = useState({})

	useEffect(() => {
		if (currentCompany) {
			const chosenCompanyCopy = { ...currentCompany, isEditMode: false };
			// const updatedRows = rowsCopy.map((row) => ({
			//   ...row,
			//   isEditMode: false
			// }))
			setChosenCompany(chosenCompanyCopy);
			// setCompanyToSend({...companyToSend, name: currentCompany.name, country: currentCompany.country.code, status: currentCompany.status})
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
		// contractStatus: true
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
		// if (value !== null && value !== undefined && value !== '') {
		// console.log('value!!!', value);
		//   setCompanyToSend(prev => ({
		//     ...prev,
		//     [key]: value
		// }))
		// console.log('companyToSend', companyToSend)

		const companyCopy = { ...chosenCompany };
		companyCopy[key] = value;
		setChosenCompany(companyCopy);
		// if (key === 'status') {
		// //   console.log('companyCopy status', companyCopy)
		// //   console.log('chosenCompany status', chosenCompany)
		//   sendUpdatedCompany(key, value)
		// }
		// }
	};

	const sendUpdatedCompany = async () => {
		// const companyCopy = {...chosenCompany, [key]: value}
		setChosenCompany({ ...chosenCompany, isEditMode: !chosenCompany.isEditMode });
		// if (chosenCompany.name && chosenCompany.country) {
		//   console.log('YES')
		const companyCopy = {};
		// // companyCopy[key] = value
		companyCopy.status = chosenCompany.status;
		companyCopy.country = chosenCompany.country
			? chosenCompany.country.code
			: currentCompany.country.code;
		companyCopy.name = chosenCompany.name ? chosenCompany.name : currentCompany.name;
		// setChosenCompany(companyCopy)
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
		// }
	};

	const openContractDialong = () => {
		setOpenDialog(!openDialog);
	};

	const closeContractDialong = () => {
		setOpenDialog(!openDialog);
	};

	return chosenCompany ? (
		<Grid container className={classes.infoContainer}>
			<Grid item xs={12}>
				<Grid container alignItems="center">
					<Grid item xs={1}>
						LOGO
					</Grid>
					<Grid item xs={11}>
						<Grid container alignItems="center">
							<Grid item xs={12}>
								<Grid container justifyContent="space-between" alignItems="center">
									<Grid item xs={6}>
										<Grid container alignItems="center" justifyContent="space-between">
											<Grid item xs={chosenCompany.name.length > 14 ? 8 : 6}>
												{chosenCompany.isEditMode ? (
													<TextField
														value={chosenCompany.name}
														inputProps={{
															style: {
																textTransform: 'capitalize',
																fontSize: '20px',
																fontWeight: 600,
																color: '#0F0F0F',
															},
														}}
														onChange={(e) =>
															updateCompanyField('name', e.target.value)
														}
														// onBlur={() => sendUpdatedCompany()}
													/>
												) : (
													<Typography className={classes.companyName}>
														{chosenCompany.name.length > 18
															? `${chosenCompany.name.slice(0, 18)}...`
															: chosenCompany.name}
													</Typography>
												)}
											</Grid>
											<Grid item xs={1}></Grid>
											<Grid item xs={3}>
												<Grid
													container
													alignItems={
														chosenCompany.isEditMode ? 'flex-start' : 'center'
													}
													justifyContent={
														chosenCompany.isEditMode ? 'flex-end' : 'flex-start'
													}
												>
													<Grid item xs={3}>
														{chosenCompany.isEditMode ? (
															<CompanyStatusSwitch
																checked={chosenCompany.status}
																onChange={(e) =>
																	updateCompanyField(
																		'status',
																		e.target.checked,
																	)
																}
															/>
														) : (
															<FiberManualRecordIcon
																style={{
																	fontSize: '14px',
																	fill: chosenCompany.status
																		? '#00CA80'
																		: '#FF3939',
																}}
															/>
														)}
													</Grid>
													<Grid item xs={9}>
														<Typography
															style={{
																marginLeft:
																	chosenCompany.isEditMode && '12px',
															}}
															className={clsx({
																[classes.statusActive]: chosenCompany.status,
																[classes.statusInactive]:
																	!chosenCompany.status,
															})}
														>
															{chosenCompany.status ? 'Active' : 'Inactive'}
														</Typography>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={2}>
										<Grid container alignItems="center" justifyContent="flex-end">
											<Grid item style={{ marginRight: '16px' }}>
												{chosenCompany.isEditMode ? (
													<EditDoneButton onClick={() => sendUpdatedCompany()}>
														<WhiteCheckIcon />
													</EditDoneButton>
												) : (
													<EditButton
														onClick={() =>
															setChosenCompany({
																...chosenCompany,
																isEditMode: !chosenCompany.isEditMode,
															})
														}
														//  onBlur={() => setIsEditMode(false)}
													>
														<EditIcon />
													</EditButton>
												)}
											</Grid>
											<Grid item>
												<BinButton onClick={handleOpenAlert}>
													<DeleteIcon />
												</BinButton>
												<DeleteAlert
													open={openAlert}
													handleClose={handleCloseAlert}
													itemName={chosenCompany.name}
													itemId={chosenCompany.id}
													itemCategory="Company"
													deleteItem={deleteCompany}
												/>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								{chosenCompany.isEditMode && countriesArr ? (
									<Autocomplete
										name="country"
										options={countriesArr}
										value={chosenCompany.country}
										inputValue={inputValue}
										// onBlur={() => sendUpdatedCompany()}
										getOptionSelected={(option, value) => option.name === value.name}
										popupIcon={<SearchIcon style={{ color: '#1C67FF' }} />}
										getOptionLabel={(option) => {
											return option.name;
										}}
										// error={errors.country}
										onChange={(e, newValue) => updateCompanyField('country', newValue)}
										onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
										renderInput={(params) => (
											<TextField
												{...params}
												style={{ width: '25%' }}
												autoComplete="off"
												// InputProps={{
												//   startAdornment:  <InputAdornment position="start"> <LocationIcon />
												//   </InputAdornment>
												// }}
											/>
										)}
									/>
								) : (
									<Grid container alignItems="center">
										<Grid item>
											<LocationIcon />
										</Grid>
										<Grid item>
											<Typography className={classes.locationName}>
												{chosenCompany.country.name}
											</Typography>
										</Grid>
									</Grid>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Divider className={classes.infoDivider} />
			<Grid container spacing={4}>
				{chosenCompany.type === 'client' && (
					<Grid item xs={4} style={{ marginTop: '35px' }}>
						<ContractBlock {...currentContractProps} />
					</Grid>
				)}
				{chosenCompany.type === 'client' && chosenCompany.last_contract && (
					<Grid item xs={4} style={{ marginTop: '25px' }}>
						<ContractBlock {...lastContractProps} />
					</Grid>
				)}
				{chosenCompany.prospect_trial && (
					<Grid item xs={4} style={{ marginTop: '25px' }}>
						<InitialCompanyStateBlock {...prospectTrialProps} />
					</Grid>
				)}

				{chosenCompany.company_registered && (
					<Grid item xs={4} style={{ marginTop: '25px' }}>
						<InitialCompanyStateBlock {...companyRegisteredProps} />
					</Grid>
				)}
			</Grid>

			{/* {chosenCompany.type === 'client' ? (
          <Grid container justifyContent='flex-end'>
            <LinkButton className={classes.upgradeBtn}>
              Contracts & Invoices
            </LinkButton>
          </Grid>
      ) : null} */}

			<Grid item xs={12}>
				<Grid container justifyContent="flex-end">
					<Grid item xs={6}>
						{chosenCompany.type === 'client' &&
						(chosenCompany.contract_status || chosenCompany.last_contract) ? (
							<Grid container justifyContent="flex-end">
								<LinkButton
									className={classes.upgradeBtn}
									onClick={() => openContractDialong(chosenCompany.id)}
								>
									Contracts & Invoices
								</LinkButton>
							</Grid>
						) : null}
						<ContractsModal
							onClose={() => closeContractDialong()}
							isOpen={openDialog}
							client={chosenCompany}
						/>
					</Grid>
					{!chosenCompany.contract_status ? (
						<Grid item xs={3}>
							<Grid container justifyContent="flex-end">
								{chosenCompany.type === 'prospect' ? (
									<GreenFilledButton
										className={classes.upgradeBtn}
										onClick={() => upgradeToClient(chosenCompany.id)}
									>
										Upgrade to Client
									</GreenFilledButton>
								) : (
									<FilledButton
										className={classes.signBtn}
										onClick={() => history.push('/contract')}
									>
										Sign a Contract
									</FilledButton>
								)}
							</Grid>
						</Grid>
					) : null}
				</Grid>
			</Grid>
		</Grid>
	) : null;
	//     <Grid item xs={12}>
	//     <Grid
	//       container
	//       justifyContent='center'
	//       alignItems='center'
	//       style={{ minHeight: '343px' }}
	//     //   className={mainClasses.progressBarContainer}
	//     >
	//       <CircularProgress className={mainClasses.progressBar} />
	//     </Grid>
	//   </Grid>
}

export default CompanyInfo;
