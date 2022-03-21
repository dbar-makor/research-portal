import React from 'react';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { ReactComponent as BlueShape } from '../../../../../../assets/icons/blueBorder.svg';
import { ReactComponent as SearchIcon } from '../../../../../../assets/icons/IconSearch.svg';
import RangeDatePicker from '../../../../reusables/RangeDatePicker/RangeDatePicker';
import SelectInputUnit from '../../../../reusables/SelectInputUnit/SelectInputUnit';
import InvoiceTable from '../InvoiceTable/InvoiceTable';
import { useStyles, StyledTextField } from '../../../../../../styles/MainStyles';
import AutoCompleteUnit from '../../../../reusables/AutoCompleteUnit/AutoCompleteUnit';

//import useStyles from './AllInvoices.style';

const AllInvoicesView = (props) => {
	const classes = useStyles();
	return (
		<>
			<Grid
				container
				style={{ position: 'absolute', width: '111px', top: 94, left: 140 }}
				flexDirection="column"
			>
				<Grid item xs={12}>
					<BlueShape />
				</Grid>
				<Grid item style={{ paddingTop: 10 }}>
					<Typography style={{ fontSize: 24, color: '#868DA2' }}>Invoices</Typography>
				</Grid>
			</Grid>
			<Grid container style={{ position: 'relative', margin: '60px 0px 0px 350px', width: '70%' }}>
				<Grid item xs={12}>
					<Grid container justifyContent="center" alignItems="center">
						{/* SECTION OF FILTERS */}
						<Grid item xs={11}>
							<Grid container>
								<Grid item xs={6}>
									<Grid container>
										<Grid item xs={3}>
											<RangeDatePicker
												renderFrom={'filters'}
												max_days_allowed={1460}
												from={props.periodRange.from}
												setFrom={props.setFrom}
												to={props.periodRange.to}
												setTo={props.setTo}
											/>
										</Grid>
										<Grid item xs={4} style={{ marginLeft: 105 }}>
											<SelectInputUnit
												className={classes.autoCompleteStyle}
												name="name"
												label={props.transactionStatus ? '' : 'Transaction Status'}
												optionLabelField="name"
												valueField="value"
												placeholder="Type"
												value={props.transactionStatus.value}
												onChange={(e) => props.inputHandler(e, 'STATUS')}
												optionsArray={props.periodicity}
												native={false}
											/>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={6}>
									<Grid container justifyContent="flex-end">
										<Grid item xs={5}>
											{props.companiesNames && (
												<AutoCompleteUnit
													options={props.companiesNames}
													name="companyName"
													label="Search Company"
													formObject={props.filters}
													fieldForLabel="name"
													inputValue={props.inputCompanyName}
													setInputValue={props.setInputCompanyName}
													handler={(e) => props.inputHandler(e, 'COMPANY_NAME')}
												/>
											)}
										</Grid>
										<Grid item xs={4} style={{ marginLeft: 15 }}>
											<StyledTextField
												value={props.invoiceId}
												onChange={(e) => props.setInvoiceId(e.target.value)}
												variant="outlined"
												onKeyDown={(e) => props.hendlerForInvoiceId(e, 'INVOICE_ID')}
												fullWidth
												placeholder="Search"
												InputProps={{
													endAdornment: (
														<SearchIcon
															onClick={(e) => props.inputHandler(e, 'INVOICE_ID')}
															style={{ cursor: 'pointer' }}
															className={classes.searchIcon}
														/>
													),
												}}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>

						{props.loadingInvoices && (
							<Grid item xs={12} align="center" style={{ height: 'calc(100vh - 539px)' }}>
								<CircularProgress
									size={40}
									thickness={4}
									value={100}
									style={{ marginTop: '8%' }}
								/>
							</Grid>
						)}
						{props.invoiceRows && !props.loadingInvoices && (
							<Grid item xs={11} style={{ paddingTop: 20 }}>
								<InvoiceTable invoiceRows={props.invoiceRows} />
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

AllInvoicesView.displayName = 'AllInvoicesView';
AllInvoicesView.defaultProps = {};

export default React.memo(AllInvoicesView);
