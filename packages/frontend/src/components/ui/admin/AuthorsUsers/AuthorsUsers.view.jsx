import React from 'react';
import { useStyles } from '../../../../styles/MainStyles';
import { Grid, Typography } from '@material-ui/core';
import TableComponent from '../../reusables/TableComponent/TableComponent';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserInfo from '../UserInfo/UserInfo';

const AuthorsUsersView = (props) => {
	const classes = useStyles();

	return (
		<Grid container justifyContent="center">
			<Grid item xs={10}>
				<Grid container>
					{!props.loading ? (
						<Grid item xs={12}>
							{props.authorsData.length ? (
								<Grid container>
									<Grid
										item
										xs={6}
										className={classes.scrollableTableContainer}
										// onWheel={(e) => setWheel(e.nativeEvent.wheelDelta)}
										// onScroll={(e) => handleScroll(e)}
									>
										<TableComponent
											data={props.authorsData}
											pageType="authorsUsers"
											ref={props.lastItemRef}
										/>
									</Grid>
									{props.chosenUser && props.chosenUser.type === 'author' && (
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
};

AuthorsUsersView.displayName = 'AuthorsUsersView';
AuthorsUsersView.defaultProps = {};

export default React.memo(AuthorsUsersView);
