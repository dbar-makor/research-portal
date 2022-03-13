import React from 'react';
import { Grid, Typography, Divider, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
	BinButton,
	EditButton,
	CompanyStatusSwitch,
	EditDoneButton,
	useStyles,
} from '../../../../styles/MainStyles';
import UserInfoBlock from '../../../AdminScreens/UserInfoBlock';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/IconTrash.svg';
import { ReactComponent as LocationIcon } from '../../../../assets/icons/iconLocation.svg';
import { ReactComponent as EditIcon } from '../../../../assets/icons/IconEdit.svg';
import { ReactComponent as WhiteCheckIcon } from '../../../../assets/icons/IconWhiteCheck.svg';
import DeleteAlert from '../../../Reusables/DeleteAlert';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';

const UserInfoView = (props) => {
	const classes = useStyles();

	return props.chosenUser ? (
		<Grid container className={classes.infoContainer}>
			<Grid item xs={12}>
				<Grid container alignItems="center">
					<Grid item xs={1}>
						IMG
					</Grid>
					<Grid item xs={11}>
						<Grid container alignItems="center">
							<Grid item xs={12}>
								<Grid container justifyContent="space-between" alignItems="center">
									<Grid item xs={6}>
										<Grid container alignItems="center" justifyContent="space-between">
											<Grid item xs={props.chosenUser.name.length > 14 ? 8 : 6}>
												{props.chosenUser.isEditMode ? (
													<TextField
														value={props.chosenUser.name}
														inputProps={{
															style: {
																textTransform: 'capitalize',
																fontSize: '20px',
																fontWeight: 600,
																color: '#0F0F0F',
															},
														}}
														onChange={(e) =>
															props.updateUserField('name', e.target.value)
														}
														// onBlur={() => sendUpdatedCompany()}
													/>
												) : (
													<Typography className={classes.companyName}>
														{props.chosenUser.name.length > 18
															? `${props.chosenUser.name.slice(0, 18)}...`
															: props.chosenUser.name}
													</Typography>
												)}
											</Grid>
											<Grid item xs={1}></Grid>
											<Grid item xs={3}>
												<Grid
													container
													alignItems={
														props.chosenUser.isEditMode ? 'flex-start' : 'center'
													}
													justifyContent={
														props.chosenUser.isEditMode
															? 'flex-end'
															: 'flex-start'
													}
												>
													<Grid item xs={3}>
														{props.chosenUser.isEditMode ? (
															<CompanyStatusSwitch
																checked={props.chosenUser.status}
																onChange={(e) =>
																	props.updateUserField(
																		'status',
																		e.target.checked,
																	)
																}
															/>
														) : (
															<FiberManualRecordIcon
																style={{
																	fontSize: '14px',
																	fill: props.chosenUser.status
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
																	props.chosenUser.isEditMode && '12px',
															}}
															className={clsx({
																[classes.statusActive]:
																	props.chosenUser.status,
																[classes.statusInactive]:
																	!props.chosenUser.status,
															})}
														>
															{props.chosenUser.status ? 'Active' : 'Inactive'}
														</Typography>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={2}>
										<Grid container alignItems="center" justifyContent="flex-end">
											<Grid item style={{ marginRight: '16px' }}>
												{props.chosenUser.isEditMode ? (
													<EditDoneButton onClick={() => props.sendUpdatedUser()}>
														<WhiteCheckIcon />
													</EditDoneButton>
												) : (
													<EditButton
														onClick={() =>
															props.setChosenUser({
																...props.chosenUser,
																isEditMode: !props.chosenUser.isEditMode,
															})
														}
														//  onBlur={() => setIsEditMode(false)}
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
													itemName={props.chosenUser.name}
													itemId={props.chosenUser.id}
													itemCategory="User"
													deleteItem={props.deleteUser}
												/>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								{props.chosenUser.isEditMode && props.countriesArr ? (
									<Autocomplete
										name="country"
										options={props.countriesArr}
										value={props.chosenUser.country}
										inputValue={props.inputValue}
										// onBlur={() => sendUpdatedCompany()}
										getOptionSelected={(option, value) => option.name === value.name}
										popupIcon={<SearchIcon style={{ color: '#1C67FF' }} />}
										getOptionLabel={(option) => {
											return option.name;
										}}
										// error={errors.country}
										onChange={(e, newValue) => props.updateUserField('country', newValue)}
										onInputChange={(e, newInputValue) =>
											props.setInputValue(newInputValue)
										}
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
												{props.chosenUser.country.name}
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
			<Grid container>
				<Grid item xs={12}>
					<UserInfoBlock chosenUser={props.chosenUser} updateUserField={props.updateUserField} />
				</Grid>
			</Grid>
		</Grid>
	) : null;
};

UserInfoView.displayName = 'UserInfoView';
UserInfoView.defaultProps = {};

export default React.memo(UserInfoView);
