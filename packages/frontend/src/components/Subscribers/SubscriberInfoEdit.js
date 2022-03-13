import { Grid, TextField, withStyles } from '@material-ui/core';

const SubscriberInfoEdit = (prop) => {
	const { info } = prop;
	return (
		<Grid container>
			<Grid item xs={6}>
				<Grid contatiner>
					<Grid item xs={12} style={{ paddingTop: '50px' }}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTextField id="standard-basic" label="Name" value={info.full_name} />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ paddingTop: ' 50px' }}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTextField id="standard-basic" label="Email" value={info.email} />
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
									value={info.paid.toString()}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ paddingTop: ' 50px' }}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTextField id="standard-basic" label="Country" value={info.country} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SubscriberInfoEdit;

const StyledTextField = withStyles(() => ({
	root: {
		width: 300,
	},
}))(TextField);
