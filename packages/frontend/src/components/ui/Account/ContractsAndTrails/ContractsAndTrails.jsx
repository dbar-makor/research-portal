import React from 'react';

import ContractsAndTrailsView from './ContractsAndTrails.view';

const ContractsAndTrails = () => {
  return <ContractsAndTrailsView></ContractsAndTrailsView>;
};

ContractsAndTrails.displayName = 'ContractsAndTrails';
ContractsAndTrails.defaultProps = {};

export default React.memo(ContractsAndTrails);
