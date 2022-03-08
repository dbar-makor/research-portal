import { TextField, Button, withStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export const CssTextField = withStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#262626',
      borderRadius: 0,
      color: '#B6B6B6',
      '&:hover': {
        backgroundColor: '#212121'
      },
      '& fieldset': {
        borderColor: '#212121'
      },
      '&:hover fieldset': {
        border: '1px solid #212121'
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #212121'
      },
      '&.MuiOutlinedInput-adornedEnd': {
        paddingRight: 8
      }
    },
    '& .MuiOutlinedInput-root.Mui-error': {
      '& fieldset': {
        borderColor: '#FF0221'
      },
      '&:hover fieldset': {
        border: '1px solid #FF0221'
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #FF0221'
      }
    },
    '& .MuiOutlinedInput-inputMarginDense': {
      padding: '8.6px'
    },
    '& .MuiFormHelperText-contained': {
      color: '#FF0221',
      marginLeft: 0
    }
  }
}))(TextField)

export const useStyles = makeStyles((theme) => ({
  shakeForm: {
    animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    perspective: '1000px'
  },
  numericInput: {
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none'
    },
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    }
  },
  numericInputs: {
    '&:*': {
      padding: 50
    }
  },
  paddingTop20: {
    paddingTop: 20
  },
  marginTop30vh: {
    marginTop: '30vh'
  },
  marginTop5px: {
    marginTop: 5
  },
  marginTop10px: {
    marginTop: 10
  },
  marginTop15px: {
    marginTop: 15
  },
  marginTop30px: {
    marginTop: 30
  },
  marginTop20px: {
    marginTop: 20
  },
  marginTop66: {
    marginTop: 66
  },
  noPadding: {
    padding: 0
  },
  circularProgress: {
    color: 'white'
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    cursor: 'pointer'
  },
  fullWidth: {
    width: '100%'
  },
  endAdornmentButton: {
    width: 15,
    height: 15
  },
  informationTitles: {
    color: '#E6E6E6',
    fontSize: '15px'
  },
  centeredTitles: {
    color: '#E6E6E6',
    fontSize: '15px',
    textAlign: 'center'
  },
  stringBtns: {
    color: '#03A9F4',
    cursor: 'pointer',
    fontWeight: 500,
    paddingBottom: 20
  },
  typography300: {
    fontWeight: 300
  },
  typoghraphy600: {
    fontWeight: 600,
    color: '#FFFFFF'
  },
  suspiciousTitle: {
    fontSize: '25px',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  identityHeader: {
    fontSize: '25px',
    color: '#FFFFFF',
    marginBottom: '15px'
  },
  securityHeader: {
    fontSize: '25px',
    color: '#E6E6E6',
    textTransform: 'capitalize'
  },
  boldTextStyle: {
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  errorTextStyle: {
    fontSize: 11,
    color: '#B71C1C',
    fontWeight: 500
  },
  flexContainers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#FFFFFF'
  },
  flexContainers30: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#FFFFFF',
    paddingTop: '30px'
  },
  flexContainers3010: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#FFFFFF',
    paddingTop: '30px',
    paddingBottom: '10px'
  },
  hiddenEmail: {
    fontWeight: '600',
    fontSize: '17px',
    textAlign: 'center',
    color: '#E6E6E6',
    marginTop: '15px'
  },
  reportSvg: {
    width: 105,
    color: '#FF0000'
  },
  noNotificationTypoghraphy: {
    color: '#FFFFFF',
    fontStyle: 'italic'
  },
  divider: {
    width: '100%',
    margin: '20px 0',
    background: '#E6E6E6'
  },
  timeSvg: {
    width: 105
  },
  wrongSvg: {
    width: 105,
    color: '#E87D11'
  },
  timeOut: {
    fontSize: '25px',
    color: '#FFFFFF'
  },
  digitGrid: {
    paddingTop: '30px'
  },
  additionalSecurityGrid: {
    padding: '30px 0 15px 0'
  },
  loginCaptionTextStyle: {
    width: '279px',
    fontWeight: 300,
    textAlign: 'center'
  },
  underOtpConfirmClock: {
    [theme.breakpoints.down('sm')]: {
      marginRight: '3vw'
    },
    [theme.breakpoints.up('sm')]: {
      marginRight: '15px'
    }
  },
  loginGridPadding: {
    [theme.breakpoints.up('xl')]: {
      padding: '0px 15px'
    }
  },
  emailConfirmContainerGrid: {
    [theme.breakpoints.up('xs')]: {
      padding: '0px 15vw'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0px 40px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0px 65px'
    },
    [theme.breakpoints.up('xl')]: {
      padding: '0px 130px'
    }
  },
  securityContainerGrid: {
    [theme.breakpoints.up('xs')]: {
      padding: '0px 9vw'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0px 20px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0px 65px'
    },
    [theme.breakpoints.up('xl')]: {
      padding: '0px 120px'
    }
  },
  errorContainer: {
    [theme.breakpoints.up('xs')]: {
      padding: '0px 9vw'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '60px 80px'
    }
  },
  // ---------------------------
  desktopLoginContainer: {
    backgroundColor: '#171717',
    marginTop: '11vh',
    marginBottom: '11vh',
    height: '570px',
    padding: '82px 0',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '580px'
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '720px'
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: '820px'
    }
  },
  mobileLoginContainer: {
    backgroundColor: '#171717',
    marginTop: '4vh',
    marginBottom: '4vh',
    minHeight: '92vh',
    padding: '62px 0'
  },
  desktopVerificationContainer: {
    backgroundColor: '#171717',
    marginTop: '11vh',
    marginBottom: '11vh',
    height: '570px',
    padding: '82px 80px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '580px'
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '720px'
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: '820px'
    }
  },
  mobileVerificationContainer: {
    backgroundColor: '#171717',
    marginTop: '4vh',
    marginBottom: '4vh',
    minHeight: '92vh',
    padding: '62px 0'
  },
  passwordVisibility: {
    color: '#b6b6b6'
  },
  mainTitle: {
    color: '#000000'
  },
  desktopLoginContainer: {
    marginTop: '11vh',
    marginBottom: '11vh',
    height: '570px',
    padding: '82px 0',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '580px'
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '720px'
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: '820px'
    }
  },
  loginCaptionTextStyle: {
    fontSize: 13,
    color: '#6b6b6b'
  },
  loginBtn: {
    backgroundColor: '#0696d6',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#03A9F4',
    },
    '&:disabled': {
      color: '#E6E6E6',
      backgroundColor: '#6b6b6b'
    }

  }
}))

export const CustomButton = withStyles({
  root: {
    backgroundColor: '#03A9F4',
    color: '#FFFFFF',
    width: 225,
    borderRadius: 3,
    textTransform: 'Capitalize',
    '&:hover': {
      backgroundColor: '#0696d6'
    },
    '&:disabled': {
      backgroundColor: '#6b6b6b'
    }
  }
})(Button)
