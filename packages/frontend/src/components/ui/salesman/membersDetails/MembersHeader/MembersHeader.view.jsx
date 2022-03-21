import React from 'react';
import { useStyles } from '../../../../../styles/InfoStyles';
import { Grid, Typography, Divider } from '@material-ui/core';
import { AddButton, StyledTextField } from '../../../../../styles/MainStyles';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import AddMemberModal from '../../AddMemberModal/AddMemberModal';
import { ReactComponent as SearchIcon } from '../../../../../assets/icons/IconSearch.svg';

//import useStyles from './MembersHeader.style';

const MembersHeaderView = (props) => {
	const classes = useStyles();

  return (
		<Grid container justifyContent="space-between" alignItems="center" className={classes.membersHeader}>
			<Grid item xs={5}>
				<Grid container>
					<Typography
						style={{ marginRight: '16px' }}
						className={clsx({
							[classes.membersTabActive]: props.showAll,
							[classes.membersTab]: !props.showAll,
						})}
						onClick={() => props.setShowAll(true)}
					>{`Members (${props.allMembersAmount})`}</Typography>
					<Divider orientation="vertical" className={classes.membersDivider} />
					<Typography
						style={{ marginRight: '16px' }}
						className={clsx(classes.membersTab, {
							[classes.membersTabActive]: !props.showAll,
							[classes.membersTab]: props.showAll,
						})}
						onClick={() => props.setShowAll(false)}
					>{`Active: ${props.activeMembersAmount}`}</Typography>
					<Divider orientation="vertical" className={classes.membersDivider} />
					<AddButton className={classes.addMemberBtn} onClick={props.handleOpenModal}>
						<AddIcon className={classes.addIcon} />
					</AddButton>
					<AddMemberModal
						open={props.openAddMember}
						handleClose={props.handleCloseModal}
						companyName={props.companyName}
						addMember={props.addMember}
						newMember={props.newMember}
						setNewMember={props.setNewMember}
					/>
				</Grid>
			</Grid>
			{props.allMembersAmount ? (
				<Grid item xs={4}>
					<StyledTextField
						value={props.memberSearch}
						variant="outlined"
						className={classes.searchField}
						onChange={(e) => props.setMemberSearch(e.target.value)}
						//   fullWidth
						placeholder="Search"
						InputProps={{
							endAdornment: <SearchIcon className={classes.searchIcon} />,
						}}
						//   onChange={(e) => setHashtagState(e.target.value)}
					/>
				</Grid>
			) : null}
		</Grid>
	);
};

MembersHeaderView.displayName = 'MembersHeaderView';
MembersHeaderView.defaultProps = {};

export default React.memo(MembersHeaderView);
