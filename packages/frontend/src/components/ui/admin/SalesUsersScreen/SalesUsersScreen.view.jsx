import React from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from '../../../../styles/MainStyles';
import SubHeader from '../../../ui/reusables/SubHeader/SubHeader';
import Filters from '../../reusables/Filters/Filters';
import SalesUsers from '../SalesUsers/SalesUsers.jsx';

const SalesUsersScreenView = (props) => {
	const classes = useStyles();

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
									search={props.userSearch}
									status={props.userStatus}
									setProperty={props.setUserProperty}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<SalesUsers />
		</Grid>
	);
};

SalesUsersScreenView.displayName = 'SalesUsersScreenView';
SalesUsersScreenView.defaultProps = {};

export default React.memo(SalesUsersScreenView);
