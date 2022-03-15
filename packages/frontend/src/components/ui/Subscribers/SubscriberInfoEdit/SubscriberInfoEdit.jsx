import React from 'react';

import SubscriberInfoEditView from './SubscriberInfoEdit.view';

const SubscriberInfoEdit = (props) => {
	const { info } = props;

	return <SubscriberInfoEditView info={info}></SubscriberInfoEditView>;
};

SubscriberInfoEdit.displayName = 'SubscriberInfoEdit';
SubscriberInfoEdit.defaultProps = {};

export default React.memo(SubscriberInfoEdit);
