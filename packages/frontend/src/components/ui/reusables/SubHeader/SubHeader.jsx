import React from 'react';

import SubHeaderView from './SubHeader.view';

const SubHeader = ({title}) => {
  return <SubHeaderView title={title}/>;
};

SubHeader.displayName = 'SubHeader';
SubHeader.defaultProps = {};

export default React.memo(SubHeader);
