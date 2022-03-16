import React from 'react';
import { Dialog, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../../styles/InfoStyles';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/closeIcon.svg';
import { FilledButton } from '../../../../styles/MainStyles';
import TextInputUnit from '../../../Reusables/TextInputUnit';
import CategoriesAutoComplete from '../../../Reusables/CategoriesAutoComplete';

//import useStyles from './AddMemberModal.style';

const AddMemberModalView = (props) => {
	const classes = useStyles();
  return  (
		<Dialog
			open={props.open}
			onClose={props.handleClose}
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
						<CloseIcon onClick={props.handleClose} className={classes.closeIcon} />
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.addMember}>Add Member</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.addTo}>{`To: ${props.companyName}`}</Typography>
				</Grid>
				<Grid item xs={10}>
					<Grid container spacing={2}>
						<Grid item xs={6} className={classes.fieldWrapper}>
							<TextInputUnit
								className={classes.textFieldStyle}
								name="member_name"
								label="Full Name"
								value={props.newMember.member_name}
								onChange={props.updateMemberField}
								error={props.errors.member_name}
							/>
						</Grid>
						<Grid item xs={6} className={classes.fieldWrapper}>
							<TextInputUnit
								className={classes.textFieldStyle}
								name="username"
								label="Username"
								value={props.newMember.username}
								onChange={props.updateMemberField}
								error={props.errors.username}
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
								value={props.newMember.email}
								onChange={props.updateMemberField}
								error={props.errors.email}
							/>
						</Grid>
						<Grid item xs={6} className={classes.fieldWrapper}>
							<TextInputUnit
								className={classes.textFieldStyle}
								name="position"
								label="Position"
								value={props.newMember.position}
								onChange={props.updateMemberField}
								error={props.errors.position}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={10} className={classes.fieldWrapper}>
					<CategoriesAutoComplete
						formObject={props.newMember}
						setFormObject={props.setNewMember}
						chipClassName={classes.chipItem}
						chipContainerClassName={classes.chipContainer}
						handler={props.handleCatsChange}
						error={props.errors.categories}
						errors={props.errors}
						setErrors={props.setErrors}
						validationResult={props.validationResult}
						setValidationResult={props.setValidationResult}
					/>
				</Grid>
				<Grid item xs={12}>
					<Grid container justifyContent="center">
						<FilledButton
							disabled={!props.validationResult}
							className={classes.addBtn}
							onClick={() => props.addMember(props.newMember)}
						>
							Add
						</FilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
};

AddMemberModalView.displayName = 'AddMemberModalView';
AddMemberModalView.defaultProps = {};

export default React.memo(AddMemberModalView);
