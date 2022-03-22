import React from 'react';
import { Grid, Typography, Switch, withStyles } from '@material-ui/core';

//import useStyles from './SettingsSection.style';

const SettingsSectionView = (props) => {
	return (
		<Grid item xs={6}>
			<Grid container direction="column">
				<Grid item>
					<Typography style={{ marginLeft: 10, color: '#868DA2', fontSize: 14 }}>
						{props.section}
					</Typography>
				</Grid>
				{props.userSettings &&
					Object.entries(props.userSettings[props.section]).map(([key, value], idx) => {
						return (
							<Grid item key={idx}>
								<Grid container alignItems="center">
									<Grid item>
										<GreenSwitch
											disabled={props.is_active ? false : true}
											checked={value}
											onChange={(e) => props.handleToggle(e, props.section, key)}
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
	);
};

SettingsSectionView.displayName = 'SettingsSectionView';
SettingsSectionView.defaultProps = {};

export default React.memo(SettingsSectionView);
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
