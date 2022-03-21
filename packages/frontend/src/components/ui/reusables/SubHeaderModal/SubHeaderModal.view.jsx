import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../../styles/MainStyles.js';


const SubHeaderModalView = (props) => {
	const classes = useStyles();

  return (
		<>
			<Grid item style={{ marginBottom: '10px' }} className={classes.blueShapeModal} />
			<Grid item xs={12}>
				<Typography className={classes.modalHeader}>{props.title}</Typography>
			</Grid>
		</>
	);
};

SubHeaderModalView.displayName = 'SubHeaderModalView';
SubHeaderModalView.defaultProps = {};

export default React.memo(SubHeaderModalView);
