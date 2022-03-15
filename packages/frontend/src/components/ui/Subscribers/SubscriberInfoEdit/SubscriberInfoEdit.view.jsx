import React from 'react';
import { Grid, TextField, withStyles } from '@material-ui/core';

const StyledTextField = withStyles(() => ({
	root: {
		width: 300,
	},
}))(TextField);

const SubscriberInfoEditView = (props) => {
	return (
		<Grid container>
			<Grid item xs={6}>
				<Grid contatiner>
					<Grid item xs={12} style={{ paddingTop: '50px' }}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTextField
									id="standard-basic"
									label="Name"
									value={props.info.full_name}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ paddingTop: ' 50px' }}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTextField id="standard-basic" label="Email" value={props.info.email} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6}>
				<Grid contatiner>
					<Grid item xs={12} style={{ paddingTop: '50px' }}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTextField
									id="standard-basic"
									label="Paid"
									value={props.info.paid.toString()}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ paddingTop: ' 50px' }}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTextField
									id="standard-basic"
									label="Country"
									value={props.info.country}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

SubscriberInfoEditView.displayName = 'SubscriberInfoEditView';
SubscriberInfoEditView.defaultProps = {};

export default React.memo(SubscriberInfoEditView);
