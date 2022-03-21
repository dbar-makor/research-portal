import React from 'react';

import SalesTopbarView from './SalesTopbar.view';

const SalesTopbar = (props) => {
	const classes = props.classes;
	return <SalesTopbarView classes={classes}></SalesTopbarView>;
};

SalesTopbar.displayName = 'SalesTopbar';
SalesTopbar.defaultProps = {};

export default React.memo(SalesTopbar);
