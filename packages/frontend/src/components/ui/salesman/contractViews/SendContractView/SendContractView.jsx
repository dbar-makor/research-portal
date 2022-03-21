import React ,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import { useHistory } from 'react-router-dom';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';
import { changeChosenCompany, selectChosenCompany } from '../../../../../redux/companies/chosenCompanySlice';

import SendContractViewView from './SendContractView.view';

const SendContractView = (props) => {
	const { setStep, contractCopy, setContractCopy } = props;
  const dispatch = useDispatch();
	const history = useHistory();
	const chosenCompany = useSelector(selectChosenCompany);

	const [validationResult, setValidationResult] = useState({ step1: false, step2: false });
	const [contractSigner, setContractSigner] = useState('');
	const [signerInputValue, setSignerInputValue] = useState('');

	const handleChange = (e) => {
		setContractSigner(e ? e.id : '');
		if (e) {
			setValidationResult((prev) => ({ ...prev, step1: true }));
		} else {
			setValidationResult((prev) => ({ ...prev, step1: false }));
		}
	};

	const sendEmail = async () => {
		setValidationResult((prev) => ({ ...prev, step2: true }));
		const localCopy = { ...contractCopy, signer_user: contractSigner };
		delete localCopy.contract_id;

		try {
			const res = await axios.put(
				`${BASE_URL}${END_POINT.CONTRACT}/${contractCopy.contract_id}`,
				localCopy,
			);

			if (res.status === 200) {
				dispatch(actionSnackBar.setSnackBar('success', 'Contract successfully updated', 2000));
			}
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', 'Failed to create a contract', 2000));
		}
	};

	const handleDone = () => {
		setContractCopy({});
		dispatch(changeChosenCompany(null));
		history.push('/companies');
	};

	const handleExit = () => {
		if (contractSigner) {
			setContractCopy((prev) => ({ ...prev, signer_user: contractSigner }));
			history.push('/companies');
		}
	};

	const presentPDFContract = async () => {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.CONTRACT}/pdf/${contractCopy.contract_id}`, {
				headers: { Accept: 'application/pdf' },
			});

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
				setStep(2);
			}
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', 'Failed to create a contract', 2000));
		}
	};

	return <SendContractViewView
		presentPDFContract={presentPDFContract}
		chosenCompany={chosenCompany}
		contractSigner={contractSigner}
		handleChange={handleChange}
		signerInputValue={signerInputValue}
		setSignerInputValue={setSignerInputValue}
		validationResult={validationResult}
		sendEmail={sendEmail}
		handleDone={handleDone}
		handleExit={handleExit}
	></SendContractViewView>;
};

SendContractView.displayName = 'SendContractView';
SendContractView.defaultProps = {};

export default React.memo(SendContractView);
