import React from 'react';

import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../../../../styles/AccountSettingsStyles';
import * as actionAuth from '../../../../redux/auth/action';

import AccountSettingsView from './AccountSettings.view';

const AccountSettings = () => {
	const userContent = useSelector((state) => state.auth.userContent);
	const dispatch = useDispatch();
	const chosenRouteName = window.location.pathname.replace('/settings/', '');
	const history = useHistory();
	const classes = useStyles(chosenRouteName === 'contract_trails' ? 'on' : 'off');
	const { path, url } = useRouteMatch();

	const handleRoute = (type) => {
		history.push(`${url}/${type}`);
	};

	const handleLogout = () => {
		dispatch(actionAuth.logout());
	};

	return (
		<AccountSettingsView
			userContent={userContent}
			classes={classes}
			path={path}
			handleRoute={handleRoute}
			handleLogout={handleLogout}
			chosenRouteName={chosenRouteName}
		></AccountSettingsView>
	);
};

AccountSettings.displayName = 'AccountSettings';
AccountSettings.defaultProps = {};

export default React.memo(AccountSettings);
