import { useRef, useCallback } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../styles/MainStyles';
import TableComponent from '../Reusables/TableComponent';
import {
	selectAuthorsUsersData,
	setUserProperty,
	selectUsersOffset,
	selectUsersLimit,
	selectUsersLoading,
	selectUsersHasMore,
} from '../../redux/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { selectChosenUserData } from '../../redux/users/chosenUserSlice';
import UserInfo from './UserInfo';

function AuthorsUsers() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const authorsData = useSelector(selectAuthorsUsersData);
	const chosenUser = useSelector(selectChosenUserData);

	const loading = useSelector(selectUsersLoading);

	const userOffset = useSelector(selectUsersOffset);
	const userLimit = useSelector(selectUsersLimit);
	const hasMore = useSelector(selectUsersHasMore);

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
					dispatch(setUserProperty({ key: 'offset', value: newOffset }));
				}
			});
			if (node) {
				observer.current.observe(node);
			}
		},
		[loading, hasMore],
	);

	// //Calling get companies whenever a call parameter changes offset changes by scrolling)
	// useEffect(() => {
	//   dispatch(getCompaniesDataAsync(offset, limit, search, type, status))

	// }, [offset, limit, search, type, status])

	// //If search term, company type or status changes, offset is reset to 0
	// //to ask for first "page" of results for the new query

	// useEffect(() => {
	//   dispatch(setProperty({key: 'offset', value: 0}))

	// }, [search, type, status])

	// useEffect(() => {

	//   console.log('chosenCompany', chosenCompany)
	// }, [chosenCompany])

	return (
		<Grid container justifyContent="center">
			<Grid item xs={10}>
				<Grid container>
					{!loading ? (
						<Grid item xs={12}>
							{authorsData.length ? (
								<Grid container>
									<Grid
										item
										xs={6}
										className={classes.scrollableTableContainer}
										// onWheel={(e) => setWheel(e.nativeEvent.wheelDelta)}
										// onScroll={(e) => handleScroll(e)}
									>
										<TableComponent
											data={authorsData}
											pageType="authorsUsers"
											ref={lastItemRef}
										/>
									</Grid>
									{chosenUser && chosenUser.type === 'author' && (
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

export default AuthorsUsers;
