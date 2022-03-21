import React, { useState, useCallback } from 'react';
import NewMembersTableView from './NewMembersTable.view';

const NewMembersTable = ({
	members,
	setCurrentMember,
	company,
	setCompany,
	setErrors,
	setEditedMemberIndex,
}) => {
	const rows = members;
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = useCallback((event) => {
		setAnchorEl(event.currentTarget);
	});

	const handleClose = useCallback(() => {
		setAnchorEl(null);
	});

	const deleteMember = useCallback((index) => {
		const currentMembers = [...company.members];
		currentMembers.splice(index, 1);
		setCompany({
			...company,
			members: currentMembers,
		});
		handleClose();
	});

	const editMember = useCallback((index) => {
		setEditedMemberIndex(index);
		const chosenMember = company.members[index];
		setCurrentMember(chosenMember);
		setErrors({ member_name: '', username: '', email: '', position: '', categories: '' });
		handleClose();
	});

	return (
		<NewMembersTableView
			handleClick={handleClick}
			handleClose={handleClose}
			deleteMember={deleteMember}
			editMember={editMember}
      rows={rows}
      anchorEl={anchorEl}
      open={open}
		/>
	);
};

NewMembersTable.displayName = 'NewMembersTable';
NewMembersTable.defaultProps = {};

export default React.memo(NewMembersTable);
