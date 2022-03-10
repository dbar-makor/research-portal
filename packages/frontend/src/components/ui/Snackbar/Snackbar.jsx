import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionSnackBar from '../../../redux/SnackBar/action';

import SnackbarView from './Snackbar.view';

const Snackbar = () => {
	const dispatch = useDispatch();
	const snackBarOBJ = useSelector((state) => state.snackBar);
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(actionSnackBar.disableSnackBar());
	};

	return <SnackbarView snackBarOBJ={snackBarOBJ} handleClose={handleClose}></SnackbarView>;
};

Snackbar.displayName = 'Snackbar';
Snackbar.defaultProps = {};

export default React.memo(Snackbar);
