import React from 'react';

import TextInputUnitView from './TextInputUnit.view';

const TextInputUnit = (props) => {
	const { className, name, value, label, onChange } = props;

	const size = props.size ? props.size : 12;
	const error = props.error ? props.error : null;
	const id = props.id ? props.id : null;
	const inputProps = props.inputProps ? props.inputProps : null;
	const InputProps = props.InputProps ? props.InputProps : null;
	const onKeyDown = props.onKeyDown ? props.onKeyDown : null;
	const type = props.type ? props.type : null;

	return (
		<TextInputUnitView
			className={className}
			name={name}
			value={value}
			label={label}
			onChange={onChange}
			size={size}
			error={error}
			id={id}
			inputProps={inputProps}
			InputProps={InputProps}
			onKeyDown={onKeyDown}
			type={type}
		/>
	);
};

TextInputUnit.displayName = 'TextInputUnit';
TextInputUnit.defaultProps = {};

export default React.memo(TextInputUnit);
