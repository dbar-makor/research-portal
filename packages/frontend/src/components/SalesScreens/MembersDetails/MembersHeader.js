import React, { useState } from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { useStyles } from '../../../styles/InfoStyles';
import { AddButton, StyledTextField } from '../../../styles/MainStyles';
import { ReactComponent as SearchIcon } from '../../../assets/icons/IconSearch.svg';
import { useSelector } from 'react-redux';
import { selectChosenCompany } from '../../../redux/companies/chosenCompanySlice';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import AddMemberModal from './AddMemberModal';

function MembersHeader(props) {
  const {
    allMembersAmount,
    activeMembersAmount,
    showAll,
    setShowAll,
    memberSearch,
    setMemberSearch,
    companyName,
    addMember,
    handleCloseModal,
    handleOpenModal,
    openAddMember,
    newMember,
    setNewMember,
  } = props;
  // const chosenCompany = useSelector(selectChosenCompany)
  const classes = useStyles();

  return (
    <Grid container justifyContent="space-between" alignItems="center" className={classes.membersHeader}>
      <Grid item xs={5}>
        <Grid container>
          <Typography
            style={{ marginRight: '16px' }}
            className={clsx({
              [classes.membersTabActive]: showAll,
              [classes.membersTab]: !showAll,
            })}
            onClick={() => setShowAll(true)}
          >{`Members (${allMembersAmount})`}</Typography>
          <Divider orientation="vertical" className={classes.membersDivider} />
          <Typography
            style={{ marginRight: '16px' }}
            className={clsx(classes.membersTab, {
              [classes.membersTabActive]: !showAll,
              [classes.membersTab]: showAll,
            })}
            onClick={() => setShowAll(false)}
          >{`Active: ${activeMembersAmount}`}</Typography>
          <Divider orientation="vertical" className={classes.membersDivider} />
          <AddButton className={classes.addMemberBtn} onClick={handleOpenModal}>
            <AddIcon className={classes.addIcon} />
          </AddButton>
          <AddMemberModal open={openAddMember} handleClose={handleCloseModal} companyName={companyName} addMember={addMember} newMember={newMember} setNewMember={setNewMember} />
        </Grid>
      </Grid>
      {allMembersAmount ? (
        <Grid item xs={4}>
          <StyledTextField
            value={memberSearch}
            variant="outlined"
            className={classes.searchField}
            onChange={(e) => setMemberSearch(e.target.value)}
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
}

export default MembersHeader;
