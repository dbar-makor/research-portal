import Dropzone from 'react-dropzone';
import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { useStyles } from '../../styles/AuthorsStyles';
import { ReactComponent as FileUpload } from '../../assets/icons/fileUpload.svg';

function Test() {
	//   const onDrop = (acceptedFiles) => {
	//     console.log(acceptedFiles);
	//   };
	const classes = useStyles();
	const [selectedValue, setSelectedValue] = React.useState('a');

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<div>
			<Dropzone>
				{({ getRootProps, getInputProps }) => (
					<div {...getRootProps()}>
						<input {...getInputProps()} />
						<IconButton className={classes.iconButton} onClick={handleOpen}>
							<FileUpload
								className={selectedValue === 'a' ? classes.arrow2Style : classes.arrowStyle}
							/>
						</IconButton>
					</div>
				)}
			</Dropzone>
		</div>
	);
}

export default Test;
