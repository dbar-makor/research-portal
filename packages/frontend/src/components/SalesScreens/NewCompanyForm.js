// import React, { useState, useEffect } from "react";
// import {
//   Grid,
//   Typography,
//   makeStyles,
//   Button,
//   IconButton,
// } from "@material-ui/core";
// import { ReactComponent as BlueBorder } from "../../assets/icons/blueBorder.svg";
// import axios from "axios";
// import { BASE_URL, END_POINT } from "../../utils/constants";
// //import data from "../../data/countries.json";
// import SubmitBtn from '../Reusables/SubmitBtn';
// import { getCompaniesDataAsync } from "../../redux/companies/companiesSlice";
// import { useDispatch, useSelector} from "react-redux";
// import {ReactComponent as CloseIcon} from '../../assets/icons/closeIcon.svg'
// import { AddButton, DeleteButton, FilledButton, OutlinedButton } from '../../styles/MainStyles';
// import { validateCompany } from "../Reusables/validationFunctions";
// import NewCompanyStepper from "./NewCompanySteps/NewCompanyStepper";
// import InfoStep from "./NewCompanySteps/InfoStep";
// import MembersStep from "./NewCompanySteps/MembersStep";

// function NewCompanyForm({handleClose}){

//     const classes = useStyles();
//     const dispatch = useDispatch();
//     const utils = useSelector(state => state.utils.utils);

//     const initState = {
//         name: "",
//         start_at: "",
//         country: "",
//         members: [{member_name: "", email:"", position:"", categories:[]}]
//     }

//     const [company, setCompany] = useState(initState);
//     const [errors, setErrors] = useState({});
//     const [validationResult1, setValidationResult1] =  useState(false);
//     const [validationResult2, setValidationResult2] =  useState(false);

//     const handleCompany = (e, fieldIndicator) => {
//         let value;

//         if(fieldIndicator === "start_at" ||
//            fieldIndicator === "end_at" ||
//            fieldIndicator === "type" ||
//            fieldIndicator === "categories"){
//             value = e;
//         }else if(fieldIndicator === "country"){
//             value = e? e["country_code"] : "";
//         }else{
//             value = e.target.value.trim();
//         }

//         let name;
//         if(fieldIndicator === "start_at" ||
//            fieldIndicator === "end_at" ||
//            fieldIndicator === "categories" ||
//            fieldIndicator === "country" ||
//            fieldIndicator === "type"){
//             name = fieldIndicator;
//         }else{
//             name = e.target.name ;
//         }

//         setCompany(prev => ({
//           ...prev,
//          // status: "company",
//           [name]: value
//       }))

//         validateCompany({[name] : value}, errors, setErrors,validationResult, setValidationResult, company)
//       }

//     const handleSubmit = async () => {

//         //changing array of object categories into array of categories' IDs

//         const updatedMembers = [];
//         company.members.forEach((member,index)  => {
//             const updatedMember = {...member, categories: member.categories.map(category => category.id)}
//             updatedMembers.push(updatedMember)
//         });
//         const updatedCompany = {...company, members: updatedMembers}
//         //setCompany(updatedCompany);

//         try{
//             if(validationResult){
//                 const res = await axios.post(`${BASE_URL}${END_POINT.COMPANY}`, updatedCompany);
//                 if(res.status === 200 || res.status === 201 ){
//                     console.log("res",res, "post successful");
//                     setCompany(initState);
//                     console.log("new company posted");
//                     dispatch(getCompaniesDataAsync());
//               }
//             }else{
//               console.log("form not OK")
//             }
//         }catch(err){
//             console.log(err.message);
//         }
//         handleClose();
//     }

//   return (
//     utils ? (
//     <Grid container justifyContent="center" className={classes.modalContainer}>
//       <Grid item xs={10}>
//         <Grid container>
//           <Grid item xs={12}>
//             <Grid container  alignItems='center' className={classes.modalContentWrapper}>
//                   <Grid item xs={4}/>
//                   <Grid item xs={4}>
//                     <Grid container justifyContent='center'>
//                         <BlueBorder />
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={4}>
//                   <Grid container justifyContent='flex-end'>
//                       <IconButton className={classes.closeButton} onClick={handleClose}>
//                         <CloseIcon />
//                       </IconButton>
//                       </Grid>
//                   </Grid>
//             </Grid>
//           </Grid>

//           <Grid item xs={12}>
//             <Grid container justifyContent="center">
//               <Typography className={classes.modalTitle}>
//                 New Company
//               </Typography>
//             </Grid>
//           </Grid>
//                 <NewCompanyStepper

//                     firstStep={<InfoStep
//                     company={company}
//                     setCompany={setCompany}
//                     handleCompany={handleCompany}
//                     classes={classes}
//                     errors={errors}
//                     setErrors={setErrors}
//                     validationResult={validationResult}
//                     setValidationResult={setValidationResult}
//                   />}
//                     secondStep={<MembersStep
//                     company={company}
//                     setCompany={setCompany}
//                     //handleCompany={handleCompany}
//                     handleSubmit={handleSubmit}
//                     classes={classes}
//                     errors={errors}
//                     setErrors={setErrors}
//                     validationResult={validationResult2}
//                     setValidationResult={setValidationResult2}
//                   />}

//                 />
//         </Grid>
//       </Grid>
//     </Grid>)
//     : <Typography>Loading...</Typography>
//   );
// }

// export default NewCompanyForm;

// const useStyles = makeStyles((theme) => ({
//   // nextButton: {
//   //   width: "190px",
//   //   borderRadius: "20px",
//   //   top: 0,
//   // },
//   // cancelButton: {
//   //   width: "120px",
//   // },
//   // textAlignStart: {
//   //   textAlignLast: "start",
//   // },
//   // buttonContainer: {
//   //   paddingTop: '80px'
//   // },
//   // paddingStyle: {
//   //   padding: "26px 32px 4px 20px",
//   // },
//   // bluePlusPadding: {
//   //   padding: "16px 0 4px 16px",
//   // },
//   // paddingBottom20px: { paddingBottom: "20px" },
//   // memberStyle: {
//   //   color: "#0F0F0F",
//   //   fontSize: "20px",
//   //   fontFamily: "Inter",
//   //   fontWeight: 400,
//   //   textTransform: "capitalize",
//   // },
//   // memberPadding: {
//   //   padding: "50px 0 24px 0",
//   // },
//   // paddingLeft10px: {
//   //   paddingLeft: "10px",
//   // },
//   // paddingRight10px: {
//   //   paddingRight: "10px",
//   // },
//   // paddingBottom16px: {
//   //   paddingBottom: "16px",
//   // },
//   // informationTitle: {
//   //   color: "#0F0F0F",
//   //   fontSize: "20px",
//   //   fontFamily: "Inter",
//   //   fontWeight: 400,
//   //   textTransform: "capitalize",
//   //   paddingTop: "40px",
//   // },
//   // marginBottom24px: {
//   //   paddingBottom: "24px",
//   // },
//   modalContainer: {
//     alignContent: "space-between",
//     backgroundColor: "#fff",
//     width: "812px",
//     position: "absolute",
//     top: "100px",
//     left: "554px",
//     height: "70vh",
//     // flexDirection: "column",
//     alignItems: "center",
//     // paddingLeft: "60px",
//     padding: "18px 0 32px 40px",
//     borderRadius: "8px",
//     boxShadow: "0px 8px 24px #0018581F",
//   },
//   modalContentWrapper: {
//     margin: "0 auto"
//   },
//   modalTitle: {
//     textAlign: 'center',
//     color: "#868DA2",
//     fontSize: "24px",
//     fontWeight: 400,
//     marginBottom: "4vh",
//     marginTop: "15px",
//   },
//   // secondaryTitle: {
//   //   color: "#000000",
//   //   fontSize: "20px",
//   //   fontWeight: 500,
//   //   marginBottom: "4vh",
//   //   marginTop: "15px",
//   //   textAlign: "left",
//   // },
//   membersContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   submitButton: {
//     marginTop: "20px",
//     fontSize: "20px",
//   },
//   marginBottom35: {
//     marginBottom: "35px",
//   },
//   textFieldStyle: {
//     borderColor: "#A5AFC233",
//     "& .MuiOutlinedInput-input": {
//       padding: "10.6px",
//     },
//     "& .MuiInputBase-input": {
//       fontFamily: "inter",
//       fontSize: ".MuiInputBase-input",
//       borderRadius: "8px",
//     },
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "8px",
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#A5AFC233",
//     },
//   },
//   memberField: {
//     marginBottom: "12px",
//     display: "flex",
//     flexDirection: "column",
//     // width: "50%"
//   },
//   divider: {
//     marginTop: "20px",
//     marginBottom: "30px",
//     backgroundColor: "black",
//   },
//   btnGroup: {
//     justifyContent: "center",
//   },
//   plusIcon: {
//     marginRight: "10px",
//   },
//   deleteIcon: {
//     padding: "25px ​0 0 6p",
//   },
//   chip: {
//     margin: "6px",
//   },
//   submit: {
//     marginBottom: "20px",
//     padding: "12px",
//     fontSize: "20px",
//   },
//   autoCompleteStyle: {
//     '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
//       padding: "1.3px",
//     },
//     '& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]':
//       {
//         borderRadius: "8px",
//       },
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#A5AFC233",
//     },
//   },
//   dateStyle: {
//     "& .MuiOutlinedInput-input": {
//       padding: "10.6px",
//     },
//     "& .MuiOutlinedInput-adornedEnd": {
//       borderRadius: "8px",
//       padding: 0,
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#A5AFC233",
//     },
//   },
//   closeButton: {
//     '&:hover': {
//       backgroundColor: 'transparent'
//     }
//   },
//       datePicker: {
//         width: '100%',
//         height: '43px',
//         '& .MuiOutlinedInput-root': {
//           borderRadius: '8px',
//           // color: '#B6B6B6',
//           // '&:hover': {
//           //   backgroundColor: '#212121'
//           // },
//           '& fieldset': {
//             borderColor: '#A5AFC233'
//           },
//           '&:hover fieldset': {
//             border: '1px solid #A5AFC233'
//           },
//           '&.Mui-focused fieldset': {
//             border: '1px solid #A5AFC233'
//           }
//         },
//         '& .MuiInputBase-root': {
//           '&.Mui-focused fieldset': {
//           },
//           '& .MuiButtonBase-root': {
//             paddingRight: 0,
//             '&:hover': {
//             backgroundColor: 'transparent',
//             '&:focused': {
//               backgroundColor: 'transparent',
//             }
//           },
//           //   boxShadow: 'none'
//           },
//           '& .MuiInputBase-input': {
//             padding: '11px',
//             paddingRight: '0px',
//             "&::placeholder": {
//               color: "#868DA2",
//               opacity: 1
//             },
//           }
//         },
//         '& .MuiIconButton-root': {
//           padding: 0
//         },
//         '& .MuiOutlinedInput-adornedEnd': {
//             paddingRight: '8px'
//         },
//         '& .MuiFormHelperText-root': {
//           marginLeft: 2,
//           marginTop: 0,
//           '&.Mui-error': {
//             color: '#FF0221',
//             fontSize: 11,
//             fontWeight: 500,
//             // lineHeight: 1.5
//           }
//         },
//       },
//       addIcon: {
//         fill: '#FFFFFF',
//         fontSize: '18px'
//       },
// }));
