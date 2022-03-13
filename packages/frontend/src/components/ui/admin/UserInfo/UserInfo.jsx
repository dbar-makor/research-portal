import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
	selectChosenUserData,
	getUserByIdAsync,
	changeChosenUser,
} from '../../../../redux/users/chosenUserSlice';
import * as actionSnackBar from '../../../../redux/SnackBar/action';
import UserInfoView from './UserInfo.view';
import {
	getUsersByTypeAsync,
	selectUsersLimit,
	selectUsersOffset,
	selectUsersStatus,
	selectUsersSearch,
} from '../../../../redux/users/usersSlice';
import { BASE_URL, END_POINT } from '../../../../utils/constants';

const UserInfo = () => {
	const currentUser = useSelector(selectChosenUserData);
	const dispatch = useDispatch();
	const [openAlert, setOpenAlert] = useState(false);
	const [chosenUser, setChosenUser] = useState(null);
	const countriesArr = useSelector((state) => state.utils.utils.country);
	const userOffset = useSelector(selectUsersOffset);
	const userLimit = useSelector(selectUsersLimit);
	const userSearch = useSelector(selectUsersSearch);
	const userStatus = useSelector(selectUsersStatus);

	useEffect(() => {
		if (currentUser) {
			const chosenUserCopy = { ...currentUser, isEditMode: false };
			setChosenUser(chosenUserCopy);
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
			handleCloseAlert();
			dispatch(actionSnackBar.setSnackBar('error', 'Delete failed', 2000));
		}
	};

	const updateUserField = (key, value) => {
		const userCopy = { ...chosenUser };
		userCopy[key] = value;
		setChosenUser(userCopy);
	};

	const sendUpdatedUser = async () => {
		setChosenUser({ ...chosenUser, isEditMode: false });
		const userCopy = {};
		userCopy.status = chosenUser.status;
		userCopy.country = chosenUser.country ? chosenUser.country.code : currentUser.country.code;
		userCopy.name = chosenUser.name ? chosenUser.name : currentUser.name;
		userCopy.username = chosenUser.username ? chosenUser.username : currentUser.username;
		userCopy.email = chosenUser.email ? chosenUser.email : currentUser.email;
		try {
			const res = await axios.put(`${BASE_URL}${END_POINT.USER}/${chosenUser.id}`, userCopy);
			if (res.status === 200) {
				dispatch(getUserByIdAsync(chosenUser.id));
				dispatch(getUsersByTypeAsync(userOffset, userLimit, userSearch, chosenUser.type, userStatus));
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully updated', 2000));
			}
		} catch (error) {
			/* eslint no-console: "off" */
			console.log(error);
			if (error.response.status === 402) {
				dispatch(actionSnackBar.setSnackBar('error', 'This user already exists', 2000));
			} else {
				dispatch(actionSnackBar.setSnackBar('error', 'Update failed', 2000));
			}
			dispatch(getUserByIdAsync(chosenUser.id));
			dispatch(getUsersByTypeAsync(userOffset, userLimit, userSearch, chosenUser.type, userStatus));
		}
	};

	return (
		<UserInfoView
			chosenUser={chosenUser}
			updateUserField={updateUserField}
			sendUpdatedUser={sendUpdatedUser}
			setChosenUser={setChosenUser}
			openAlert={openAlert}
			handleOpenAlert={handleOpenAlert}
			handleCloseAlert={handleCloseAlert}
			deleteUser={deleteUser}
			countriesArr={countriesArr}
		></UserInfoView>
	);
};
UserInfo.displayName = 'UserInfo';
UserInfo.defaultProps = {};

export default React.memo(UserInfo);
