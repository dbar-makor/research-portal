import React from 'react';
import TextInputUnit from '../../../reusables/TextInputUnit/TextInputUnit';
import CategoriesAutoComplete from '../../../reusables/CategoriesAutoComplete/CategoriesAutoComplete';
import NewMembersTable from '../NewMembersTable/NewMembersTable';
import { AddButton, CheckButton } from '../../../../../styles/MainStyles';
import AddIcon from '@material-ui/icons/Add';
import { ReactComponent as CheckIcon } from '../../../../../assets/icons/IconGreenCheck.svg';
import { Grid } from '@material-ui/core';
import useStyles from './MembersStep.style';

const MembersStepView = (props) => {
	const classes = useStyles();

	return (
		<Grid item xs={12}>
			<Grid container className={classes.paddingBottom20px}>
				<Grid item xs={5} className={classes.fieldWrapper}>
					<TextInputUnit
						className={classes.textFieldStyle}
						name="member_name"
						label="Full Name"
						value={props.currentMember.member_name || ''}
						error={props.errors['member_name']}
						onChange={props.updateMemberField}
					/>
				</Grid>
				<Grid item xs={5} className={classes.fieldWrapper}>
					<TextInputUnit
						className={classes.textFieldStyle}
						name="username"
						label="Username"
						value={props.currentMember.username || ''}
						error={props.errors.username}
						onChange={props.updateMemberField}
					/>
				</Grid>
				<Grid item xs={5} className={classes.fieldWrapper}>
					<TextInputUnit
						className={classes.textFieldStyle}
						name="email"
						email="email"
						label="Email"
						error={props.errors.email}
						value={props.currentMember.email || ''}
						onChange={props.updateMemberField}
					/>
				</Grid>

				<Grid item xs={5} className={classes.fieldWrapper}>
					<TextInputUnit
						className={classes.textFieldStyle}
						name="position"
						label="Position"
						value={props.currentMember.position || ''}
						error={props.errors.position}
						onChange={props.updateMemberField}
					/>
				</Grid>

				{props.editedMemberIndex >= 0 ? (
					<Grid item xs={1} className={classes.checkIconWrapper}>
						<CheckButton
							onClick={props.addEditedMember}
							disabled={!props.validationResult}
							className={classes.checkIcon}
						>
							<CheckIcon />
						</CheckButton>
					</Grid>
				) : (
					<Grid item xs={1} className={classes.addIconWrapper}>
						<AddButton onClick={props.addMember} disabled={!props.validationResult}>
							<AddIcon className={classes.addIcon} />
						</AddButton>
					</Grid>
				)}

				<Grid item className={classes.fieldWrapper} style={{ width: 'calc(83.33% + 10px)' }}>
					<CategoriesAutoComplete
						className={classes.autoCompleteStyle}
						chipClassName={classes.chip}
						formObject={props.currentMember}
						setFormObject={props.setCurrentMember}
						handler={props.handleCatsChange}
						error={props.errors.categories}
						errors={props.errors}
						setErrors={props.setErrors}
						validationResult={props.validationResult}
						setValidationResult={props.setValidationResult}
					/>
				</Grid>

				<NewMembersTable
					members={props.company.members}
					currentMember={props.currentMember}
					setCurrentMember={props.setCurrentMember}
					company={props.company}
					setCompany={props.setCompany}
					errors={props.errors}
					setErrors={props.setErrors}
					setEditedMemberIndex={props.setEditedMemberIndex}
				/>
			</Grid>
		</Grid>
	);
};

MembersStepView.displayName = 'MembersStepView';
MembersStepView.defaultProps = {};

export default React.memo(MembersStepView);
