import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as subscribersAction from '../../../../redux/subscribers/subscribersSlice';

import SubscribersMainView from './SubscribersMain.view';

const SubscribersMain = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(subscribersAction.getSubscribersAsync());
	}, []);

	return <SubscribersMainView></SubscribersMainView>;
};

SubscribersMain.displayName = 'SubscribersMain';
SubscribersMain.defaultProps = {};

export default React.memo(SubscribersMain);
