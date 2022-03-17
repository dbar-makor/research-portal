import React ,{ useState } from 'react';
import { validateMember } from '../../../../utils/helpers/validationFunctions';
import AddMemberModalView from './AddMemberModal.view';

const AddMemberModal = (props) => {
  const { open, handleClose, companyName, addMember, newMember, setNewMember } = props;
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState(false);

	const handleCatsChange = (values) => {
		const newCats = [];
		for (const cat of values) {
			newCats.push(cat);
		}
		setNewMember({ ...newMember, categories: newCats });
		validateMember({ categories: newCats }, errors, setErrors, setValidationResult);
	};

	const updateMemberField = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setNewMember({ ...newMember, [name]: value });

		validateMember({ [name]: value }, errors, setErrors, setValidationResult);
	};

	return <AddMemberModalView
		open={open}
		handleClose={handleClose}
		companyName={companyName}
		newMember={newMember}
		setNewMember={setNewMember}
		handleCatsChange={handleCatsChange}
		updateMemberField={updateMemberField}
		errors={errors}
		setErrors={setErrors}
		validationResult={validationResult}
		setValidationResult={setValidationResult}
		addMember={addMember}
	></AddMemberModalView>;
};

AddMemberModal.displayName = 'AddMemberModal';
AddMemberModal.defaultProps = {};

export default React.memo(AddMemberModal);
