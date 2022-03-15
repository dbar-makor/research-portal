import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as subscribersAction from '../../../../redux/subscribers/subscribersSlice';

import SubscribersTableView from './SubscribersTable.view';

const SubscribersTable = () => {
	const dispatch = useDispatch();
	const subscribers = useSelector((state) => state.subscribers.subscribers);

	const setChosenSubscriber = (sub) => {
		dispatch(subscribersAction.setChosenSubscriber(sub));
	};
	return (
		<SubscribersTableView
			subscribers={subscribers}
			setChosenSubscriber={setChosenSubscriber}
		></SubscribersTableView>
	);
};

SubscribersTable.displayName = 'SubscribersTable';
SubscribersTable.defaultProps = {};

export default React.memo(SubscribersTable);
