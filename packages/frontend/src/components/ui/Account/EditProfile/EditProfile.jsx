import React from 'react';

import EditProfileView from './EditProfile.view';

const EditProfile = () => {
  return <EditProfileView></EditProfileView>;
};

EditProfile.displayName = 'EditProfile';
EditProfile.defaultProps = {};

export default React.memo(EditProfile);
