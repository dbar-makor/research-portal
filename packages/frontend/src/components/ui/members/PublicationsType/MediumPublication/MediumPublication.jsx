import React from 'react';

import MediumPublicationView from './MediumPublication.view';

const MediumPublication = ({ publication }) => {
	return <MediumPublicationView publication={publication}></MediumPublicationView>;
};

MediumPublication.displayName = 'MediumPublication';
MediumPublication.defaultProps = {};

export default React.memo(MediumPublication);
