import React from 'react';

import SubscriberInfoView from './SubscriberInfo.view';

const SubscriberInfo = (props) => {
	const { info } = props;
	return <SubscriberInfoView info={info}></SubscriberInfoView>;
};

SubscriberInfo.displayName = 'SubscriberInfo';
SubscriberInfo.defaultProps = {};

export default React.memo(SubscriberInfo);
