import {  useState } from 'react';
import { Grid, Typography, makeStyles, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ButtonRow from './ButtonRow';
import { useHistory } from 'react-router-dom';
import { changeChosenCompany, selectChosenCompany } from '../../../redux/companies/chosenCompanySlice';
import { ReactComponent as ContractIcon } from '../../../assets/icons/contract.svg';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import * as actionSnackBar from '../../../redux/SnackBar/action';
import AutoCompleteUnit from '../../Reusables/AutoCompleteUnit';
import { OutlinedButton } from '../../../styles/MainStyles';

const useStyles = makeStyles({
	formContainer: {
		position: 'relative',
		height: 600,
	},
	upperSection: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	mainTitle: {
		fontSize: 20,
		marginBottom: 20,
		marginTop: 15,
	},
	pdfLink: {
		'color': '#1C67FF',
		'fontSize': 20,
		'textDecoration': 'underline',
		'fontWeight': 600,
		'marginLeft': 10,
		'&:hover': {
			cursor: 'pointer',
		},
	},
	lowerSection: {
		marginTop: 20,
		marginBottom: 20,
	},
	question: {
		color: '#868DA2',
		size: 16,
		marginBottom: 20,
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	textField: {},
	linkBtn: {
		padding: '6px 55px 6px 55px',
	},
	divider: {
		backgroundColor: '#EDEFF3',
		height: '1px',
		width: '100%',
		marginTop: 20,
	},
	btnWrapper: {
		justifyContent: 'flex-end',
	},
});

function SendContractView({ setStep, contractCopy, setContractCopy }) {
	const classes = useStyles();
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
			const res = await axios.put(`${BASE_URL}${END_POINT.CONTRACT}/${contractCopy.contract_id}`, localCopy);

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

	return (
		<Grid container className={classes.formContainer}>
			<Grid item xs={12}>
				<Grid container>
					<Grid item xs={12} className={classes.upperSection}>
						<ContractIcon />
						<Typography variant="h5" className={classes.mainTitle}>
							The Contract is Ready
							<Typography variant="caption" onClick={presentPDFContract} className={classes.pdfLink}>
								Visualize
							</Typography>
						</Typography>
					</Grid>
					<Divider className={classes.divider} />
					<Grid item xs={12} className={classes.lowerSection}>
						<Typography className={classes.question}>
							Whom do you want to send the contract to for signature?
						</Typography>
						<Grid container className={classes.row}>
							<Grid container item xs={5}>
								<AutoCompleteUnit
									className={classes.textField}
									name="signer_user"
									fieldForLabel="name"
									label="Pick a member"
									options={chosenCompany.members}
									formObject={contractSigner}
									handler={handleChange}
									inputValue={signerInputValue}
									setInputValue={setSignerInputValue}
								/>
							</Grid>
							<Grid container item xs={5} className={classes.btnWrapper}>
								<OutlinedButton
									className={classes.linkBtn}
									disabled={!validationResult.step1}
									onClick={sendEmail}
								>
									{' '}
									Send Link{' '}
								</OutlinedButton>
							</Grid>
						</Grid>
					</Grid>
					<Divider className={classes.divider} />
				</Grid>
			</Grid>

			<Grid container>
				<ButtonRow
					validationResult={validationResult.step2}
					handlerRight={handleDone}
					handlerLeft={handleExit}
					textButtonRight="Done"
					textButtonLeft="Not Now"
					style={{ position: 'absolute', bottom: 0 }}

					// btnNo={1}
				/>
			</Grid>

			{/* { pdfContent &&  <ContractPDF file={pdfContent}/> } */}
		</Grid>
	);
}

export default SendContractView;


