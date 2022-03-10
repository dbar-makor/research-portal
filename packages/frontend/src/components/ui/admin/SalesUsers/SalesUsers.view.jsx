import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../../styles/MainStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableComponent from '../../../Reusables/TableComponent';
import UserInfo from '../../../AdminScreens/UserInfo';

const SalesUsersView = (props) => {
	const classes = useStyles();

	return (
		<Grid container justifyContent="center">
			<Grid item xs={10}>
				<Grid container>
					{!props.loading ? (
						<Grid item xs={12}>
							{props.salesData.length ? (
								<Grid container>
									<Grid item xs={6} className={classes.scrollableTableContainer}>
										<TableComponent
											data={props.salesData}
											pageType="salesUsers"
											ref={props.lastItemRef}
										/>
									</Grid>
									{props.chosenUser && props.chosenUser.type === 'sales' && (
										<Grid item xs={6}>
											<Grid container style={{ padding: '0px 16px 0px 16px' }}>
												<Grid item xs={12}>
													<UserInfo />
												</Grid>
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

SalesUsersView.displayName = 'SalesUsersView';
SalesUsersView.defaultProps = {};

export default React.memo(SalesUsersView);
