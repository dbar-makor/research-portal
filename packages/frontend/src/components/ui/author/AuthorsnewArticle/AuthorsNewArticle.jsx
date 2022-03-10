import React, { useState, useEffect, useRef } from 'react';
import { END_POINT, BASE_URL } from '../../../../utils/constants';
import { convertToRaw } from 'draft-js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { isValid } from 'date-fns';
import { selectChosenResearch, changeChosenResearch } from '../../../../redux/researches/chosenResearchSlice';
import { useHistory, useLocation } from 'react-router';
import * as actionSnackBar from '../../../../redux/SnackBar/action';
import {
	validateLivePublication,
	validateEvent,
	validateEditedLivePublication,
} from '../../../Reusables/validationFunctions';
import AuthorsNewArticleView from './AuthorsNewArticle.view';

const AuthorsNewArticle = (props) => {
	const chosenResearch = useSelector(selectChosenResearch);

	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const [coverImage, setCoverImage] = useState('');
	const [localCats, setLocalCats] = useState([]);
	const [description, setDescription] = useState('');
	const [currentEvent, setCurrentEvent] = useState({
		date: null,
		title: '',
	});
	const initState = {
		title: '',
		content: '',
		categories: [],
		attachments: [],
		events: [],
		tags: [],
		type: 'live',
	};

	const [localForm, setLocalForm] = useState(initState);
	const [localTags, setLocalTags] = useState([]);
	const [scrollLocation, setScrollLocation] = useState('bottom');
	const tableRowsRefs = useRef([]);
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState(false);
	const [errorsEvent, setErrorsEvent] = useState({});
	const [validationResultEvent, setValidationResultEvent] = useState(true); //true as default because not mandatory
	const [coverImageOK, setCoverImageOK] = useState({ initial: true, final: false });
	const [contentNotOK, setContentNotOK] = useState({ focus: false, isText: false, everTyped: false });
	const showEditorError = contentNotOK.focus && contentNotOK.everTyped && !contentNotOK.isText;

	useEffect(() => {
		console.log('chosenResearch', chosenResearch);
	}, []);

	useEffect(() => {
		if (localForm) {
			tableRowsRefs.current = tableRowsRefs.current.slice(0, localForm.events.length);
			executeScroll();
		}
	}, [localForm.events]);

	useEffect(() => {
		if (chosenResearch) {
			console.log("there's a chosenResearch");
			const coverImg = chosenResearch.attachments.find(
				(attachment) => attachment.file_type === 'main_bg',
			);
			const otherFiles = chosenResearch.attachments.filter(
				(attachment) => attachment.file_type !== 'main_bg',
			);
			//  let categoriesIDs = chosenResearch.categories.map(category => category.id)
			const editedLocalForm = { ...chosenResearch, attachments: otherFiles };
			//  let editedLocalForm = {...chosenResearch, attachments: otherFiles, categories: categoriesIDs};
			delete editedLocalForm.created_at;
			delete editedLocalForm.name;
			delete editedLocalForm.updated_at;

			setCoverImage(coverImg ? coverImg : '');
			setLocalCats(chosenResearch.categories);
			setLocalForm(editedLocalForm);
			setLocalTags(chosenResearch.tags);

			//checking validation for published case vs. draft case
			if (chosenResearch.status === 'published') {
				setContentNotOK({ focus: true, isText: true, everTyped: true });
				setValidationResult(true);
				setCoverImageOK((prev) => ({ ...prev, final: true }));
			} else {
				if (!coverImg) {
					setCoverImageOK((prev) => ({ ...prev, final: false }));
				}
				if (!chosenResearch.categories.length || !chosenResearch.title) {
					setValidationResult(false);
				}
				if (JSON.parse(chosenResearch.content)) {
				}
			}
		}
	}, [chosenResearch]);

	//if coming back from preview (chosenResearch is now null even if it is saved in server)
	useEffect(() => {
		if (location.state?.from === 'prearticle') {
			const publication = location.state?.publication;
			console.log('half baked publication', publication);
			const coverImg = publication.attachments?.find(
				(attachment) => attachment.file_type === 'main_bg',
			);
			const otherFiles = publication.attachments?.filter(
				(attachment) => attachment.file_type !== 'main_bg',
			);
			// let categoriesIDs = publication.categories?.map(category => category.id)
			const editedLocalForm = { ...publication, attachments: otherFiles };
			// let editedLocalForm = {...publication, attachments: otherFiles, content: JSON.stringify(publication.content)};
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
	}, [location.state]);

	const sendPublication = async (buttonMarker) => {
		const attachmentsCopy = [...localForm.attachments];
		if (coverImage?.file_name) {
			attachmentsCopy.push(coverImage);
		}

		let formToSend = { ...localForm };
		const categoriesForServer = localCats.map((cat) => cat.id);
		const tagsForServer = localTags.map((tag) => (tag.id ? { id: tag.id } : { name: tag.name }));

		delete formToSend.author;
		delete formToSend.comments;
		delete formToSend.published_at;

		if (buttonMarker === 'done') {
			formToSend = {
				...formToSend,
				attachments: attachmentsCopy,
				categories: categoriesForServer,
				tags: tagsForServer,
				description: description,
				status: 'published',
				content:
					typeof formToSend.content === 'string'
						? JSON.parse(formToSend.content)
						: formToSend.content,
			};
			console.log('formToSend', formToSend);
		} else if (buttonMarker === 'save-draft') {
			formToSend = {
				...formToSend,
				attachments: attachmentsCopy,
				categories: categoriesForServer,
				tags: tagsForServer,
				description: description,
				status: 'draft',
				content:
					typeof formToSend.content === 'string'
						? JSON.parse(formToSend.content)
						: formToSend.content,
			};
		} else if (buttonMarker === 'preview') {
			formToSend = {
				...formToSend,
				attachments: attachmentsCopy,
				categories: localCats,
				tags: localTags,
				description: description,
				created_at: new Date(),
			};
			console.log('form to send to preview screen', formToSend);
			history.push({
				pathname: '/prearticle',
				state: { publication: formToSend, from: 'new-publication' },
			});
			return;
		}

		try {
			let res;
			// if((chosenResearch && chosenResearch.id )){
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

	//when user navigates outside the component- chosen research is cleared
	useEffect(() => {
		return () => {
			dispatch(changeChosenResearch(null));
		};
	}, []);

	const executeScroll = () => {
		if (localForm.events.length) {
			const lastIndex = tableRowsRefs.current.length - 1;
			if (scrollLocation === 'bottom') {
				tableRowsRefs.current[lastIndex].scrollIntoView();
			}
		}
	};

	const handleChange = (value, key) => {
		setLocalForm({ ...localForm, [key]: value });
		if (chosenResearch) {
			validateEditedLivePublication({ [key]: value }, errors, setErrors, setValidationResult);
		} else {
			validateLivePublication({ [key]: value }, errors, setErrors, setValidationResult);
		}
	};

	const handleCatsChange = (values) => {
		const newCats = [];
		for (const cat of values) {
			newCats.push(cat.id);
		}
		setLocalCats(values);
		// setLocalForm({...localForm, categories: newCats})
		if (chosenResearch) {
			validateEditedLivePublication({ categories: newCats }, errors, setErrors, setValidationResult);
		} else {
			validateLivePublication({ categories: newCats }, errors, setErrors, setValidationResult);
		}
	};

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
				validateEditedLivePublication(
					{ categories: formCats },
					errors,
					setErrors,
					setValidationResult,
				);
			} else {
				validateLivePublication({ categories: formCats }, errors, setErrors, setValidationResult);
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

	const onDrop = async (acceptedFiles) => {
		// Do something with the files
		const attachmentsCopy = [...localForm.attachments];
		for (const file of acceptedFiles) {
			const formData = new FormData();
			formData.append('file', file);
			try {
				const res = await axios.post(`${BASE_URL}${END_POINT.FILE}`, formData);
				if (res.status === 200) {
					const newAttachment = {
						file_name: file.name,
						file_type: file.name.slice(file.name.lastIndexOf('.')),
						file_name_system: res.data.file,
					};
					attachmentsCopy.push(newAttachment);
					setLocalForm({ ...localForm, attachments: attachmentsCopy });
				}
			} catch (error) {
				dispatch(actionSnackBar.setSnackBar('error', 'File upload failed', 2000));
			}
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
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'File upload failed', 2000));
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

	const handleEditorChange = (event) => {
		const plaintext = event.getCurrentContent().getPlainText();
		if (plaintext.length < 200) {
			setDescription(plaintext);
		} else {
			setDescription(plaintext.slice(0, 200));
		}
		const content = convertToRaw(event.getCurrentContent());

		setLocalForm({ ...localForm, content: content });

		//if ever typed- lst change will not be null
		if (event.getLastChangeType()) {
			setContentNotOK((prevState) => ({ ...prevState, everTyped: true }));
		}

		if (event.getCurrentContent().hasText()) {
			setContentNotOK((prevState) => ({ ...prevState, isText: true }));
		} else {
			setContentNotOK((prevState) => ({ ...prevState, isText: false }));
		}
	};

	//checking if user ever entered the rich editor field

	const handleEditorOnFocus = () => {
		setContentNotOK((prevState) => ({ ...prevState, focus: true }));
	};

	return (
		<AuthorsNewArticleView
			localForm={localForm}
			handleChange={handleChange}
			errors={errors}
			setErrors={setErrors}
			showEditorError={showEditorError}
			handleEditorChange={handleEditorChange}
			handleEditorOnFocus={handleEditorOnFocus}
			chosenResearch={chosenResearch}
			location={location}
			contentNotOK={contentNotOK}
			onDropCover={onDropCover}
			coverImage={coverImage}
			setCoverImage={setCoverImage}
			coverImageOK={coverImageOK}
			setCoverImageOK={setCoverImageOK}
			localCats={localCats}
			setLocalCats={setLocalCats}
			handleCatsChange={handleCatsChange}
			validationResult={validationResult}
			setValidationResult={setValidationResult}
			localTags={localTags}
			setLocalTags={setLocalTags}
			handleTagsValue={handleTagsValue}
			currentEvent={currentEvent}
			setCurrentEvent={setCurrentEvent}
			validateEvent={validateEvent}
			errorsEvent={errorsEvent}
			setErrorsEvent={setErrorsEvent}
			setValidationResultEvent={setValidationResultEvent}
			ifCurrentEventFilled={ifCurrentEventFilled}
			addEvent={addEvent}
			tableRowsRefs={tableRowsRefs}
			updatePropertyField={updatePropertyField}
			deleteItem={deleteItem}
			onDrop={onDrop}
			sendPublication={sendPublication}
		/>
	);
};

AuthorsNewArticle.displayName = 'AuthorsNewArticle';
AuthorsNewArticle.defaultProps = {};

export default React.memo(AuthorsNewArticle);
