import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { useStyles, AtricleTitleTextField } from '../../../../styles/AuthorsStyles';
import MUIRichTextEditor from 'mui-rte';
import AddIcon from '@material-ui/icons/Add';
import { KeyboardDatePicker } from '@material-ui/pickers';
import ClearIcon from '@material-ui/icons/Clear';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import SubHeader from '../../../Reusables/SubHeader';
import {
	StyledTextField,
	OutlinedButton,
	FilledButton,
	AddButton,
	DeleteButton,
} from '../../../../styles/MainStyles';
import DropZone from '../../../Reusables/DropZone';
import DropZoneMulti from '../../../Reusables/DropZoneMulti';
import CategoriesAutoComplete from '../../../Reusables/CategoriesAutoComplete';
import TagsAutoComplete from '../../../Reusables/TagsAutoComplete';
import { ReactComponent as CalendarIcon } from '../../../../assets/icons/iconCalendar.svg';
import clsx from 'clsx';

const AuthorsNewArticleView = (props) => {
	const classes = useStyles;
	return (
		<Grid container justifyContent="center" style={{ paddingTop: 20 }}>
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
										<Grid
											container
											className={classes.marginBottom25}
											justifyContent="space-between"
										>
											<Grid item xs={12}>
												<AtricleTitleTextField
													variant="outlined"
													value={props.localForm.title}
													onChange={(e) =>
														props.handleChange(e.target.value, 'title')
													}
													style={{ width: '100%' }}
													placeholder="Article Title*"
													error={!!props.errors.title}
													helperText={props.errors.title}
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
												props.showEditorError
													? `${classes.muiEditor} ${classes.editorError}`
													: `${classes.muiEditor}`
											}
											// style={showEditorError ? {border: "2px solid red"} : {}}
											inlineToolbar
											label="Enter article body*..."
											onChange={props.handleEditorChange}
											onFocus={props.handleEditorOnFocus}
											//shows error if field was ever focused, something was already typed and there is no content
											// error={contentNotOK.focus &&  contentNotOK.everTyped && !contentNotOK.isText }

											{...(props.chosenResearch &&
												Object.keys(props.chosenResearch.content).length && {
													defaultValue:
														typeof props.chosenResearch.content !== 'string'
															? JSON.stringify(props.chosenResearch.content)
															: props.chosenResearch.content,
												})}
											{...(props.location.state?.from === 'prearticle' &&
												Object.keys(props.location.state?.publication.content)
													.length && {
													defaultValue:
														typeof props.location.state?.publication.content !==
														'string'
															? JSON.stringify(
																	props.location.state?.publication.content,
															  )
															: props.location.state.publication.content,
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
									{props.contentNotOK.focus &&
										props.contentNotOK.everTyped &&
										!props.contentNotOK.isText && (
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
										<Typography className={classes.subHeaderRight}>
											Information
										</Typography>
									</Grid>
									<Grid item xs={9}>
										<DropZone
											className={classes.dropZone}
											fileTypes=".png, .jpg, .svg, .jfif, .webp"
											onDrop={props.onDropCover}
											uploadedImage={props.coverImage}
											setUploadedImage={props.setCoverImage}
											purpose="cover image*"
											fileOK={props.coverImageOK}
											setFileOK={props.setCoverImageOK}
											//  error={errors.coverImage}
										/>
										{!props.coverImageOK.initial && (
											<Typography variant="caption" className={classes.customError}>
												This field is required
											</Typography>
										)}
										<Grid container>
											<CategoriesAutoComplete
												formObject={props.localCats}
												setFormObject={props.setLocalCats}
												handler={props.handleCatsChange}
												error={props.errors.categories}
												errors={props.errors}
												setErrors={props.setErrors}
												validationResult={props.validationResult}
												setValidationResult={props.setValidationResult}
											/>
										</Grid>
										<TagsAutoComplete
											className={classes.tagsInputContainer}
											formObject={props.localTags}
											setFormObject={props.setLocalTags}
											handler={props.handleTagsValue}
											// chipClassName={classes.chip}
										/>
									</Grid>
								</Grid>
							</Grid>

							<Divider className={classes.divider} />
							<Grid item xs={12}>
								<Grid
									container
									className={`${classes.marginTop15} ${classes.eventsScrolledContainer}`}
								>
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
														props.setCurrentEvent({
															...props.currentEvent,
															title: e.target.value,
														});
														props.validateEvent(
															{ title: e.target.value },
															props.errorsEvent,
															props.setErrorsEvent,
															props.setValidationResultEvent,
														);
													}}
													value={props.currentEvent.title}
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
													value={props.currentEvent.date}
													className={classes.eventDatePicker}
													InputAdornmentProps={{ position: 'end' }}
													keyboardIcon={
														<CalendarIcon className={classes.calendarIcon} />
													}
													onChange={(date) => {
														props.setCurrentEvent({
															...props.currentEvent,
															date: date,
														});
														props.validateEvent(
															{ date: date },
															props.errorsEvent,
															props.setErrorsEvent,
															props.setValidationResultEvent,
														);
													}}
													PopoverProps={{
														classes: { paper: classes.calendarPaper },
													}}
												/>
											</Grid>

											<Grid item xs={1}>
												<AddButton
													disableRipple
													disabled={!props.ifCurrentEventFilled}
													onClick={props.addEvent}
												>
													<AddIcon
														className={clsx(classes.addIcon, {
															[classes.addIconDisabled]:
																!props.ifCurrentEventFilled,
														})}
													/>
												</AddButton>
											</Grid>
										</Grid>
										{props.localForm &&
											props.localForm.events &&
											props.localForm.events.map((event, index) => (
												<Grid
													container
													className={classes.eventContainer}
													alignItems="center"
													justifyContent="space-between"
													key={index}
													ref={(el) => (props.tableRowsRefs.current[index] = el)}
												>
													<Grid item xs={5}>
														<StyledTextField
															onChange={(e) =>
																props.updatePropertyField(
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
																props.localForm.events[index].date ? null : (
																	<CalendarIcon
																		className={classes.calendarIcon}
																	/>
																)
															}
															onChange={(date) =>
																props.updatePropertyField(
																	index,
																	date,
																	'date',
																	'events',
																)
															}
															style={{ width: '100%', maxHeight: '53px' }}
															PopoverProps={{
																classes: { paper: classes.calendarPaper },
															}}
														/>
													</Grid>
													<Grid item xs={1}>
														<DeleteButton
															disableRipple
															onClick={() => props.deleteItem(index, 'events')}
														>
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
										<Typography className={classes.subHeaderRight}>
											Attachments
										</Typography>
									</Grid>
									<Grid item xs={9}>
										<DropZoneMulti
											className={classes.uploadAttachment}
											fileTypes=".jpg, .png, .svg, .doc, .docx, .pdf"
											onDrop={props.onDrop}
											purpose="your files"
											localForm={props.localForm}
											deleteItem={props.deleteItem}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid
								container
								justifyContent="space-between"
								className={classes.buttonsContainer}
							>
								{((props.chosenResearch && props.chosenResearch.status === 'draft') ||
									!props.chosenResearch) && (
									<OutlinedButton onClick={() => props.sendPublication('save-draft')}>
										Save Draft
									</OutlinedButton>
								)}
								<OutlinedButton onClick={() => props.sendPublication('preview')}>
									Preview
								</OutlinedButton>
								<FilledButton
									disabled={
										!props.validationResult ||
										!props.validationResultEvent ||
										!props.coverImageOK.final ||
										!props.contentNotOK.isText
									}
									onClick={() => props.sendPublication('done')}
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
};

AuthorsNewArticleView.displayName = 'AuthorsNewArticleView';
AuthorsNewArticleView.defaultProps = {};

export default React.memo(AuthorsNewArticleView);
