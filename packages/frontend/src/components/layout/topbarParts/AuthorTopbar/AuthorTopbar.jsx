import React from 'react';

import AuthorTopbarView from './AuthorTopbar.view';

const AuthorTopbar = (props) => {
  const classes=props.classes;
  return <AuthorTopbarView
  classes={classes}
  ></AuthorTopbarView>;
};

AuthorTopbar.displayName = 'AuthorTopbar';
AuthorTopbar.defaultProps = {};

export default React.memo(AuthorTopbar);
