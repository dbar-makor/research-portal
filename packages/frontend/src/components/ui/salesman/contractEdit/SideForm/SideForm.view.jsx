import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ReactComponent as ContractIcon } from '../../../../../assets/icons/contract.svg';
import AutoCompleteUnit from '../../../reusables/AutoCompleteUnit/AutoCompleteUnit';
import { FilledButton } from '../../../../../styles/MainStyles';
import useStyles from './SideForm.style';

const SideFormView = (props) => {
 const classes = useStyles(props);

	return (
		<Grid container className={classes.rightColumn}>
			<Grid item xs={12} className={classes.sidebarWrapper}>
				<Grid container className={classes.sidebar}>
					{props.loadingSidebar ? (
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
											style={props.activeSidebar ? { color: '#000' } : {}}
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
													style={props.activeSidebar ? { color: '#1C67FF' } : {}}
													onClick={props.presentPDFContract}
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
													options={props.chosenCompany.members}
													formObject={props.contractSigner}
													handler={props.handleChange}
													inputValue={props.signerInputValue}
													setInputValue={props.setSignerInputValue}
													disabled={!props.activeSidebar}
													// style={activeSidebar ? {color: "#000"} : {}}
												/>
											</Grid>
											<Grid item xs={1}>
												<Typography
													className={classes.send}
													style={
														props.activeSidebar && props.signerInputValue
															? { color: '#1C67FF' }
															: {}
													}
													onClick={props.sendEmail}
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
							disabled={!props.validationResult.step2}
							onClick={props.handleDone}
							className={classes.updateBtn}
						>
							Done
						</FilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

SideFormView.displayName = 'SideFormView';
SideFormView.defaultProps = {};

export default React.memo(SideFormView);
