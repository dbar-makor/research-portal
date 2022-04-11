import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import useStyles from './BigPublication.style';

const BigPublicationView = (props) => {
	const classes = useStyles();

	const chooseImage = (publication) => {
		let image = '';
		let url = '';
		if (publication.attachments.length) {
			image = publication.attachments.find((attachment) => attachment.file_type === 'main_bg');
			const imageName = image && image.file_name_system;
			if (!imageName) return 0;
			url = `${BASE_URL}${END_POINT.ASSETS}/${encodeURIComponent(imageName)}`;
		}
		return url;
	};

	const truncateDescription = (string) => {
		const descrptionArr = string.split(' ');
		const descriptionLength = descrptionArr.length;
		descrptionArr.splice(14);
		const newDescription = descrptionArr.join(' ');
		if (descriptionLength > 15) return `${newDescription}...`;
		return newDescription;
	};

	return (
		<Grid item xs={12} key={props.publication.id} style={{ padding: 14 }}>
			<Grid container>
				<Grid item xs={6}>
					<Link
						to={{
							pathname: `article/${props.publication.id}`,
							state: {
								applied: true,
							},
						}}
					>
						<Grid
							item
							xs={12}
							className={classes.sideHalf}
							style={{
								backgroundImage: chooseImage(props.publication)
									? `url(${chooseImage(props.publication)})`
									: 'none',
								backgroundColor: '#74b2f0',
							}}
						></Grid>
					</Link>
				</Grid>

				<Grid item xs={6} className={classes.rightHalf}>
					<Grid container direction="column" xs={12}>
						<Grid
							item
							className={classes.outerColumn}
							container
							direction="column"
							alignItems="flex-end"
							justify="flex-start"
						>
							<Typography variant="body2" className={classes.date}>
								{format(new Date(props.publication.published_at), 'dd MMM, yyyy')}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="h5" className={classes.title}>
								{props.publication.title}
							</Typography>
							<Typography variant="body2" component="h2">
								{truncateDescription(props.publication.description)}
							</Typography>
							<Grid item direction="column" align="left" justify="flex-end">
								<Typography variant="body2" component="h2" className={classes.author}>
									{props.publication.name}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

BigPublicationView.displayName = 'BigPublicationView';
BigPublicationView.defaultProps = {};

export default React.memo(BigPublicationView);
