import React from 'react';

import MembersHeaderView from './MembersHeader.view';

const MembersHeader = (props) => {
	const {
		allMembersAmount,
		activeMembersAmount,
		showAll,
		setShowAll,
		memberSearch,
		setMemberSearch,
		companyName,
		addMember,
		handleCloseModal,
		handleOpenModal,
		openAddMember,
		newMember,
		setNewMember,
	} = props;
	return (
		<MembersHeaderView
			allMembersAmount={allMembersAmount}
			activeMembersAmount={activeMembersAmount}
			showAll={showAll}
			setShowAll={setShowAll}
			memberSearch={memberSearch}
			setMemberSearch={setMemberSearch}
			companyName={companyName}
			addMember={addMember}
			handleCloseModal={handleCloseModal}
			handleOpenModal={handleOpenModal}
			openAddMember={openAddMember}
			newMember={newMember}
			setNewMember={setNewMember}
		></MembersHeaderView>
	);
};

MembersHeader.displayName = 'MembersHeader';
MembersHeader.defaultProps = {};

export default React.memo(MembersHeader);
