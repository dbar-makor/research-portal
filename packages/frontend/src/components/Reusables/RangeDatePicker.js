import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Input, InputAdornment, Popover } from '@material-ui/core';
import { ReactComponent as Calendar } from '../../assets/icons/iconCalendar.svg';
import { DateRangePicker } from 'react-date-range';
import ClearIcon from '@material-ui/icons/Clear';
import { useStyles } from '../../styles/MainStyles';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';
import clsx from 'clsx';

// const max_days_allowed = 7

export default function RangeDatePicker(props) {
  const { from, to, setFrom, setTo, max_days_allowed, renderFrom } = props;
  const stylingProps = {
    clearable: from !== 'DD/MM/YYYY' && to !== 'DD/MM/YYYY' && from && to,
  };
  const classes = useStyles(stylingProps);
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

  const handleSelect = (item) => {
    setCounter(counter + 1);
    let testStartDate = moment(moment(item.selection.startDate).format('DD/MM/YYYY'), 'DD/MM/YYYY');
    let testEndDate = moment(moment(item.selection.endDate).format('DD/MM/YYYY'), 'DD/MM/YYYY');

    let differenceInDays = moment.duration(testEndDate.diff(testStartDate)).asDays();
    if (differenceInDays <= max_days_allowed) {
      setRange([item.selection]);
      setFrom(moment(item.selection.startDate).format('DD/MM/YYYY'));
      setTo(moment(item.selection.endDate).format('DD/MM/YYYY'));
    } else {
      let modifiedEndDate = moment(moment(item.selection.startDate).format('DD/MM/YYYY'), 'DD/MM/YYYY').add(max_days_allowed, 'days');

      setRange([{ ...item.selection, endDate: modifiedEndDate._d }]);
      setFrom(moment(item.selection.startDate).format('DD/MM/YYYY'));
      setTo(moment(modifiedEndDate).format('DD/MM/YYYY'));
    }

    if (counter === 1) {
      setOpen(false);
      setCounter(0);
    }
  };

  const handleCalanderOpen = (e) => {
    setAnchorEl(calendarIconRef.current);
    calendarIconRef.current && DateRangePicker && setOpen(true);
  };

  const clearInput = (e) => {
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
  };

  return (
    <React.Fragment>
      <Input
        className={classes.dateRangeInputFilter}
        disabled={true}
        autoComplete="off"
        id="date-range"
        placeholder="dd/mm/yy - dd/mm/yy"
        value={from !== 'DD/MM/YYYY' && to !== 'DD/MM/YYYY' && from && to ? `${from} - ${to}` : ''}
        // error={error}
        onClick={(e) => {
          handleCalanderOpen(e);
        }}
        endAdornment={
          <InputAdornment position="start" style={{ marginLeft: -5 }}>
            <ClearIcon onClick={(e) => clearInput(e)} />
            <IconButton
              id="calendarIcon"
              // onClick={(e) => {
              //   handleCalanderOpen(e)
              // }}
              ref={calendarIconRef}
            >
              <Calendar className={classes.calendar} />
            </IconButton>
          </InputAdornment>
        }
        varient="outlined"
      />
      <Popover
        open={open}
        anchorEl={anchorEl && anchorEl}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <DateRangePicker
          ranges={range}
          onChange={(item) => handleSelect(item)}
          moveRangeOnFirstSelection={false}
          // retainEndDateOnFirstSelection={true}
          //   disabledDay={(item) => {
          //   }}
          editableDateInputs={true}
          fixedHeight={true}
          months={1}
          direction="horizontal"
          preventSnapRefocus={true}
          calendarFocus="backwards"
          maxDate={new Date()}
          className={classes.dateRangePopover}
          staticRanges={[]}
          inputRanges={[]}
          rangeColors={['#1C67FF']}
        />
      </Popover>
    </React.Fragment>
  );
}
