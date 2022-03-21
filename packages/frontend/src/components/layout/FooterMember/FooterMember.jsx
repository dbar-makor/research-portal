import React from 'react';

import FooterMemberView from './FooterMember.view';

console.log(3);

const FooterMember = () => {
	return <FooterMemberView></FooterMemberView>;
};

FooterMember.displayName = 'FooterMember';
FooterMember.defaultProps = {};

export default React.memo(FooterMember);
