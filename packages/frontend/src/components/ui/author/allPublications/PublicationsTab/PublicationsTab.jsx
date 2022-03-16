import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PublicationsTabView from './PublicationsTab.view';
import {
	selectChosenResearch,
	getChosenResearchAsync,
} from '../../../../../redux/researches/chosenResearchSlice';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';

//after changes, this component shows a single publication card

function truncateString(string, wordsNo) {
	const descrptionArr = string.split(' ');
	const descriptionLength = descrptionArr.length;
	descrptionArr.splice(wordsNo);
	const newDescription = descrptionArr.join(' ');
	if (descriptionLength > wordsNo) return `${newDescription}...`;
	return newDescription;
}
const PublicationsTab = ({ publication, fetchPublications, fetchStatistics }) => {
	const [openAlert, setOpenAlert] = useState(false);
	const [redirectMarker, setRedirectMarker] = useState(false);
	const [deleteID, setDeleteID] = useState('');

	const history = useHistory();
	const dispatch = useDispatch();

	const chosenResearch = useSelector(selectChosenResearch);

	useEffect(() => {
		if (chosenResearch && chosenResearch.type === 'live' && redirectMarker) {
			setRedirectMarker(false);
			//change routing!
			history.push('/new-article');
		} else if (chosenResearch && chosenResearch.type === 'dead' && redirectMarker) {
			setRedirectMarker(false);
			//change routing!
			history.push('/upload-article');
		}
	}, [chosenResearch]);

	const asyncDelete = async () => {
		try {
			const res = await axios.delete(`${BASE_URL}${END_POINT.PUBLICATION}/${deleteID}`);
			if (res.status === 201 || res.status === 200) {
				fetchPublications();
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully deleted', 2000));
				fetchStatistics();
			}
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'Delete failed', 2000));
		}
	};

	const handleEdit = useCallback((id) => {
		dispatch(getChosenResearchAsync(id));
		setRedirectMarker(true);
	});

	const handleCloseAlert = useCallback(() => {
		setOpenAlert(false);
	});

	const deletePublication = useCallback(() => {
		asyncDelete(deleteID);
		setOpenAlert(false);
		setDeleteID('');
	});

	const handleDeleteBtn = useCallback((id) => {
		setOpenAlert(true);
		setDeleteID(id);
	});

	const chooseImage = useCallback((publication) => {
		let image = '';
		let url = '';
		if (publication?.attachments?.length) {
			image = publication.attachments.find((attachment) => attachment.file_type === 'main_bg');
			const imageName = image && image.file_name_system;
			url = `${BASE_URL}${END_POINT.ASSETS}/${encodeURIComponent(imageName)}`;
		}
		return url;
	});

	return (
		<PublicationsTabView
			chooseImage={chooseImage}
			publication={publication}
			handleDeleteBtn={handleDeleteBtn}
			handleEdit={handleEdit}
			truncateString={truncateString}
			openAlert={openAlert}
			handleCloseAlert={handleCloseAlert}
			deletePublication={deletePublication}
		/>
	);
};

PublicationsTab.displayName = 'PublicationsTab';
PublicationsTab.defaultProps = {};

export default React.memo(PublicationsTab);
