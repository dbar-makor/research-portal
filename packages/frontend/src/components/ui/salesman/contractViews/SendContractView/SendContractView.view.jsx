import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { ReactComponent as ContractIcon } from '../../../../../assets/icons/contract.svg';
import useStyles from './SendContractView.style';
import AutoCompleteUnit from '../../../reusables/AutoCompleteUnit/AutoCompleteUnit';
import { OutlinedButton } from '../../../../../styles/MainStyles';
import ButtonRow from '../ButtonRow/ButtonRow';

const SendContractViewView = (props) => {
	const classes = useStyles();
  return (
		<Grid container className={classes.formContainer}>
			<Grid item xs={12}>
				<Grid container>
					<Grid item xs={12} className={classes.upperSection}>
						<ContractIcon />
						<Typography variant="h5" className={classes.mainTitle}>
							The Contract is Ready
							<Typography
								variant="caption"
								onClick={props.presentPDFContract}
								className={classes.pdfLink}
							>
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
									options={props.chosenCompany.members}
									formObject={props.contractSigner}
									handler={props.handleChange}
									inputValue={props.signerInputValue}
									setInputValue={props.setSignerInputValue}
								/>
							</Grid>
							<Grid container item xs={5} className={classes.btnWrapper}>
								<OutlinedButton
									className={classes.linkBtn}
									disabled={!props.validationResult.step1}
									onClick={props.sendEmail}
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
					validationResult={props.validationResult.step2}
					handlerRight={props.handleDone}
					handlerLeft={props.handleExit}
					textButtonRight="Done"
					textButtonLeft="Not Now"
					style={{ position: 'absolute', bottom: 0 }}
				/>
			</Grid>
		</Grid>
	);
};

SendContractViewView.displayName = 'SendContractViewView';
SendContractViewView.defaultProps = {};

export default React.memo(SendContractViewView);
