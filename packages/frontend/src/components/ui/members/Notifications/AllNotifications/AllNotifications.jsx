import React, { useState, useEffect } from 'react';
import * as webSocketService from '../../../../../services/websocket';
import { useSelector } from 'react-redux';

import AllNotificationsView from './AllNotifications.view';

const AllNotifications = () => {
	const token = useSelector((state) => state.auth.token);
	const [notifications, setNotifications] = useState([]);
	const [filteredNotifications, setFilteredNotifications] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [markAsRead, setMarkAsRead] = useState(0);

	useEffect(() => {
		const message = {
			type: 'get-all-notiofications',
		};
		const ws = webSocketService.sendEvent(message, token);
		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			let allNotifications;
			switch (data.type) {
				case 'notifcations':
					allNotifications = data.notifications;
					setNotifications([...allNotifications]);
					break;
				default:
					break;
			}
		};
	}, [markAsRead]);

	useEffect(() => {
		if (searchTerm === '') {
			setFilteredNotifications(notifications);
		} else {
			const filteredResults = notifications.filter((notification) => {
				const title = JSON.parse(notification.content).title?.toLowerCase();
				return title?.includes(searchTerm?.toLowerCase());
			});
			setFilteredNotifications(filteredResults);
		}
	}, [searchTerm, notifications]);

	const makeAllRead = () => {
		const data = {
			type: 'mark-all-read',
		};
		webSocketService.sendEvent(data, token);
		setMarkAsRead((prev) => prev + 1);
	};

	return (
		<AllNotificationsView
			filteredNotifications={filteredNotifications}
			setSearchTerm={setSearchTerm}
			makeAllRead={makeAllRead}
		></AllNotificationsView>
	);
};

AllNotifications.displayName = 'AllNotifications';
AllNotifications.defaultProps = {};

export default React.memo(AllNotifications);
