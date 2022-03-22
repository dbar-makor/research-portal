import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import CommentView from './Comment.view';

const Comment = (props) => {
	const { comment, cmtNo, replyHendler, cmntId, pubId } = props;
	const [open, setOpen] = useState(false);
	const [openReply, setOpenReply] = useState(false);
	const [reply, setReply] = useState({ publication_id: pubId, content: '', comment_id: cmntId });

	const userType = useSelector((state) => state.auth.userContent.type);

	const replyChangeHandler = (content) => {
		replyHendler(content);
		setReply({ ...reply, content: '' });
		if (open === false) {
			setOpen(true);
		}
		setOpenReply(false);
	};

	return (
		<CommentView
			comment={comment}
			cmtNo={cmtNo}
			openReply={openReply}
			userType={userType}
			replyChangeHandler={replyChangeHandler}
		></CommentView>
	);
};

Comment.displayName = 'Comment';
Comment.defaultProps = {};

export default React.memo(Comment);
