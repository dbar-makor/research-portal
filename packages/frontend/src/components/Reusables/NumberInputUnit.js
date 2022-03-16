import { Grid, TextField } from '@material-ui/core';

const NumberInputUnit = ({ className, name, label, value, onChange, InputProps, error = null }) => {
	return (
		<Grid container className={className}>
			<Grid item xs={12}>
				<TextField
					name={name}
					value={value}
					onChange={onChange}
					style={{ width: '100%' }}
					variant="outlined"
					placeholder={label}
					InputProps={InputProps}
					{...(error && { error: true, helperText: error })}
				/>
			</Grid>
		</Grid>
	);
};

export default NumberInputUnit;
