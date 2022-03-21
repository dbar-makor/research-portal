import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { ReactComponent as BlueBorder } from '../../../../../assets/icons/blueBorder.svg';
import Contract from '../Contract/Contract';
import SendContractView from '../SendContractView/SendContractView';

import useStyles from './GeneralContractView.style';

const GeneralContractViewView = (props) => {
	const classes = useStyles();

  return (
		<Grid container justifyContent="center" className={classes.modalContainer}>
			<Grid item xs={10} className={classes.modalBox}>
				<Grid container justifyContent="center">
					<BlueBorder />
					<Grid item xs={12}>
						<Grid container justifyContent="center">
							<Typography className={classes.modalTitle}>
								{props.chosenCompany?.name} &apos s Contract
							</Typography>
						</Grid>
					</Grid>
				</Grid>

				{props.step === 1 && (
					<Contract
						setStep={props.setStep}
						stepperMode={true}
						setContractCopy={props.setContractCopy}
					/>
				)}
				{props.step === 2 && (
					<SendContractView
						setStep={props.setStep}
						contractCopy={props.contractCopy}
						setContractCopy={props.setContractCopy}
					/>
				)}
			</Grid>
		</Grid>
	);
};

GeneralContractViewView.displayName = 'GeneralContractViewView';
GeneralContractViewView.defaultProps = {};

export default React.memo(GeneralContractViewView);
