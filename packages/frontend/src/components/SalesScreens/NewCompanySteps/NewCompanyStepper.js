import React, { useState, unstableBatchedUpdates } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesDataAsync, selectSearch, selectType, selectStatus, selectOffset, selectLimit } from '../../../redux/companies/companiesSlice';
import { validateCompany } from '../../Reusables/validationFunctions';
import Dialog from '@material-ui/core/Dialog';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepperConnector from './StepperConnector';
import StepperIcons from './StepperIcons';
import Button from '@material-ui/core/Button';
import { ReactComponent as BlueBorder } from '../../../assets/icons/blueBorder.svg';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FilledButton, OutlinedButton } from '../../../styles/MainStyles';
import InfoStep from '../NewCompanySteps/InfoStep';
import MembersStep from '../NewCompanySteps/MembersStep';
import * as actionSnackBar from '../../../redux/SnackBar/action';
import SubHeaderModal from '../../Reusables/SubHeaderModal';

const NewCompanyStepper = ({ handleClose, open }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const utils = useSelector((state) => state.utils.utils);
  const search = useSelector(selectSearch);
  const type = useSelector(selectType);
  const status = useSelector(selectStatus);
  const offset = useSelector(selectOffset);
  const limit = useSelector(selectLimit);

  const initState = {
    name: '',
    logo: '',
    start_at: '',
    end_at: '',
    type: '',
    country: {},
    members: [],
  };

  const [company, setCompany] = useState(initState);
  const [errors1, setErrors1] = useState({});
  const [errors2, setErrors2] = useState({});
  const [validationResult1, setValidationResult1] = useState(false);
  const [validationResult2, setValidationResult2] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');
  const initStateMember = { member_name: null, username: null, email: null, position: null, categories: [] };
  const [currentMember, setCurrentMember] = useState(initStateMember);
  const [inputValue, setInputValue] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Information', 'Members'];
  console.log('I rendered');

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <InfoStep
            company={company}
            setCompany={setCompany}
            handleCompany={handleCompany}
            classes={classes}
            errors={errors1}
            setErrors={setErrors1}
            validationResult={validationResult1}
            setValidationResult={setValidationResult1}
            setUploadedImage={setUploadedImage}
            uploadedImage={uploadedImage}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      case 1:
        return (
          <MembersStep
            company={company}
            setCompany={setCompany}
            currentMember={currentMember}
            setCurrentMember={setCurrentMember}
            initStateMember={initStateMember}
            handleSubmit={handleSubmit}
            classes={classes}
            errors={errors2}
            setErrors={setErrors2}
            validationResult={validationResult2}
            setValidationResult={setValidationResult2}
          />
        );
      default:
        return 'Unknown step';
    }
  }

  //HANDLERS

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCompany = (e, fieldIndicator) => {
    let value;

    if (fieldIndicator === 'start_at' || fieldIndicator === 'end_at' || fieldIndicator === 'type' || fieldIndicator === 'categories' || fieldIndicator === 'country') {
      value = e;
    } else {
      value = e.target.value;
    }

    let name;
    if (fieldIndicator === 'start_at' || fieldIndicator === 'end_at' || fieldIndicator === 'categories' || fieldIndicator === 'country' || fieldIndicator === 'type') {
      name = fieldIndicator;
    } else {
      name = e.target.name;
    }
    console.log('company', company);

    setCompany((prev) => ({
      ...prev,
      // status: "company",
      [name]: value,
    }));

    validateCompany({ [name]: value }, errors1, setErrors1, setValidationResult1, company);
  };

  const handleSubmit = async () => {
    //changing array of object categories into array of categories' IDs

    const updatedMembers = [];
    company.members.forEach((member, index) => {
      const updatedMember = { ...member, categories: member.categories.map((category) => category.id) };
      updatedMembers.push(updatedMember);
    });

    //also adding reply from server for uploaded image
    const updatedCompany = { ...company, members: updatedMembers, logo: uploadedImage, country: company.country.code };

    //setCompany(updatedCompany);
    console.log('trying to send new company-out', company);
    try {
      if (validationResult1 && validationResult2 && company.members.length >= 1) {
        const res = await axios.post(`${BASE_URL}${END_POINT.COMPANY}`, updatedCompany);

        if (res.status === 200 || res.status === 201) {
          console.log('post successful');
          setCompany(initState);
          dispatch(getCompaniesDataAsync(offset, limit, search, type, status));
          setUploadedImage('');
          setInputValue('');
          setActiveStep(0);
          setErrors1({});
          // setErrors2({});
          setValidationResult1(false);
          setValidationResult2(false);
          dispatch(actionSnackBar.setSnackBar('success', 'Successfully created', 2000));
        }
      }
    } catch (err) {
      dispatch(actionSnackBar.setSnackBar('error', 'Creation failed', 2000));
    }
    handleClose();
  };

  return utils ? (
    <Dialog
      className={classes.dialogBox}
      open={open}
      onClose={handleClose}
      classes={{ container: classes.container, paper: classes.contractModalPaper }}
      BackdropProps={{
        classes: {
          root: classes.modalBackDrop,
        },
      }}
    >
      <Grid container justifyContent="center" className={classes.dialogContainer}>
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-end">
                <CloseIcon onClick={handleClose} className={classes.closeIcon} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <SubHeaderModal title="New Company" />
                <Grid item xs={4} />
                {/* <Grid item xs={4}>
                                <Grid container justifyContent='center'>
                                    <BlueBorder />
                                </Grid>                      
                            </Grid> */}
                {/* <Grid item xs={4}>
                                <Grid container justifyContent='flex-end'>
                                    <IconButton className={classes.closeButton} onClick={handleClose}>
                                        <CloseIcon />
                                    </IconButton>     
                                </Grid>         
                            </Grid> */}
                {/* <Grid item xs={12}>
                                <Grid container justifyContent="center">
                                    <Typography className={classes.modalTitle}>
                                    New Company
                                    </Typography>
                                </Grid>
                            </Grid> */}

                <Grid container className={classes.stepperGroup}>
                  <Stepper alternativeLabel activeStep={activeStep} connector={<StepperConnector />}>
                    <Step>
                      <StepLabel StepIconComponent={StepperIcons} onClick={activeStep === 1 ? handleBack : () => {}}>
                        {steps[0]}
                      </StepLabel>
                    </Step>
                    <Step>
                      <StepLabel StepIconComponent={StepperIcons} onClick={activeStep === 0 && validationResult1 ? handleNext : () => {}}>
                        {steps[1]}
                      </StepLabel>
                    </Step>
                  </Stepper>

                  <Grid container className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Grid>
                  <Grid container className={classes.btnRow}>
                    {activeStep === 0 ? (
                      <div></div>
                    ) : (
                      <OutlinedButton onClick={handleBack} className={classes.buttonBack}>
                        {' '}
                        Back{' '}
                      </OutlinedButton>
                    )}
                    {
                      activeStep === 0 ? (
                        <FilledButton onClick={handleNext} className={classes.buttonNext} disabled={!validationResult1}>
                          {' '}
                          Next{' '}
                        </FilledButton>
                      ) : (
                        <FilledButton onClick={handleSubmit} className={classes.buttonNext} disabled={!validationResult2 || company.members.length < 1}>
                          {' '}
                          Create{' '}
                        </FilledButton>
                      )
                      // <FilledButton onClick={handleSubmit} className={classes.buttonNext} disabled = {!validationResult2 || company.members.length < 1}> Create </FilledButton>
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  ) : (
    <Typography>Loading...</Typography>
  );
};

export default NewCompanyStepper;

const useStyles = makeStyles((theme) => ({
  // modalTitle: {
  //     textAlign: 'center',
  //     color: "#868DA2",
  //     fontSize: "24px",
  //     fontWeight: 400,
  //     marginBottom: "1vh",
  //     marginTop: "15px",
  //   },
  // root:{
  //     position: "absolute",
  //     top: "100px",
  //     left: "554px",
  // },
  dialogBox: {
    minWidth: 670,
  },
  dialogContainer: {
    alignContent: 'space-between',
    paddingTop: 30,
    // minWidth: 650,
    // overflowX: "hidden"
  },
  container: {
    margin: '0 auto',
  },
  contractModalPaper: {
    minWidth: 'calc(100vw - 1100px)',
    minHeight: 'calc(100vh - 500px)',
    height: '85vh',
  },
  modalBackDrop: {
    backdropFilter: 'blur(2px)',
    backgroundColor: '#00001e25',
  },
  stepperGroup: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  btnRow: {
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: '5vh',
    width: '75%',
    //margin: "0 auto"
  },
  buttonBack: {
    padding: '7px 40px',
    fontSize: 17,
  },
  buttonNext: {
    padding: '7px 80px',
    fontSize: 17,
  },
  instructions: {
    marginTop: -10,
    marginBottom: theme.spacing(1),
    flexDirection: 'column',
  },
  closeIcon: {
    cursor: 'pointer',
  },
}));
