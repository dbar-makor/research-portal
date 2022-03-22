import React from 'react';
import { Grid, Typography, Avatar } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
//import AvatarEditor from 'react-avatar-editor';
import useStyles from './EditProfile.style';

const EditProfileView = (props) => {
	const classes = useStyles();
	return (
		<Grid container direction="column" className={classes.editWrapper}>
			<Grid item>
				<Typography variant="h6">Personal Information</Typography>
				<Avatar className={classes.avatar}  src={props.avatar} />
				<CreateIcon className={classes.editIcon} />
			</Grid>
			<Grid item></Grid>
			<Grid item></Grid>
		</Grid>
	);
};

EditProfileView.displayName = 'EditProfileView';
EditProfileView.defaultProps = {};

export default React.memo(EditProfileView);
