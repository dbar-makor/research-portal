import React from 'react';
import { Grid, TextField } from '@material-ui/core';

const NumberInputUnitView = (props) => {

  return (
		<Grid container className={props.className}>
			<Grid item xs={12}>
				<TextField
					name={props.name}
					value={props.value}
					onChange={props.onChange}
					style={{ width: '100%' }}
					variant="outlined"
					placeholder={props.label}
					InputProps={props.InputProps}
					{...(props.error && { error: true, helperText: props.error })}
				/>
			</Grid>
		</Grid>
	);
};

NumberInputUnitView.displayName = 'NumberInputUnitView';
NumberInputUnitView.defaultProps = {};

export default React.memo(NumberInputUnitView);
