import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import SubscriberInfo from './SubscriberInfo';
import SubscriberInfoEdit from './SubscriberInfoEdit';

const StyledBtn = withStyles(() => ({
	root: {
		'backgroundColor': '#007FFF',
		'color': '#ffffff',
		'fontWeight': '500',
		'&:hover': {
			backgroundColor: '#007fffad',
		},
	},
}))(Button);

const SubscriberDetailsView = (props) => {
	return (
		<Grid item xs={7} style={{ paddingTop: 50 }}>
			<Grid container justifyContent="center">
				<Grid item xs={12} style={{ paddingBottom: 50 }}>
					<Typography style={{ fontSize: '25px', textAlign: 'center' }}>Subscriber Data</Typography>
				</Grid>
				{props.subscriber ? (
					<>
						<Grid item xs={6} style={{ paddingBottom: 50 }}>
							<Typography style={{ fontSize: '20px' }}>Info</Typography>
							<Grid container alignItems="center">
								<Grid item xs={11}>
									{!props.isEdit ? (
										<SubscriberInfo info={props.subscriber} />
									) : (
										<SubscriberInfoEdit info={props.subscriber} />
									)}
								</Grid>
								<Grid item xs={1} style={{ paddingTop: '25px' }}>
									<StyledBtn
										onClick={() =>
											!props.isEdit ? props.setIsEdit(!props.isEdit) : props.sendEdit()
										}
									>
										{!props.isEdit ? 'Edit' : 'Submit'}
									</StyledBtn>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={11}>
							<Typography style={{ fontSize: '20px' }}>Logs</Typography>
							<Grid container style={{ height: '350px', backgroundColor: 'lightyellow' }}>
								<Grid item></Grid>
							</Grid>
						</Grid>
					</>
				) : null}
			</Grid>
		</Grid>
	);
};

SubscriberDetailsView.displayName = 'SubscriberDetailsView';
SubscriberDetailsView.defaultProps = {};

export default React.memo(SubscriberDetailsView);
