import React from 'react';

import BigPublicationView from './BigPublication.view';

const BigPublication = ({ publication }) => {
	return <BigPublicationView publication={publication}></BigPublicationView>;
};

BigPublication.displayName = 'BigPublication';
BigPublication.defaultProps = {};

export default React.memo(BigPublication);
