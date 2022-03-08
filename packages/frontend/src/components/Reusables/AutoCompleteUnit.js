import { Grid, Typography, TextField, makeStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { mergeClasses } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { StyledTextField, StyledAutoComplete } from '../../styles/MainStyles'
function AutoCompleteUnit({
  className,
  name,
  label,
  options,
  fieldForLabel,
  handler,
  formObject,
  preChosenValue,
  error = null,
  disabled = null,
  inputValue = '' ,
  setInputValue=()  => {} 
 
}) {
  
  const classes = useStyles();
  //const [inputValue, setInputValue] = useState('');


  return (
    <Grid container className={className}>
      <Grid item xs={12}>
        <StyledAutoComplete
          className={classes.arrowIcon}
          name={name}
          id={name}
          renderTags={() => <></>}
          value={formObject.value || preChosenValue}
          {...(disabled && {disabled: true})}
          popupIcon={
            name === "country" || name === "sales" ? (
              <SearchIcon style={{ color: "#1C67FF" }} />
            ) : (
              <ArrowDropDownIcon />
            )
          }
          onChange={(e, newvalue) => handler(newvalue, name)}
          onInputChange={(event, newInputValue, reason) => {
            if(event === null && reason === 'reset') {
               return;
            } else if (event.type === 'blur' && reason === 'reset') {
              return;
            }
            setInputValue(newInputValue);      
          }
        }
          inputValue={inputValue}
          style={{ width: "100%" }}
          options={options}
          getOptionLabel={(option) => {
            return option[fieldForLabel]
            }
          }
          getOptionSelected={(option, value) =>
            option[fieldForLabel] === value[fieldForLabel]
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              autoComplete="off"
              placeholder={label}
              {...(error && {error: true, helperText:error})}
              
            />
          )}
        />
      </Grid>
    </Grid>
  );
}

export default AutoCompleteUnit;

const useStyles = makeStyles((theme) => ({
  arrowIcon: {
    '& .MuiSvgIcon-root': {
      color: '#1C67FF',
    },
  },
}));
