import React from 'react';

import SmallPublicationView from './SmallPublication.view';

const SmallPublication = ({ publication }) => {
	return <SmallPublicationView publication={publication}></SmallPublicationView>;
};

SmallPublication.displayName = 'SmallPublication';
SmallPublication.defaultProps = {};

export default React.memo(SmallPublication);
