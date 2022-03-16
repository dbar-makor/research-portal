import { Grid, Typography, makeStyles, Divider } from '@material-ui/core';
import { ReactComponent as ContractIcon } from '../../../assets/icons/contract.svg';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import * as actionSnackBar from '../../../redux/SnackBar/action';
import { useDispatch, useSelector } from 'react-redux';
import { changeChosenCompany, selectChosenCompany } from '../../../redux/companies/chosenCompanySlice';
import AutoCompleteUnit from '../../ui/reusables/AutoCompleteUnit/AutoCompleteUnit';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FilledButton } from '../../../styles/MainStyles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	rightColumn: {
		height: '100%',
		justifyContent: 'space-between',
		alignContent: 'space-between',
	},
	sidebarWrapper: {
		height: '80%',
		marginLeft: 20,
		borderRadius: 8,
		border: '1px solid #A5AFC233',
		backgroundColor: '#EDEFF3',
	},
	sidebar: {
		height: '100%',
	},
	progressBarItem: {
		height: '100%',
	},
	progressBarContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: 'inherit',
	},
	progressBar: {
		'& .MuiCircularProgress-svg': {
			color: '#1C67FF',
		},
	},
	progressbarTitle: {
		color: '#868DA2',
		marginTop: 20,
	},
	section: {
		paddingBottom: 20,
	},
	sectionTitle: {
		fontSize: 16,
		color: '#868DA2',
	},
	pdfLink: {
		'fontSize': 14,
		'color': '#868DA2',
		'textDecoration': 'underline',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	divider: {
		margin: '0 auto',
		width: '90%',
	},
	formRow: {
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: 30,
	},
	textField: {
		'& .MuiInputBase-root': {
			color: (props) => (props.activeSidebar ? '#000' : '#868DA2'),
		},
		'& .MuiSvgIcon-root': {
			fill: (props) => (props.activeSidebar ? '#1C67FF' : '#868DA2'),
		},
	},
	send: {
		'textDecoration': 'underline',
		'color': '#868DA2',
		'&:hover': {
			cursor: (props) => (props.activeSidebar ? 'pointer' : 'default'),
		},
	},
});

function SideForm(props) {
	const { activeSidebar,chosenContract, loadingSidebar } = props;

	const classes = useStyles(props);
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
		<Grid container className={classes.rightColumn}>
			<Grid item xs={12} className={classes.sidebarWrapper}>
				<Grid container className={classes.sidebar}>
					{loadingSidebar ? (
						<Grid item xs={12} className={classes.progressBarItem}>
							<Grid container className={classes.progressBarContainer}>
								<CircularProgress className={classes.progressBar} />
								<Typography className={classes.progressbarTitle}>
									{' '}
									Updating Files...{' '}
								</Typography>
							</Grid>
						</Grid>
					) : (
						<>
							<Grid item xs={12}>
								<Grid container direction="column" spacing={3} className={classes.section}>
									<Grid item xs={11} style={{ margin: '36px 0px 0px 16px' }}>
										<Typography
											className={classes.sectionTitle}
											style={activeSidebar ? { color: '#000' } : {}}
										>
											Updated Attachments:
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Grid container align="center">
											<Grid item xs={12}>
												<ContractIcon />
											</Grid>
											<Grid item xs={12}>
												<Typography
													className={classes.pdfLink}
													style={activeSidebar ? { color: '#1C67FF' } : {}}
													onClick={presentPDFContract}
												>
													Visualize Contract
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Divider className={classes.divider} />
							<Grid item xs={12} style={{ margin: '32px 0px 0px 16px' }}>
								<Grid container direction="column" spacing={3}>
									<Grid item xs={11}>
										<Typography className={classes.sectionTitle}>
											Resend for signature to?
										</Typography>
									</Grid>
									<Grid item xs={11}>
										<Grid container className={classes.formRow}>
											<Grid item xs={10}>
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
													disabled={!activeSidebar}
													// style={activeSidebar ? {color: "#000"} : {}}
												/>
											</Grid>
											<Grid item xs={1}>
												<Typography
													className={classes.send}
													style={
														activeSidebar && signerInputValue
															? { color: '#1C67FF' }
															: {}
													}
													onClick={sendEmail}
												>
													Send
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</>
					)}
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid container className={classes.btnContainer} justifyContent="flex-end">
					<Grid item>
						<FilledButton
							disabled={!validationResult.step2}
							onClick={handleDone}
							className={classes.updateBtn}
						>
							Done
						</FilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default SideForm;