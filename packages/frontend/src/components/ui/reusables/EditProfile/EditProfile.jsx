import React, { useState } from 'react';

import EditProfileView from './EditProfile.view';

const EditProfile = () => {
	const [avatar, setAvatar] = useState(
		'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
	);
	return <EditProfileView avatar={avatar}
  setAvatar={setAvatar}
  ></EditProfileView>;
};

EditProfile.displayName = 'EditProfile';
EditProfile.defaultProps = {};

export default React.memo(EditProfile);
