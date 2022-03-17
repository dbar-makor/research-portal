import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import TextInputUnit from '../../../reusables/TextInputUnit/TextInputUnit';
import NumberInputUnit from '../../../reusables/NumberInputUnit/NumberInputUnit';
import AutoCompleteUnit from '../../../reusables/AutoCompleteUnit/AutoCompleteUnit';
import ButtonRow from '../ButtonRow/ButtonRow';
import DateInputUnit from '../../../reusables/DateInputUnit/DateInputUnit';
import { StatusSwitch, FilledButton } from '../../../../../styles/MainStyles';
import NumberFormatCustom from '../../../../../utils/components/NumberFormatCustom';
import useStyles from './Contract.style';

const ContractView = (props) => {
	const classes = useStyles();

  return (
		<Grid container className={classes.page}>
			<Grid item xs={12}>
				<Grid container className={classes.formContainer}>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={12} className={classes.paddingBottom24px}>
								<Typography className={classes.informationTitle}>information</Typography>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<Grid container className={classes.paddingBottom20px}>
									<Grid item xs={6} className={classes.paddingRight10px}>
										<TextInputUnit
											className={classes.textFieldStyle}
											name="id"
											label={props.chosenCompany ? props.chosenCompany.name : ''}
											value={props.chosenCompany ? props.chosenCompany.name : ''}
											formObject={props.contract}
											handler={(e) => props.handleContract(e.target.value, 'id')}
											error={props.errors.id}
										/>
									</Grid>
									<Grid item xs={6} className={classes.PaddingLeft10px}>
										{props.salesmenArr && (
											<AutoCompleteUnit
												className={classes.textFieldStyle}
												name="sales"
												fieldForLabel="name"
												label="Sales Agent"
												options={props.salesmenArr}
												formObject={props.contract}
												handler={(e) => {
													e
														? props.handleContract(e.id, 'sales')
														: props.handleContract(e, 'sales');
												}}
												error={props.errors.sales}
												inputValue={props.inputValueSales}
												setInputValue={props.setInputValueSales}
											/>
										)}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<Grid container className={classes.paddingBottom20px}>
									<Grid item xs={6} className={classes.paddingRight10px}>
										<DateInputUnit
											className={classes.dateStyle}
											name="start_at"
											// label="Start Date"
											value={props.contract['start_at'] || new Date()}
											error={props.errors['start_at']}
											onChange={(date) => props.handleContract(date, 'start_at')}
										/>
									</Grid>
									{/* <Grid item xs={1}></Grid> */}
									<Grid item xs={6} className={classes.PaddingLeft10px}>
										{props.currenciesArr && (
											<AutoCompleteUnit
												className={classes.autoCompleteStyle}
												label="Currency"
												name="currency"
												fieldForLabel="name"
												options={props.currenciesArr}
												formObject={props.contract}
												handler={props.handleContract}
												error={props.errors.currency}
												inputValue={props.inputValueCurrency}
												setInputValue={props.setInputValueCurrency}
											/>
										)}
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container className={classes.paddingBottom30px}>
									<Grid item xs={6} className={classes.paddingRight26px}>
										<NumberInputUnit
											className={classes.textFieldStyle}
											name="amount"
											label="Amount"
											value={props.contract.amount || ''}
											onChange={(e) => props.handleContract(e.target.value, 'amount')}
											error={props.errors.amount}
											InputProps={{
												inputComponent: NumberFormatCustom,
												inputProps: {
													decimalNo: 2,
													minValue: 0,
												},
											}}
										/>
									</Grid>
									<Grid item xs={1}>
										<Typography className={classes.perStyle}>per</Typography>
									</Grid>
									<Grid item xs={5}>
										<AutoCompleteUnit
											className={classes.autoCompleteStyle}
											name="periodicity"
											label="Period"
											valueField="value"
											optionLabelField="name"
											fieldForLabel="name"
											formObject={props.contract.periodicity || ''}
											handler={props.handleContract}
											options={props.chargePeriods}
											error={props.errors.periodicity}
											inputValue={props.inputValuePeriodicity}
											setInputValue={props.setInputValuePeriodicity}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Divider className={classes.divider} />
					</Grid>

					<Grid container>
						<Grid item xs={12} className={`${classes.padding3000px} ${classes.vatGroupWrapper}`}>
							<Divider className={classes.divider} />
							<Grid item xs={6} className={classes.vatGroup}>
								<Typography className={`${classes.indiLabel} ${classes.vatLabel1}`}>
									Include
								</Typography>
								<StatusSwitch
									name="vat"
									onChange={(e) => props.handleContract(e.target.checked, 'vat')}
									checked={props.contract.vat}
									className={classes.switch}
								/>
								<Typography className={classes.vatLabel2}>VAT</Typography>
							</Grid>

							<Divider className={classes.divider} />
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={12} className={classes.padding3000px}>
							<Grid container className={classes.paddingBottom20px}>
								<Grid item xs={3}>
									<Typography className={classes.indiLabel}>Yearly Amount</Typography>
								</Grid>
								<Grid item xs={6}>
									<Grid container>
										<Grid item xs={12} className={classes.boxStyle}>
											<Typography className={classes.amountType}>
												{props.contract.currency && props.contract.amount && props.contract.periodicity
													? `${
															typeof props.contract.currency === 'string'
																? props.currenciesArr.find(
																		(currency) =>
																			currency.code ===
																			props.contract.currency,
																  ).symbol
																: props.contract.currency.symbol
													  }${(
															props.contract.amount *
															props.periodToNum[props.contract.periodicity]
													  ).toLocaleString()}`
													: '0'}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Divider className={classes.divider} />
			</Grid>

			<Grid container>
				<Grid item xs={12} className={classes.padding3000px}>
					<Grid
						container
						className={classes.membersContainer}
						style={props.stepperMode ? {} : { paddingBottom: 5 }}
					>
						<Grid item xs={3}>
							<Typography className={classes.membersStyle}>Members</Typography>
						</Grid>
						<Grid container>
							<Grid item xs={6}>
								<Grid item xs={12}>
									<NumberInputUnit
										className={`${classes.memberField} ${classes.textFieldStyle}`}
										name="members"
										value={props.contract.members || ''}
										onChange={(e) => props.handleContract(e.target.value, 'members')}
										error={props.errors.members}
										InputProps={{
											inputComponent: NumberFormatCustom,
											inputProps: {
												autoComplete: 'off',
												decimalNo: 0,
												minValue: props.chosenCompany.members
													? props.chosenCompany.members.length
													: 0,
											},
										}}
									/>
								</Grid>
								{props.chosenCompany && props.chosenCompany.members && (
									<Grid item xs={12}>
										<Typography className={classes.note}>
											* Minimal No. is {props.chosenCompany.members.length}
										</Typography>
									</Grid>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{props.stepperMode ? (
				<Grid container>
					<ButtonRow
						style={{ position: 'absolute', bottom: 0 }}
						validationResult={props.validationResult}
						handlerLeft={props.handleCancel}
						handlerRight={props.handleSubmit}
						textButtonLeft="Cancel"
						textButtonRight="Done"
					/>
				</Grid>
			) : (
				<>
					<Grid container>
						<Divider className={classes.divider} style={{ width: '100%', marginTop: 25 }} />
						<Grid item>
							<Typography className={classes.comment}>
								*Changes will apply from next payment
							</Typography>
						</Grid>
					</Grid>
					<Grid container className={classes.btnContainer} justifyContent="flex-end">
						<Grid item xs={4} style={{ marginTop: 15 }}>
							<FilledButton disabled={!props.validationResult} onClick={props.handleUpdate}>
								Update
							</FilledButton>
						</Grid>
					</Grid>
				</>
			)}
		</Grid>
	);
};

ContractView.displayName = 'ContractView';
ContractView.defaultProps = {};

export default React.memo(ContractView);
