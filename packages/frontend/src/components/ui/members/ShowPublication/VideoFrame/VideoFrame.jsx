import React from 'react';

import VideoFrameView from './VideoFrame.view';

const VideoFrame = ({ video }) => {
	return <VideoFrameView video={video}></VideoFrameView>;
};

VideoFrame.displayName = 'VideoFrame';
VideoFrame.defaultProps = {};

export default React.memo(VideoFrame);
