import { useState } from 'react'
import { Grid, Typography, TextField, makeStyles, MenuItem } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { StyledTextField } from '../../styles/MainStyles'

function SelectInputUnit({ className, name, label, value, onChange, optionsArray, optionLabelField, valueField, placeholder, error = null, variant = 'outlined', mod }) {
  //optionsArray prop expects an array of objects; in each object: value and label properties:
  // [{value: "...", label: "..."}, {same}, {same}...]
  const classes = useStyles()
  //const [inputValue, setInputValue] = useState("");

  return (
    <Grid container className={className}>
      {/* <Grid item xs={12}>
        <Typography>{label}</Typography>
      </Grid> */}

      <Grid item xs={12}>
        <StyledTextField
          select
          label={label}
          className={classes.arrowIcon}
          name={name}
          value={value}
          onChange={onChange}
          style={{ width: '100%' }}
          variant={variant}
          placeholder={placeholder}
          mode
          InputLabelProps={{
            shrink: false,
          }}
          {...(error && { error: true, helperText: error })}
        >
          {optionsArray.map((option, index) => (
            <MenuItem key={`${option[valueField]}${index}`} value={option[valueField]}>
              {option[optionLabelField]}
            </MenuItem>
          ))}
        </StyledTextField>
      </Grid>
    </Grid>
  )
}

export default SelectInputUnit

const useStyles = makeStyles((theme) => ({
  arrowIcon: {
    '& .MuiSvgIcon-root': {
      color: '#1C67FF',
      //   backgroundColor: "#FFF",
    },
    '& .MuiSelect-nativeInput': {
      //   backgroundColor: "#FFF",
    },
  },
}))
