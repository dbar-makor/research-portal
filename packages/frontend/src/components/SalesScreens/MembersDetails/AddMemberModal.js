import { useState } from 'react';
import { Dialog, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/InfoStyles';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import { FilledButton } from '../../../styles/MainStyles';
import TextInputUnit from '../../Reusables/TextInputUnit';
import CategoriesAutoComplete from '../../Reusables/CategoriesAutoComplete';
import { validateMember } from '../../Reusables/ValidationFunctions';

function AddMemberModal(props) {
	const { open, handleClose, companyName, addMember, newMember, setNewMember } = props;
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState(false);

	const classes = useStyles();

	const handleCatsChange = (values) => {
		const newCats = [];
		for (const cat of values) {
			newCats.push(cat);
		}
		setNewMember({ ...newMember, categories: newCats });
		validateMember({ categories: newCats }, errors, setErrors, setValidationResult);
	};

	const updateMemberField = (e) => {
		console.log('e, fieldIndicator', e);
		const value = e.target.value;
		const name = e.target.name;
		setNewMember({ ...newMember, [name]: value });

		validateMember({ [name]: value }, errors, setErrors, setValidationResult);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			classes={{ paper: classes.addMemberModalPaper }}
			BackdropProps={{
				classes: {
					root: classes.modalBackDrop,
				},
			}}
		>
			<Grid container justifyContent="center">
				<Grid item xs={12}>
					<Grid container justifyContent="flex-end">
						<CloseIcon onClick={handleClose} className={classes.closeIcon} />
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.addMember}>Add Member</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.addTo}>{`To: ${companyName}`}</Typography>
				</Grid>
				<Grid item xs={10}>
					<Grid container spacing={2}>
						<Grid item xs={6} className={classes.fieldWrapper}>
							<TextInputUnit
								className={classes.textFieldStyle}
								name="member_name"
								label="Full Name"
								value={newMember.member_name}
								onChange={updateMemberField}
								error={errors.member_name}
							/>
						</Grid>
						<Grid item xs={6} className={classes.fieldWrapper}>
							<TextInputUnit
								className={classes.textFieldStyle}
								name="username"
								label="Username"
								value={newMember.username}
								onChange={updateMemberField}
								error={errors.username}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={10}>
					<Grid container spacing={2}>
						<Grid item xs={6} className={classes.fieldWrapper}>
							<TextInputUnit
								className={classes.textFieldStyle}
								name="email"
								email="email"
								label="Email"
								value={newMember.email}
								onChange={updateMemberField}
								error={errors.email}
							/>
						</Grid>
						<Grid item xs={6} className={classes.fieldWrapper}>
							<TextInputUnit
								className={classes.textFieldStyle}
								name="position"
								label="Position"
								value={newMember.position}
								onChange={updateMemberField}
								error={errors.position}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={10} className={classes.fieldWrapper}>
					<CategoriesAutoComplete
						formObject={newMember}
						setFormObject={setNewMember}
						chipClassName={classes.chipItem}
						chipContainerClassName={classes.chipContainer}
						handler={handleCatsChange}
						error={errors.categories}
						errors={errors}
						setErrors={setErrors}
						validationResult={validationResult}
						setValidationResult={setValidationResult}
					/>
				</Grid>
				<Grid item xs={12}>
					<Grid container justifyContent="center">
						<FilledButton
							disabled={!validationResult}
							className={classes.addBtn}
							onClick={() => addMember(newMember)}
						>
							Add
						</FilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
}

export default AddMemberModal;
