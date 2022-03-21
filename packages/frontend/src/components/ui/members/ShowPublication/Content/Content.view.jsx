import React from 'react';

import { Divider, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../../../styles/PublicationsStyles';

import StyledEditor from './Content.style';

const ContentView = (props) => {
	const classes = useStyles();

	return (
		<Grid item xs={12}>
			<Divider className={classes.divider} style={{ marginTop: 10 }}></Divider>
			<Grid container>
				{props.contentBlocks !== '{}' ? (
					<StyledEditor
						defaultValue={
							typeof contentBlocks === 'object'
								? JSON.stringify(props.contentBlocks)
								: props.contentBlocks
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

ContentView.displayName = 'ContentView';
ContentView.defaultProps = {};

export default React.memo(ContentView);
