import { useEffect } from 'react'
import { Grid, Typography, TextField, Chip, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import ClearIcon from '@material-ui/icons/Clear';
import { useState} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { StyledTextField, StyledAutoComplete } from '../../styles/MainStyles'
import { validateMember } from "../Reusables/validationFunctions"


function CategoriesAutoComplete({formObject, 
                                 setFormObject,
                                 handler, 
                                 label = '', 
                                 className = '', 
                                 chipClassName, 
                                 chipContainerClassName,
                                 error = null,
                                 errors = null,
                                 setErrors = () => {},
                                 setValidationResult = () => {},
                                 additionalParameter = null,
                                 parentArr = null,
                                 setParentArr = () => {},
                                chipVariant='outlined' }){

    const classes = useStyles();
    const dispatch = useDispatch();
    const categoriesArr = useSelector(state => state.utils.utils.category)

 

  useEffect(() => {
    
    return () => {
    console.log("autocom unmounted")
    }
  }, [])

    const categoriesIDSArr = categoriesArr?.map(item => item.id);
    const itemIndex = parentArr && parentArr.length && parentArr.findIndex(item => item.id === formObject.id)

 //always an arr:
 const adjustedFormObject = formObject.categories ? formObject.categories : formObject;

  const deleteItem = (index) => {
    const categoryCopy  = [...adjustedFormObject];
    categoryCopy.splice(index, 1);
    const formObjectCopy = {...formObject, categories: categoryCopy}
  
    setFormObject(formObjectCopy);
    if (parentArr?.length) {
      const parentArrCopy = [...parentArr]
      parentArrCopy.splice(itemIndex, 1, formObjectCopy)
      setParentArr(parentArrCopy)
    }
    errors && validateMember({categories: categoryCopy}, errors, setErrors, setValidationResult)
  };
 
  return (
    <>
    {categoriesArr && <Grid container className={className}>
        {label && 
          <Grid item xs={12}>
            <Typography>{label}</Typography>
          </Grid>
        }
        <Grid item xs={12}>
          <StyledAutoComplete
            className={classes.arrowIcon}
            id="categories"
            name="categories"
            multiple
            filterSelectedOptions
            options={categoriesArr}
            renderTags={() => <></>}
            fullWidth
            value={formObject.categories ? formObject.categories : formObject || ""}
           
            onChange={((e, values) => handler(values))}
            {...(error && {error: true, helperText:error})}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            // inputValue={inputValue}
            getOptionLabel={(option) => option.name || ""}
            getOptionSelected={(option, value) =>
              option.name === value.name
            }
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  autoComplete="off"
                  variant="outlined"
                  width="100%"
                  placeholder="Categories"
                  {...(error && {error: true, helperText:error})}
                />
              );
            }}
          />
          {adjustedFormObject.length ? (
          // {formObject.categories && formObject.categories.length ? (
          // {formObject.members[memberIndex].categories && formObject.members[memberIndex].categories.length ? (
            <Grid item xs={12}>
              <Grid container className={classes.chipContainer}>
                {adjustedFormObject.map((el, index) => (
                  <Grid
                    item
                    key={index}
                    className={classes.chipItem}
                  >
                    <Chip
                      variant={chipVariant}
                      label={el.name}
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

export default CategoriesAutoComplete;

const useStyles = makeStyles((theme) => ({
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
}));
