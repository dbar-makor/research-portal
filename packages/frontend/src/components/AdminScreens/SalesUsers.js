import { useRef, useCallback } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../styles/MainStyles';
import TableComponent from '../Reusables/TableComponent';
import {
	selectSalesUsersData,
	setUserProperty,
	selectUsersOffset,
	selectUsersLimit,
	selectUsersLoading,
	selectUsersHasMore,
} from '../../redux/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserInfo from '../AdminScreens/UserInfo';
import { selectChosenUserData } from '../../redux/users/chosenUserSlice';

function SalesUsers() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const salesData = useSelector(selectSalesUsersData);
	const chosenUser = useSelector(selectChosenUserData);

	const loading = useSelector(selectUsersLoading);

	const userOffset = useSelector(selectUsersOffset);
	const userLimit = useSelector(selectUsersLimit);
	// const scrollRef = useRef();
	const hasMore = useSelector(selectUsersHasMore);

	// const fetchCompaniesData = AwesomeDebouncePromise(dispatch(getCompaniesDataAsync(offset, limit, search, type, status)), 500)

	// useEffect(() => {
	//   dispatch(getUsersByTypeAsync('sales'))

	//   // fetchCompaniesData()
	// }, [])

	// useEffect(() => {
	//   dispatch(setProperty({key: 'offset', value: 0}))

	//   // fetchCompaniesData()
	// }, [search, type, status])

	const observer = useRef(null);

	const lastItemRef = useCallback(
		(node) => {
			if (loading) {
				return;
			}
			if (observer.current) {
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					const newOffset = userOffset + userLimit;
					// console.log("containerRef.current?.scrollHeight",containerRef.current?.scrollHeight)
					dispatch(setUserProperty({ key: 'offset', value: newOffset }));
				}
			});
			if (node) {
				observer.current.observe(node);
			}
		},
		[loading, hasMore],
	);

	return (
		<Grid container justifyContent="center">
			<Grid item xs={10}>
				<Grid container>
					{!loading ? (
						<Grid item xs={12}>
							{salesData.length ? (
								<Grid container>
									<Grid
										item
										xs={6}
										className={classes.scrollableTableContainer}
										// onWheel={(e) => setWheel(e.nativeEvent.wheelDelta)}
										// onScroll={(e) => handleScroll(e)}
									>
										<TableComponent
											data={salesData}
											pageType="salesUsers"
											ref={lastItemRef}
										/>
									</Grid>
									{chosenUser && chosenUser.type === 'sales' && (
										<Grid item xs={6}>
											<Grid container style={{ padding: '0px 16px 0px 16px' }}>
												<Grid item xs={12}>
													<UserInfo />
												</Grid>
												{/* <Grid item xs={12}>
                        <MembersTable />
                      </Grid> */}
											</Grid>
										</Grid>
									)}
								</Grid>
							) : (
								<Grid container>
									<Grid item xs={6}>
										<Typography className={classes.noMatches}>
											No matches found
										</Typography>
									</Grid>
								</Grid>
							)}
						</Grid>
					) : (
						<Grid item xs={12}>
							<Grid
								container
								justifyContent="center"
								alignItems="center"
								className={classes.progressBarContainer}
							>
								<CircularProgress className={classes.progressBar} />
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default SalesUsers;
