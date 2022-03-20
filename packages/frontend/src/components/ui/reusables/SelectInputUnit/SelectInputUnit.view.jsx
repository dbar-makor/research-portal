import React from 'react';
import { Grid } from '@material-ui/core';
import { StyledTextField } from '../../../../styles/MainStyles';

import useStyles from './SelectInputUnit.style';

const SelectInputUnitView = (props) => {
  const classes = useStyles();

  return (
		<Grid container className={props.className}>
			<Grid item xs={12}>
				<StyledTextField
					select
					label={props.label}
					className={classes.arrowIcon}
					name={props.name}
					value={props.value}
					onChange={props.onChange}
					style={{ width: '100%' }}
					variant={props.variant}
					placeholder={props.placeholder}
					SelectProps={{
						native: true,
					  }}
					//mode
					InputLabelProps={{
						shrink: false,
					}}
					{...(props.error && { error: true, helperText: props.error })}
				>
					{props.optionsArray.map((option, index) => (
						<option key={`${option[props.valueField]}${index}`} value={option[props.valueField]}>
							{option[props.optionLabelField]}
						</option>
					))}
				</StyledTextField>
			</Grid>
		</Grid>
	);
};

SelectInputUnitView.displayName = 'SelectInputUnitView';
SelectInputUnitView.defaultProps = {};

export default React.memo(SelectInputUnitView);
