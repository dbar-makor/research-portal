import React from 'react';

import NumberFormatCustomView from './NumberFormatCustom.view';
import PropTypes from 'prop-types';

const NumberFormatCustom = (props) => {
	const { inputRef, onChange, decimalNo, minValue, ...other } = props;

	return (
		<NumberFormatCustomView
			inputRef={inputRef}
			onChange={onChange}
			decimalNo={decimalNo}
			minValue={minValue}
			{...other}
		></NumberFormatCustomView>
	);
};

NumberFormatCustom.displayName = 'NumberFormatCustom';
NumberFormatCustom.defaultProps = {};
NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	decimalNo: PropTypes.number.isRequired,
	minValue: PropTypes.number.isRequired,
};
export default React.memo(NumberFormatCustom);
