import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import axios from 'axios';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';
import { changeChosenCompany, selectChosenCompany } from '../../../../../redux/companies/chosenCompanySlice';
import SideFormView from './SideForm.view';

const SideForm = (props) => {
	const { activeSidebar, chosenContract, loadingSidebar } = props;
	const [contractSigner, setContractSigner] = useState(chosenContract?.signer_user);
	const [signerInputValue, setSignerInputValue] = useState(chosenContract?.signer_user.name);
	const [validationResult, setValidationResult] = useState({ step1: false, step2: false });
	const dispatch = useDispatch();
	const chosenCompany = useSelector(selectChosenCompany);
	const history = useHistory();

	const handleChange = (e) => {
		setContractSigner(e ? e.id : '');
		if (e) {
			setValidationResult((prev) => ({ ...prev, step1: true }));
		} else {
			setValidationResult((prev) => ({ ...prev, step1: false }));
		}
	};

	const sendEmail = async () => {
		if (signerInputValue && activeSidebar) {
			setValidationResult((prev) => ({ ...prev, step2: true }));

			try {
				const contractSignerID = contractSigner.id ? contractSigner.id : contractSigner;
				const res = await axios.put(
					`${BASE_URL}${END_POINT.CONTRACT}/${chosenContract.contract_id}`,
					{
						signer_user: contractSignerID,
					},
				);

				if (res.status === 200) {
					dispatch(actionSnackBar.setSnackBar('success', 'Contract successfully updated', 2000));
				}
			} catch (err) {
				dispatch(actionSnackBar.setSnackBar('error', 'Failed to create a contract', 2000));
			}
		} else {
			if (!signerInputValue) {
				dispatch(
					actionSnackBar.setSnackBar('error', 'Please choose a recipient for the email', 1000),
				);
			}
			if (!activeSidebar) {
				dispatch(actionSnackBar.setSnackBar('error', 'Please finish update first', 1000));
			}
		}
	};

	const handleDone = () => {
		dispatch(changeChosenCompany(null));
		history.push('/companies');
	};

	const presentPDFContract = async () => {
		try {
			const res = await axios.get(
				`${BASE_URL}${END_POINT.CONTRACT}/pdf/${chosenContract.contract_id}`,
				{
					headers: { Accept: 'application/pdf' },
				},
			);

			if (res.status === 200) {
				const pdfString = res.data.pdf;

				const byteCharacters = window.atob(pdfString);
				const byteNumbers = new Array(byteCharacters.length);
				for (let i = 0; i < byteCharacters.length; i++) {
					byteNumbers[i] = byteCharacters.charCodeAt(i);
				}
				const byteArray = new Uint8Array(byteNumbers);
				const file = new Blob([byteArray], { type: 'application/pdf;base64' });
				const fileURL = URL.createObjectURL(file);
				window.open(fileURL);

				dispatch(actionSnackBar.setSnackBar('success', 'Contract successfully created', 2000));
			}
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', 'Failed to create a contract', 2000));
		}
	};
	return (
		<SideFormView
			activeSidebar={activeSidebar}
			loadingSidebar={loadingSidebar}
			presentPDFContract={presentPDFContract}
			chosenCompany={chosenCompany}
			contractSigner={contractSigner}
			handleChange={handleChange}
			signerInputValue={signerInputValue}
			setSignerInputValue={setSignerInputValue}
			sendEmail={sendEmail}
			validationResult={validationResult}
			handleDone={handleDone}
		></SideFormView>
	);
};

SideForm.displayName = 'SideForm';
SideForm.defaultProps = {};

export default React.memo(SideForm);
