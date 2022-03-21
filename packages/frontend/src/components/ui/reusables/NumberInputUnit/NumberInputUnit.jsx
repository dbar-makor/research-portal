import React from 'react';

import NumberInputUnitView from './NumberInputUnit.view';

const NumberInputUnit = (props) => {
	const error = props.error ? props.error : null;
	return (
		<NumberInputUnitView
			className={props.className}
			name={props.name}
			value={props.value}
			onChange={props.onChange}
			placeholder={props.label}
			InputProps={props.InputProps}
			error={error}
		/>
	);
};

NumberInputUnit.displayName = 'NumberInputUnit';
NumberInputUnit.defaultProps = {};

export default React.memo(NumberInputUnit);
