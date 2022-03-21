import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as webSocketService from '../../../services/websocket';
import TopBarView from './TopBar.view';

const TopBar = () => {
	const token = useSelector((state) => state.auth.token);
	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [openNotification, setOpenNotification] = useState(false);

	const [openUserMgmt, setOpenUserMgmt] = useState(false);

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const userType = useSelector((state) => state.auth.userContent?.type);
	// eslint-disable-next-line no-unused-vars
	const [notifications, setNotifications] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const options = [
		{ value: 'region1', name: 'Region1' },
		{ value: 'region2', name: 'Region2' },
		{ value: 'region3', name: 'Region3' },
	];
	const webSocket = useRef(null);

	function handleListKeyDown(event, type) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
			if (type === 'notify') {
				setOpenNotification(false);
			}
		} else if (event.key === 'Escape') {
			setOpen(false);
			if (type === 'notify') {
				setOpenNotification(false);
			}
		}
	}

	useEffect(() => {
		webSocket.current = webSocketService.connectWS(token);
		webSocket.current.onopen = () => {
			let message = {
				type: 'get-notifications',
			};
			message = JSON.stringify(message);
			webSocket.current.send(message);
		};
		webSocket.current.onmessage = (message) => {
			message = JSON.parse(message.data);
			let send = {};
			switch (message.type) {
				case 'alert':
					setNotifications([...message.notifications]);
					break;
				case 'succeed':
					break;
				default:
					send = {
						type: 'get-notifications',
						is_new: true,
						id: message.id,
					};
					send = JSON.stringify(send);
					webSocket.current.send(send);
					break;
			}
		};
		return () => webSocket.current.close();
	}, []);

	const handleToggle = (type) => {
		if (type === 'user') {
			setOpen((prevOpen) => !prevOpen);
			setOpenUserMgmt(false);
		} else if (type === 'notify') {
			setOpenNotification(true);
			setOpen(false);
			setOpenUserMgmt(false);
		} else if (type === 'user_mgmt') {
			setOpenUserMgmt((prevOpen) => !prevOpen);
			setOpen(false);
		}
	};

	const handleClose = (event, type) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		if (type === 'user') {
			setOpen(false);
		} else if (type === 'notify') {
			setOpenNotification(false);
			return;
		} else if (type === 'user_mgmt') {
			setOpenUserMgmt(false);
		}
	};
	return (
		<TopBarView
			handleToggle={handleToggle}
			openUserMgmt={openUserMgmt}
			setOpenUserMgmt={setOpenUserMgmt}
			handleClose={handleClose}
			notifications={notifications}
			openNotification={openNotification}
			setOpenNotification={setOpenNotification}
			handleListKeyDown={handleListKeyDown}
			ref={anchorRef}
			userType={userType}
			setOpen={setOpen}
			open={open}
			isAuthenticated={isAuthenticated}
			options={options}
		></TopBarView>
	);
};

TopBar.displayName = 'TopBar';
TopBar.defaultProps = {};

export default React.memo(TopBar);
