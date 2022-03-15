import { memo } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const NumberFormatCustom = (props) => {
	const { inputRef, onChange, decimalNo, minValue, ...other } = props;

	return (
		<NumberFormat
			{...other}
			isAllowed={(values) => {
				const { formattedValue, floatValue } = values;
				return formattedValue === '' || floatValue >= minValue;
			}}
			value={props.value}
			allowNegative={false}
			defaultValue={props.value}
			decimalScale={decimalNo}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						value: values.value,
						name: props.name,
					},
				});
			}}
			thousandSeparator
			isNumericString
		/>
	);
};

NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	decimalNo: PropTypes.number.isRequired,
	//maxValue: PropTypes.number.isRequired,
	minValue: PropTypes.number.isRequired,
};
export default memo(NumberFormatCustom);
