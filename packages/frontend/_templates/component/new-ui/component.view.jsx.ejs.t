---
to: src/components/ui/V<%= h.changeCase.pascalCase(name.toLowerCase()) %>/V<%= h.changeCase.pascalCase(name.toLowerCase()) %>.view.jsx
---
<% name = name.toLowerCase() %>import React from 'react';

import classes from './V<%= h.changeCase.pascalCase(name) %>.module.scss';

const V<%= h.changeCase.pascalCase(name) %>View = (props) => {
  return <></>;
};

V<%= h.changeCase.pascalCase(name) %>View.displayName = 'V<%= h.changeCase.pascalCase(name) %>View';
V<%= h.changeCase.pascalCase(name) %>View.defaultProps = {};

export default React.memo(V<%= h.changeCase.pascalCase(name) %>View);
