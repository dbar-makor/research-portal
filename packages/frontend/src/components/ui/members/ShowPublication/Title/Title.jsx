import React from 'react';

import TitleView from './Title.view';

const Title = ({ title, description }) => {
	return <TitleView title={title} description={description}></TitleView>;
};

Title.displayName = 'Title';
Title.defaultProps = {};

export default React.memo(Title);
