import React from 'react';

import TabPanelView from './TabPanel.view';

const TabPanel = ({ children, value, index, other }) => {

  return <TabPanelView  value={value} index={index} other={other}>
    {children}
    </TabPanelView >;
};

TabPanel.displayName = 'TabPanel';
TabPanel.defaultProps = {};

export default React.memo(TabPanel);
