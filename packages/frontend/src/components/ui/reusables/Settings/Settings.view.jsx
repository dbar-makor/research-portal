import React from 'react';
import SettingsSection from '../SettingsSection/SettingsSection';
//import useStyles from './Settings.style';
import { Grid, Typography, Switch, withStyles } from '@material-ui/core';

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
							{Object.keys(props.userSettings.settings).map((section) => {
								return (
									<SettingsSection
										key={section}
										handleToggle={props.handleToggle}
										is_active={props.userSettings.is_active}
										section={section}
										userSettings={props.userSettings.settings}
									></SettingsSection>
								);
							})}
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
