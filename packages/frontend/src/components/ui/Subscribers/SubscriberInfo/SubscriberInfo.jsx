import React from 'react';

import SubscriberInfoView from './SubscriberInfo.view';

const SubscriberInfo = (props) => {
  return <SubscriberInfoView></SubscriberInfoView>;
};

SubscriberInfo.displayName = 'SubscriberInfo';
SubscriberInfo.defaultProps = {};

export default React.memo(SubscriberInfo);
