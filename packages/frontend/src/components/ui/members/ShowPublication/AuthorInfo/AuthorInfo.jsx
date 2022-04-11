import React, { useState } from 'react';

import AuthorInfoView from './AuthorInfo.view';

const AuthorInfo = ({ lastDate }) => {
	const [author] = useState({
		name: 'Eliyahu Hillel',
		avatar: 'https://image.pngaaa.com/419/263419-middle.png',
	});

	return <AuthorInfoView lastDate={lastDate} author={author}></AuthorInfoView>;
};

AuthorInfo.displayName = 'AuthorInfo';
AuthorInfo.defaultProps = {};

export default React.memo(AuthorInfo);
