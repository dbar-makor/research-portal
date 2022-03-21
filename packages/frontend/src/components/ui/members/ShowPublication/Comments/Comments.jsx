import React, { useState } from 'react';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';

import CommentsView from './Comments.view';

const Comments = ({ comments, pubId }) => {
	const dispatch = useDispatch();
	const [visibleCmnt, setVisibleCmnt] = useState(3);
	const [localComments, setLocalComments] = useState(comments);
	const [openAddCmnt, setOpenAddCmnt] = useState(false);
	const [newComment, setNewComment] = useState({ publication_id: pubId, content: '' });
	const userType = useSelector((state) => state.auth.userContent.type);

	const addComment = async (content) => {
		try {
			let res = await axios.post(`${BASE_URL}${END_POINT.COMMENT}`, content);
			if (res.status === 201) {
				dispatch(actionSnackBar.setSnackBar('success', 'comment successfully', 3000));
				res = await axios.get(`${BASE_URL}${END_POINT.COMMENT}`, { params: { id: pubId } });
				setLocalComments(res.data);
			}
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', 'Network error', 3000));
		}
		setNewComment({ ...newComment, content: '' });
	};

	const loadMore = () => {
		setVisibleCmnt(visibleCmnt + 3);
	};

	return (
		<CommentsView
			pubId={pubId}
			comments={comments}
			localComments={localComments}
			openAddCmnt={openAddCmnt}
			setOpenAddCmnt={setOpenAddCmnt}
			userType={userType}
			addComment={addComment}
			loadMore={loadMore}
			visibleCmnt={visibleCmnt}
			newComment={newComment}
			setNewComment={setNewComment}
		></CommentsView>
	);
};

Comments.displayName = 'Comments';
Comments.defaultProps = {};

export default React.memo(Comments);
