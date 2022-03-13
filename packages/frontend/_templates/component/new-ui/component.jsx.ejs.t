---
to: src/components/ui/V<%= h.changeCase.pascalCase(name) %>/V<%= h.changeCase.pascalCase(name.toLowerCase()) %>.jsx
---
<% name = name.toLowerCase() %>import React from 'react';

import V<%= h.changeCase.pascalCase(name) %>View from './V<%= h.changeCase.pascalCase(name) %>.view';

const V<%= h.changeCase.pascalCase(name) %> = (props) => {
  return <V<%= h.changeCase.pascalCase(name) %>View>{props.children}</V<%= h.changeCase.pascalCase(name) %>View>;
};

V<%= h.changeCase.pascalCase(name) %>.displayName = 'V<%= h.changeCase.pascalCase(name) %>';
V<%= h.changeCase.pascalCase(name) %>.defaultProps = {};

export default React.memo(V<%= h.changeCase.pascalCase(name) %>);
