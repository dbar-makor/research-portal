import React from 'react';

import MakorLogoView from './MakorLogo.view';

const MakorLogo = (props) => {
  const {userType,classes}=props;
  return <MakorLogoView
  userType={userType}
  classes={classes}
  ></MakorLogoView>;
};

MakorLogo.displayName = 'MakorLogo';
MakorLogo.defaultProps = {};

export default React.memo(MakorLogo);
