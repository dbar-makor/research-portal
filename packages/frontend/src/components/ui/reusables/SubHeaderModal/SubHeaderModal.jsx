import React from 'react';

import SubHeaderModalView from './SubHeaderModal.view';

const SubHeaderModal = ({ title }) => {
  return <SubHeaderModalView title={title}/>;
};

SubHeaderModal.displayName = 'SubHeaderModal';
SubHeaderModal.defaultProps = {};

export default React.memo(SubHeaderModal);
