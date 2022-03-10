import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../styles/MainStyles.js';

function SubHeaderModal({ title }) {
	const classes = useStyles();
	return (
		<>
			<Grid item style={{ marginBottom: '10px' }} className={classes.blueShapeModal} />
			<Grid item xs={12}>
				<Typography className={classes.modalHeader}>{title}</Typography>
			</Grid>
		</>
	);
}

export default SubHeaderModal;
