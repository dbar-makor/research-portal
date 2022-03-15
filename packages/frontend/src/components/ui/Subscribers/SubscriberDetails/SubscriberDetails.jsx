import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import SubscriberDetailsView from './SubscriberDetails.view';

const SubscriberDetails = () => {
	const subscriber = useSelector((state) => state.subscribers.chosenSubscriber);
	const [isEdit, setIsEdit] = useState(false);

	const sendEdit = () => {
		alert('EDITTT');
		setIsEdit(!isEdit);
	};

	return (
		<SubscriberDetailsView
			subscriber={subscriber}
			isEdit={isEdit}
			setIsEdit={setIsEdit}
			sendEdit={sendEdit}
		></SubscriberDetailsView>
	);
};

SubscriberDetails.displayName = 'SubscriberDetails';
SubscriberDetails.defaultProps = {};

export default React.memo(SubscriberDetails);
