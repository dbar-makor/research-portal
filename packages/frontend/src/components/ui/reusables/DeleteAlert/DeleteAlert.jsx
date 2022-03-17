import React from 'react';

import DeleteAlertView from './DeleteAlert.view';

const DeleteAlert = (props) => {
	return (
		<DeleteAlertView
			open={props.open}
			handleClose={props.handleClose}
			itemName={props.itemName}
			itemId={props.itemId}
			itemCategory={props.itemCategory}
			deleteItem={props.deleteItem}
		/>
	);
};

DeleteAlert.displayName = 'DeleteAlert';
DeleteAlert.defaultProps = {};

export default React.memo(DeleteAlert);
