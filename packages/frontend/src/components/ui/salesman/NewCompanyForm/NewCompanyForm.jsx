import React from 'react';

import NewCompanyFormView from './NewCompanyForm.view';

const NewCompanyForm = (props) => {
  return <NewCompanyFormView> </NewCompanyFormView>;
};

NewCompanyForm.displayName = 'NewCompanyForm';
NewCompanyForm.defaultProps = {};

export default React.memo(NewCompanyForm);
