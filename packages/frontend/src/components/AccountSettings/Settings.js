import { Grid, Typography, Switch, withStyles } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL, END_POINT } from '../../utils/constants';

import * as actionSnackBar from '../../redux/SnackBar/action';

function Settings() {
	const [userSettings, setUserSettings] = useState(null);
	const dispatch = useDispatch();
	const getUserSettings = async () => {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.SETTINGS}/notification`);
			if (res.status === 200) {
				setLoadingUserSettings(false);
				setUserSettings(res.data);
			}
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', 'Network error', 3000));
		}
	};

	const handleToggle = (e, section, key) => {
		if (section === 'publications' || section === 'replies') {
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

	const sendAfterChange = async () => {
		const objToSend = {
			settings: userSettings?.settings,
			is_active: userSettings?.is_active,
		};
		console.log(objToSend);
		if (objToSend.settings !== null && objToSend.settings !== undefined) {
			try {
				await axios.put(`${BASE_URL}${END_POINT.SETTINGS}/notification`, objToSend);
			} catch (err) {
				dispatch(actionSnackBar.setSnackBar('error', 'failed update settings', 3000));
			}
		}
	};

	useEffect(() => {
		sendAfterChange();
	}, [userSettings]);

	useEffect(() => {
		getUserSettings();
	}, []);

	return (
		<Grid container style={{ padding: '49px 0px 0px 40px' }}>
			{userSettings && (
				<>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={12}>
								<Typography style={{ fontSize: 24, color: '#000', marginLeft: 10 }}>Settings</Typography>
							</Grid>
							<Grid item xs={12}>
								<Grid container alignItems="center">
									<Grid item>
										<AllNotificationSwitch
											checked={userSettings.is_active}
											onChange={(e) => handleToggle(e, 'is_active')}
										/>
									</Grid>
									<Grid item>
										<Typography style={{ color: '#1C67FF', fontSize: 16 }}>Notifications</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={5} style={{ paddingTop: '27px' }}>
						<Grid container>
							<Grid item xs={6}>
								<Grid container direction="column">
									<Grid item>
										<Typography style={{ marginLeft: 10, color: '#868DA2', fontSize: 14 }}>
											Publications
										</Typography>
									</Grid>
									{userSettings.settings.publications &&
										Object.entries(userSettings.settings.publications).map(([key, value], idx) => {
											return (
												<Grid item key={idx}>
													<Grid container alignItems="center">
														<Grid item>
															<GreenSwitch
																disabled={userSettings.is_active ? false : true}
																checked={value}
																onChange={(e) => handleToggle(e, 'publications', key)}
															/>
														</Grid>
														<Grid item>
															<Typography style={{ textTransform: 'capitalize' }}>
																{key.replace('_', ' ')}
															</Typography>
														</Grid>
													</Grid>
												</Grid>
											);
										})}
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid container direction="column">
									<Grid item>
										<Typography style={{ marginLeft: 10, color: '#868DA2', fontSize: 14 }}>
											Replies
										</Typography>
									</Grid>
									{userSettings.settings.replies &&
										Object.entries(userSettings.settings.replies).map(([key, value], idx) => {
											return (
												<Grid item key={idx}>
													<Grid container alignItems="center">
														<Grid item>
															<GreenSwitch
																disabled={userSettings.is_active ? false : true}
																checked={value}
																onChange={(e) => handleToggle(e, 'replies', key)}
															/>
														</Grid>
														<Grid item>
															<Typography style={{ textTransform: 'capitalize' }}>
																{key.replace('_', ' ')}
															</Typography>
														</Grid>
													</Grid>
												</Grid>
											);
										})}
								</Grid>
							</Grid>
							<Grid item></Grid>
						</Grid>
					</Grid>
				</>
			)}
		</Grid>
	);
}

export default Settings;

const AllNotificationSwitch = withStyles(() => ({
	switchBase: {
		'color': '#FFFFFF',
		'&$checked': {
			color: '#FFFFFF',
		},
		'&$checked + $track': {
			backgroundColor: '#1C67FF',
			opacity: 1,
		},
	},
	checked: {},
	track: {},
}))(Switch);

const GreenSwitch = withStyles(() => ({
	switchBase: {
		'color': '#FFFFFF',
		'&$checked': {
			color: '#FFFFFF',
		},
		'&$checked + $track': {
			backgroundColor: '#00CA80',
			opacity: 1,
		},
		'&.MuiSwitch-colorSecondary.Mui-disabled + .MuiSwitch-track': {
			backgroundColor: '#bababa',
			// opacity: 3,
		},
	},
	checked: {},
	track: {},
}))(Switch);
