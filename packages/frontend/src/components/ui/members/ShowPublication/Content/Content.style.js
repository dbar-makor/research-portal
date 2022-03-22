import { withStyles } from '@material-ui/core';

import MUIRichTextEditor from 'mui-rte';

const StyledEditor = withStyles({
	root: {
		'height': '100%',
		'& #mui-rte-container': {
			height: '100%',
			margin: '0px',
		},
	},
	toolbar: {
		border: 'none',
		padding: 'none',
	},
	container: {
		height: '100%',
		maxHeight: '100%',
		width: '100%',
		maxWidth: '100%',
	},
	editor: {
		padding: 'none',
		borderRadius: '0px',
		border: 'none',
		height: '100%',
		maxHeight: '100%',
		width: 'inharit',
		maxWidth: 'inharit',
	},
})(MUIRichTextEditor);

export default StyledEditor;
