import React from 'react';
import {  useSelector } from 'react-redux';
import TextInputUnit from '../../../reusables/TextInputUnit/TextInputUnit';
import SelectInputUnit from '../../../reusables/SelectInputUnit/SelectInputUnit';
import AutoCompleteUnit from '../../../reusables/AutoCompleteUnit/AutoCompleteUnit';
import DateInputUnit from '../../../reusables/DateInputUnit/DateInputUnit';
import useStyles from './InfoStep.style';
import { Grid } from '@material-ui/core';
import DropZone from '../../../reusables/DropZone/DropZone';


const typeArray = [
	{
		value: 'client',
		name: 'Client',
	},
	{
		value: 'prospect',
		name: 'Prospect',
	},
];

const InfoStepView = (props) => {
	const countriesArr = useSelector((state) => state.utils.utils.country);

  const classes = useStyles();

	return (
		<Grid item xs={6} className={classes.stepFormContanier}>
			<Grid container>
				<Grid item xs={12} className={classes.fieldWrapper}>
					<TextInputUnit
						className={classes.textFieldStyle}
						name="name"
						label="Customer"
						value={props.company.name || ''}
						onChange={props.handleCompany}
						error={props.errors.name}
					/>
				</Grid>

				<Grid item xs={12} className={classes.fieldWrapper} style={{ marginTop: -10 }}>
					<DropZone
						className={classes.dropZone}
						onDrop={props.onDrop}
						uploadedImage={props.uploadedImage}
						setUploadedImage={props.setUploadedImage}
						purpose="logo"
						// imageData='uploadedImage'
					/>
				</Grid>

				<Grid item xs={12} className={classes.fieldWrapper}>
					{countriesArr && (
						<AutoCompleteUnit
							className={classes.autoCompleteStyle}
							name="country"
							label="Country"
							// style={company.country.name ? {color: "#000"} : {}}
							fieldForLabel="name"
							options={countriesArr}
							formObject={props.company}
							handler={props.handleCompany}
							error={props.errors.country}
							inputValue={props.inputValue}
							setInputValue={props.setInputValue}
						/>
					)}
				</Grid>
				<Grid item xs={12} className={classes.fieldWrapper}>
					<SelectInputUnit
						className={classes.autoCompleteStyle}
						name="type"
						label={props.company.type ? '' : 'Type'}
						optionLabelField="name"
						valueField="value"
						value={props.company.type || ''}
						onChange={props.handleCompany}
						optionsArray={typeArray}
						error={props.errors.type}
					/>
				</Grid>
				<Grid item xs={12} className={classes.fieldWrapper}>
					<DateInputUnit
						className={classes.datePicker}
						name="start_at"
						value={props.company['start_at'] || {}}
						label="Start Date"
						error={props.errors['start_at']}
						onChange={(date) => props.handleCompany(date, 'start_at')}
					/>
				</Grid>
				{props.company.type === 'prospect' ? (
					<Grid item xs={12} className={classes.fieldWrapper}>
						<DateInputUnit
							className={`${classes.marginBottom35} ${classes.datePicker}`}
							name="end_at"
							error={props.errors['end_at']}
							value={props.company['end_at'] || {}}
							label="End Date "
							// value={company["end_at"] ||tomorrow.setDate(tomorrow.getDate())}
							onChange={(date) => props.handleCompany(date, 'end_at')}
						/>
					</Grid>
				) : (
					<></>
				)}
			</Grid>
		</Grid>
	);
};

InfoStepView.displayName = 'InfoStepView';
InfoStepView.defaultProps = {};

export default React.memo(InfoStepView);
