import React from 'react';

import ReplyView from './Reply.view';

const Reply = ({ reply }) => {
	return <ReplyView reply={reply}></ReplyView>;
};

Reply.displayName = 'Reply';
Reply.defaultProps = {};

export default React.memo(Reply);
