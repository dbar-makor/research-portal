import { Grid, Typography, TextField, InputAdornment, makeStyles } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { ReactComponent as IconCalendar } from '../../assets/icons/iconCalendar.svg';
//import {validateEndDate} from "../Reusables/validationFunctions";

function DateInputUnit({
	className = '',
	label,
	value,
	onChange,
	error = null,
	datePickerClass = '',
	inputVariant = 'outlined',
	iconFontSize = '18px',
}) {
	const classes = useStyles();
	return (
		<Grid container className={className}>
			<Grid item xs={12}>
				<KeyboardDatePicker
					{...(error && { error: true, helperText: error })}
					inputVariant={inputVariant}
					invalidDateMessage=""
					variant="inline"
					format="dd/MM/yyyy"
					style={{ width: '100%' }}
					value={value}
					onChange={onChange}
					autoOk
					placeholder={label}
					disableToolbar
					// placdeholder={label}
					className={datePickerClass}
					keyboardIcon={
						<IconCalendar style={{ width: iconFontSize }} className={classes.calendarIcon} />
					}
				/>
				{/* <Typography variant="caption">
          {label}
        </Typography> */}
			</Grid>
		</Grid>
	);
}

export default DateInputUnit;

export const useStyles = makeStyles((theme) => ({
	calendarIcon: {
		'& g': {
			'& path': {
				stroke: '#1C67FF',
			},
		},
	},
}));
