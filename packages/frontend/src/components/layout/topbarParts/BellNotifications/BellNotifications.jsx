import React,{ useState, useRef } from 'react';
import { useHistory } from 'react-router';
import BellNotificationsView from './BellNotifications.view';

const BellNotifications = (props) => {
  const {
    handleToggle,
    notifications,
    handleListKeyDown,
    handleClose,
    openNotification,
    setOpenNotification,
    open
  } = props;
  const notifyRef = useRef(null);
	// eslint-disable-next-line no-unused-vars
	const [newNotification, setNewNotification] = useState(false);

	const id = openNotification ? 'simple-popper' : undefined;
	const [countAlerts, setCountAlerts] = useState(0);
	const history = useHistory();

	const redirect = (type) => {
		switch (type) {
			case 'all_notfications':
				history.push('/all_notfications');
				setOpenNotification(false);
		}
	};

  return <BellNotificationsView
    notifyRef={notifyRef}
    redirect={redirect}
    newNotification={newNotification}
    id={id}
    countAlerts={countAlerts}
    handleToggle={handleToggle}
    notifications={notifications}
    handleListKeyDown={handleListKeyDown}
    handleClose={handleClose}
    openNotification={openNotification}
    setOpenNotification={setOpenNotification}
    setCountAlerts={setCountAlerts}
    open={open}
  ></BellNotificationsView>;
};

BellNotifications.displayName = 'BellNotifications';
BellNotifications.defaultProps = {};

export default React.memo(BellNotifications);
