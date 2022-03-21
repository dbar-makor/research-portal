import React from 'react';

import ContentView from './Content.view';

const Content = ({ contentBlocks }) => {
	return <ContentView contentBlocks={contentBlocks}></ContentView>;
};

Content.displayName = 'Content';
Content.defaultProps = {};

export default React.memo(Content);
