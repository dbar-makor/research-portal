import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import { Link } from 'react-router-dom';

import useStyles from './MorePublications.style';

const MorePublicationsView = (props) => {
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
		const descrptionLength = string.length;

		if (descrptionLength > 105) {
			return `${string.substring(0, 105)}...`;
		} else {
			return `${string}...`;
		}
	};

	return (
		<Grid item xs={12} style={{ paddingBlock: '16px 10px' }}>
			<Grid container spacing={2}>
				{props.morePub &&
					props.morePub !== null &&
					props.morePub.map((publication, idx) => {
						return (
							<Grid key={idx} item xs={4} style={{ paddingLeft: '16px' }}>
								<Grid container direction="column">
									<Grid item>
										<Link to={`${publication.id}`}>
											<Grid
												item
												xs={12}
												className={classes.upperHalf}
												style={{
													backgroundImage: chooseImage(publication)
														? `url(${chooseImage(publication)})`
														: 'none',
													backgroundColor: '#74b2f0',
												}}
											></Grid>
										</Link>
									</Grid>
									<Grid item>
										<Grid container>
											<Grid item xs={12}>
												<Typography className={classes.title}>
													{publication.title}
												</Typography>
											</Grid>
											<Grid item style={{ paddingTop: 5 }}>
												<Typography variant="body2">
													{truncateDescription(publication.description)}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						);
					})}
			</Grid>
		</Grid>
	);
};

MorePublicationsView.displayName = 'MorePublicationsView';
MorePublicationsView.defaultProps = {};

export default React.memo(MorePublicationsView);
