import { Grid, Typography } from '@material-ui/core';

function TitleUnit({ classNameGrid, classNameTypography, content }) {
	return (
		<Grid container className={classNameGrid} justifyContent="center">
			<Grid item xs={10}>
				<Typography className={classNameTypography}>{content}</Typography>
			</Grid>
		</Grid>
	);
}

export default TitleUnit;
