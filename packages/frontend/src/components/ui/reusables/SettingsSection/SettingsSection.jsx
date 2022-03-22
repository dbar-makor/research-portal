import React from 'react';

import SettingsSectionView from './SettingsSection.view';

const SettingsSection = (props) => {
	return (
		<SettingsSectionView
			handleToggle={props.handleToggle}
			is_active={props.is_active}
			section={props.section}
			userSettings={props.userSettings}
		></SettingsSectionView>
	);
};

SettingsSection.displayName = 'SettingsSection';
SettingsSection.defaultProps = {};

export default React.memo(SettingsSection);
