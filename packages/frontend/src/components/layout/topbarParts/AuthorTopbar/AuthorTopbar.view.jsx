import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const AuthorTopbarView = (props) => {

  return (
		<Grid item xs={3} style={{ marginRight: 113 }}>
			<Grid container justifyContent="space-between">
				<Grid item>
					<Link to={'/companies'} className={props.classes.styledLinks}>
						Companies
					</Link>
				</Grid>
				<Grid>
					<Link to={'/contracts'} className={props.classes.styledLinks}>
						Contracts
					</Link>
				</Grid>
				<Grid>
					<Link to={'/invoices'} className={props.classes.styledLinks}>
						Invoices
					</Link>
				</Grid>
			</Grid>
		</Grid>
	);
};

AuthorTopbarView.displayName = 'AuthorTopbarView';
AuthorTopbarView.defaultProps = {};

export default React.memo(AuthorTopbarView);
