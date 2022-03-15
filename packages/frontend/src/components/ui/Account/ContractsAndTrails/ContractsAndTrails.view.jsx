import React from 'react';

import { Grid } from '@material-ui/core';

const ContractsAndTrailsView = () => {
	return <Grid item>Contract & trails</Grid>;
};

ContractsAndTrailsView.displayName = 'ContractsAndTrailsView';
ContractsAndTrailsView.defaultProps = {};

export default React.memo(ContractsAndTrailsView);
