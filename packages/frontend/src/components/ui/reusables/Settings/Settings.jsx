import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL, END_POINT } from '../../../../utils/constants';
import * as actionSnackBar from '../../../../redux/SnackBar/action';

import SettingsView from './Settings.view';

const Settings = () => {
	const [userSettings, setUserSettings] = useState(null);
	const [loadingUserSettings, setLoadingUserSettings] = useState(false);
	const dispatch = useDispatch();
	const getUserSettings = async () => {
		try {
			const token = localStorage.getItem('token');
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			const res = await axios.get(`${BASE_URL}${END_POINT.SETTINGS}/notification`);
			setLoadingUserSettings(true);
			if (res.status === 200) {
				setLoadingUserSettings(false);
				setUserSettings(res.data);
			}
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', 'Network error', 3000));
		}
	};
	const sendAfterChange = async () => {
		const objToSend = {
			settings: userSettings?.settings,
			is_active: userSettings?.is_active,
		};
		if (objToSend.settings !== null && objToSend.settings !== undefined) {
			try {
				await axios.put(`${BASE_URL}${END_POINT.SETTINGS}/notification`, objToSend);
			} catch (err) {
				dispatch(actionSnackBar.setSnackBar('error', 'failed update settings', 3000));
			}
		}
	};
	const handleToggle = (e, section, key) => {
		if (section !=='is_active') {
			setUserSettings((prevState) => ({
				...prevState,
				settings: {
					...prevState.settings,
					[section]: { ...prevState.settings[section], [key]: e.target.checked },
				},
			}));
		} else if (section === 'is_active') {
			setUserSettings((prevState) => ({ ...prevState, [section]: !userSettings[section] }));
		}
	};
	useEffect(() => {
		sendAfterChange();
	}, [userSettings]);

	useEffect(() => {
		getUserSettings();
	}, []);
	return (
		<SettingsView
			loadingUserSettings={loadingUserSettings}
			userSettings={userSettings}
			handleToggle={handleToggle}
		></SettingsView>
	);
};

Settings.displayName = 'Settings';
Settings.defaultProps = {};

export default React.memo(Settings);
