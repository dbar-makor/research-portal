import React from 'react';
import { useStyles } from '../../../../../styles/InfoStyles';
import { Grid, Typography, Table, TableHead, TableRow, TableBody, IconButton } from '@material-ui/core';
import MembersHeader from '../MembersHeader/MembersHeader';
import { MembersTableCell, MembersTableRow } from '../../../../../styles/TableStyles';
import { TableTextField, StatusSwitch, LightBlueButton, BinButton } from '../../../../../styles/MainStyles';
import CategoriesModal from '../CategoriesModal/CategoriesModal';
import DeleteAlert from '../../../reusables/DeleteAlert/DeleteAlert';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/IconTrash.svg';
import { ReactComponent as LogsIcon } from '../../../../../assets/icons/IconLogs.svg';
import clsx from 'clsx';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

//import useStyles from './MembersTable.style';

const MembersTableView = (props) => {
	const classes = useStyles();

	return props.chosenCompany && props.chosenCompany.members ? (
		<Grid container className={classes.membersContainer}>
			<Grid item xs={12}>
				<MembersHeader {...props.membersHeaderProps} {...props.categoriesProps} />
			</Grid>
			<Grid item xs={12} className={classes.scrollableMembersTable}>
				{props.chosenCompany.members.length ? (
					props.filterMembersDisplay(props.chosenCompany.members) ? (
						<Typography className={classes.noMembers}>No match</Typography>
					) : (
						<Table stickyHeader>
							<TableHead>
								<TableRow>
									{Object.keys(props.chosenCompany.members[0]).map((col, index) => {
										if (col !== 'id') {
											return (
												<MembersTableCell
													key={index}
													align={col === 'status' ? 'center' : 'left'}
													style={{
														textTransform: 'capitalize',
													}}
												>
													{col.replaceAll('_', ' ')}
												</MembersTableCell>
											);
										}
									})}
									<MembersTableCell align="center">Actions</MembersTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{props.membersRows.map((row, index) => (
									<MembersTableRow
										key={index}
										id={`${index}`}
										tabindex="-1"
										className={clsx(classes.memberRow, {
											[classes.memberRowSelected]: row.isEditMode,
										})}
										onBlur={(e) => props.handleBlur(e, row, index)}
										onDoubleClick={() => {
											// const rowsCopy = [...membersRows]
											const element = document.getElementById(`${index}`);
											element.focus();
											clearTimeout(props.timer);
											props.prevent = true;
											const rowsCopy = props.membersRows.map((membersRow) => ({
												...membersRow,
												isEditMode: false,
											}));
											const updatedRow = { ...row, isEditMode: true };
											rowsCopy.splice(index, 1, updatedRow);
											props.setMembersRows(rowsCopy);
										}}
										onClick={(ev) => {
											if (ev.target.id !== 'categories' && ev.nodeName === 'INPUT') {
												props.timer = setTimeout(() => {
													if (!props.prevent) {
														const element = document.getElementById(`${index}`);
														element.focus();
													}
													props.prevent = false;
												}, props.delay);
											}
										}}
										// style={{ display: filterMembersDisplay(row, row.status)}}
										style={{
											display:
												((!props.showAll && !row.status) ||
													(props.memberSearch !== '' &&
														props.filterOneMemberDisplay(row))) &&
												'none',
										}}
									>
										{Object.entries(row).map(([key, value], i) => {
											if (key !== 'id' && key !== 'isEditMode') {
												if (key === 'categories') {
													return (
														<MembersTableCell
															key={i}
															style={{ cursor: 'pointer', maxWidth: '115px' }}
														>
															<LightBlueButton
																id="categoriesbutton"
																justification={
																	value.length > 1
																		? 'space-between'
																		: 'flex-start'
																}
																onClick={(ev) => {
																	ev.stopPropagation();
																	props.handleOpen(index);
																}}
															>
																{value.length
																	? `${value[0].name.slice(0, 17)}... `
																	: 'No categories'}
																{props.calculateCategories(value.length)}
															</LightBlueButton>
															<CategoriesModal
																{...props.categoriesProps}
																open={props.open}
																handleClose={props.handleClose}
																updateMemberField={props.updateMemberField}
																memberIndex={index}
																membersRows={props.membersRows}
																setMembersRows={props.setMembersRows}
																sendMember={props.sendMember}
															/>
														</MembersTableCell>
													);
												} else if (key === 'status') {
													return (
														<MembersTableCell
															key={i}
															align="center"
															style={{ whiteSpace: 'nowrap', width: '1%' }}
														>
															{row.isEditMode ? (
																<StatusSwitch
																	checked={value}
																	id="memberStatus"
																	onChange={() => {
																		props.updateMemberField(
																			!value,
																			key,
																			index,
																		);
																	}}
																/>
															) : (
																<FiberManualRecordIcon
																	className={clsx({
																		[classes.activeMember]: value,
																		[classes.inactiveMember]: !value,
																	})}
																/>
															)}
														</MembersTableCell>
													);
												} else {
													return (
														<MembersTableCell
															key={i}
															style={{ whiteSpace: 'nowrap', width: '1%' }}
														>
															<TableTextField
																value={value}
																disabled={!row.isEditMode}
																InputProps={{
																	classes: {
																		disabled: classes.disabledInput,
																	},
																}}
																onChange={(e) =>
																	props.updateMemberField(
																		e.target.value,
																		key,
																		index,
																	)
																}
															/>
															{/* : <Typography>{value}</Typography>} */}
														</MembersTableCell>
													);
												}
											}
										})}
										<MembersTableCell
											align="center"
											style={{ whiteSpace: 'nowrap', width: '1%' }}
										>
											{row.isEditMode ? (
												<>
													<BinButton
														onClick={() => props.handleOpenAlert()}
														// onClick={() => deleteMember(row.id)}
													>
														<DeleteIcon />
													</BinButton>
													<DeleteAlert
														open={props.openAlert}
														handleClose={props.handleCloseAlert}
														itemName={row.name}
														itemId={row.id}
														itemCategory="Member"
														deleteItem={props.deleteMember}
													/>
												</>
											) : (
												<IconButton className={classes.logsButton}>
													<LogsIcon />
												</IconButton>
											)}
										</MembersTableCell>
									</MembersTableRow>
								))}
							</TableBody>
						</Table>
					)
				) : (
					<Typography className={classes.noMembers}>
						There are no members for this company
					</Typography>
				)}
			</Grid>
		</Grid>
	) : null;
};

MembersTableView.displayName = 'MembersTableView';
MembersTableView.defaultProps = {};

export default React.memo(MembersTableView);
