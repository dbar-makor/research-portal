import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import SubscriberDetails from '../SubscriberDetails/SubscriberDetails';
import SubscribersTable from './SubscribersTable/SubscribersTable';

const SubscribersMainView = () => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography style={{ textAlign: 'center', fontSize: '40px' }}>Subscribers</Typography>
			</Grid>
			<SubscribersTable />
			<SubscriberDetails />
		</Grid>
	);
};

SubscribersMainView.displayName = 'SubscribersMainView';
SubscribersMainView.defaultProps = {};

export default React.memo(SubscribersMainView);
