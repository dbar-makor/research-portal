import { Grid, Typography } from '@material-ui/core';
import SubscriberDetails from '../ui/Subscribers/SubscriberDetails/SubscriberDetails';
import SubscribersTable from './SubscribersTable';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as subscribersAction from '../../redux/subscribers/subscribersSlice';

function SubscribersMain() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(subscribersAction.getSubscribersAsync());
	}, []);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography style={{ textAlign: 'center', fontSize: '40px' }}>Subscribers</Typography>
			</Grid>
			<SubscribersTable />
			<SubscriberDetails />
		</Grid>
	);
}

export default SubscribersMain;
