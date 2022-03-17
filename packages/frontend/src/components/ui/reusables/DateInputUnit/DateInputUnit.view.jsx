import React from 'react';
import { Grid } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { ReactComponent as IconCalendar } from '../../../../assets/icons/iconCalendar.svg';
import useStyles from './DateInputUnit.style';

const DateInputUnitView = (props) => {
	const classes = useStyles();

  return (
		<Grid container className={props.className}>
			<Grid item xs={12}>
				<KeyboardDatePicker
					{...(props.error && { error: true, helperText: props.error })}
					inputVariant={props.inputVariant}
					invalidDateMessage=""
					variant="inline"
					format="dd/MM/yyyy"
					style={{ width: '100%' }}
					value={props.value}
					onChange={props.onChange}
					autoOk
					placeholder={props.label}
					disableToolbar
					// placdeholder={label}
					className={props.datePickerClass}
					keyboardIcon={
						<IconCalendar style={{ width: props.iconFontSize }} className={classes.calendarIcon} />
					}
				/>
				{/* <Typography variant="caption">
          {label}
        </Typography> */}
			</Grid>
		</Grid>
	);
};

DateInputUnitView.displayName = 'DateInputUnitView';
DateInputUnitView.defaultProps = {};

export default React.memo(DateInputUnitView);
