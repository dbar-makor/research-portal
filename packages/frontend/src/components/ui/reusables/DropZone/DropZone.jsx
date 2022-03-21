import React from 'react';

import DropZoneView from './DropZone.view';

const DropZone = (props) => {
	const purpose = props.purpose ? props.purpose : 'cover image*';
	return (
		<DropZoneView
			onDrop={props.onDrop}
			uploadedImage={props.uploadedImage}
			setUploadedImage={props.setUploadedImage}
			purpose={purpose}
			setFileOK={props.setFileOK}
			fileTypes={props.fileTypes}
		/>
	);
};

DropZone.displayName = 'DropZone';
DropZone.defaultProps = {};

export default React.memo(DropZone);
