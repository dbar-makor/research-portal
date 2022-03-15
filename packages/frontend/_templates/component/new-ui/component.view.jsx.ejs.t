---
to: src/components/ui/<%=name%>/<%=name%>.view.jsx
---
import React from 'react';

import useStyles from './<%=name%>.style';

const <%=name%>View = (props) => {

  return <></>;
};

<%=name%>View.displayName = '<%=name%>View';
<%=name%>View.defaultProps = {};

export default React.memo(<%=name%>View);
