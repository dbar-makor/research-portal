import { Grid, makeStyles } from '@material-ui/core';
import { StyledTextField } from '../../styles/MainStyles';
const useStyles = makeStyles(() => ({
	arrowIcon: {
		'& .MuiSvgIcon-root': {
			color: '#1C67FF',
		},
		'& .MuiSelect-nativeInput': {},
	},
}));

const SelectInputUnit = ({
	className,
	name,
	label,
	value,
	onChange,
	optionsArray,
	optionLabelField,
	valueField,
	placeholder,
	error = null,
	variant = 'outlined',
}) => {
	const classes = useStyles();
	return (
		<Grid container className={className}>
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
					SelectProps={{
						native: true,
					  }}
					mode
					InputLabelProps={{
						shrink: false,
					}}
					{...(error && { error: true, helperText: error })}
				>
					{optionsArray.map((option, index) => (
						<option key={`${option[valueField]}${index}`} value={option[valueField]}>
							{option[optionLabelField]}
						</option>
					))}
				</StyledTextField>
			</Grid>
		</Grid>
	);
};

export default SelectInputUnit;
