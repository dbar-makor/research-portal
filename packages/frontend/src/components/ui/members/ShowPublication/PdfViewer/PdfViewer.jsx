import React from 'react';

import { BASE_URL } from '../../../../../utils/constants';

import PdfViewerView from './PdfViewer.view';

const PdfViewer = ({ pdf }) => {
	const downloadFile = (fileName) => {
		window.open(`${BASE_URL}/assets/${fileName}`, '_blank');
	};

	return <PdfViewerView pdf={pdf} downloadFile={downloadFile}></PdfViewerView>;
};

PdfViewer.displayName = 'PdfViewer';
PdfViewer.defaultProps = {};

export default React.memo(PdfViewer);
