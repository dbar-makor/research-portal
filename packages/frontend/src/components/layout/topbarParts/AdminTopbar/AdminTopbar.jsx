import React,{ useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AdminTopbarView from './AdminTopbar.view';

const AdminTopbar = (props) => {
	const {
		handleToggle,
		openUserMgmt,
		setOpenUserMgmt,
		userType,
		handleClose,
	} = props;
	const userMgmtRef = useRef(null);
	const history = useHistory();

	function adminGoTo(pathName) {
	setOpenUserMgmt(false);
	history.push(pathName);
}
	return (
		<AdminTopbarView
		userMgmtRef={userMgmtRef}
			handleToggle={handleToggle}
			openUserMgmt={openUserMgmt}
			setOpenUserMgmt={setOpenUserMgmt}
			userType={userType}
			handleClose={handleClose}
			adminGoTo={adminGoTo}
		></AdminTopbarView>
	);
};

AdminTopbar.displayName = 'AdminTopbar';
AdminTopbar.defaultProps = {};

export default React.memo(AdminTopbar);
