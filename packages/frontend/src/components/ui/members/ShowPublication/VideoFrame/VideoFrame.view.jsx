import React from 'react';

import { Grid, Typography } from '@material-ui/core';

const VideoFrameView = (props) => {
	return (
		<Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
			{props.video.link_video !== null && props.video.title_video !== null ? (
				<iframe
					width="80%"
					height="450"
					src={`${props.video.link_video}`}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					title={`${props.video.title_video}`}
				></iframe>
			) : (
				<Typography>NO CONTENT TO SHOW</Typography>
			)}
		</Grid>
	);
};

VideoFrameView.displayName = 'VideoFrameView';
VideoFrameView.defaultProps = {};

export default React.memo(VideoFrameView);
