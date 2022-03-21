import React, { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionAuth from '../../../../redux/auth/action';

import UserIconView from './UserIcon.view';

const UserIcon = forwardRef((props, ref) => {
	const { handleToggle, userType, handleClose, setOpen, open } = props;
	const user = useSelector((state) => state.auth.userContent);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(actionAuth.logout());
	};
	return (
		<UserIconView
			handleToggle={handleToggle}
			userType={userType}
			handleClose={handleClose}
			setOpen={setOpen}
			open={open}
			user={user}
			handleLogout={handleLogout}
			ref={ref}
		></UserIconView>
	);
});

UserIcon.displayName = 'UserIcon';
UserIcon.defaultProps = {};

export default React.memo(UserIcon);
