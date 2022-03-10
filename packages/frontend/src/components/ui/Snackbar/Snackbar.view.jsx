import React from 'react';

import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { Collapse, IconButton, Typography } from '@material-ui/core';

import useStyles from './Snackbar.style';

const SnackbarView = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Collapse in={props.snackBarOBJ.visible} timeout={400}>
				<Alert
					elevation={4}
					variant="filled"
					severity={props.snackBarOBJ.type}
					action={
						<IconButton
							style={{ height: '20px', width: '20px' }}
							elevation={4}
							variant="filled"
							severity={props.snackBarOBJ.type}
							onClick={props.handleClose}
						>
							<CloseIcon style={{ color: 'white' }} />
						</IconButton>
					}
				>
					<Typography id="snackbarMessage">{props.snackBarOBJ.message}</Typography>
				</Alert>
			</Collapse>
		</div>
	);
};

SnackbarView.displayName = 'SnackbarView';
SnackbarView.defaultProps = {};

export default React.memo(SnackbarView);
