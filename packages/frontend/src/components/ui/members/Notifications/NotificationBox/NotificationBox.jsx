import React from 'react';

import { useHistory } from 'react-router';

import NotificationBoxView from './NotificationBox.view';

const NotificationBox = ({ content, isRead }) => {
	const history = useHistory();

	const handleClick = () => {
		history.push(`/article/${content.publication_id}`);
	};

	return (
		<NotificationBoxView
			content={content}
			isRead={isRead}
			handleClick={handleClick}
		></NotificationBoxView>
	);
};

NotificationBox.displayName = 'NotificationBox';
NotificationBox.defaultProps = {};

export default React.memo(NotificationBox);
