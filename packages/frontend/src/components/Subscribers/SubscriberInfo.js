import { Grid, Typography, withStyles } from '@material-ui/core';

function Subscriberinfo(props) {
	const { info } = props;
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
								<Typography style={{ fontSize: '16px' }}>{info.full_name}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ paddingTop: ' 50px' }}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTitleTypography>Email:</StyledTitleTypography>
							</Grid>
							<Grid item xs={12}>
								<Typography style={{ fontSize: '16px' }}>{info.email}</Typography>
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
									{info.paid === true ? 'Yes' : 'No'}
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
								<Typography style={{ fontSize: '16px' }}>{info.country}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Subscriberinfo;

const StyledTitleTypography = withStyles(() => ({
	root: {
		fontWeight: 600,
		fontSize: '16px',
	},
}))(Typography);
