import React from 'react';
import { useStyles } from '../../../../../styles/InfoStyles';
import { Grid, Typography, Divider, TextField } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@material-ui/lab';
import clsx from 'clsx';

import {
	GreenFilledButton,
	BinButton,
	EditButton,
	LinkButton,
	FilledButton,
	CompanyStatusSwitch,
	EditDoneButton,
} from '../../../../../styles/MainStyles';
import { ReactComponent as WhiteCheckIcon } from '../../../../../assets/icons/IconWhiteCheck.svg';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/IconTrash.svg';
import { ReactComponent as LocationIcon } from '../../../../../assets/icons/iconLocation.svg';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/IconEdit.svg';
import ContractBlock from '../ContractBlock/ContractBlock';
import ContractsModal from '../../../../SalesScreens/ContractAndInvoices/ContractModal';
import DeleteAlert from '../../../../Reusables/DeleteAlert';
import InitialCompanyStateBlock from '../InitialCompanyStateBlock/InitialCompanyStateBlock';

const CompanyInfoView = (props) => {
	const classes = useStyles();
	return props.chosenCompany ? (
		<Grid container className={classes.infoContainer}>
			<Grid item xs={12}>
				<Grid container alignItems="center">
					<Grid item xs={1}>
						LOGO
					</Grid>
					<Grid item xs={11}>
						<Grid container alignItems="center">
							<Grid item xs={12}>
								<Grid container justifyContent="space-between" alignItems="center">
									<Grid item xs={6}>
										<Grid container alignItems="center" justifyContent="space-between">
											<Grid item xs={props.chosenCompany.name.length > 14 ? 8 : 6}>
												{props.chosenCompany.isEditMode ? (
													<TextField
														value={props.chosenCompany.name}
														inputProps={{
															style: {
																textTransform: 'capitalize',
																fontSize: '20px',
																fontWeight: 600,
																color: '#0F0F0F',
															},
														}}
														onChange={(e) =>
															props.updateCompanyField('name', e.target.value)
														}
													/>
												) : (
													<Typography className={classes.companyName}>
														{props.chosenCompany.name.length > 18
															? `${props.chosenCompany.name.slice(0, 18)}...`
															: props.chosenCompany.name}
													</Typography>
												)}
											</Grid>
											<Grid item xs={1}></Grid>
											<Grid item xs={3}>
												<Grid
													container
													alignItems={
														props.chosenCompany.isEditMode ? 'flex-start' : 'center'
													}
													justifyContent={
														props.chosenCompany.isEditMode ? 'flex-end' : 'flex-start'
													}
												>
													<Grid item xs={3}>
														{props.chosenCompany.isEditMode ? (
															<CompanyStatusSwitch
																checked={props.chosenCompany.status}
																onChange={(e) =>
																	props.updateCompanyField(
																		'status',
																		e.target.checked,
																	)
																}
															/>
														) : (
															<FiberManualRecordIcon
																style={{
																	fontSize: '14px',
																	fill: props.chosenCompany.status
																		? '#00CA80'
																		: '#FF3939',
																}}
															/>
														)}
													</Grid>
													<Grid item xs={9}>
														<Typography
															style={{
																marginLeft:
																props.chosenCompany.isEditMode && '12px',
															}}
															className={clsx({
																[classes.statusActive]: props.chosenCompany.status,
																[classes.statusInactive]:
																	!props.chosenCompany.status,
															})}
														>
															{props.chosenCompany.status ? 'Active' : 'Inactive'}
														</Typography>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={2}>
										<Grid container alignItems="center" justifyContent="flex-end">
											<Grid item style={{ marginRight: '16px' }}>
												{props.chosenCompany.isEditMode ? (
													<EditDoneButton onClick={() => props.sendUpdatedCompany()}>
														<WhiteCheckIcon />
													</EditDoneButton>
												) : (
													<EditButton
														onClick={() =>
															props.setChosenCompany({
																...props.chosenCompany,
																isEditMode: !props.chosenCompany.isEditMode,
															})
														}
													>
														<EditIcon />
													</EditButton>
												)}
											</Grid>
											<Grid item>
												<BinButton onClick={props.handleOpenAlert}>
													<DeleteIcon />
												</BinButton>
												<DeleteAlert
													open={props.openAlert}
													handleClose={props.handleCloseAlert}
													itemName={props.chosenCompany.name}
													itemId={props.chosenCompany.id}
													itemCategory="Company"
													deleteItem={props.deleteCompany}
												/>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								{props.chosenCompany.isEditMode && props.countriesArr ? (
									<Autocomplete
										name="country"
										options={props.countriesArr}
										value={props.chosenCompany.country}
										inputValue={props.inputValue}
										getOptionSelected={(option, value) => option.name === value.name}
										popupIcon={<SearchIcon style={{ color: '#1C67FF' }} />}
										getOptionLabel={(option) => {
											return option.name;
										}}
										onChange={(e, newValue) => props.updateCompanyField('country', newValue)}
										onInputChange={(e, newInputValue) => props.setInputValue(newInputValue)}
										renderInput={(params) => (
											<TextField
												{...params}
												style={{ width: '25%' }}
												autoComplete="off"
											/>
										)}
									/>
								) : (
									<Grid container alignItems="center">
										<Grid item>
											<LocationIcon />
										</Grid>
										<Grid item>
											<Typography className={classes.locationName}>
												{props.chosenCompany.country.name}
											</Typography>
										</Grid>
									</Grid>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Divider className={classes.infoDivider} />
			<Grid container spacing={4}>
				{props.chosenCompany.type === 'client' && (
					<Grid item xs={4} style={{ marginTop: '35px' }}>
						<ContractBlock {...props.currentContractProps} />
					</Grid>
				)}
				{props.chosenCompany.type === 'client' && props.chosenCompany.last_contract && (
					<Grid item xs={4} style={{ marginTop: '25px' }}>
						<ContractBlock {...props.lastContractProps} />
					</Grid>
				)}
				{props.chosenCompany.prospect_trial && (
					<Grid item xs={4} style={{ marginTop: '25px' }}>
						<InitialCompanyStateBlock {...props.prospectTrialProps} />
					</Grid>
				)}

				{props.chosenCompany.company_registered && (
					<Grid item xs={4} style={{ marginTop: '25px' }}>
						<InitialCompanyStateBlock {...props.companyRegisteredProps} />
					</Grid>
				)}
			</Grid>
			<Grid item xs={12}>
				<Grid container justifyContent="flex-end">
					<Grid item xs={6}>
						{props.chosenCompany.type === 'client' &&
						(props.chosenCompany.contract_status || props.chosenCompany.last_contract) ? (
							<Grid container justifyContent="flex-end">
								<LinkButton
									className={classes.upgradeBtn}
									onClick={() => props.openContractDialong(props.chosenCompany.id)}
								>
									Contracts & Invoices
								</LinkButton>
							</Grid>
						) : null}
						<ContractsModal
							onClose={() => props.closeContractDialong()}
							isOpen={props.openDialog}
							client={props.chosenCompany}
						/>
					</Grid>
					{!props.chosenCompany.contract_status ? (
						<Grid item xs={3}>
							<Grid container justifyContent="flex-end">
								{props.chosenCompany.type === 'prospect' ? (
									<GreenFilledButton
										className={classes.upgradeBtn}
										onClick={() => props.upgradeToClient(props.chosenCompany.id)}
									>
										Upgrade to Client
									</GreenFilledButton>
								) : (
									<FilledButton
										className={classes.signBtn}
										onClick={() => props.history.push('/contract')}
									>
										Sign a Contract
									</FilledButton>
								)}
							</Grid>
						</Grid>
					) : null}
				</Grid>
			</Grid>
		</Grid>
	) : null;
};

CompanyInfoView.displayName = 'CompanyInfoView';
CompanyInfoView.defaultProps = {};

export default React.memo(CompanyInfoView);
