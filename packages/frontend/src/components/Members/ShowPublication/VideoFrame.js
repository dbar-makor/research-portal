import { Grid, Typography } from '@material-ui/core';

const VideoFrame = (props) => {
	const { video } = props;
	return (
		<Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
			{video.link_video !== null && video.title_video !== null ? (
				<iframe
					width="80%"
					height="450"
					src={`${video.link_video}`}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					title={`${video.title_video}`}
				></iframe>
			) : (
				<Typography>NO CONTENT TO SHOW</Typography>
			)}
		</Grid>
	);
};

export default VideoFrame;
