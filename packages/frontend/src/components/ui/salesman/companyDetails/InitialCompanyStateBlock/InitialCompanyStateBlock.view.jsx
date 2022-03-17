import React from 'react';
import { format } from 'date-fns';
import EditIcon from '@material-ui/icons/Edit';
import { Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Typography, IconButton, TextField } from '@material-ui/core';
import DateInputUnit from '../../../reusables/DateInputUnit/DateInputUnit';
import { useStyles } from '../../../../../styles/InfoStyles';
import { ReactComponent as EditDone } from '../../../../../assets/icons/IconEditDone.svg';
import { EditIconButton } from '../../../../../styles/MainStyles';

const InitialCompanyStateBlockView = (props) => {
  const classes = useStyles();
  return props ? (
		<Grid container>
			<Grid item xs={12}>
				{props.type === 'prospect' ? (
					<Grid container justifyContent="space-between" alignItems="center">
						<Typography className={classes.blockHeader}>
							{props.title.replaceAll('_', ' ')}
						</Typography>
						{props.trialEditMode ? (
							<IconButton
								onClick={() => props.sendUpdatedTrial(props.id)}
								className={classes.editDoneBtn}
							>
								<EditDone />
							</IconButton>
						) : (
							<EditIconButton onClick={() => props.setTrialEditMode(true)}>
								<EditIcon style={{ fontSize: '18px' }} />
							</EditIconButton>
						)}
					</Grid>
				) : (
					<Typography className={classes.blockHeader}>
						{props.title.replaceAll('_', ' ')}
					</Typography>
				)}
			</Grid>
			<Grid item xs={12} className={classes.marginBottom8}>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item xs={3}>
						<Typography className={classes.fieldName}>Agent</Typography>
					</Grid>
					<Grid item xs={8}>
						{props.trialEditMode ? (
							<Autocomplete
								className={classes.salesAutocomplete}
								name="sales_agent"
								options={props.salesmenArr}
								value={props.stateToUpdate.sales_agent}
								inputValue={props.inputValue}
								getOptionSelected={(option, value) => option.name === value.name}
								popupIcon={<SearchIcon style={{ color: '#1C67FF', fontSize: '18px' }} />}
								getOptionLabel={(option) => {
									return option.name;
								}}
								// error={errors.country}
								onChange={(e, newValue) => props.handleTrialChange('sales_agent', newValue)}
								onInputChange={(e, newInputValue) => props.setInputValue(newInputValue)}
								renderInput={(params) => (
									<TextField
										{...params}
										style={{ width: '100%' }}
										autoComplete="off"
										{...(props.errors.sales_agent && {
											error: true,
											helperText: props.errors.sales_agent,
										})}
									/>
								)}
							/>
						) : (
							<Grid container justifyContent="flex-end">
								<Typography className={classes.fieldContent}>
									{props.sales_agent && props.sales_agent.name}
								</Typography>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} className={classes.marginBottom8}>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item>
						<Typography className={classes.fieldName}>Start Date</Typography>
					</Grid>
					<Grid item xs={7}>
						<Grid container justifyContent="flex-end">
							{props.trialEditMode ? (
								<DateInputUnit
									label=""
									value={props.stateToUpdate.start_at}
									onChange={(date) => props.handleTrialChange('start_at', date)}
									inputVariant="standard"
									iconFontSize="17px"
									datePickerClass={classes.datePickerClass}
									error={props.errors['start_at']}
								/>
							) : (
								<Typography className={classes.fieldContent}>
									{format(new Date(props.start_at), 'dd MMM, yyyy')}
								</Typography>
							)}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{props.title === 'prospect_trial' && (
				<>
					<Grid item xs={12} className={classes.marginBottom8}>
						<Grid container justifyContent="space-between" alignItems="center">
							<Grid item>
								<Typography className={classes.fieldName}>End Date</Typography>
							</Grid>
							<Grid item xs={7}>
								<Grid container justifyContent="flex-end">
									{props.trialEditMode ? (
										<DateInputUnit
											label=""
											value={props.stateToUpdate.end_at}
											onChange={(date) => props.handleTrialChange('end_at', date)}
											inputVariant="standard"
											iconFontSize="17px"
											datePickerClass={classes.datePickerClass}
											error={props.errors['end_at']}
										/>
									) : (
										<Typography className={classes.fieldContent}>
											{format(new Date(props.end_at), 'dd MMM, yyyy')}
										</Typography>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} className={classes.marginBottom8}>
						<Grid container justifyContent="space-between" alignItems="center">
							<Grid item>
								<Typography className={classes.fieldName}>Trial Period</Typography>
							</Grid>
							<Grid item>
								<Typography className={classes.fieldContent}>{props.trialPeriod}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</>
			)}
		</Grid>
	) : null;
};

InitialCompanyStateBlockView.displayName = 'InitialCompanyStateBlockView';
InitialCompanyStateBlockView.defaultProps = {};

export default React.memo(InitialCompanyStateBlockView);
