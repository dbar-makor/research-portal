import { useEffect } from 'react'
import { Grid, Typography, TextField, Chip, makeStyles } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab/Autocomplete';
import ClearIcon from '@material-ui/icons/Clear';
import { useState} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { StyledTextField, StyledAutoComplete } from '../../styles/MainStyles'
import { validateMember } from "../Reusables/validationFunctions"
import * as utilsAction from '../../redux/utils/utilsSlice'

const filter = createFilterOptions();

function TagsAutoComplete({formObject, 
                            setFormObject,
                            handler, 
                            label = '', 
                            className = '', 
                            chipClassName, 
                            chipContainerClassName,
                            error = null,
                            chipVariant='outlined' }){

    const classes = useStyles();
    const dispatch = useDispatch();
    const tagsArr = useSelector(state => state.utils.utils.tag)
    const tagsArrNames = tagsArr?.map(tag => tag.name)

    const tagIDsArr = tagsArr?.map(item => item.id);
    // const itemIndex = parentArr && parentArr.length && parentArr.findIndex(item => item.id === formObject.id)


  const deleteItem = (index) => {
    const tagsCopy = [...formObject];
    console.log("tagsCopy", tagsCopy)
    tagsCopy.splice(index, 1);  
    setFormObject(tagsCopy);
  };

  return (
    <>
    {tagsArr && <Grid container className={className}>
        <Grid item xs={12}>
          <Typography>{label}</Typography>
        </Grid>
        <Grid item xs={12}>
          <StyledAutoComplete
            className={classes.arrowIcon}
            id="tags"
            name="tags"
            multiple
            filterSelectedOptions
            filterOptions={(options, params) => {
                console.log("params", params)
                const filtered = filter(options, params);
        
                // Suggest the creation of a new value
                if (params.inputValue !== '' && !tagsArrNames.includes(params.inputValue)) {
                    filtered.push({
                    inputValue: params.inputValue,
                    title: `Add "${params.inputValue}"`,
                    });
                }
                return filtered;
                }}
            renderOption={(option) => option.name || option.title}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={tagsArr}
            renderTags={() => <></>}
            fullWidth
            freeSolo
            value={formObject || ""}
            onChange={((e, values) => 
                handler(e, values))}
            {...(error && {error: true, helperText:error})}
            
            // getOptionLabel={(option) => option.name || ""}
            getOptionLabel={(option) => {
                
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.name;
              }}

            getOptionSelected={(option, value) =>
              (option.name === value.name) || (option.name === value)
            }
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  autoComplete="off"
                  variant="outlined"
                  width="100%"
                  placeholder= "# Tags"
                  {...(error && {error: true, helperText:error})}
                />
              );
            }}
          />
          {formObject.length ? (
          // {formObject.members[memberIndex].categories && formObject.members[memberIndex].categories.length ? (
            <Grid item xs={12}>
              <Grid container className={classes.chipContainer}>
                {formObject.map((el, index) => (
                  <Grid
                    item
                    key={index}
                    className={classes.chipItem}
                  >
                    <Chip
                      variant={chipVariant}
                      label={`#${el.name}`}
                      onDelete={() => deleteItem(index)}
                      deleteIcon={<ClearIcon />}
                      className={classes.chip}
                    />
                  </Grid>
                ))}
              </Grid>
              </Grid>
            ) : null}
          
        </Grid>
          </Grid>
 }
    </>
  );
}

export default TagsAutoComplete;

const useStyles = makeStyles({
chipContainer: {
    marginTop: "10px",
    },
chipItem: {
marginBottom: "5px",
marginRight: "3px",
    },
chip: {
backgroundColor: "#EDEFF3",
border: "none"
    },
arrowIcon: {
    "& .MuiSvgIcon-root": {
        color: "#1C67FF",
     },
    },
});
