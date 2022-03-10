import React from 'react';
import { useStyles } from '../../../../styles/MainStyles';
import Filters from '../../../Reusables/Filters';
import { Grid } from '@material-ui/core';
import SubHeader from '../../../Reusables/SubHeader';
import AuthorsUsers from '../AuthorsUsers/AuthorsUsers.jsx';

const AuthorsUsersScreenView = (props) => {
	const classes = useStyles();

	return (
		<Grid container justifyContent="center" className={classes.mainContainer}>
			<Grid item xs={10}>
				<Grid container>
					<Grid item xs={12} className={classes.marginBottom20}>
						<SubHeader title="Authors" />
					</Grid>
					<Grid item xs={12} className={classes.marginBottom20}>
						<Grid container>
							<Grid item xs={6}>
								<Filters
									pageType="authorsUsers"
									search={props.userSearch}
									status={props.userStatus}
									setProperty={props.setUserProperty}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<AuthorsUsers />
		</Grid>
	);
};

AuthorsUsersScreenView.displayName = 'AuthorsUsersScreenView';
AuthorsUsersScreenView.defaultProps = {};

export default React.memo(AuthorsUsersScreenView);
