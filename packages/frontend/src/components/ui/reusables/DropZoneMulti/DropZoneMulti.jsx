import React from 'react';

import DropZoneMultiView from './DropZoneMulti.view';

const DropZoneMulti = (props) => {
	const onDrop = props.onDrop ? props.onDrop : 'your attachments';

	return (
		<DropZoneMultiView
			fileTypes={props.fileTypes}
			localForm={props.localForm}
			deleteItem={props.deleteItem}
			onDrop={onDrop}
		/>
	);
};

DropZoneMulti.displayName = 'DropZoneMulti';
DropZoneMulti.defaultProps = {};

export default React.memo(DropZoneMulti);
