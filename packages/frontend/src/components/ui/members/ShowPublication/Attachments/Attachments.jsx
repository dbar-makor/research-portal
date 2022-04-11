import React from 'react';

import AttachmentsView from './Attachments.view';

const Attachments = ({ attachments }) => {
	return <AttachmentsView attachments={attachments}></AttachmentsView>;
};

Attachments.displayName = 'Attachments';
Attachments.defaultProps = {};

export default React.memo(Attachments);
