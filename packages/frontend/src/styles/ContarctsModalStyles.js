import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  contractModalPaper: {
    minWidth: 'calc(100vw - 966px)',
    minHeight: 'calc(100vh - 200px)',
    overflow: 'hidden',
  },
  modalBackDrop: {
    backdropFilter: 'blur(2px)',
    backgroundColor: 'rgba(0,0,30,0.4)',
  },
  mainWrapper:{
    flexWrap: "wrap",
  },
  blueShape: {
    backgroundColor: '#1C67FF',
    borderRadius: '8px',
    height: '10px',
    width: '50px',
    marginBottom: '10px',
  },
  modalHeader: {
    fontSize: '24px',
    textAlign: 'center',
    fontWeight: 200,
    color: '#868DA2',
    marginBottom: '6px',
  },
  modalSubHeader: {
    fontSize: '18px',
    textAlign: 'center',
    color: '#1C67FF',
  },
  sortSelect: {
    maxWidth: '100%',
    color: '#bababa',
    fontSize: 16,
    textAlign: 'left',
    backgroundColor: '#fffff',
    border: '1px solid #A5AFC233',
    borderRadius: '8px',
    '& .MuiSelect-icon': {
      color: '#007FFF',
      fontSize: 20,
      top: 'calc(50% - 10px)',
      right: 4,
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: '#ffffff',
    },
    '& .MuiSelect-selectMenu': {
      borderColor: 'none',
    },
  },
  sortDropdownStyle: {
    border: 'none',
    borderRadius: '0px',
    color: '#bababa',
    backgroundColor: '#fffff',
    marginTop: 35,
    transition: 0,
    '& .MuiListItem-root.Mui-selected': {
      color: '#007FFF',
      backgroundColor: '#ffffff',
    },
  },
  collapseTableHeaders: {
    color: '#868DA2',
  },
  paymentBar: {
    margin: '0px auto',
    height: '33px',
    width: '108px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: '5px',
    borderRadius: '4px',
    backgroundColor: '#dbe7ff',
  },
  progressBar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  popHeaders: {
    fontSize: '12px',
    color: '#B8C3D8',
  },
  popContent: {
    fontSize: '12px',
    color: '#0F0F0F',
    cursor: 'pointer',
  },
}));



export const StyledTextField = withStyles({
  root: {
    width: '120px',
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      '& fieldset': {
        borderColor: '#EDEFF3',
      },
      '&:hover fieldset': {
        border: '1px solid #EDEFF3',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #EDEFF3',
      },
      '& .MuiSelect-select:focus': {
        backgroundColor: 'transparent',
        borderRadius: '8px',
      },
      
    },
    '& .MuiOutlinedInput-input': {
      padding: '11px',
      '&::placeholder': {
        color: '#868DA2',
        opacity: 1,
      },
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(12px, 12px) scale(1)',
    },
  },
})(TextField);