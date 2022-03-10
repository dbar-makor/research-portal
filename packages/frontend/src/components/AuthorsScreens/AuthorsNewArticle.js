import React, { useState, useEffect, useRef } from 'react';
import {
	Grid,
	Typography,
	TextField,
	Button,
	IconButton,
	Chip,
	withStyles,
	Divider,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useStyles, AtricleTitleTextField, CustomTextField } from '../../styles/AuthorsStyles';
import MUIRichTextEditor from 'mui-rte';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import AddIcon from '@material-ui/icons/Add';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { END_POINT, BASE_URL } from '../../utils/constants';
import clsx from 'clsx';
import { convertToRaw, convertFromRaw } from 'draft-js';
import ClearIcon from '@material-ui/icons/Clear';

import axios from 'axios';
import * as researchAction from '../../redux/researches/researchesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isValid } from 'date-fns';
import { ReactComponent as CalendarIcon } from '../../assets/icons/iconCalendar.svg';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import CircularProgress from '@material-ui/core/CircularProgress';
import SubHeader from '../Reusables/SubHeader';
import {
	StyledTextField,
	StyledAutoComplete,
	OutlinedButton,
	FilledButton,
	AddButton,
	DeleteButton,
} from '../../styles/MainStyles';
import { selectChosenResearch, changeChosenResearch } from '../../redux/researches/chosenResearchSlice';
import { useHistory, useLocation } from 'react-router';
import * as actionSnackBar from '../../redux/SnackBar/action';
import {
	validateLivePublication,
	validateEvent,
	validateEditedLivePublication,
} from '../Reusables/validationFunctions';
import DropZone from '../Reusables/DropZone';
import DropZoneMulti from '../Reusables/DropZoneMulti';
import CategoriesAutoComplete from '../Reusables/CategoriesAutoComplete';
import TagsAutoComplete from '../Reusables/TagsAutoComplete';
import * as utilsAction from '../../redux/utils/utilsSlice';

function AuthorsNewArticle() {
	const classes = useStyles();
	const chosenResearch = useSelector(selectChosenResearch);

	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	// const categoriesArr = useSelector(state => state.utils.utils.category);
	// const tagsArr = useSelector(state => state.utils.utils.tag);
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
	// //shadow form keeps full record(local fom is for the server, some info is trimmed(e.g sending only category ids))
	// const [fullShadowForm, setFullShadowForm] = useState(initState);

	// const [hashtagState, setHashtagState] = useState("");
	const [localTags, setLocalTags] = useState([]);
	const [scrollLocation, setScrollLocation] = useState('bottom');
	const tableRowsRefs = useRef([]);

	//states for validations
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

	// useEffect(() => {
	//   if(!categoriesArr){
	//     dispatch(utilsAction.getUtilsAsync());
	//   }

	// }, []);

	//For editing
	useEffect(() => {
		if (chosenResearch) {
<<<<<<< HEAD
			console.log('there\'s a chosenResearch');
			const coverImg = chosenResearch.attachments.find((attachment) => attachment.file_type === 'main_bg');
=======
			console.log("there's a chosenResearch");
			const coverImg = chosenResearch.attachments.find(
				(attachment) => attachment.file_type === 'main_bg',
			);
>>>>>>> 5b020432a068e31cceeef2679c924d1dbd8c26eb
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
<<<<<<< HEAD
			const coverImg = publication.attachments?.find((attachment) => attachment.file_type === 'main_bg');
			const otherFiles = publication.attachments?.filter((attachment) => attachment.file_type !== 'main_bg');
=======
			const coverImg = publication.attachments?.find(
				(attachment) => attachment.file_type === 'main_bg',
			);
			const otherFiles = publication.attachments?.filter(
				(attachment) => attachment.file_type !== 'main_bg',
			);
>>>>>>> 5b020432a068e31cceeef2679c924d1dbd8c26eb
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

	//log validation status
	// !validationResult || !validationResultEvent || !coverImageOK.final || !contentNotOK.isText
	console.log('validationResult', validationResult);
	console.log('validationResultEvent', validationResultEvent);
	console.log('coverImageOK.final', coverImageOK.final);
	console.log('contentNotOK.isText', contentNotOK.isText);

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
				content: typeof formToSend.content === 'string' ? JSON.parse(formToSend.content) : formToSend.content,
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
				content: typeof formToSend.content === 'string' ? JSON.parse(formToSend.content) : formToSend.content,
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
				validateEditedLivePublication({ categories: formCats }, errors, setErrors, setValidationResult);
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

	const handleEditorOnFocus = (event) => {
		setContentNotOK((prevState) => ({ ...prevState, focus: true }));
	};

	return (
		<Grid container justifyContent="center">
			<Grid item xs={10}>
				<Grid container className={classes.newArticleContainer}>
					<SubHeader title="Write New Article" />
					<Grid item xs={6}>
						<Grid container>
							<Grid item xs={12}>
								<Grid container justifyContent="space-between" alignItems="flex-end"></Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container justifyContent="space-between" alignItems="flex-end">
									<Grid item xs={12}>
										<Grid container className={classes.marginBottom25} justifyContent="space-between">
											<Grid item xs={12}>
												<AtricleTitleTextField
													variant="outlined"
													value={localForm.title}
													onChange={(e) => handleChange(e.target.value, 'title')}
													style={{ width: '100%' }}
													placeholder="Article Title*"
													error={!!errors.title}
													helperText={errors.title}
													inputProps={{
														style: { fontSize: '32px', fontWeight: 600 },
														maxLength: 50,
													}}
												/>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container>
									<Grid item xs={12}>
										<MUIRichTextEditor
											className={
												showEditorError
													? `${classes.muiEditor} ${classes.editorError}`
													: `${classes.muiEditor}`
											}
											// style={showEditorError ? {border: "2px solid red"} : {}}
											inlineToolbar
											label="Enter article body*..."
											onChange={handleEditorChange}
											onFocus={handleEditorOnFocus}
											//shows error if field was ever focused, something was already typed and there is no content
											// error={contentNotOK.focus &&  contentNotOK.everTyped && !contentNotOK.isText }

											{...(chosenResearch &&
												Object.keys(chosenResearch.content).length && {
													defaultValue:
														typeof chosenResearch.content !== 'string'
															? JSON.stringify(chosenResearch.content)
															: chosenResearch.content,
												})}
											{...(location.state?.from === 'prearticle' &&
												Object.keys(location.state?.publication.content).length && {
													defaultValue:
<<<<<<< HEAD
														typeof location.state?.publication.content !== 'string'
															? JSON.stringify(location.state?.publication.content)
=======
														typeof location.state?.publication.content !==
														'string'
															? JSON.stringify(
																	location.state?.publication.content,
															  )
>>>>>>> 5b020432a068e31cceeef2679c924d1dbd8c26eb
															: location.state.publication.content,
												})}
											controls={[
												'bold',
												'italic',
												'underline',
												'strikethrough',
												'highlight',
												'link',
												'numberList',
												'bulletList',
												'quote',
												// "upload-image"
											]}
											customControls={[
												{
													name: 'upload-image',
													icon: <InsertPhotoIcon />,
													type: 'callback',
												},
											]}
										/>
									</Grid>
									{contentNotOK.focus && contentNotOK.everTyped && !contentNotOK.isText && (
										<Grid item xs={6} style={{ color: 'red', marginLeft: 8 }}>
											This field is required
										</Grid>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={4}>
						<Grid container className={classes.newArticleRightContainer}>
							<Grid item xs={12}>
								<Grid container>
									<Grid item xs={3}>
										<Typography className={classes.subHeaderRight}>Information</Typography>
									</Grid>
									<Grid item xs={9}>
										<DropZone
											className={classes.dropZone}
											fileTypes=".png, .jpg, .svg, .jfif, .webp"
											onDrop={onDropCover}
											uploadedImage={coverImage}
											setUploadedImage={setCoverImage}
											purpose="cover image*"
											fileOK={coverImageOK}
											setFileOK={setCoverImageOK}
											//  error={errors.coverImage}
										/>
										{!coverImageOK.initial && (
											<Typography variant="caption" className={classes.customError}>
												This field is required
											</Typography>
										)}
										<Grid container>
											<CategoriesAutoComplete
												formObject={localCats}
												setFormObject={setLocalCats}
												handler={handleCatsChange}
												error={errors.categories}
												errors={errors}
												setErrors={setErrors}
												validationResult={validationResult}
												setValidationResult={setValidationResult}
											/>
										</Grid>
										<TagsAutoComplete
											className={classes.tagsInputContainer}
											formObject={localTags}
											setFormObject={setLocalTags}
											handler={handleTagsValue}
											// chipClassName={classes.chip}
										/>
									</Grid>
								</Grid>
							</Grid>

							<Divider className={classes.divider} />
							<Grid item xs={12}>
								<Grid container className={`${classes.marginTop15} ${classes.eventsScrolledContainer}`}>
									<Grid item xs={3}>
										<Typography className={classes.subHeaderRight}>Events</Typography>
									</Grid>
									<Grid item xs={9}>
										<Grid
											container
											className={classes.eventContainer}
											alignItems="center"
											justifyContent="space-between"
										>
											<Grid item xs={5}>
												<StyledTextField
													onChange={(e) => {
														setCurrentEvent({
															...currentEvent,
															title: e.target.value,
														});
														validateEvent(
															{ title: e.target.value },
															errorsEvent,
															setErrorsEvent,
															setValidationResultEvent,
														);
													}}
													value={currentEvent.title}
													variant="outlined"
													placeholder="Title"
													className={classes.textField}
													inputProps={{
														maxLength: 50,
													}}
												/>
											</Grid>
											<Grid item xs={5}>
												<KeyboardDatePicker
													autoOk
													orientation="portrait"
													disableToolbar
													variant="inline"
													inputVariant="outlined"
													format={'dd/MM/yyyy'}
													placeholder="Date"
													value={currentEvent.date}
													className={classes.eventDatePicker}
													InputAdornmentProps={{ position: 'end' }}
													keyboardIcon={<CalendarIcon className={classes.calendarIcon} />}
													onChange={(date) => {
														setCurrentEvent({ ...currentEvent, date: date });
														validateEvent(
															{ date: date },
															errorsEvent,
															setErrorsEvent,
															setValidationResultEvent,
														);
													}}
													PopoverProps={{
														classes: { paper: classes.calendarPaper },
													}}
												/>
											</Grid>

											<Grid item xs={1}>
												<AddButton disableRipple disabled={!ifCurrentEventFilled} onClick={addEvent}>
													<AddIcon
														className={clsx(classes.addIcon, {
															[classes.addIconDisabled]: !ifCurrentEventFilled,
														})}
													/>
												</AddButton>
											</Grid>
										</Grid>
										{localForm &&
											localForm.events &&
											localForm.events.map((event, index) => (
												<Grid
													container
													className={classes.eventContainer}
													alignItems="center"
													justifyContent="space-between"
													key={index}
													ref={(el) => (tableRowsRefs.current[index] = el)}
												>
													<Grid item xs={5}>
														<StyledTextField
															onChange={(e) => updatePropertyField(index, e.target.value, 'title', 'events')}
															value={event.title}
															variant="outlined"
															placeholder="Title"
															className={classes.textField}
															inputProps={{
																maxLength: 50,
															}}
														/>
													</Grid>
													<Grid item xs={5}>
														<KeyboardDatePicker
															autoOk
															orientation="portrait"
															disableToolbar
															variant="inline"
															inputVariant="outlined"
															format={'dd/MM/yyyy'}
															placeholder="Date"
															value={event.date}
															className={classes.eventDatePicker}
															InputAdornmentProps={{ position: 'end' }}
															keyboardIcon={
																localForm.events[index].date ? null : (
																	<CalendarIcon className={classes.calendarIcon} />
																)
															}
															onChange={(date) => updatePropertyField(index, date, 'date', 'events')}
															style={{ width: '100%', maxHeight: '53px' }}
															PopoverProps={{
																classes: { paper: classes.calendarPaper },
															}}
														/>
													</Grid>
													<Grid item xs={1}>
														<DeleteButton disableRipple onClick={() => deleteItem(index, 'events')}>
															<ClearIcon className={classes.clearIcon} />
														</DeleteButton>
													</Grid>
												</Grid>
											))}
									</Grid>
								</Grid>
							</Grid>

							<Divider className={classes.divider} />

							<Grid item xs={12}>
								<Grid container className={classes.marginTop15}>
									<Grid item xs={3}>
										<Typography className={classes.subHeaderRight}>Attachments</Typography>
									</Grid>
									<Grid item xs={9}>
										<DropZoneMulti
											className={classes.uploadAttachment}
											fileTypes=".jpg, .png, .svg, .doc, .docx, .pdf"
											onDrop={onDrop}
											purpose="your files"
											localForm={localForm}
											deleteItem={deleteItem}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid container justifyContent="space-between" className={classes.buttonsContainer}>
								{((chosenResearch && chosenResearch.status === 'draft') || !chosenResearch) && (
									<OutlinedButton onClick={() => sendPublication('save-draft')}>Save Draft</OutlinedButton>
								)}
								<OutlinedButton onClick={() => sendPublication('preview')}>Preview</OutlinedButton>
								<FilledButton
									disabled={
										!validationResult || !validationResultEvent || !coverImageOK.final || !contentNotOK.isText
									}
									onClick={() => sendPublication('done')}
								>
									Done
								</FilledButton>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default AuthorsNewArticle;
