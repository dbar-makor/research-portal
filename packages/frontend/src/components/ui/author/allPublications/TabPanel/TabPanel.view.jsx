import React from 'react';
import Box from '@material-ui/core/Box';

import useStyles from './TabPanel.style';

const TabPanelView = (props) => {

  const classes = useStyles();

  return (
		<div
			role="tabpanel"
			hidden={props.value !== props.index}
			id={`tabpanel-${props.index}`}
			aria-labelledby={`tab-${props.index}`}
			{...props.other}
		>
			{props.value === props.index && (
				<Box p={3} className={classes.panel}>
					{props.children}
				</Box>
			)}
		</div>
	);
};

TabPanelView.displayName = 'TabPanelView';
TabPanelView.defaultProps = {};

export default React.memo(TabPanelView);
