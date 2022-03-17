import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import MembersTableView from './MembersTable.view';
import { useStyles } from '../../../../../styles/InfoStyles';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectChosenCompany,
	getChosenCompanyAsync,
} from '../../../../../redux/companies/chosenCompanySlice';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import axios from 'axios';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';
import _ from 'lodash';

const MembersTable = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const chosenCompany = useSelector(selectChosenCompany);
	const [membersRows, setMembersRows] = useState([]);
	const [open, setOpen] = useState(false);
	const [openAlert, setOpenAlert] = useState(false);
	const [currentMember, setCurrentMember] = useState(null);
	const [showAll, setShowAll] = useState(true);
	const [memberSearch, setMemberSearch] = useState('');
	const [openAddMember, setOpenAddMember] = useState(false);
	const [originalRows, setOriginalRows] = useState([]);
	const [newMember, setNewMember] = useState({
		member_name: '',
		email: '',
		username: '',
		position: '',
		categories: [],
	});
	const handleCloseModal = () => {
		setOpenAddMember(false);
	};
	const handleOpenModal = () => {
		setOpenAddMember(true);
	};

	const addMember = async (member) => {
		const memberToAdd = {
			...member,
			name: member.member_name,
			categories: member.categories.map((category) => category.id),
			company: chosenCompany.id,
		};
		delete memberToAdd.member_name;
		try {
			const res = await axios.post(`${BASE_URL}${END_POINT.USER}`, memberToAdd);
			if (res.status === 201 && chosenCompany) {
				dispatch(getChosenCompanyAsync(chosenCompany.id));
				handleCloseModal();
				setNewMember({
					...newMember,
					member_name: '',
					email: '',
					username: '',
					position: '',
					categories: [],
				});
				dispatch(actionSnackBar.setSnackBar('success', 'Member successfully added', 2000));
			}
		} catch (error) {
			handleCloseModal();
			setNewMember({
				...newMember,
				member_name: '',
				email: '',
				username: '',
				position: '',
				categories: [],
			});
			if (error.response.status === 402) {
				dispatch(actionSnackBar.setSnackBar('error', 'This member already exists', 2000));
			} else {
				dispatch(actionSnackBar.setSnackBar('error', 'Add member failed', 2000));
			}
		}
	};

	const membersHeaderProps = {
		allMembersAmount: membersRows && membersRows.length,
		activeMembersAmount:
			membersRows && membersRows.length && membersRows.filter((member) => member.status).length,
		showAll,
		setShowAll,
		memberSearch,
		setMemberSearch,
		companyName: chosenCompany && chosenCompany.name,
		addMember,
		handleCloseModal,
		handleOpenModal,
		openAddMember,
		newMember,
		setNewMember,
	};
	const timer = 0;
	const delay = 200;
	const prevent = false;

	useEffect(() => {
		if (chosenCompany) {
			const rowsCopy = [...chosenCompany.members];
			setOriginalRows(rowsCopy);
			setMembersRows(rowsCopy);
		}
	}, [chosenCompany]);

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = (index) => {
		setCurrentMember(membersRows[index]);
		setOpen(true);
	};

	const handleCloseAlert = () => {
		setOpenAlert(false);
	};
	const handleOpenAlert = () => {
		setOpenAlert(true);
	};

	const calculateCategories = (length) => {
		if (length < 2) {
			return null;
		} else {
			return (
				<Typography
					style={{ textAlign: 'right' }}
					className={`${classes.moreCategories} moreCategs`}
				>{`+${length - 1}`}</Typography>
			);
		}
	};

	const filterOneMemberDisplay = (member) => {
		if (memberSearch) {
			return ![member.name, member.username, member.email, member.position].some((property) =>
				property.toUpperCase().includes(memberSearch.toUpperCase()),
			);
		}
	};

	const filterMembersDisplay = (members) => {
		return (
			(memberSearch !== '' && members.every((member) => filterOneMemberDisplay(member))) ||
			(!showAll && !membersHeaderProps.activeMembersAmount)
		);
	};

	const updateMemberField = (value, key, index) => {
		let memberToUpdate = { ...membersRows[index] };
		const updatedMembersRows = [...membersRows];
		if (key !== 'categories') {
			memberToUpdate[key] = value;
		} else {
			const newCats = [];
			for (const cat of value) {
				newCats.push(cat);
			}
			memberToUpdate = { ...memberToUpdate, categories: newCats };
		}
		setCurrentMember(memberToUpdate);

		updatedMembersRows.splice(index, 1, memberToUpdate);
		setMembersRows(updatedMembersRows);
	};

	const sendMember = async (member, id) => {
		const readyMember = {
			...member,
			categories: member.categories.map((category) => category.id),
		};
		delete readyMember.isEditMode;
		try {
			const res = await axios.put(`${BASE_URL}${END_POINT.USER}/${id}`, readyMember);
			if (res.status === 200) {
				handleClose();
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully updated', 2000));
			}
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'Update failed', 2000));
			handleClose();
		}
	};

	const deleteMember = async (id) => {
		try {
			const res = await axios.delete(`${BASE_URL}${END_POINT.USER}/${id}`);
			if (res.status === 200 && chosenCompany) {
				dispatch(getChosenCompanyAsync(chosenCompany.id));
				handleCloseAlert();
				dispatch(actionSnackBar.setSnackBar('success', 'Member successfully deleted', 2000));
			}
		} catch (error) {
			handleCloseAlert();
			dispatch(actionSnackBar.setSnackBar('error', 'Delete member failed', 2000));
		}
	};

	const categoriesProps = {
		currentMember: chosenCompany && currentMember,
		setCurrentMember,
	};

	const handleBlur = (e, member, index) => {
		if (
			!e.relatedTarget ||
			(e.relatedTarget && !e.relatedTarget.id === 'memberStatus' && e.target.id !== 'categories')
		) {
			const rowsCopy = [...membersRows];
			const updatedRow = { ...member, isEditMode: false };

			const past = originalRows.find((row) => row.id === member.id);

			if (
				_.isEqual(member, past) === false &&
				_.isEqual({ ...member, isEditMode: true }, { ...past, isEditMode: true }) === false
			) {
				rowsCopy.splice(index, 1, updatedRow);
				setMembersRows(rowsCopy);
				sendMember(member, member.id);
				setOriginalRows(rowsCopy);
			} else {
				setMembersRows(originalRows);
			}
		}
	};

	return (
		<MembersTableView
			chosenCompany={chosenCompany}
			membersHeaderProps={membersHeaderProps}
			categoriesProps={categoriesProps}
			filterMembersDisplay={filterMembersDisplay}
			membersRows={membersRows}
			handleBlur={handleBlur}
			timer={timer}
			setMembersRows={setMembersRows}
			prevent={prevent}
			delay={delay}
			showAll={showAll}
			filterOneMemberDisplay={filterOneMemberDisplay}
			handleOpen={handleOpen}
			calculateCategories={calculateCategories}
			open={open}
			handleClose={handleClose}
			updateMemberField={updateMemberField}
			sendMember={sendMember}
			handleOpenAlert={handleOpenAlert}
			openAlert={openAlert}
			handleCloseAlert={handleCloseAlert}
			deleteMember={deleteMember}
		></MembersTableView>
	);
};

MembersTable.displayName = 'MembersTable';
MembersTable.defaultProps = {};

export default React.memo(MembersTable);
