import { Button, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SubscriberInfo from './SubscriberInfo';
import SubscriberInfoEdit from './SubscriberInfoEdit';

function SubscriberDetails() {
	const subscriber = useSelector((state) => state.subscribers.chosenSubscriber);
	const [isEdit, setIsEdit] = useState(false);

	const sendEdit = () => {
		alert('EDITTT');
		setIsEdit(!isEdit);
	};
	return (
		<Grid item xs={7} style={{ paddingTop: 50 }}>
			<Grid container justifyContent="center">
				<Grid item xs={12} style={{ paddingBottom: 50 }}>
					<Typography style={{ fontSize: '25px', textAlign: 'center' }}>Subscriber Data</Typography>
				</Grid>
				{subscriber ? (
					<>
						<Grid item xs={6} style={{ paddingBottom: 50 }}>
							<Typography style={{ fontSize: '20px' }}>Info</Typography>
							<Grid container alignItems="center">
								<Grid item xs={11}>
									{!isEdit ? (
										<SubscriberInfo info={subscriber} />
									) : (
										<SubscriberInfoEdit info={subscriber} />
									)}
								</Grid>
								<Grid item xs={1} style={{ paddingTop: '25px' }}>
									<StyledBtn onClick={() => (!isEdit ? setIsEdit(!isEdit) : sendEdit())}>
										{!isEdit ? 'Edit' : 'Submit'}
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
}

export default SubscriberDetails;
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
