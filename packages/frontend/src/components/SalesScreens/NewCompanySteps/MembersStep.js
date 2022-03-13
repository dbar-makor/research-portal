import TextInputUnit from '../../Reusables/TextInputUnit';
import CategoriesAutoComplete from '../../Reusables/CategoriesAutoComplete';
import { validateMember } from '../../Reusables/validationFunctions';
import NewMembersTable from './NewMembersTable';
import { AddButton, CheckButton } from '../../../styles/MainStyles';
import AddIcon from '@material-ui/icons/Add';
import { ReactComponent as CheckIcon } from '../../../assets/icons/IconGreenCheck.svg';
import { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	fieldWrapper: {
		'marginBottom': 16,
		'marginLeft': 10,
		'& path': {
			fill: 'fff',
		},
	},
	addIconWrapper: {
		marginLeft: 14,
	},
	addIcon: {
		fill: '#FFFFFF',
		fontSize: '18px',
		height: 28,
		width: 28,
	},
	checkIconWrapper: {
		marginLeft: 14,
	},
	checkIcon: {
		// fontSize: '25px',
		'height': 36,
		'width': 36,
		'& path': {
			fill: '#fff',
		},
	},
	paddingBottom20px: { paddingBottom: '20px' },
	textFieldStyle: {
		'borderColor': '#A5AFC233',
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiInputBase-input': {
			fontFamily: 'inter',
			fontSize: '.MuiInputBase-input',
			borderRadius: '8px',
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
	},

	chip: {
		margin: '6px',
	},
});

const MembersStep = ({
	company,
	setCompany,
	currentMember,
	setCurrentMember,
	initStateMember,
	errors,
	setErrors,
	validationResult,
	setValidationResult,
}) => {
	const [editedMemberIndex, setEditedMemberIndex] = useState(-1);

	const addMember = () => {
		const updatedMembers = [...company.members, currentMember];

		setCompany({
			...company,
			members: updatedMembers,
		});

		setCurrentMember(initStateMember);
		setErrors({});
	};

	const updateMemberField = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		setCurrentMember((prev) => ({
			...prev,
			[name]: value,
		}));

		validateMember({ [name]: value }, errors, setErrors, setValidationResult);
	};
	const classes = useStyles();

	const handleCatsChange = (values) => {
		const newCats = [];
		for (const cat of values) {
			newCats.push(cat);
		}
		currentMember.categories = newCats;

		setCurrentMember((prev) => ({ ...prev, categories: newCats }));
		validateMember({ categories: newCats }, errors, setErrors, setValidationResult, company);
	};

	const addEditedMember = () => {
		const currentMembers = [...company.members];
		currentMembers[editedMemberIndex] = currentMember;
		setCompany({ ...company, members: currentMembers });
		setCurrentMember(initStateMember);
		setErrors({});
		setEditedMemberIndex(-1);
	};

	return (
		<Grid item xs={12}>
			<Grid container className={classes.paddingBottom20px}>
				<Grid item xs={5} className={classes.fieldWrapper}>
					<TextInputUnit
						className={classes.textFieldStyle}
						name="member_name"
						label="Full Name"
						value={currentMember.member_name || ''}
						error={errors['member_name']}
						onChange={updateMemberField}
					/>
				</Grid>
				<Grid item xs={5} className={classes.fieldWrapper}>
					<TextInputUnit
						className={classes.textFieldStyle}
						name="username"
						label="Username"
						value={currentMember.username || ''}
						error={errors.username}
						onChange={updateMemberField}
					/>
				</Grid>
				<Grid item xs={5} className={classes.fieldWrapper}>
					<TextInputUnit
						className={classes.textFieldStyle}
						name="email"
						email="email"
						label="Email"
						error={errors.email}
						value={currentMember.email || ''}
						onChange={updateMemberField}
					/>
				</Grid>

				<Grid item xs={5} className={classes.fieldWrapper}>
					<TextInputUnit
						className={classes.textFieldStyle}
						name="position"
						label="Position"
						value={currentMember.position || ''}
						error={errors.position}
						onChange={updateMemberField}
					/>
				</Grid>

				{editedMemberIndex >= 0 ? (
					<Grid item xs={1} className={classes.checkIconWrapper}>
						<CheckButton
							onClick={addEditedMember}
							disabled={!validationResult}
							className={classes.checkIcon}
						>
							<CheckIcon />
						</CheckButton>
					</Grid>
				) : (
					<Grid item xs={1} className={classes.addIconWrapper}>
						<AddButton onClick={addMember} disabled={!validationResult}>
							<AddIcon className={classes.addIcon} />
						</AddButton>
					</Grid>
				)}

				<Grid item className={classes.fieldWrapper} style={{ width: 'calc(83.33% + 10px)' }}>
					<CategoriesAutoComplete
						className={classes.autoCompleteStyle}
						chipClassName={classes.chip}
						formObject={currentMember}
						setFormObject={setCurrentMember}
						handler={handleCatsChange}
						error={errors.categories}
						errors={errors}
						setErrors={setErrors}
						validationResult={validationResult}
						setValidationResult={setValidationResult}
					/>
				</Grid>

				<NewMembersTable
					members={company.members}
					currentMember={currentMember}
					setCurrentMember={setCurrentMember}
					company={company}
					setCompany={setCompany}
					errors={errors}
					setErrors={setErrors}
					setEditedMemberIndex={setEditedMemberIndex}
				/>
			</Grid>
		</Grid>
	);
};

export default MembersStep;
