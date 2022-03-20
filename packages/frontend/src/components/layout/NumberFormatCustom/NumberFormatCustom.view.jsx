import React from 'react';
import NumberFormat from 'react-number-format';

//import useStyles from './NumberFormatCustom.style';

const NumberFormatCustomView = (props) => {

  return (
		<NumberFormat
			{...props.other}
			isAllowed={(values) => {
				const { formattedValue, floatValue } = values;
				return formattedValue === '' || floatValue >= props.minValue;
			}}
			value={props.value}
			allowNegative={false}
			defaultValue={props.value}
			decimalScale={props.decimalNo}
			getInputRef={props.inputRef}
			onValueChange={(values) => {
				props.onChange({
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

NumberFormatCustomView.displayName = 'NumberFormatCustomView';
NumberFormatCustomView.defaultProps = {};


export default React.memo(NumberFormatCustomView);
