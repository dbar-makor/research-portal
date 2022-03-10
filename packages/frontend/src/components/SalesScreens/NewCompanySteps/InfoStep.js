import React, { useState, useEffect } from 'react';
import { ReactComponent as BlueBorder } from '../../../assets/icons/blueBorder.svg';
import TextInputUnit from '../../Reusables/TextInputUnit';
import SelectInputUnit from '../../Reusables/SelectInputUnit';
import AutoCompleteUnit from '../../Reusables/AutoCompleteUnit';
import DateInputUnit from '../../Reusables/DateInputUnit';
import { selectChosenCompany } from '../../../redux/companies/chosenCompanySlice';
//import { validateCompany } from "../../Reusables/validationFunctions";
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, makeStyles, Button, IconButton, TextField } from '@material-ui/core';
import DropZone from '../../Reusables/DropZone';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import axios from 'axios';
import * as actionSnackBar from '../../../redux/SnackBar/action';

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

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const InfoStep = ({
	company,
	setCompany,
	errors,
	setErrors,
	handleCompany,
	setUploadedImage,
	uploadedImage,
	inputValue,
	setInputValue,
}) => {
	const countriesArr = useSelector((state) => state.utils.utils.country);
	const classes = useStyles();
	console.log('company', company);
	const dispatch = useDispatch();
	//const [uploadedImage, setUploadedImage] = useState({})

	const onDrop = async (acceptedFiles) => {
		// console.log('acceptedCover', acceptedFiles)
		const image = acceptedFiles[0];
		const formData = new FormData();
		formData.append('file', image);
		try {
			const res = await axios.post(`${BASE_URL}${END_POINT.FILE}`, formData);
			if (res.status === 200) {
				// console.log('res', res)
				// const newImage = { logo: res.data.file}
				// setLogo(res.data.file)
				setUploadedImage(res.data.file);
			}
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'File upload failed', 2000));
		}
	};

	return (
		<Grid item xs={6} className={classes.stepFormContanier}>
			<Grid container>
				<Grid item xs={12} className={classes.fieldWrapper}>
					<TextInputUnit
						className={classes.textFieldStyle}
						name="name"
						label="Customer"
						value={company.name || ''}
						onChange={handleCompany}
						error={errors.name}
					/>
				</Grid>

				<Grid item xs={12} className={classes.fieldWrapper} style={{ marginTop: -10 }}>
					<DropZone
						className={classes.dropZone}
						onDrop={onDrop}
						uploadedImage={uploadedImage}
						setUploadedImage={setUploadedImage}
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
							formObject={company}
							handler={handleCompany}
							error={errors.country}
							inputValue={inputValue}
							setInputValue={setInputValue}
						/>
					)}
				</Grid>
				<Grid item xs={12} className={classes.fieldWrapper}>
					<SelectInputUnit
						className={classes.autoCompleteStyle}
						name="type"
						label={company.type ? '' : 'Type'}
						optionLabelField="name"
						valueField="value"
						value={company.type || ''}
						onChange={handleCompany}
						optionsArray={typeArray}
						error={errors.type}
					/>
				</Grid>
				<Grid item xs={12} className={classes.fieldWrapper}>
					<DateInputUnit
						className={classes.datePicker}
						name="start_at"
						value={company['start_at'] || {}}
						label="Start Date"
						error={errors['start_at']}
						onChange={(date) => handleCompany(date, 'start_at')}
					/>
				</Grid>
				{company.type === 'prospect' ? (
					<Grid item xs={12} className={classes.fieldWrapper}>
						<DateInputUnit
							className={`${classes.marginBottom35} ${classes.datePicker}`}
							name="end_at"
							error={errors['end_at']}
							value={company['end_at'] || {}}
							label="End Date "
							// value={company["end_at"] ||tomorrow.setDate(tomorrow.getDate())}
							onChange={(date) => handleCompany(date, 'end_at')}
						/>
					</Grid>
				) : (
					<></>
				)}
			</Grid>
		</Grid>
	);
};

export default InfoStep;

const useStyles = makeStyles((theme) => ({
	stepFormContanier: {
		display: 'flex',
		flexDirection: 'column',
		margin: '10px auto',
	},
	fieldWrapper: {
		marginBottom: 10,
	},
	marginBottom35: {
		marginBottom: '35px',
	},
	textFieldStyle: {
		'height': 63.2,
		'borderColor': '#A5AFC233',
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiInputBase-input': {
			fontFamily: 'inter',
			fontSize: '.MuiInputBase-input',
			borderRadius: '8px',
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
	},
	autoCompleteStyle: {
		'height': 63.2,
		'& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
			padding: '1.3px',
		},
		'& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]':
			{
				borderRadius: '8px',
			},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},

		'& .MuiAutocomplete-popupIndicatorOpen': {
			transform: 'none',
		},
	},
	dateStyle: {
		// height:63.2,
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiOutlinedInput-adornedEnd': {
			borderRadius: '8px',
			padding: 0,
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
	},
	closeButton: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},

	datePicker: {
		'width': '100%',
		'height': 68,
		'& span': {
			marginLeft: 18,
		},

		'& .MuiOutlinedInput-root': {
			'borderRadius': '8px',
			'height': 38,
			// '& .Mui-error':{
			//     borderColor: "#A5AFC233"
			// },

			'& fieldset': {
				borderColor: '#A5AFC233',
			},
			'&:hover fieldset': {
				border: '1px solid #A5AFC233',
			},
			'&.Mui-focused fieldset': {
				border: '1px solid #A5AFC233',
			},
		},
		'& .MuiInputBase-root': {
			'&.Mui-focused fieldset': {},
			'& .MuiButtonBase-root': {
				'paddingRight': 0,
				'&:hover': {
					'backgroundColor': 'transparent',
					'&:focused': {
						backgroundColor: 'transparent',
					},
				},
				//   boxShadow: 'none'
			},
			'& .MuiInputBase-input': {
				'padding': '11px',
				'paddingRight': '0px',
				'&::placeholder': {
					color: '#868DA2',
					opacity: 1,
				},
			},
		},
		'& .MuiIconButton-root': {
			padding: 0,
		},
		'& .MuiOutlinedInput-adornedEnd': {
			paddingRight: '8px',
		},
		'& .MuiFormHelperText-root': {
			'marginLeft': 2,
			'marginTop': 0,
			'&.Mui-error': {
				color: '#FF0221',
				fontSize: 11,
				fontWeight: 500,
				// lineHeight: 1.5
			},
		},
	},
	dropZone: {
		border: '1px solid #EDEFF3',
	},
}));
