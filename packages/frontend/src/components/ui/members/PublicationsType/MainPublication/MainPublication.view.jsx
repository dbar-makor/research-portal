import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import { Link } from 'react-router-dom';

import useStyles from './MainPublication.style';

const MainPublicationView = (props) => {
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
		<Grid item xs={3} style={{ padding: '16px' }}>
			<Grid container>
				<Grid item xs={12}>
					<Link to={`article/${props.publication.id}`}>
						<Grid
							item
							xs={12}
							className={classes.upperHalf}
							style={{
								backgroundImage: chooseImage(props.publication)
									? `url(${chooseImage(props.publication)})`
									: 'none',
								backgroundColor: '#74b2f0',
							}}
						></Grid>
					</Link>
				</Grid>
				<Grid item xs={12}>
					<Grid container direction="column">
						<Grid item style={{ paddingBlock: '16px 10px' }}>
							<Typography variant="h5" className={classes.title}>
								{props.publication.title}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="body2">
								{truncateDescription(props.publication.description)}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

MainPublicationView.displayName = 'MainPublicationView';
MainPublicationView.defaultProps = {};

export default React.memo(MainPublicationView);
