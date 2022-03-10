import { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Filters from '../Reusables/Filters';
import SalesUsers from '../ui/admin/SalesUsers/SalesUsers.jsx';
import { useStyles } from '../../styles/MainStyles';
import SubHeader from '../Reusables/SubHeader';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectUsersStatus,
	selectUsersSearch,
	setUserProperty,
	selectUsersOffset,
	selectUsersLimit,
	getUsersByTypeAsync,
} from '../../redux/users/usersSlice';

function SalesUsersScreen() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const userOffset = useSelector(selectUsersOffset);
	const userLimit = useSelector(selectUsersLimit);
	const userSearch = useSelector(selectUsersSearch);
	const userStatus = useSelector(selectUsersStatus);

	useEffect(() => {
		dispatch(getUsersByTypeAsync(userOffset, userLimit, userSearch, 'sales', userStatus));
		// return () => {
		//   dispatch(setUserProperty({key: 'search', value: '' }))
		//   dispatch(setUserProperty({key: 'status', value: '' }))
		// }
	}, [userOffset, userLimit, userSearch, userStatus]);

	return (
		<Grid container justifyContent="center" className={classes.mainContainer}>
			<Grid item xs={10}>
				<Grid container>
					<Grid item xs={12} className={classes.marginBottom20}>
						<SubHeader title="Sales" />
					</Grid>
					<Grid item xs={12} className={classes.marginBottom20}>
						<Grid container>
							<Grid item xs={6}>
								<Filters
									pageType="salesUsers"
									search={userSearch}
									status={userStatus}
									setProperty={setUserProperty}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<SalesUsers />
		</Grid>
	);
}

export default SalesUsersScreen;
