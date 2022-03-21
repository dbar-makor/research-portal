import React from 'react';

import StepperIconsView from './StepperIcons.view';

const StepperIcons = (props) => {
  const { active, completed } = props;

  return <StepperIconsView active={active} completed={completed}  />;
};

StepperIcons.displayName = 'StepperIcons';
StepperIcons.defaultProps = {};

export default React.memo(StepperIcons);
