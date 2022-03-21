import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import useStyles from './SmallPublication.style';

const SmallPublicationView = (props) => {
	const classes = useStyles();

	const chooseImage = (publication) => {
		let image = '';
		let url = '';
		if (publication.attachments.length) {
			image = publication.attachments.find((attachment) => attachment.file_type === 'main_bg');
			const imageName = image && image.file_name_system;
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
		<Grid item xs={6} style={{ padding: '16px' }}>
			<Grid container justifyContent="space-between">
				<Grid item xs={5}>
					<Link to={`article/${props.publication.id}`}>
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
				<Grid item xs={6}>
					<Grid container justifyContent="space-between">
						<Grid item xs={12} align="right">
							<Typography variant="body2" className={classes.date}>
								{format(new Date(props.publication.published_at), 'dd MMM, yyyy')}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Grid container>
								<Grid item xs={12} style={{ paddingTop: '15px' }}>
									<Typography variant="h5" component="h2" className={classes.title}>
										{props.publication.title}
									</Typography>
								</Grid>
								<Grid item xs={12} style={{ paddingBlock: '10px 9px' }}>
									<Typography variant="body2" component="h2">
										{truncateDescription(props.publication.description)}
									</Typography>
								</Grid>
								<Grid item xs={12} align="baseline">
									<Typography style={{ fontSize: '14px', color: '#868DA2' }}>
										{props.publication.name}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

SmallPublicationView.displayName = 'SmallPublicationView';
SmallPublicationView.defaultProps = {};

export default React.memo(SmallPublicationView);
