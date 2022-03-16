import React from 'react';
import AuthorsNewArticleModalView from './AuthorsNewArticleModal.view';
import { useHistory } from 'react-router';

const AuthorsNewArticleModal = ({ handleClose, open }) => {
	const history = useHistory();
	return <AuthorsNewArticleModalView history={history} handleClose={handleClose} open={open} />;
};

AuthorsNewArticleModal.displayName = 'AuthorsNewArticleModal';
AuthorsNewArticleModal.defaultProps = {};

export default React.memo(AuthorsNewArticleModal);
