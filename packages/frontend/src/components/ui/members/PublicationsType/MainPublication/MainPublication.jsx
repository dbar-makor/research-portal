import React from 'react';

import MainPublicationView from './MainPublication.view';

const MainPublication = ({ publication }) => {
	return <MainPublicationView publication={publication}></MainPublicationView>;
};

MainPublication.displayName = 'MainPublication';
MainPublication.defaultProps = {};

export default React.memo(MainPublication);
