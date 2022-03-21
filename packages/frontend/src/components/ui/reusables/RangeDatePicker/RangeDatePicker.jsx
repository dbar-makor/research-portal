import React, { useState, useRef, useCallback } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-date-range';
import RangeDatePickerView from './RangeDatePicker.view';

const RangeDatePicker = (props) => {
	const { from, to, setFrom, setTo, max_days_allowed } = props;

	const calendarIconRef = useRef();
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [range, setRange] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);
	const [counter, setCounter] = useState(0);

	const handleSelect = useCallback((item) => {
		setCounter(counter + 1);
		const testStartDate = moment(moment(item.selection.startDate).format('DD/MM/YYYY'), 'DD/MM/YYYY');
		const testEndDate = moment(moment(item.selection.endDate).format('DD/MM/YYYY'), 'DD/MM/YYYY');

		const differenceInDays = moment.duration(testEndDate.diff(testStartDate)).asDays();
		if (differenceInDays <= max_days_allowed) {
			setRange([item.selection]);
			setFrom(moment(item.selection.startDate).format('DD/MM/YYYY'));
			setTo(moment(item.selection.endDate).format('DD/MM/YYYY'));
		} else {
			const modifiedEndDate = moment(
				moment(item.selection.startDate).format('DD/MM/YYYY'),
				'DD/MM/YYYY',
			).add(max_days_allowed, 'days');

			setRange([{ ...item.selection, endDate: modifiedEndDate._d }]);
			setFrom(moment(item.selection.startDate).format('DD/MM/YYYY'));
			setTo(moment(modifiedEndDate).format('DD/MM/YYYY'));
		}

		if (counter === 1) {
			setOpen(false);
			setCounter(0);
		}
	});

	const handleCalendarOpen = useCallback(() => {
		setAnchorEl(calendarIconRef.current);
		calendarIconRef.current && DateRangePicker && setOpen(true);
	});

	const clearInput = useCallback((e) => {
		e.stopPropagation();
		setRange([
			{
				startDate: new Date(),
				endDate: new Date(),
				key: 'selection',
			},
		]);
		setFrom('DD/MM/YYYY');
		setTo('DD/MM/YYYY');
	});

	return (
		<RangeDatePickerView
			from={from}
			to={to}
			handleCalendarOpen={handleCalendarOpen}
      handleSelect={handleSelect}
			clearInput={clearInput}
			anchorEl={anchorEl}
      setOpen={setOpen}
      open={open}
      range={range}
      ref={calendarIconRef}
		/>
	);
};

RangeDatePicker.displayName = 'RangeDatePicker';
RangeDatePicker.defaultProps = {};

export default React.memo(RangeDatePicker);
