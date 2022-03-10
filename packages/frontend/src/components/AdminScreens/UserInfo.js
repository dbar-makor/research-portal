import { useEffect, useState } from 'react';
import { Grid, Typography, Divider, TextField } from '@material-ui/core';
import { useStyles } from '../../styles/InfoStyles';
import { BinButton, EditButton, CompanyStatusSwitch, EditDoneButton } from '../../styles/MainStyles';
import { ReactComponent as DeleteIcon } from '../../assets/icons/IconTrash.svg';
import { ReactComponent as LocationIcon } from '../../assets/icons/iconLocation.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/IconEdit.svg';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import DeleteAlert from '../Reusables/DeleteAlert';
import { BASE_URL, END_POINT } from '../../utils/constants';
import axios from 'axios';
import { Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { ReactComponent as WhiteCheckIcon } from '../../assets/icons/IconWhiteCheck.svg';
import * as actionSnackBar from '../../redux/SnackBar/action';
import { selectChosenUserData, getUserByIdAsync, changeChosenUser } from '../../redux/users/chosenUserSlice';
import UserInfoBlock from './UserInfoBlock';
import {
	getUsersByTypeAsync,
	selectUsersLimit,
	selectUsersOffset,
	selectUsersStatus,
	selectUsersSearch,
} from '../../redux/users/usersSlice';

function UserInfo() {
	const currentUser = useSelector(selectChosenUserData);
	const classes = useStyles();
	const dispatch = useDispatch();
	const [openAlert, setOpenAlert] = useState(false);
	// const search = useSelector(selectSearch)
	// const type = useSelector(selectType)
	// const status = useSelector(selectStatus)
	// const offset = useSelector(selectOffset)
	// const limit = useSelector(selectLimit)
	const [chosenUser, setChosenUser] = useState(null);
	const countriesArr = useSelector((state) => state.utils.utils.country);
	const [inputValue, setInputValue] = useState('');
	const userOffset = useSelector(selectUsersOffset);
	const userLimit = useSelector(selectUsersLimit);
	const userSearch = useSelector(selectUsersSearch);
	const userStatus = useSelector(selectUsersStatus);

	useEffect(() => {
		if (currentUser) {
			const chosenUserCopy = { ...currentUser, isEditMode: false };
			// const updatedRows = rowsCopy.map((row) => ({
			//   ...row,
			//   isEditMode: false
			// }))
			setChosenUser(chosenUserCopy);
			// setCompanyToSend({...companyToSend, name: currentCompany.name, country: currentCompany.country.code, status: currentCompany.status})
			setInputValue(currentUser.country.name);
		}
	}, [currentUser]);

	const handleCloseAlert = () => {
		setOpenAlert(false);
	};
	const handleOpenAlert = () => {
		setOpenAlert(true);
	};

	const deleteUser = async (id) => {
		try {
			const res = await axios.delete(`${BASE_URL}${END_POINT.USER}/${id}`);
			if (res.status === 200) {
				console.log(res);
				handleCloseAlert();
				dispatch(changeChosenUser(null));
				dispatch(getUsersByTypeAsync(userOffset, userLimit, userSearch, chosenUser.type, userStatus));
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully deleted', 2000));
			}
		} catch (error) {
			console.log('error.response', error.response);
			handleCloseAlert();
			dispatch(actionSnackBar.setSnackBar('error', 'Delete failed', 2000));
		}
	};

	const updateUserField = (key, value) => {
		// if (value !== null && value !== undefined && value !== '') {
		console.log('value!!!', value);
		//   setCompanyToSend(prev => ({
		//     ...prev,
		//     [key]: value
		// }))
		// console.log('companyToSend', companyToSend)

		const userCopy = { ...chosenUser };
		userCopy[key] = value;
		setChosenUser(userCopy);
		// if (key === 'status') {
		// //   console.log('companyCopy status', companyCopy)
		// //   console.log('chosenCompany status', chosenCompany)
		//   sendUpdatedCompany(key, value)
		// }
		// }
	};

	const sendUpdatedUser = async () => {
		// const companyCopy = {...chosenCompany, [key]: value}
		setChosenUser({ ...chosenUser, isEditMode: false });
		// if (chosenCompany.name && chosenCompany.country) {
		//   console.log('YES')
		const userCopy = {};
		// // companyCopy[key] = value
		userCopy.status = chosenUser.status;
		userCopy.country = chosenUser.country ? chosenUser.country.code : currentUser.country.code;
		userCopy.name = chosenUser.name ? chosenUser.name : currentUser.name;
		userCopy.username = chosenUser.username ? chosenUser.username : currentUser.username;
		userCopy.email = chosenUser.email ? chosenUser.email : currentUser.email;
		// userCopy.type = chosenUser.type
		// setChosenCompany(companyCopy)
		console.log('chosenUser', chosenUser);
		console.log('userCopy', userCopy);
		try {
			const res = await axios.put(`${BASE_URL}${END_POINT.USER}/${chosenUser.id}`, userCopy);
			if (res.status === 200) {
				dispatch(getUserByIdAsync(chosenUser.id));
				dispatch(getUsersByTypeAsync(userOffset, userLimit, userSearch, chosenUser.type, userStatus));
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully updated', 2000));
			}
		} catch (error) {
			console.log(error);
			if (error.response.status === 402) {
				dispatch(actionSnackBar.setSnackBar('error', 'This user already exists', 2000));
			} else {
				dispatch(actionSnackBar.setSnackBar('error', 'Update failed', 2000));
			}
			dispatch(getUserByIdAsync(chosenUser.id));
			dispatch(getUsersByTypeAsync(userOffset, userLimit, userSearch, chosenUser.type, userStatus));
		}
		// }
	};

	return chosenUser ? (
		<Grid container className={classes.infoContainer}>
			<Grid item xs={12}>
				<Grid container alignItems="center">
					<Grid item xs={1}>
						IMG
					</Grid>
					<Grid item xs={11}>
						<Grid container alignItems="center">
							<Grid item xs={12}>
								<Grid container justifyContent="space-between" alignItems="center">
									<Grid item xs={6}>
										<Grid container alignItems="center" justifyContent="space-between">
											<Grid item xs={chosenUser.name.length > 14 ? 8 : 6}>
												{chosenUser.isEditMode ? (
													<TextField
														value={chosenUser.name}
														inputProps={{
															style: {
																textTransform: 'capitalize',
																fontSize: '20px',
																fontWeight: 600,
																color: '#0F0F0F',
															},
														}}
														onChange={(e) => updateUserField('name', e.target.value)}
														// onBlur={() => sendUpdatedCompany()}
													/>
												) : (
													<Typography className={classes.companyName}>
														{chosenUser.name.length > 18
															? `${chosenUser.name.slice(0, 18)}...`
															: chosenUser.name}
													</Typography>
												)}
											</Grid>
											<Grid item xs={1}></Grid>
											<Grid item xs={3}>
												<Grid
													container
													alignItems={chosenUser.isEditMode ? 'flex-start' : 'center'}
													justifyContent={chosenUser.isEditMode ? 'flex-end' : 'flex-start'}
												>
													<Grid item xs={3}>
														{chosenUser.isEditMode ? (
															<CompanyStatusSwitch
																checked={chosenUser.status}
																onChange={(e) => updateUserField('status', e.target.checked)}
															/>
														) : (
															<FiberManualRecordIcon
																style={{
																	fontSize: '14px',
																	fill: chosenUser.status ? '#00CA80' : '#FF3939',
																}}
															/>
														)}
													</Grid>
													<Grid item xs={9}>
														<Typography
															style={{
																marginLeft: chosenUser.isEditMode && '12px',
															}}
															className={clsx({
																[classes.statusActive]: chosenUser.status,
																[classes.statusInactive]: !chosenUser.status,
															})}
														>
															{chosenUser.status ? 'Active' : 'Inactive'}
														</Typography>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={2}>
										<Grid container alignItems="center" justifyContent="flex-end">
											<Grid item style={{ marginRight: '16px' }}>
												{chosenUser.isEditMode ? (
													<EditDoneButton onClick={() => sendUpdatedUser()}>
														<WhiteCheckIcon />
													</EditDoneButton>
												) : (
													<EditButton
														onClick={() =>
															setChosenUser({
																...chosenUser,
																isEditMode: !chosenUser.isEditMode,
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
													itemName={chosenUser.name}
													itemId={chosenUser.id}
													itemCategory="User"
													deleteItem={deleteUser}
												/>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								{chosenUser.isEditMode && countriesArr ? (
									<Autocomplete
										name="country"
										options={countriesArr}
										value={chosenUser.country}
										inputValue={inputValue}
										// onBlur={() => sendUpdatedCompany()}
										getOptionSelected={(option, value) => option.name === value.name}
										popupIcon={<SearchIcon style={{ color: '#1C67FF' }} />}
										getOptionLabel={(option) => {
											return option.name;
										}}
										// error={errors.country}
										onChange={(e, newValue) => updateUserField('country', newValue)}
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
											<Typography className={classes.locationName}>{chosenUser.country.name}</Typography>
										</Grid>
									</Grid>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Divider className={classes.infoDivider} />
			<Grid container>
				<Grid item xs={12}>
					<UserInfoBlock chosenUser={chosenUser} updateUserField={updateUserField} />
				</Grid>
			</Grid>
		</Grid>
	) : null;
}

export default UserInfo;
