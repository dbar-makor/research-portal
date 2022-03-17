import React from 'react';

import DateInputUnitView from './DateInputUnit.view';

const DateInputUnit = (props) => {
	const { label, value, onChange } = props;

	const className = props.className ? props.className : '';
	const error = props.error ? props.error : null;
	const datePickerClass = props.datePickerClass ? props.datePickerClass : '';
	const inputVariant = props.inputVariant ? props.inputVariant : 'outlined';
	const iconFontSize = props.iconFontSize ? props.iconFontSize : '18px';

	return (
		<DateInputUnitView
			error={error}
			datePickerClass={datePickerClass}
			inputVariant={inputVariant}
			iconFontSize={iconFontSize}
			className={className}
			label={label}
			value={value}
			onChange={onChange}
		/>
	);
};

DateInputUnit.displayName = 'DateInputUnit';
DateInputUnit.defaultProps = {};

export default React.memo(DateInputUnit);
