import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { StyledAutoComplete } from '../../../../styles/MainStyles';

import useStyles from './AutoCompleteUnit.style';

const AutoCompleteUnitView = (props) => {
	const classes = useStyles();

	return (
		<Grid container className={props.className}>
			<Grid item xs={12}>
				<StyledAutoComplete
					className={classes.arrowIcon}
					name={props.name}
					id={props.name}
					renderTags={() => <></>}
					value={props.formObject.value || props.preChosenValue}
					{...(props.disabled && { disabled: true })}
					popupIcon={
						props.name === 'country' || props.name === 'sales' ? (
							<SearchIcon style={{ color: '#1C67FF' }} />
						) : (
							<ArrowDropDownIcon />
						)
					}
					onChange={(e, newvalue) => props.handler(newvalue, props.name)}
					onInputChange={(event, newInputValue, reason) => {
						if (event === null && reason === 'reset') {
							return;
						} else if (event.type === 'blur' && reason === 'reset') {
							return;
						}
						props.setInputValue(newInputValue);
					}}
					inputValue={props.inputValue}
					style={{ width: '100%' }}
					options={props.options}
					getOptionLabel={(option) => {
						return option[props.fieldForLabel];
					}}
					getOptionSelected={(option, value) => option[props.fieldForLabel] === value[props.fieldForLabel]}
					renderInput={(params) => (
						<TextField
							{...params}
							variant="outlined"
							autoComplete="off"
							placeholder={props.label}
							{...(props.error && { error: true, helperText: props.error })}
						/>
					)}
				/>
			</Grid>
		</Grid>
	);
};

AutoCompleteUnitView.displayName = 'AutoCompleteUnitView';
AutoCompleteUnitView.defaultProps = {};

export default React.memo(AutoCompleteUnitView);
