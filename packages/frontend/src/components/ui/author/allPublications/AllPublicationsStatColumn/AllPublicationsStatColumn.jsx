import React from 'react';

import AllPublicationsStatColumnView from './AllPublicationsStatColumn.view';

const AllPublicationsStatColumn = ({
	publishedFieldLabels,
	publishedFields,
	draftFieldLabels,
	draftFields,
	statistics,
}) => {
	return (
		<AllPublicationsStatColumnView
			publishedFieldLabels={publishedFieldLabels}
			publishedFields={publishedFields}
			draftFieldLabels={draftFieldLabels}
			draftFields={draftFields}
			statistics={statistics}
		/>
	);
};

AllPublicationsStatColumn.displayName = 'AllPublicationsStatColumn';
AllPublicationsStatColumn.defaultProps = {};

export default React.memo(AllPublicationsStatColumn);
