import React from 'react';
import {  useDispatch } from 'react-redux';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import axios from 'axios';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';
import InfoStepView from './InfoStep.view';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const InfoStep = ({
	company,
	errors,
	handleCompany,
	setUploadedImage,
	uploadedImage,
	inputValue,
	setInputValue,
}) => {
	const dispatch = useDispatch();

	const onDrop = async (acceptedFiles) => {
		const image = acceptedFiles[0];
		const formData = new FormData();
		formData.append('file', image);
		try {
			const res = await axios.post(`${BASE_URL}${END_POINT.FILE}`, formData);
			if (res.status === 200) {
				setUploadedImage(res.data.file);
			}
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'File upload failed', 2000));
		}
	};

	return <InfoStepView
  company={company}
  handleCompany={handleCompany}
  errors={errors}
  onDrop={onDrop}
  uploadedImage={uploadedImage}
  setUploadedImage={setUploadedImage}
  inputValue={inputValue}
  setInputValue={setInputValue}
  />;
};

InfoStep.displayName = 'InfoStep';
InfoStep.defaultProps = {};

export default React.memo(InfoStep);
