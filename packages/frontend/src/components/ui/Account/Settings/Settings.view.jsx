import React from 'react';

import { Grid, Typography, Switch, withStyles } from '@material-ui/core';

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

const SettingsView = (props) => {
	return (
		<Grid container style={{ padding: '49px 0px 0px 40px' }}>
			{props.loadingUserSettings && <Typography>LOADING...</Typography>}
			{props.userSettings && (
				<>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={12}>
								<Typography style={{ fontSize: 24, color: '#000', marginLeft: 10 }}>
									Settings
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Grid container alignItems="center">
									<Grid item>
										<AllNotificationSwitch
											checked={props.userSettings.is_active}
											onChange={(e) => props.handleToggle(e, 'is_active')}
										/>
									</Grid>
									<Grid item>
										<Typography style={{ color: '#1C67FF', fontSize: 16 }}>
											Notifications
										</Typography>
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
										<Typography
											style={{ marginLeft: 10, color: '#868DA2', fontSize: 14 }}
										>
											Publications
										</Typography>
									</Grid>
									{props.userSettings.settings.publications &&
										Object.entries(props.userSettings.settings.publications).map(
											([key, value], idx) => {
												return (
													<Grid item key={idx}>
														<Grid container alignItems="center">
															<Grid item>
																<GreenSwitch
																	disabled={
																		props.userSettings.is_active
																			? false
																			: true
																	}
																	checked={value}
																	onChange={(e) =>
																		props.handleToggle(
																			e,
																			'publications',
																			key,
																		)
																	}
																/>
															</Grid>
															<Grid item>
																<Typography
																	style={{ textTransform: 'capitalize' }}
																>
																	{key.replace('_', ' ')}
																</Typography>
															</Grid>
														</Grid>
													</Grid>
												);
											},
										)}
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid container direction="column">
									<Grid item>
										<Typography
											style={{ marginLeft: 10, color: '#868DA2', fontSize: 14 }}
										>
											Replies
										</Typography>
									</Grid>
									{props.userSettings.settings.replies &&
										Object.entries(props.userSettings.settings.replies).map(
											([key, value], idx) => {
												return (
													<Grid item key={idx}>
														<Grid container alignItems="center">
															<Grid item>
																<GreenSwitch
																	disabled={
																		props.userSettings.is_active
																			? false
																			: true
																	}
																	checked={value}
																	onChange={(e) =>
																		props.handleToggle(e, 'replies', key)
																	}
																/>
															</Grid>
															<Grid item>
																<Typography
																	style={{ textTransform: 'capitalize' }}
																>
																	{key.replace('_', ' ')}
																</Typography>
															</Grid>
														</Grid>
													</Grid>
												);
											},
										)}
								</Grid>
							</Grid>
							<Grid item></Grid>
						</Grid>
					</Grid>
				</>
			)}
		</Grid>
	);
};

SettingsView.displayName = 'SettingsView';
SettingsView.defaultProps = {};

export default React.memo(SettingsView);
