import { Divider, Grid, Typography, withStyles } from '@material-ui/core';
import { useStyles } from '../../../styles/PublicationsStyles';
import MUIRichTextEditor from 'mui-rte';

const Content = (props) => {
	const { contentBlocks } = props;
	const classes = useStyles();

	return (
		<Grid item xs={12}>
			<Divider className={classes.divider} style={{ marginTop: 10 }}></Divider>
			<Grid container>
				{contentBlocks !== '{}' ? (
					<StyledEditor
						defaultValue={
							typeof contentBlocks === 'object' ? JSON.stringify(contentBlocks) : contentBlocks
						}
						controls={[]}
						readOnly={true}
					/>
				) : (
					<Typography>No Content</Typography>
				)}
			</Grid>
		</Grid>
	);
};

export default Content;

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
