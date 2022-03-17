import React from 'react';
import { useStyles } from '../../../../styles/MainStyles';
import { Grid, Typography } from '@material-ui/core';
import TableComponent from '../../../Reusables/TableComponent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CompanyInfo from '../../salesman/companyDetails/CompanyInfo/CompanyInfo';
import MembersTable from '../membersDetails/MembersTable/MembersTable';

const MainSalesScreenView = (props) => {
	const classes = useStyles();

	return (
		<Grid container justifyContent="center">
			<Grid item xs={10}>
				<Grid container>
					{!props.loading ? (
						<Grid item xs={12}>
							{props.companiesData.length ? (
								<Grid container>
									<Grid item xs={6} className={classes.scrollableTableContainer}>
										<TableComponent
											data={props.companiesData}
											pageType="companies"
											ref={props.lastItemRef}
										/>
									</Grid>
									{props.chosenCompany && (
										<Grid item xs={6}>
											<Grid container style={{ padding: '0px 16px 0px 16px' }}>
												<Grid item xs={12}>
													<CompanyInfo />
												</Grid>
												<Grid item xs={12}>
													<MembersTable />
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

MainSalesScreenView.displayName = 'MainSalesScreenView';
MainSalesScreenView.defaultProps = {};

export default React.memo(MainSalesScreenView);
