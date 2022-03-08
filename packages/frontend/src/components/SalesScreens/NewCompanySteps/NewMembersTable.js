import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { DotsButton } from '../../../styles/MainStyles';
import { useState } from 'react';

import { Grid, Typography, makeStyles, Button, IconButton, TextField } from '@material-ui/core';

const options = ['Edit', 'Delete'];

const ITEM_HEIGHT = 48;

const NewMembersTable = ({ members, currentMember, setCurrentMember, company, setCompany, errors, setErrors, setEditedMemberIndex }) => {
  const classes = useStyles();

  const rows = members;
  console.log('members', members);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteMember = (index) => {
    const currentMembers = [...company.members];
    currentMembers.splice(index, 1);
    setCompany({
      ...company,
      members: currentMembers,
    });
    handleClose();
  };

  const editMember = (index) => {
    setEditedMemberIndex(index);
    const chosenMember = company.members[index];
    setCurrentMember(chosenMember);
    setErrors({ member_name: '', username: '', email: '', position: '', categories: '' });
    handleClose();
  };

  return (
    <Grid container className={classes.tableWrapper}>
      <Grid item xs={11} style={{ minWidth: 470 }}>
        <TableContainer component={Paper} className={classes.tableSkin}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHead}>
              <TableRow className={classes.headerRow}>
                <TableCell className={classes.headerCell} align="left">
                  Name
                </TableCell>
                <TableCell className={classes.headerCell} align="left">
                  Username
                </TableCell>
                <TableCell className={classes.headerCell} align="left" style={{ width: 120 }}>
                  Email
                </TableCell>
                <TableCell className={classes.headerCell} align="left">
                  Position
                </TableCell>
                <TableCell className={classes.headerCell} align="left" style={{ width: 80 }}>
                  Categories
                </TableCell>
                <TableCell className={classes.headerCell} align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {rows.map((row, index) => (
                <TableRow key={row.email} className={classes.dataRow}>
                  <TableCell className={classes.tableCell} scope="row">
                    {row['member_name']}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left">
                    {row.username}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left" style={{ wordBreak: 'break-all', width: 120 }}>
                    {row.email}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left">
                    {row.position}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center" style={{ width: 80 }}>
                    {row.categories.length}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    <DotsButton onClick={handleClick}>
                      <MoreVertIcon className={classes.dotsIcon} />
                    </DotsButton>
                    <Menu
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      keepMounted
                      className={classes.menu}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: '12ch',
                        },
                      }}
                    >
                      <MenuItem onClick={() => editMember(index)} className={classes.option}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => deleteMember(index)} className={classes.option}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default NewMembersTable;

const useStyles = makeStyles({
  tableWrapper: {
    marginLeft: 10,
  },
  tableSkin: {
    height: 290,
    overflowY: 'auto',
    overflowX: 'hidden',
    boxShadow: 'none',
    border: '1px solid #EDEEF1',
    '&::-webkit-scrollbar': {
      width: '4px',
      height: '3px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px #FFFFFF',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#868DA2',
      borderRadius: '10px',
    },
  },
  table: {
    //overflowX: "hidden",
    position: 'relative',
  },
  tableHead: {
    position: 'sticky',
    top: 0,
  },
  headerRow: {
    position: 'sticky',
    top: 0,
  },
  headerCell: {
    position: 'sticky',
    top: 0,
    background: '#fff',
    color: '#868DA2',
    fontSize: 14,
  },
  tableBody: {
    maxHeight: 80,
    overflowY: 'scroll',
  },
  dataRow: {
    //border: "none"
    //outlineColor: "transparent"
    //borderBottom: "none"
  },
  dotsIcon: {
    color: '#B8C3D8',
    padding: '1px',
    marginLeft: -15,
    '&:hover': {
      color: '#000',
      backgroundColor: '#fff',
      transition: '.3s',
    },
    // '&:disabled': {
    //   color: '#868DA2'
    // }
  },
  tableCell: {
    fontSize: 14,
    lineHeight: '1.2',
    padding: '10px 16px 10px 16px',
    border: 'none',
  },
  menu: {},
  option: {
    '&:hover': {
      color: 'red',
      backgroundColor: 'white',
    },
  },
});
