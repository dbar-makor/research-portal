import React from 'react';

import MemberTopbarView from './MemberTopbar.view';

const MemberTopbar = (props) => {
	const { classes, options } = props;
	return <MemberTopbarView classes={classes} options={options}></MemberTopbarView>;
};

MemberTopbar.displayName = 'MemberTopbar';
MemberTopbar.defaultProps = {};

export default React.memo(MemberTopbar);
