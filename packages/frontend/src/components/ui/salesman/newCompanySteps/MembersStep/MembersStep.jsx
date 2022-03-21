import React, { useState } from 'react';
import { validateMember } from '../../../../../utils/helpers/validationFunctions';

import MembersStepView from './MembersStep.view';

const MembersStep = ({
	company,
	setCompany,
	currentMember,
	setCurrentMember,
	initStateMember,
	errors,
	setErrors,
	validationResult,
	setValidationResult,
}) => {
	const [editedMemberIndex, setEditedMemberIndex] = useState(-1);

	const addMember = () => {
		const updatedMembers = [...company.members, currentMember];

		setCompany({
			...company,
			members: updatedMembers,
		});

		setCurrentMember(initStateMember);
		setErrors({});
	};

	const updateMemberField = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		setCurrentMember((prev) => ({
			...prev,
			[name]: value,
		}));

		validateMember({ [name]: value }, errors, setErrors, setValidationResult);
	};

	const handleCatsChange = (values) => {
		const newCats = [];
		for (const cat of values) {
			newCats.push(cat);
		}
		currentMember.categories = newCats;

		setCurrentMember((prev) => ({ ...prev, categories: newCats }));
		validateMember({ categories: newCats }, errors, setErrors, setValidationResult, company);
	};

	const addEditedMember = () => {
		const currentMembers = [...company.members];
		currentMembers[editedMemberIndex] = currentMember;
		setCompany({ ...company, members: currentMembers });
		setCurrentMember(initStateMember);
		setErrors({});
		setEditedMemberIndex(-1);
	};
	return (
		<MembersStepView
			addMember={addMember}
			company={company}
			setCompany={setCompany}
			updateMemberField={updateMemberField}
			handleCatsChange={handleCatsChange}
			addEditedMember={addEditedMember}
			currentMember={currentMember}
			errors={errors}
			setErrors={setErrors}
			editedMemberIndex={editedMemberIndex}
			setEditedMemberIndex={setEditedMemberIndex}
			validationResult={validationResult}
			setValidationResult={setValidationResult}
			setCurrentMember={setCurrentMember}
		/>
	);
};

MembersStep.displayName = 'MembersStep';
MembersStep.defaultProps = {};

export default React.memo(MembersStep);
