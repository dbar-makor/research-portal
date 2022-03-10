import React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import { useStyles } from '../../styles/AuthorsStyles';
import { DeleteButton } from '../../styles/MainStyles';
import ClearIcon from '@material-ui/icons/Clear';
import { useDropzone } from 'react-dropzone';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { ReactComponent as AttachmentIcon } from '../../assets/icons/iconDocument.svg';

function DropZoneMulti(props) {
	const classes = useStyles();
	const { onDrop, purpose = 'your attachments', setFileOK, fileTypes, localForm, deleteItem } = props;
	const {
		getRootProps: getRootProps,
		getInputProps: getInputProps,
		isDragActive: isDragActive,
	} = useDropzone({ onDrop, accept: fileTypes });

	return (
		<>
			<Grid
				container
				className={classes.uploadAttachment}
				{...getRootProps()}
				// alignItems='center'
			>
				<input {...getInputProps()} />
				<Grid item xs={12}>
					<Grid container justifyContent="center">
						<AttachmentIcon className={classes.attachIcon} />
					</Grid>
				</Grid>
				<Grid item xs={12}>
					{isDragActive ? (
						<Typography style={{ textAlign: 'center' }}>Drop the file(s) here ...</Typography>
					) : (
						<Grid container justifyContent="center">
							<Typography className={classes.uploadText}>Drag and drop or&nbsp;</Typography>
							<Typography className={classes.uploadLink}>browse</Typography>
							<Typography className={classes.uploadText}>&nbsp; your files</Typography>
							<Typography style={{ textAlign: 'center' }} className={classes.onlyPng}>
								{fileTypes}
							</Typography>
						</Grid>
					)}
				</Grid>
			</Grid>

			<Grid container className={classes.attachmentsScrolledContainer}>
				<Grid item xs={12}>
					{localForm.attachments && localForm.attachments.length
						? localForm.attachments.map((file, index) => (
							<Grid
								container
								alignItems="center"
								justifyContent="space-between"
								className={classes.attachmentLine}
								key={index}
							>
								<Grid item xs={8}>
									<Typography>
										{file.file_name.length > 20
											? `${file.file_name.slice(0, 20)}...`
											: file.file_name}
									</Typography>
								</Grid>
								<Grid item xs={1}>
									<DeleteButton
										disableRipple
										onClick={() => deleteItem(index, 'attachments')}
									>
										<ClearIcon className={classes.clearIcon} />
									</DeleteButton>
								</Grid>
							</Grid>
						  ))
						: null}
				</Grid>
			</Grid>
		</>
	);
}

export default DropZoneMulti;
