import React from 'react';

import CategoriesModalView from './CategoriesModal.view';

const CategoriesModal = (props) => {
	const {
		open,
		handleClose,
		currentMember,
		setCurrentMember,
		updateMemberField,
		memberIndex,
		membersRows,
		setMembersRows,
		sendMember,
	} = props;
	return (
		<CategoriesModalView
			open={open}
			handleClose={handleClose}
			currentMember={currentMember}
			setCurrentMember={setCurrentMember}
			updateMemberField={updateMemberField}
			memberIndex={memberIndex}
			membersRows={membersRows}
			setMembersRows={setMembersRows}
			sendMember={sendMember}
		></CategoriesModalView>
	);
};

CategoriesModal.displayName = 'CategoriesModal';
CategoriesModal.defaultProps = {};

export default React.memo(CategoriesModal);
