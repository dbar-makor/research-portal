import { Grid, Typography, makeStyles } from '@material-ui/core';
import { ReactComponent as BlueBorder } from '../../../assets/icons/blueBorder.svg';
import Contract from './Contract';
import SendContractView from './SendContractView';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChosenCompany } from '../../../redux/companies/chosenCompanySlice';
const useStyles = makeStyles({
	modalContainer: {
		backgroundColor: '#fff',
		width: '812px',
		position: 'absolute',
		top: '123px',
		left: '554px',
		height: 800,
		flexDirection: 'column',
		alignItems: 'center',
		// paddingLeft: "60px",
		padding: '20px 30px 5px 30px',
		borderRadius: '8px',
		boxShadow: '0px 8px 24px #0018581F',
	},
	modalBox: {
		// height: 700,
	},
	modalTitle: {
		color: '#868DA2',
		fontSize: '24px',
		fontWeight: 400,
		marginBottom: '5vh',
		marginTop: '15px',
		// textAlign: "center",
		fontFamily: 'Inter',
	},
});

function GeneralContractView() {
	const classes = useStyles();
	const [step, setStep] = useState(1);
	const chosenCompany = useSelector(selectChosenCompany);
	const [contractCopy, setContractCopy] = useState({});

	//contract state is being updated when its step children get unmounted

	return (
		<Grid container justifyContent="center" className={classes.modalContainer}>
			<Grid item xs={10} className={classes.modalBox}>
				<Grid container justifyContent="center">
					<BlueBorder />
					<Grid item xs={12}>
						<Grid container justifyContent="center">
							<Typography className={classes.modalTitle}>
								{chosenCompany?.name} &apos s Contract
							</Typography>
						</Grid>
					</Grid>
				</Grid>

				{step === 1 && (
					<Contract
						setStep={setStep}
						stepperMode={true}
						// contractCopy={contractCopy}
						setContractCopy={setContractCopy}
					/>
				)}
				{step === 2 && (
					<SendContractView
						setStep={setStep}
						contractCopy={contractCopy}
						setContractCopy={setContractCopy}
					/>
				)}
			</Grid>
		</Grid>
	);
}

export default GeneralContractView;
