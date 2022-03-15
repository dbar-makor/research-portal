import React from 'react';

import { useSelector } from 'react-redux';
import { parseISO, formatDistanceToNow } from 'date-fns';
import * as webSocketService from '../../../services/websocket';

import AlertNotificationView from './AlertNotification.view';

const AlertNotification = ({ key, notifi, setCountAlerts, handleClose }) => {
	const token = useSelector((state) => state.auth.token);
	let content = notifi.content;

	if (typeof notifi.content === 'string') {
		content = JSON.parse(notifi.content);
	}

	const setIsRead = (notifyId) => {
		const message = {
			type: 'set-is-read',
			id: notifyId,
		};
		webSocketService.sendEvent(message, token);
		if (notifi.is_new) {
			setCountAlerts((count) => count - 1);
			const newMessage = {
				type: 'set-is-new',
				id: notifyId,
			};
			webSocketService.sendEvent(newMessage, token);
		}
	};

	const TimeAgo = (timestamp) => {
		let timeAgo = '';
		if (timestamp) {
			const date = parseISO(timestamp);
			const timePeriod = formatDistanceToNow(date);
			timeAgo = `${timePeriod} ago`;
			return timeAgo;
		}
	};

	const setAsRead = (e) => {
		setIsRead(notifi.id);
		notifi.is_read = true;
		handleClose(e, 'notify');
	};

	return (
		<AlertNotificationView
			key={key}
			notifi={notifi}
			content={content}
			TimeAgo={TimeAgo}
			setAsRead={setAsRead}
		></AlertNotificationView>
	);
};

AlertNotification.displayName = 'AlertNotification';
AlertNotification.defaultProps = {};

export default React.memo(AlertNotification);
