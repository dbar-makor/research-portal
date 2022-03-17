import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import clsx from 'clsx';
import useStyles from './StepperIcons.style';

const StepperIconsView = (props) => {
	const classes = useStyles();
	const icons = {
		1: <InfoOutlinedIcon />,
		2: <PersonIcon />,
	};

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: props.active,
				[classes.completed]: props.completed,
			})}
		>
			{icons[String(props.icon)]}
		</div>
	);
};

StepperIconsView.displayName = 'StepperIconsView';
StepperIconsView.defaultProps = {};

export default React.memo(StepperIconsView);
