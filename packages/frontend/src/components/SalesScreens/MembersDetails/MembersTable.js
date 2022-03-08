import { useEffect, useState } from "react";
 

import _ from 'lodash';
import {
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  Modal,
  IconButton,
  TableContainer,
  Button,
} from "@material-ui/core";
import { useStyles } from "../../../styles/InfoStyles";
import MembersHeader from "./MembersHeader";
import { useSelector } from "react-redux";
import {
  selectChosenCompany,
  getChosenCompanyAsync,
} from "../../../redux/companies/chosenCompanySlice";
import {
  TableTextField,
  StatusSwitch,
  LightBlueButton,
} from "../../../styles/MainStyles";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/IconTrash.svg";
import { ReactComponent as LogsIcon } from "../../../assets/icons/IconLogs.svg";
import { MembersTableCell, MembersTableRow } from "../../../styles/TableStyles";
import { BinButton, SmallEditButton } from "../../../styles/MainStyles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { ReactComponent as EditIcon } from "../../../assets/icons/IconEdit.svg";
import clsx from "clsx";
import CategoriesModal from "./CategoriesModal";
import { BASE_URL, END_POINT } from "../../../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import DeleteAlert from "../../Reusables/DeleteAlert";
import * as actionSnackBar from "../../../redux/SnackBar/action";

function MembersTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const chosenCompany = useSelector(selectChosenCompany);
  const [membersRows, setMembersRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [memberSearch, setMemberSearch] = useState("");
  const [openAddMember, setOpenAddMember] = useState(false);
  const [originalRows, setOriginalRows] = useState([])
  const [newMember, setNewMember] = useState({
    member_name: "",
    email: "",
    username: "",
    position: "",
    categories: [],
  });

  let timer = 0;
  let delay = 200;
  let prevent = false;

  const handleCloseModal = () => {
    setOpenAddMember(false);
  };
  const handleOpenModal = () => {
    setOpenAddMember(true);
  };

  useEffect(() => {
    console.log("membersRows", membersRows);
  }, [membersRows]);

  useEffect(() => {
    if (chosenCompany) {
      const rowsCopy = [...chosenCompany.members];
      // const updatedRows = rowsCopy.map((row) => ({
      //   ...row,
      //   isEditMode: false
      // }))
      setOriginalRows(rowsCopy)
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
          style={{ textAlign: "right" }}
          className={`${classes.moreCategories} moreCategs`}
        >{`+${length - 1}`}</Typography>
      );
    }
  };

  const filterOneMemberDisplay = (member) => {
    if (memberSearch) {
      return ![
        member.name,
        member.username,
        member.email,
        member.position,
      ].some((property) =>
        property.toUpperCase().includes(memberSearch.toUpperCase())
      );
    }
  };

  const filterMembersDisplay = (members) => {
    return (
      (memberSearch !== "" &&
        members.every((member) => filterOneMemberDisplay(member))) ||
      (!showAll && !membersHeaderProps.activeMembersAmount)
    );
  };

  const updateMemberField = (value, key, index) => {
    let memberToUpdate = { ...membersRows[index] };
    const updatedMembersRows = [...membersRows];
    if (key !== "categories") {
      memberToUpdate[key] = value;
    } else {
      console.log("VALUES", value);
      const newCats = [];
      for (const cat of value) {
        newCats.push(cat);
      }
      memberToUpdate = { ...memberToUpdate, categories: newCats };
    }
    setCurrentMember(memberToUpdate);
    // if (key === 'status') {
    //   sendMember(memberToUpdate, memberToUpdate.id)
    // }
    updatedMembersRows.splice(index, 1, memberToUpdate);
    setMembersRows(updatedMembersRows);
  };

  const sendMember = async (member, id) => {
    console.log("member!!!!dfjhdlf", member);
    const readyMember = {
      ...member,
      categories: member.categories.map((category) => category.id),
    };
    delete readyMember.isEditMode;
    try {
      const res = await axios.put(
        `${BASE_URL}${END_POINT.USER}/${id}`,
        readyMember
      );
      if (res.status === 200) {
        console.log(res);
        handleClose();
        dispatch(
          actionSnackBar.setSnackBar("success", "Successfully updated", 2000)
        );
        // dispatch(getChosenCompanyAsync(chosenCompany.id))
      }
    } catch (error) {
      console.log(error);
      dispatch(actionSnackBar.setSnackBar("error", "Update failed", 2000));
      handleClose();
    }
  };

  const deleteMember = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}${END_POINT.USER}/${id}`);
      if (res.status === 200 && chosenCompany) {
        console.log(res);
        dispatch(getChosenCompanyAsync(chosenCompany.id));
        handleCloseAlert();
        dispatch(
          actionSnackBar.setSnackBar(
            "success",
            "Member successfully deleted",
            2000
          )
        );
      }
    } catch (error) {
      console.log(error);
      handleCloseAlert();
      dispatch(
        actionSnackBar.setSnackBar("error", "Delete member failed", 2000)
      );
    }
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
        console.log(res);
        handleCloseModal();
        setNewMember({
          ...newMember,
          member_name: "",
          email: "",
          username: "",
          position: "",
          categories: [],
        });
        dispatch(
          actionSnackBar.setSnackBar(
            "success",
            "Member successfully added",
            2000
          )
        );
      }
    } catch (error) {
      handleCloseModal();
      setNewMember({
        ...newMember,
        member_name: "",
        email: "",
        username: "",
        position: "",
        categories: [],
      });
      if (error.response.status === 402) {
        dispatch(
          actionSnackBar.setSnackBar(
            "error",
            "This member already exists",
            2000
          )
        );
      } else {
        dispatch(
          actionSnackBar.setSnackBar("error", "Add member failed", 2000)
        );
      }
    }
  };

  const membersHeaderProps = {
    allMembersAmount: membersRows && membersRows.length,
    // chosenCompany && chosenCompany.members && chosenCompany.members.length,
    activeMembersAmount: membersRows && membersRows.length && membersRows.filter((member) => member.status).length,
    // chosenCompany &&
    // chosenCompany.members &&
    // chosenCompany.members.filter((member) => member.status).length,
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

  const categoriesProps = {
    currentMember: chosenCompany && currentMember,
    setCurrentMember,
  };

  // const handleBlur = (membersRows) => {
  //   const rowsCopy = membersRows.map((membersRow) => ({
  //     ...membersRow,
  //     isEditMode: false
  //   }))
  //   // const updatedRow = { ...member, isEditMode: false }
  //   // rowsCopy.splice(index, 1, updatedRow)
  //   setMembersRows(rowsCopy)

  // }
  const handleBlur = (e, member, index) => {
    if (
      !e.relatedTarget ||
      (e.relatedTarget &&
        !e.relatedTarget.id === "memberStatus" &&
        e.target.id !== "categories" //?????
        
        )
    ) {
      const rowsCopy = [...membersRows];
      const updatedRow = { ...member, isEditMode: false };
      
     const past =  originalRows.find(row => row.id === member.id)
 
     if(_.isEqual(member, past) == false && _.isEqual({ ...member, isEditMode: true }, { ...past, isEditMode: true }) == false) {
      rowsCopy.splice(index, 1, updatedRow);
      console.log(rowsCopy)
      setMembersRows(rowsCopy);
      sendMember(member, member.id);
      setOriginalRows(rowsCopy)
     }
     else {
      setMembersRows(originalRows);
     }
    }
  };

  return chosenCompany && chosenCompany.members ? (
    <Grid container className={classes.membersContainer}>
      <Grid item xs={12}>
        <MembersHeader {...membersHeaderProps} {...categoriesProps} />
      </Grid>
      <Grid item xs={12} className={classes.scrollableMembersTable}>
        {chosenCompany.members.length ? (
          filterMembersDisplay(chosenCompany.members) ? (
            <Typography className={classes.noMembers}>No match</Typography>
          ) : (
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {Object.keys(chosenCompany.members[0]).map((col, index) => {
                    if (col !== "id") {
                      return (
                        <MembersTableCell
                          key={index}
                          align={col === "status" ? "center" : "left"}
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          {col.replaceAll("_", " ")}
                        </MembersTableCell>
                      );
                    }
                  })}
                  <MembersTableCell align="center">Actions</MembersTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {membersRows.map((row, index) => (
                  <MembersTableRow
                    key={index}
                    id={`${index}`}
                    tabindex="-1"
                    className={clsx(classes.memberRow, {
                      [classes.memberRowSelected]: row.isEditMode,
                    })}
                    onBlur={(e) => handleBlur(e, row, index)}
                    onDoubleClick={() => {
                      // const rowsCopy = [...membersRows]
                      const element = document.getElementById(`${index}`);
                      console.log(element);
                      element.focus();
                      clearTimeout(timer);
                      prevent = true;

                      const rowsCopy = membersRows.map((membersRow) => ({
                        ...membersRow,
                        isEditMode: false,
                      }));
                      console.log("rowsCopy", rowsCopy);
                      const updatedRow = { ...row, isEditMode: true };
                      console.log("updatedRow", updatedRow);
                      rowsCopy.splice(index, 1, updatedRow);
                      console.log("rowsCopy ater", rowsCopy);
                      setMembersRows(rowsCopy);
                    }}
                    onClick={(ev) => {
                      console.log(ev)
                      if (ev.target.id !== "categories" && ev.nodeName == 'INPUT') {
                        console.log("here", ev);
                        timer = setTimeout(function () {
                          if (!prevent) {
                            const element = document.getElementById(`${index}`);
                            console.log(element);
                            element.focus();
                          }
                          prevent = false;
                        }, delay);
                      }
                    }}
                    onFocus={() => {
                      console.log("focus");
                    }}
                    // style={{ display: filterMembersDisplay(row, row.status)}}
                    style={{
                      display:
                        ((!showAll && !row.status) ||
                          (memberSearch !== "" &&
                            filterOneMemberDisplay(row))) &&
                        "none",
                    }}
                  >
                    {Object.entries(row).map(([key, value], i) => {
                      if (key !== "id" && key !== "isEditMode") {
                        if (key === "categories") {
                          return (
                            <MembersTableCell
                              key={i}
                              style={{ cursor: "pointer", maxWidth: "115px" }}
                            >
                              <LightBlueButton
                                id="categoriesbutton"
                                justification={
                                  value.length > 1
                                    ? "space-between"
                                    : "flex-start"
                                }
                                onClick={(ev) => {
                                  ev.stopPropagation();
                                  handleOpen(index);
                                }}
                              >
                                {value.length
                                  ? `${value[0].name.slice(0, 17)}... `
                                  : "No categories"}
                                {calculateCategories(value.length)}
                              </LightBlueButton>
                              <CategoriesModal
                                {...categoriesProps}
                                open={open}
                                handleClose={handleClose}
                                updateMemberField={updateMemberField}
                                memberIndex={index}
                                membersRows={membersRows}
                                setMembersRows={setMembersRows}
                                sendMember={sendMember}
                              />
                            </MembersTableCell>
                          );
                        } else if (key === "status") {
                          return (
                            <MembersTableCell
                              key={i}
                              align="center"
                              style={{ whiteSpace: "nowrap", width: "1%" }}
                            >
                              {row.isEditMode ? (
                                <StatusSwitch
                                  checked={value}
                                  id="memberStatus"
                                  onChange={() => {
                                    console.log("row", row);
                                    updateMemberField(!value, key, index);
                                  }}
                                />
                              ) : (
                                <FiberManualRecordIcon
                                  className={clsx({
                                    [classes.activeMember]: value,
                                    [classes.inactiveMember]: !value,
                                  })}
                                />
                              )}
                            </MembersTableCell>
                          );
                        } else {
                          return (
                            <MembersTableCell
                              key={i}
                              style={{ whiteSpace: "nowrap", width: "1%" }}
                            >
                              {/* {row.isEditMode
                          ?  */}
                              <TableTextField
                                value={value}
                                disabled={!row.isEditMode}
                                InputProps={{
                                  classes: {
                                    // root: classes.inputRoot,
                                    disabled: classes.disabledInput,
                                  },
                                }}
                                // onFocus={() => {
                                //   // const rowsCopy = [...membersRows]
                                //   const rowsCopy = membersRows.map((membersRow) => ({
                                //     ...membersRow,
                                //     isEditMode: false
                                //   }))
                                //   console.log('rowsCopy', rowsCopy)
                                //   const updatedRow = { ...row, isEditMode: true }
                                //   console.log('updatedRow', updatedRow)
                                //   rowsCopy.splice(index, 1, updatedRow)
                                //   console.log('rowsCopy ater', rowsCopy)
                                //   setMembersRows(rowsCopy)
                                // }}
                                // onBlur={(e) => {
                                //   // console.log('e.relatedTarget',e.relatedTarget)

                                //   // if (!e.relatedTarget || (e.relatedTarget && !e.relatedTarget.className.includes('MuiSwitch-input'))) {
                                //     // console.log('e.relatedTarget',e.relatedTarget)
                                //     sendMember(row, row.id)
                                //   // }

                                // }

                                // }
                                onChange={(e) => updateMemberField(e.target.value, key, index)}
                              />
                              {/* : <Typography>{value}</Typography>} */}
                            </MembersTableCell>
                          );
                        }
                      }
                    })}
                    <MembersTableCell
                      align="center"
                      style={{ whiteSpace: "nowrap", width: "1%" }}
                    >
                      {row.isEditMode ? (
                        <>
                          <BinButton
                            onClick={() => handleOpenAlert()}
                            // onClick={() => deleteMember(row.id)}
                          >
                            <DeleteIcon />
                          </BinButton>
                          <DeleteAlert
                            open={openAlert}
                            handleClose={handleCloseAlert}
                            itemName={row.name}
                            itemId={row.id}
                            itemCategory="Member"
                            deleteItem={deleteMember}
                          />
                        </>
                      ) : (
                        <IconButton className={classes.logsButton}>
                          <LogsIcon />
                        </IconButton>
                      )}
                    </MembersTableCell>
                  </MembersTableRow>
                ))}
              </TableBody>
            </Table>
          )
        ) : (
          <Typography className={classes.noMembers}>There are no members for this company</Typography>
        )}
      </Grid>
      {/* <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby='simple-modal-title'
        // aria-describedby='simple-modal-description'
      >
        <div> */}

      {/* </div>
      </Modal> */}
    </Grid>
  ) : null;
}

export default MembersTable;
