import { useState, useEffect, useRef } from 'react';
import { Grid, Typography, Button, Divider } from '@material-ui/core';
import { END_POINT, BASE_URL } from '../../utils/constants';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';
import { isValid } from 'date-fns';
import Radio from '@material-ui/core/Radio';
import { selectChosenResearch, changeChosenResearch } from '../../redux/researches/chosenResearchSlice';
import SubHeader from '../Reusables/SubHeader';
import { useStyles, AtricleTitleTextField } from '../../styles/AuthorsStyles';
import { ReactComponent as FileUpload } from '../../assets/icons/fileUpload.svg';
import { ReactComponent as InsertLink } from '../../assets/icons/insertLink.svg';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import {
	DeleteButton,
	StyledTextField,
	AddButton,
	OutlinedButton,
	FilledButton,
} from '../../styles/MainStyles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { ReactComponent as CalendarIcon } from '../../assets/icons/iconCalendar.svg';
import clsx from 'clsx';
import * as actionSnackBar from '../../redux/SnackBar/action';
import {
	validateDeadPublication,
	validateEvent,
	validateEditedDeadPublication,
} from '../Reusables/ValidationFunctions';
import DropZone from '../Reusables/DropZone';
import { useHistory, useLocation } from 'react-router';
import CategoriesAutoComplete from '../Reusables/CategoriesAutoComplete';
import TagsAutoComplete from '../Reusables/TagsAutoComplete';

function DeadArticle() {
	const classes = useStyles();
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
			console.log('chosenResearch', chosenResearch);
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
			console.log('half baked publication', publication);
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
			setHashtagState('');
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
		console.log('pdf', pdf);
		const formData = new FormData();
		formData.append('file', pdf);
		try {
			const res = await axios.post(`${BASE_URL}${END_POINT.FILE}`, formData);
			if (res.status === 200 && res.data.file) {
				console.log('res', res);

				console.log('res.data.file', res.data.file);
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

		console.log('formToSend', formToSend);
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

	return (
		<Grid container justifyContent="center">
			<Grid item xs={10} className={classes.newArticleContainer}>
				<SubHeader title="Upload Research" />
			</Grid>

			<Grid
				item
				xs={12}
				style={{
					backgroundColor: '#fff',
					width: '812px',
					position: 'absolute',
					top: '124px',
					left: '554px',
					alignItems: 'center',
					borderRadius: '8px',
					border: '1px solid #EDEFF3',
					padding: '37px 138px',
				}}
			>
				<Grid container>
					<Grid item xs={12}>
						<Typography
							style={{
								color: '#0F0F0F',
								fontFamily: 'inter',
								fontWeight: 500,
								fontSize: '20px',
								textTransform: 'capitalize',
								marginBottom: '16px',
							}}
						>
							information
						</Typography>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12} style={{ marginBottom: '16px' }}>
						<AtricleTitleTextField
							variant="outlined"
							value={localForm.title}
							onChange={(e) => handleChange(e.target.value, 'title')}
							placeholder="Article Title*"
							error={!!errors.title}
							helperText={errors.title}
							inputProps={{
								style: { fontSize: '16px', fontWeight: 500, color: '#868DA2' },
							}}
						/>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12} style={{ marginBottom: '24px' }}>
						<AtricleTitleTextField
							multiline
							minRows={3}
							maxRows={3}
							className={classes.descriptionStyle}
							variant="outlined"
							value={localForm.description}
							onChange={(e) => handleChange(e.target.value, 'description')}
							placeholder="Description*"
							error={!!errors.description}
							helperText={errors.description}
							inputProps={{
								style: {
									fontSize: '16px',
									fontWeight: 500,
									color: '#868DA2',
									//   height: "92px",
									lineHeight: 1.5,
									overflow: 'auto',
									cursor: 'text',
									padding: 0,
								},
								maxLength: 500,
								// maxHeight: "92px",
							}}
						/>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={3}>
								<Typography
									style={{
										color: '#868DA2',
										fontWeight: 500,
										fontFamily: 'inter',
									}}
								>
									Cover Image
								</Typography>
							</Grid>
							<Grid item xs={9} style={{ marginBottom: 10 }}>
								<DropZone
									className={classes.dropZone}
									onDrop={onDropCover}
									uploadedImage={coverImage}
									setUploadedImage={setCoverImage}
									purpose="cover image*"
									fileOK={coverImageOK}
									setFileOK={setCoverImageOK}
								/>
								{!coverImageOK.initial && (
									<Typography variant="caption" className={classes.customError}>
										This field is required
									</Typography>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Grid container>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={6} style={{ paddingRight: 10 }}>
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

							<Grid item xs={6} style={{ paddingLeft: 10 }}>
								<TagsAutoComplete
									// className={classes.tagsInputContainerRow}
									formObject={localTags}
									setFormObject={setLocalTags}
									handler={handleTagsValue}
									// chipClassName={classes.chip}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12} style={{ paddingTop: '25px' }}>
						<Divider className={classes.divider} />
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12}>
						<Typography
							style={{
								color: '#0F0F0F',
								fontFamily: 'inter',
								fontWeight: 500,
								fontSize: '20px',
								textTransform: 'capitalize',
								marginTop: '16px',
							}}
						>
							Add Events
						</Typography>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container className={`${classes.marginTop15} ${classes.eventsScrolledContainer}`}>
						<Grid item xs={12}>
							<Grid
								container
								className={classes.eventContainer}
								alignItems="center"
								justifyContent="space-between"
							>
								<Grid item xs={6} style={{ paddingRight: 10 }}>
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
										error={!!errorsEvent.title}
										helperText={errorsEvent.title}
										variant="outlined"
										placeholder="Title"
										className={classes.textField}
										inputProps={{
											maxLength: 50,
										}}
									/>
								</Grid>
								<Grid item xs={5} style={{ paddingLeft: 10 }}>
									<KeyboardDatePicker
										autoOk
										orientation="portrait"
										disableToolbar
										variant="inline"
										inputVariant="outlined"
										format={'dd/MM/yyyy'}
										placeholder="Date"
										error={!!errorsEvent.date}
										helperText={errorsEvent.date}
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

								<Grid item xs={1} style={{ textAlignLast: 'right' }}>
									<AddButton
										disableRipple
										disabled={!ifCurrentEventFilled}
										onClick={addEvent}
									>
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
										<Grid item xs={6} style={{ paddingRight: 10 }}>
											<StyledTextField
												onChange={(e) =>
													updatePropertyField(
														index,
														e.target.value,
														'title',
														'events',
													)
												}
												value={event.title}
												variant="outlined"
												placeholder="Title"
												className={classes.textField}
												inputProps={{
													maxLength: 50,
												}}
											/>
										</Grid>
										<Grid item xs={5} style={{ paddingLeft: 10 }}>
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
												onChange={(date) =>
													updatePropertyField(index, date, 'date', 'events')
												}
												style={{ width: '100%', maxHeight: '53px' }}
												PopoverProps={{
													classes: { paper: classes.calendarPaper },
												}}
											/>
										</Grid>
										<Grid item xs={1} style={{ textAlignLast: 'right' }}>
											<DeleteButton
												disableRipple
												onClick={() => deleteItem(index, 'events')}
											>
												<ClearIcon className={classes.clearIcon} />
											</DeleteButton>
										</Grid>
									</Grid>
								))}
						</Grid>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12} style={{ padding: '10px 0 15px 0' }}>
						<Divider className={classes.divider} />
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12}>
						<Grid container>
							<>
								<Grid
									item
									xs={6}
									style={{
										color: '#868DA2',
										fontSize: '20px',
										fontFamily: 'inter',
										paddingRight: 10,
									}}
								>
									<Radio
										checked={selectedValue === 'pdf'}
										onChange={handleChangeRadio}
										value="pdf"
										color="default"
										// style={{
										//   color: selectedValue === "a" ? "#1C67FF" : "#868DA2",
										// }}
										className={
											selectedValue === 'pdf'
												? classes.radioStyle
												: classes.disabledRadio
										}
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'pdf' }}
									/>
									Upload PDF
									<AtricleTitleTextField
										variant="outlined"
										style={{ marginBottom: '16px', marginTop: 5 }}
										value={localForm.title_pdf || ''}
										onChange={(e) => handleChange(e.target.value, 'title_pdf')}
										placeholder="Title"
										disabled={selectedValue === 'video'}
										error={!!errors.title_pdf}
										helperText={errors.title_pdf}
										// className={selectedValue === "video" ? "notselected" : ""}
										inputProps={{
											helpertextcolor: selectedValue === 'video' ? 'grey' : 'red',
											style: {
												fontSize: '16px',
												fontWeight: 500,
												color: '#0F0F0F',
											},
										}}
									/>
									<input
										type="file"
										accept=".pdf"
										style={{ marginBottom: '48px', display: 'none' }}
										disabled={selectedValue === 'video'}
										onChange={onPDFUpload}
										placeholder="Upload PDF"
										id="raised-button-file"
									/>
									<label htmlFor="raised-button-file">
										<Button
											variant="outlined"
											component="span"
											className={classes.pdfbtn}
										>
											{localForm.file_pdf ? (
												<>
													{shortify(localForm.file_pdf)}
													<DeleteButton
														disableRipple
														onClick={() => {
															setLocalForm(() => ({
																...localForm,
																title_pdf: '',
																file_pdf: '',
															}));
															if (chosenResearch) {
																validateEditedDeadPublication(
																	{ file_pdf: localForm.title_pdf },
																	errors,
																	setErrors,
																	setValidationResult,
																	selectedValue,
																);
															} else {
																validateDeadPublication(
																	{ file_pdf: localForm.title_pdf },
																	errors,
																	setErrors,
																	setValidationResult,
																	selectedValue,
																);
															}
														}}
													>
														<ClearIcon className={classes.clearIcon} />
													</DeleteButton>
												</>
											) : (
												<>
													Upload PDF
													<FileUpload
														className={
															selectedValue === 'pdf'
																? classes.arrow2Style
																: classes.arrowStyle
														}
													/>
												</>
											)}
										</Button>
										{!!errors.file_pdf && (
											<Typography
												variant="caption"
												className={classes.customError}
												style={selectedValue === 'video' ? { color: '#868DA2' } : {}}
											>
												{errors.file_pdf}
											</Typography>
										)}
									</label>
								</Grid>

								<Grid
									item
									xs={6}
									style={{
										color: '#868DA2',
										fontSize: '20px',
										fontFamily: 'inter',
										paddingLeft: 10,
									}}
								>
									<Radio
										checked={selectedValue === 'video'}
										onChange={handleChangeRadio}
										value="video"
										name="radio-button-demo"
										color="default"
										className={
											selectedValue === 'video'
												? classes.radioStyle
												: classes.disabledRadio
										}
										inputProps={{ 'aria-label': 'B' }}
									/>
									Video Link
									<AtricleTitleTextField
										variant="outlined"
										disabled={selectedValue === 'pdf'}
										style={{
											marginBottom: '16px',
											marginTop: 5,
										}}
										value={localForm.title_video}
										error={!!errors.title_video}
										helperText={errors.title_video}
										onChange={(e) => handleChange(e.target.value, 'title_video')}
										placeholder="Title"
										inputProps={{
											style: {
												fontSize: '16px',
												fontWeight: 400,
												color: '#0F0F0F',
											},
										}}
									/>
									<AtricleTitleTextField
										variant="outlined"
										disabled={selectedValue === 'pdf'}
										style={{ marginBottom: '76px' }}
										value={localForm.link_video}
										onChange={(e) => handleChange(e.target.value, 'link_video')}
										error={!!errors.link_video}
										helperText={errors.link_video}
										placeholder="Insert Link"
										InputProps={{
											startAdornment: (
												<InsertLink
													className={
														selectedValue === 'video'
															? classes.linkStyle
															: classes.link2Style
													}
												/>
											),
										}}
										inputProps={{
											style: {
												fontSize: '16px',
												fontWeight: 400,
												color: '#0F0F0F',
											},
										}}
									/>
								</Grid>
							</>
						</Grid>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={3}>
								<Button onClick={handleCancle} className={classes.cancelStyle}>
									cancel
								</Button>
							</Grid>
							<Grid item xs={3}>
								{((chosenResearch && chosenResearch.status === 'draft') ||
									!chosenResearch) && (
									<OutlinedButton
										className={classes.saveDraft}
										onClick={() => sendPublication('save-draft')}
									>
										Save Draft
									</OutlinedButton>
								)}
							</Grid>
							<Grid item xs={3}>
								<OutlinedButton
									className={classes.saveDraft}
									onClick={() => sendPublication('preview')}
								>
									Preview
								</OutlinedButton>
							</Grid>
							<Grid item xs={3}>
								<FilledButton
									disabled={
										!validationResult || !validationResultEvent || !coverImageOK.final
									}
									onClick={() => sendPublication('done')}
									className={classes.publishStyle}
								>
									Publish
								</FilledButton>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default DeadArticle;

// InputProps={{
//   endAdornment: (
//     <>
//       <div>
//         {!pdfUpload.file_name ? (
//           <></>
//         ) : selectedValue === "a" ? (
//           <DeleteButton
//             disableRipple
//             onClick={() => setPdfUpload({})}
//           >
//             <ClearIcon className={classes.clearIcon} />
//           </DeleteButton>
//         ) : (
//           <DisabledButton
//             disableRipple
//             onClick={() => setPdfUpload({})}
//           >
//             <ClearIcon className={classes.clearIcon} />
//           </DisabledButton>
//         )}
//       </div>
//       {selectedValue === "a" ? (
//         // <div {...getRootCoverProps()}>
//         <div >
//           {/* <input {...getInputCoverProps()} /> */}
//           <input  />
//           <IconButton
//             className={classes.iconButton}
//             onClick={handleOpen}
//           >
//             <FileUpload
//               className={
//                 selectedValue === "a"
//                   ? classes.arrow2Style
//                   : classes.arrowStyle
//               }
//             />
//           </IconButton>
//         </div>
//       ) : (
//         <FileUpload
//           className={
//             selectedValue === "a"
//               ? classes.arrow2Style
//               : classes.arrowStyle
//           }
//         />
//       )}
//       {/* <Test /> */}
//     </>
//   ),
// }}
// inputProps={{
//   style: {
//     fontSize: "16px",
//     fontWeight: 500,
//     color: "#0F0F0F",
//   },
// }}
