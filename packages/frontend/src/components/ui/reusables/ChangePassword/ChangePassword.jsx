import React, {useState, useCallback} from 'react';

import ChangePasswordView from './ChangePassword.view';

const ChangePassword = (props) => {
const initState = {
  oldPass: '',
  newPass: '',
  newPass2: ''
}
  const [localForm, setLocalForm] = useState(initState);

	return <ChangePasswordView chosenModal={props.chosenModal} handleCloseModal={props.handleCloseModal} />;
};

ChangePassword.displayName = 'ChangePassword';
ChangePassword.defaultProps = {};

export default React.memo(ChangePassword);
