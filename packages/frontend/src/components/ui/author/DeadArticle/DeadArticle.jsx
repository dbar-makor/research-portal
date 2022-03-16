import React, { useState, useEffect, useRef} from 'react';
import { END_POINT, BASE_URL } from '../../../../utils/constants';
import axios from 'axios';
import { isValid } from 'date-fns';
import { selectChosenResearch, changeChosenResearch } from '../../../../redux/researches/chosenResearchSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as actionSnackBar from '../../../../redux/SnackBar/action';
import {
	validateDeadPublication,
	validateEvent,
	validateEditedDeadPublication,
} from '../../../Reusables/validationFunctions';
import { useHistory, useLocation } from 'react-router';

import DeadArticleView from './DeadArticle.view';

const DeadArticle = () => {
  const dispatch = useDispatch();
	const history = useHistory();
	const chosenResearch = useSelector(selectChosenResearch);
	const [coverImage, setCoverImage] = useState(null);
	const [coverImageOK, setCoverImageOK] = useState({ initial: true, final: false });
	const [localCats, setLocalCats] = useState([]);
	const [localTags, setLocalTags] = useState([]);
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState(false);
	const [errorsEvent, setErrorsEvent] = useState({});
  	// eslint-disable-next-line no-unused-vars
	const [validationResultEvent, setValidationResultEvent] = useState(true);
	const [currentEvent, setCurrentEvent] = useState({
		date: null,
		title: '',
	});
	const initStateForm = {
		title: '',
		description: '',
		events: [],
		tags: [],
		categories: [],
		attachments: [],
		type: 'dead',
		title_video: '',
		link_video: '',
		title_pdf: '',
		file_pdf: '',
	};

	const [localForm, setLocalForm] = useState(initStateForm);
	const [scrollLocation, setScrollLocation] = useState('bottom');
	const tableRowsRefs = useRef([]);
	const [selectedValue, setSelectedValue] = useState('pdf');
	const location = useLocation();
	const handleChangeRadio = (event) => {
		setSelectedValue(event.target.value);
	};
	const executeScroll = () => {
		if (localForm.events.length) {
			const lastIndex = tableRowsRefs.current.length - 1;
			if (scrollLocation === 'bottom') {
				tableRowsRefs.current[lastIndex].scrollIntoView();
			}
		}
	};
	useEffect(() => {
		if (localForm) {
			tableRowsRefs.current = tableRowsRefs.current.slice(0, localForm.events.length);
			executeScroll();
		}
	}, [localForm.events]);

	//For editing
	useEffect(() => {
		if (chosenResearch) {
			const coverImg = chosenResearch.attachments.find(
				(attachment) => attachment.file_type === 'main_bg',
			);
			//  let categoriesIDs = chosenResearch.categories.map(category => category.id);
			const editedLocalForm = { ...chosenResearch };
			delete editedLocalForm.created_at;
			delete editedLocalForm.name;
			delete editedLocalForm.updated_at;

			setCoverImage(coverImg ? coverImg : '');
			setLocalCats(chosenResearch.categories);
			setLocalForm(editedLocalForm);
			setLocalTags(chosenResearch.tags);
			setSelectedValue(chosenResearch.file_video ? 'video' : 'pdf');

			//checking validation for published case vs. draft case
			if (chosenResearch.status === 'published') {
				setValidationResult(true);
				setCoverImageOK((prev) => ({ ...prev, final: true }));
			} else if (chosenResearch.status === 'draft') {
				if (!coverImg) {
					setCoverImageOK((prev) => ({ ...prev, final: false }));
				}
				if (!chosenResearch.categories.lengt || !chosenResearch.title) {
					setValidationResult(false);
				}
			}
		}
	}, [chosenResearch]);

	//if coming back from preview (chosenResearch is now null even if it is saved in server)

	useEffect(() => {
		if (location.state?.from === 'prearticle') {
			const publication = location.state?.publication;
			const coverImg = publication.attachments?.find(
				(attachment) => attachment.file_type === 'main_bg',
			);

			const editedLocalForm = { ...publication };
			delete editedLocalForm.created_at;
			delete editedLocalForm.name;
			delete editedLocalForm.updated_at;

			setCoverImage(coverImg ? coverImg : '');
			setLocalCats(publication.categories);
			setLocalForm(editedLocalForm);
			setLocalTags(publication.tags);

			//validations
			if (coverImg) {
				setCoverImageOK((prev) => ({ ...prev, final: true }));
			}
			if (publication.categories.length && publication.title) {
				setValidationResult(true);
			}
		}
	}, [chosenResearch]);

	//clearing states when leaving component
	useEffect(() => {
		return () => {
			setLocalForm(initStateForm);
			setCoverImage(null);
			setLocalCats([]);
			setCurrentEvent({ date: null, title: '' });
		};
	}, []);

	const updatePropertyField = (rowIndex, value, key, category) => {
		const categoryCopy = [...localForm[category]];
		categoryCopy[rowIndex][key] = value;
		setLocalForm({
			...localForm,
			[category]: categoryCopy,
		});
		if (category === 'events') {
			setScrollLocation('event');
		}
	};

	const checkIfCurrentEventFilled = () => {
		let check = true;
		for (const [key, value] of Object.entries(currentEvent)) {
			if (!value || (key === 'date' && !isValid(new Date(value)))) {
				check = false;
			}
		}
		return check;
	};

	const ifCurrentEventFilled = checkIfCurrentEventFilled();

	const addEvent = () => {
		const execEvents = [...localForm.events];
		execEvents.push(currentEvent);
		setLocalForm({
			...localForm,
			events: execEvents,
		});
		setCurrentEvent({
			date: null,
			title: '',
		});
		setErrorsEvent({});

		setScrollLocation('bottom');
	};

	const handleCatsChange = (values) => {
		const newCats = [];
		for (const cat of values) {
			newCats.push(cat.id);
		}
		setLocalCats(values);
		// setLocalForm({ ...localForm, categories: newCats });
		if (chosenResearch) {
			validateEditedDeadPublication(
				{ categories: newCats },
				errors,
				setErrors,
				setValidationResult,
				selectedValue,
			);
		} else {
			validateDeadPublication(
				{ categories: newCats },
				errors,
				setErrors,
				setValidationResult,
				selectedValue,
			);
		}
	};

	const handleTagsValue = (e, values) => {
		const tempTags = [];
		const tagNamesCopy = [...localTags.map((tag) => tag.name)];
		values.forEach((value) => {
			//new user value with enter key
			if (typeof value === 'string' && !tagNamesCopy.includes(value)) {
				tempTags.push({ name: value });
				//disallows duplicates
			} else if (typeof value === 'string' && tagNamesCopy.includes(value)) {
				return;
			} else if (value && value.inputValue) {
				// new user value with select
				tempTags.push({ name: value.inputValue });
			} else {
				tempTags.push(value);
			}
		});
		setLocalTags(tempTags);

		//if tag exists in server- send tag's id; if new- send tag's name, server will include it in tag list
	};

	const handleChange = (value, key) => {
		setLocalForm({ ...localForm, [key]: value });
		if (chosenResearch) {
			validateEditedDeadPublication(
				{ [key]: value },
				errors,
				setErrors,
				setValidationResult,
				selectedValue,
			);
		} else {
			validateDeadPublication({ [key]: value }, errors, setErrors, setValidationResult, selectedValue);
		}
	};

	const deleteItem = (index, category) => {
		if (category === 'localCats') {
			const catsCopy = [...localCats];
			const formCats = [...localForm.categories];
			catsCopy.splice(index, 1);
			formCats.splice(index, 1);
			setLocalCats(catsCopy);
			setLocalForm({
				...localForm,
				categories: formCats,
			});
			if (chosenResearch) {
				validateEditedDeadPublication(
					{ categories: formCats },
					errors,
					setErrors,
					setValidationResult,
					selectedValue,
				);
			} else {
				validateDeadPublication(
					{ categories: formCats },
					errors,
					setErrors,
					setValidationResult,
					selectedValue,
				);
			}
		} else {
			const categoryCopy = [...localForm[category]];
			categoryCopy.splice(index, 1);
			setLocalForm({
				...localForm,
				[category]: categoryCopy,
			});
		}
	};

	const onPDFUpload = async (e) => {
		const pdf = e.target.files[0];
		const formData = new FormData();
		formData.append('file', pdf);
		try {
			const res = await axios.post(`${BASE_URL}${END_POINT.FILE}`, formData);
			if (res.status === 200 && res.data.file) {
				setLocalForm((prev) => ({ ...prev, file_pdf: res.data.file }));
				if (chosenResearch) {
					validateEditedDeadPublication(
						{ file_pdf: res.data.file },
						errors,
						setErrors,
						setValidationResult,
						selectedValue,
					);
				} else {
					validateDeadPublication(
						{ file_pdf: res.data.file },
						errors,
						setErrors,
						setValidationResult,
						selectedValue,
					);
				}
			}
		} catch (error) {
			/* eslint no-console: "off" */
			console.log(error.message);
		}
	};

	const onDropCover = async (acceptedFiles) => {
		const coverImage = acceptedFiles[0];
		const formData = new FormData();
		formData.append('file', coverImage);
		try {
			const res = await axios.post(`${BASE_URL}${END_POINT.FILE}`, formData);
			if (res.status === 200) {
				const newCover = {
					file_type: 'main_bg',
					file_name: coverImage.name,
					file_name_system: res.data.file,
				};
				setCoverImage(newCover);
				setCoverImageOK((prev) => ({ ...prev, final: true }));
			}
		} catch (error) {}
	};
	const sendPublication = async (buttonMarker) => {
		const attachmentsCopy = [];

		if (coverImage?.file_name) {
			attachmentsCopy.push(coverImage);
		}

		let formToSend = { ...localForm, attachments: attachmentsCopy };
		const categoriesForServer = localCats.map((cat) => cat.id);
		const tagsForServer = localTags.map((tag) => (tag.id ? { id: tag.id } : { name: tag.name }));

		if (!formToSend.title_video) {
			delete formToSend.title_video;
			delete formToSend.link_video;
		}

		if (!formToSend.title_pdf) {
			delete formToSend.title_pdf;
			delete formToSend.file_pdf;
		}

		delete formToSend.author;
		delete formToSend.comments;

		if (buttonMarker === 'done') {
			formToSend = {
				...formToSend,
				categories: categoriesForServer,
				tags: tagsForServer,
				status: 'published',
			};
		} else if (buttonMarker === 'save-draft') {
			formToSend = {
				...formToSend,
				categories: categoriesForServer,
				tags: tagsForServer,
				status: 'draft',
			};
		} else if (buttonMarker === 'preview') {
			formToSend = { ...localForm, categories: localCats, tags: localTags };

			history.push({
				pathname: '/prearticle',
				state: { publication: formToSend, from: 'new-publication' },
			});
			return;
		}

		try {
			let res;
			// if (chosenResearch && chosenResearch.id) {
			if (formToSend.id) {
				res = await axios.put(`${BASE_URL}${END_POINT.PUBLICATION}/${formToSend.id}`, formToSend);
				history.push('/researches');
				dispatch(changeChosenResearch(null));
				if (res.status === 201) {
					dispatch(actionSnackBar.setSnackBar('success', 'Successfully updated', 2000));
				}
			} else {
				res = await axios.post(`${BASE_URL}${END_POINT.PUBLICATION}`, formToSend);
				history.push('/researches');
				if (res.status === 201) {
					dispatch(actionSnackBar.setSnackBar('success', 'Successfully published', 2000));
				}
			}
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'Publish failed', 2000));
		}
	};

	const handleCancle = () => {
		history.push('/researches');
	};

	// when user navigates outside the component- chosen research is cleared

	useEffect(() => {
		return () => {
			dispatch(changeChosenResearch(null));
		};
	}, []);

	const shortify = (name = '') => {
		if (name.length > 20) {
			return `${name.slice(0, 19)} ...`;
		} else {
			return name;
		}
	};

  return <DeadArticleView
  addEvent={addEvent}
  coverImage={coverImage}
  coverImageOK={coverImageOK}
  currentEvent={currentEvent}
  deleteItem={deleteItem}
  errors={errors}
  errorsEvent={errorsEvent}
  executeScroll={executeScroll}
  handleCatsChange={handleCatsChange}
  handleCancle={handleCancle}
  handleTagsValue={handleTagsValue}
  handleChange={handleChange}
  handleChangeRadio={handleChangeRadio}
  ifCurrentEventFilled={ifCurrentEventFilled}
  localCats={localCats}
  localForm={localForm}
  localTags={localTags}
  onPDFUpload={onPDFUpload}
  onDropCover={onDropCover}
  selectedValue={selectedValue}
  sendPublication={sendPublication}
  setErrors={setErrors}
  setErrorsEvent={setErrorsEvent}
  setCoverImage={setCoverImage}
  setCoverImageOK={setCoverImageOK}
  setCurrentEvent={setCurrentEvent}
  setLocalCats={setLocalCats}
  setLocalForm={setLocalForm}
  setLocalTags={setLocalTags}
  setValidationResult={setValidationResult}
  setValidationResultEvent={setValidationResultEvent}
  shortify={shortify}
  updatePropertyField={updatePropertyField}
  validateDeadPublication={validateDeadPublication}
  validateEvent={validateEvent}
  validateEditedDeadPublication={validateEditedDeadPublication}
  validationResult={validationResult}
  ref={tableRowsRefs}
  />;
};

DeadArticle.displayName = 'DeadArticle';
DeadArticle.defaultProps = {};

export default React.memo(DeadArticle);
