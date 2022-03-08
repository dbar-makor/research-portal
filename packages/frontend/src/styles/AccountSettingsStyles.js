import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  chosenRoute: {
    marginTop: 29,
    color: '#1C67FF',
    backgroundColor: '#e0ebfc',
    cursor: 'pointer',
  },
  notChosen: {
    marginTop: 29,
    color: '#000000',
    backgroundColor: 'none',
    cursor: 'pointer',
  },
  iconOn: {
    color: '#1C67FF',
    display: 'flex',
    alignSelf: 'center',
    paddingInline: '24px 10px',
  },
  icon: {
    color: '#B8C3D8',
    display: 'flex',
    alignSelf: 'center',
    paddingInline: '24px 10px',
  },
}));
