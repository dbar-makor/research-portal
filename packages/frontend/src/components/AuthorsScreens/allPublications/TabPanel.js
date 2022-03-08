import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';



export default function TabPanel(props) {
    const { children, value, index, ...other } = props;

    const classes = useStyles();

  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3} className={classes.panel}>
           {children}
          </Box>
        )}
      </div>
    );
  };
  
  const useStyles = makeStyles((theme) => ({
    panel:{
      display: "flex",
      flexWrap: "wrap",
    },
  }));