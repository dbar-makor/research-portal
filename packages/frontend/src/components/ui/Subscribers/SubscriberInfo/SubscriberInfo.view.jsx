import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';

const StyledTitleTypography = withStyles(() => ({
	root: {
		fontWeight: 600,
		fontSize: '16px',
	},
}))(Typography);

const SubscriberInfoView = (props) => {
	return (
		<Grid container>
			<Grid item xs={6}>
				<Grid contatiner justifyContent="space-between">
					<Grid item xs={12} style={{ paddingTop: '50px' }}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTitleTypography>Full Name:</StyledTitleTypography>
							</Grid>
							<Grid item xs={12}>
								<Typography style={{ fontSize: '16px' }}>{props.info.full_name}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ paddingTop: ' 50px' }}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTitleTypography>Email:</StyledTitleTypography>
							</Grid>
							<Grid item xs={12}>
								<Typography style={{ fontSize: '16px' }}>{props.info.email}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6}>
				<Grid contatiner justifyContent="space-between">
					<Grid item style={{ paddingTop: '50px' }}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTitleTypography>Paid:</StyledTitleTypography>
							</Grid>
							<Grid item xs={12}>
								<Typography style={{ fontSize: '16px' }}>
									{props.info.paid === true ? 'Yes' : 'No'}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ paddingTop: '50px' }}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTitleTypography>Country:</StyledTitleTypography>
							</Grid>
							<Grid item xs={12}>
								<Typography style={{ fontSize: '16px' }}>{props.info.country}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

SubscriberInfoView.displayName = 'SubscriberInfoView';
SubscriberInfoView.defaultProps = {};

export default React.memo(SubscriberInfoView);
