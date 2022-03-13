import React, { useState, useEffect } from 'react';
import { Dialog, Grid } from '@material-ui/core';
import { useStyles } from '../../styles/InfoStyles';
import SubHeaderModal from '../Reusables/SubHeaderModal';
import CloseIcon from '@material-ui/icons/Close';
import TextInputUnit from '../Reusables/TextInputUnit';
import AutoCompleteUnit from '../Reusables/AutoCompleteUnit';
import { useSelector, useDispatch } from 'react-redux';
import { FilledButton } from '../../styles/MainStyles';
import * as actionSnackBar from '../../redux/SnackBar/action';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../utils/constants';
import {
	getUsersByTypeAsync,
	selectUsersLimit,
	selectUsersOffset,
	selectUsersStatus,
	selectUsersSearch,
} from '../../redux/users/usersSlice';
import { validateUser } from '../Reusables/ValidationFunctions';

function NewUserModal(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const countriesArr = useSelector((state) => state.utils.utils.country);
	const { open, handleClose, userType } = props;
	const [newUser, setNewUser] = useState({
		name: '',
		username: '',
		email: '',
		country: null,
	});
	const [inputValueCountry, setInputValueCountry] = useState('');
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState(false);
	const userOffset = useSelector(selectUsersOffset);
	const userLimit = useSelector(selectUsersLimit);
	const userSearch = useSelector(selectUsersSearch);
	const userStatus = useSelector(selectUsersStatus);

	const updateUserField = (value, key) => {
		const userCopy = { ...newUser, [key]: value };
		setNewUser(userCopy);
		validateUser({ [key]: value }, errors, setErrors, setValidationResult);
	};

	const sendNewUser = async () => {
		const userToSend = { ...newUser, country: newUser.country.code, type: userType };
		// const userTypeToSend = userType === 'author' ? 'authors' : 'sales'
		try {
			const res = await axios.post(`${BASE_URL}${END_POINT.USER}`, userToSend);
			if (res.status === 201) {
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully added', 2000));
				dispatch(getUsersByTypeAsync(userOffset, userLimit, userSearch, userType, userStatus));
				clearAndClose();
			}
		} catch (error) {
			if (error.response.status === 402) {
				dispatch(actionSnackBar.setSnackBar('error', 'This user already exists', 2000));
			} else {
				dispatch(actionSnackBar.setSnackBar('error', 'Failed adding user', 2000));
			}
			handleClose();
		}
	};

	const clearAndClose = () => {
		setNewUser({
			name: '',
			username: '',
			email: '',
			country: null,
		});
		setInputValueCountry('');
		handleClose();
	};

	return (
		<Dialog
			open={open}
			onClose={clearAndClose}
			classes={{ paper: classes.alertModalPaper }}
			BackdropProps={{
				classes: {
					root: classes.modalBackDrop,
				},
			}}
		>
			<Grid container justifyContent="center">
				<Grid item xs={12}>
					<Grid container justifyContent="flex-end">
						<CloseIcon onClick={clearAndClose} className={classes.closeIcon} />
					</Grid>
				</Grid>
				<SubHeaderModal title={`Add ${userType}`} />
				<Grid item xs={11}>
					<Grid container spacing={2} justifyContent="space-between" style={{ marginTop: '30px' }}>
						<Grid item xs={6} style={{ height: '60px' }}>
							<TextInputUnit
								name="name"
								label="Name"
								value={newUser.name}
								onChange={(e) => updateUserField(e.target.value, 'name')}
								error={errors.name}
							/>
						</Grid>
						<Grid item xs={6} style={{ height: '60px' }}>
							<TextInputUnit
								name="username"
								label="Username"
								value={newUser.username}
								onChange={(e) => updateUserField(e.target.value, 'username')}
								error={errors.username}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={11}>
					<Grid container spacing={2} justifyContent="space-between" style={{ marginTop: '10px' }}>
						<Grid item xs={6} style={{ height: '60px' }}>
							<TextInputUnit
								name="email"
								label="Email"
								value={newUser.email}
								onChange={(e) => updateUserField(e.target.value, 'email')}
								error={errors.email}
							/>
						</Grid>
						<Grid item xs={6} style={{ height: '60px' }}>
							<AutoCompleteUnit
								options={countriesArr}
								name="country"
								label="Country"
								formObject={newUser}
								fieldForLabel="name"
								inputValue={inputValueCountry}
								setInputValue={setInputValueCountry}
								handler={updateUserField}
								error={errors.country}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container justifyContent="center" style={{ marginTop: '40px' }}>
						<FilledButton disabled={!validationResult} onClick={() => sendNewUser()}>
							Add
						</FilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
}

export default NewUserModal;
