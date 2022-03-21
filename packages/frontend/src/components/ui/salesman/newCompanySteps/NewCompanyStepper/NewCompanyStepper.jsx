import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCompaniesDataAsync,
	selectSearch,
	selectType,
	selectStatus,
	selectOffset,
	selectLimit,
} from '../../../../../redux/companies/companiesSlice';
import { validateCompany } from '../../../../../utils/helpers/validationFunctions';
import NewCompanyStepperView from './NewCompanyStepper.view';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';

const NewCompanyStepper = ({ handleClose, open }) => {
	const dispatch = useDispatch();
	const search = useSelector(selectSearch);
	const type = useSelector(selectType);
	const status = useSelector(selectStatus);
	const offset = useSelector(selectOffset);
	const limit = useSelector(selectLimit);

	const initState = {
		name: '',
		logo: '',
		start_at: '',
		end_at: '',
		type: '',
		country: {},
		members: [],
	};

	const [company, setCompany] = useState(initState);
	const [errors1, setErrors1] = useState({});
	const [errors2, setErrors2] = useState({});
	const [validationResult1, setValidationResult1] = useState(false);
	const [validationResult2, setValidationResult2] = useState(false);
	const [uploadedImage, setUploadedImage] = useState('');
	const initStateMember = {
		member_name: null,
		username: null,
		email: null,
		position: null,
		categories: [],
	};
	const [currentMember, setCurrentMember] = useState(initStateMember);
	const [inputValue, setInputValue] = useState('');
	const [activeStep, setActiveStep] = useState(0);
	const steps = ['Information', 'Members'];

	//HANDLERS

	const handleNext = useCallback(() => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	});

	const handleBack = useCallback(() => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	});

	const handleCompany = useCallback((e, fieldIndicator) => {
		let value;

		if (
			fieldIndicator === 'start_at' ||
			fieldIndicator === 'end_at' ||
			fieldIndicator === 'type' ||
			fieldIndicator === 'categories' ||
			fieldIndicator === 'country'
		) {
			value = e;
		} else {
			value = e.target.value;
		}

		let name;
		if (
			fieldIndicator === 'start_at' ||
			fieldIndicator === 'end_at' ||
			fieldIndicator === 'categories' ||
			fieldIndicator === 'country' ||
			fieldIndicator === 'type'
		) {
			name = fieldIndicator;
		} else {
			name = e.target.name;
		}

		setCompany((prev) => ({
			...prev,
			// status: "company",
			[name]: value,
		}));

		validateCompany({ [name]: value }, errors1, setErrors1, setValidationResult1, company);
	});

	const handleSubmit = useCallback(async () => {
		//changing array of object categories into array of categories' IDs

		const updatedMembers = [];
		company.members.forEach((member) => {
			const updatedMember = { ...member, categories: member.categories.map((category) => category.id) };
			updatedMembers.push(updatedMember);
		});

		//also adding reply from server for uploaded image
		const updatedCompany = {
			...company,
			members: updatedMembers,
			logo: uploadedImage,
			country: company.country.code,
		};

		try {
			if (validationResult1 && validationResult2 && company.members.length >= 1) {
				const res = await axios.post(`${BASE_URL}${END_POINT.COMPANY}`, updatedCompany);

				if (res.status === 200 || res.status === 201) {
					setCompany(initState);
					dispatch(getCompaniesDataAsync(offset, limit, search, type, status));
					setUploadedImage('');
					setInputValue('');
					setActiveStep(0);
					setErrors1({});
					setValidationResult1(false);
					setValidationResult2(false);
					dispatch(actionSnackBar.setSnackBar('success', 'Successfully created', 2000));
				}
			}
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', 'Creation failed', 2000));
		}
		handleClose();
	});

	return (
		<NewCompanyStepperView
			activeStep={activeStep}
			company={company}
			currentMember={currentMember}
			errors1={errors1}
			errors2={errors2}
			handleNext={handleNext}
			handleBack={handleBack}
			handleCompany={handleCompany}
			handleSubmit={handleSubmit}
			handleClose={handleClose}
			initStateMember={initStateMember}
			inputValue={inputValue}
			open={open}
			setCompany={setCompany}
			setCurrentMember={setCurrentMember}
			setErrors1={setErrors1}
			setErrors2={setErrors2}
			setInputValue={setInputValue}
			setUploadedImage={setUploadedImage}
			setValidationResult1={setValidationResult1}
			setValidationResult2={setValidationResult2}
			steps={steps}
			uploadedImage={uploadedImage}
			validationResult1={validationResult1}
			validationResult2={validationResult2}
		/>
	);
};

NewCompanyStepper.displayName = 'NewCompanyStepper';
NewCompanyStepper.defaultProps = {};

export default React.memo(NewCompanyStepper);
