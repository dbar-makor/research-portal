import React, {forwardRef} from 'react';
import { Grid, Typography, Button, Divider } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import Radio from '@material-ui/core/Radio';
import SubHeader from '../../../Reusables/SubHeader';
import { useStyles, AtricleTitleTextField } from '../../../../styles/AuthorsStyles';
import { ReactComponent as FileUpload } from '../../../../assets/icons/fileUpload.svg';
import { ReactComponent as InsertLink } from '../../../../assets/icons/insertLink.svg';
import AddIcon from '@material-ui/icons/Add';
import {
	DeleteButton,
	StyledTextField,
	AddButton,
	OutlinedButton,
	FilledButton,
} from '../../../../styles/MainStyles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { ReactComponent as CalendarIcon } from '../../../../assets/icons/iconCalendar.svg';
import clsx from 'clsx';
import DropZone from '../../../Reusables/DropZone';
import CategoriesAutoComplete from '../../../Reusables/CategoriesAutoComplete';
import TagsAutoComplete from '../../../Reusables/TagsAutoComplete';
import { selectChosenResearch } from '../../../../redux/researches/chosenResearchSlice';
import { useSelector } from 'react-redux';


//import useStyles from './DeadArticle.style';

const DeadArticleView = forwardRef((props,ref) => {

  const chosenResearch = useSelector(selectChosenResearch);

	const classes = useStyles();
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
							value={props.localForm.title}
							onChange={(e) => props.handleChange(e.target.value, 'title')}
							placeholder="Article Title*"
							error={!!props.errors.title}
							helperText={props.errors.title}
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
							value={props.localForm.description}
							onChange={(e) => props.handleChange(e.target.value, 'description')}
							placeholder="Description*"
							error={!!props.errors.description}
							helperText={props.errors.description}
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
									onDrop={props.onDropCover}
									uploadedImage={props.coverImage}
									setUploadedImage={props.setCoverImage}
									purpose="cover image*"
									fileOK={props.coverImageOK}
									setFileOK={props.setCoverImageOK}
								/>
								{!props.coverImageOK.initial && (
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

							<Grid item xs={6} style={{ paddingLeft: 10 }}>
								<TagsAutoComplete
									formObject={props.localTags}
									setFormObject={props.setLocalTags}
									handler={props.handleTagsValue}
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
										error={!!props.errorsEvent.title}
										helperText={props.errorsEvent.title}
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
										error={!!props.errorsEvent.date}
										helperText={props.errorsEvent.date}
										value={props.currentEvent.date}
										className={classes.eventDatePicker}
										InputAdornmentProps={{ position: 'end' }}
										keyboardIcon={<CalendarIcon className={classes.calendarIcon} />}
										onChange={(date) => {
											props.setCurrentEvent({ ...	props.currentEvent, date: date });
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

								<Grid item xs={1} style={{ textAlignLast: 'right' }}>
									<AddButton
										disableRipple
										disabled={!props.ifCurrentEventFilled}
										onClick={props.addEvent}
									>
										<AddIcon
											className={clsx(classes.addIcon, {
												[classes.addIconDisabled]: !props.ifCurrentEventFilled,
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
										ref={(el) => (ref.current[index] = el)}
									>
										<Grid item xs={6} style={{ paddingRight: 10 }}>
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
													props.localForm.events[index].date ? null : (
														<CalendarIcon className={classes.calendarIcon} />
													)
												}
												onChange={(date) =>
                          props.updatePropertyField(index, date, 'date', 'events')
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
												onClick={() => 	props.deleteItem(index, 'events')}
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
										checked={props.selectedValue === 'pdf'}
										onChange={props.handleChangeRadio}
										value="pdf"
										color="default"
										// style={{
										//   color: selectedValue === "a" ? "#1C67FF" : "#868DA2",
										// }}
										className={
											props.selectedValue === 'pdf'
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
										value={props.localForm.title_pdf || ''}
										onChange={(e) => props.handleChange(e.target.value, 'title_pdf')}
										placeholder="Title"
										disabled={props.selectedValue === 'video'}
										error={!!props.errors.title_pdf}
										helperText={props.errors.title_pdf}
										// className={selectedValue === "video" ? "notselected" : ""}
										inputProps={{
											helpertextcolor: props.selectedValue === 'video' ? 'grey' : 'red',
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
										disabled={props.selectedValue === 'video'}
										onChange={props.onPDFUpload}
										placeholder="Upload PDF"
										id="raised-button-file"
									/>
									<label htmlFor="raised-button-file">
										<Button
											variant="outlined"
											component="span"
											className={classes.pdfbtn}
										>
											{props.localForm.file_pdf ? (
												<>
													{props.shortify(props.localForm.file_pdf)}
													<DeleteButton
														disableRipple
														onClick={() => {
															props.setLocalForm(() => ({
																...props.localForm,
																title_pdf: '',
																file_pdf: '',
															}));
															if (chosenResearch) {
																props.validateEditedDeadPublication(
																	{ file_pdf: props.localForm.title_pdf },
																	props.errors,
																	props.setErrors,
																	props.setValidationResult,
																	props.selectedValue,
																);
															} else {
																props.validateDeadPublication(
																	{ file_pdf: props.localForm.title_pdf },
                                  props.errors,
                                  props.setErrors,
                                  props.setValidationResult,
                                  props.selectedValue,
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
                              props.selectedValue === 'pdf'
																? classes.arrow2Style
																: classes.arrowStyle
														}
													/>
												</>
											)}
										</Button>
										{!!	props.errors.file_pdf && (
											<Typography
												variant="caption"
												className={classes.customError}
												style={props.selectedValue === 'video' ? { color: '#868DA2' } : {}}
											>
												{	props.errors.file_pdf}
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
										checked={props.selectedValue === 'video'}
										onChange={props.handleChangeRadio}
										value="video"
										name="radio-button-demo"
										color="default"
										className={
                      props.selectedValue === 'video'
												? classes.radioStyle
												: classes.disabledRadio
										}
										inputProps={{ 'aria-label': 'B' }}
									/>
									Video Link
									<AtricleTitleTextField
										variant="outlined"
										disabled={props.selectedValue === 'pdf'}
										style={{
											marginBottom: '16px',
											marginTop: 5,
										}}
										value={props.localForm.title_video}
										error={!!props.errors.title_video}
										helperText={props.errors.title_video}
										onChange={(e) => props.handleChange(e.target.value, 'title_video')}
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
										disabled={props.selectedValue === 'pdf'}
										style={{ marginBottom: '76px' }}
										value={props.localForm.link_video}
										onChange={(e) => props.handleChange(e.target.value, 'link_video')}
										error={!!props.errors.link_video}
										helperText={props.errors.link_video}
										placeholder="Insert Link"
										InputProps={{
											startAdornment: (
												<InsertLink
													className={
														props.selectedValue === 'video'
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
								<Button onClick={props.handleCancle} className={classes.cancelStyle}>
									cancel
								</Button>
							</Grid>
							<Grid item xs={3}>
								{((chosenResearch && chosenResearch.status === 'draft') ||
									!chosenResearch) && (
									<OutlinedButton
										className={classes.saveDraft}
										onClick={() => props.sendPublication('save-draft')}
									>
										Save Draft
									</OutlinedButton>
								)}
							</Grid>
							<Grid item xs={3}>
								<OutlinedButton
									className={classes.saveDraft}
									onClick={() => props.sendPublication('preview')}
								>
									Preview
								</OutlinedButton>
							</Grid>
							<Grid item xs={3}>
								<FilledButton
									disabled={
										!props.validationResult || !props.validationResultEvent || !props.coverImageOK.final
									}
									onClick={() => props.sendPublication('done')}
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
});

DeadArticleView.displayName = 'DeadArticleView';
DeadArticleView.defaultProps = {};

export default React.memo(DeadArticleView);
