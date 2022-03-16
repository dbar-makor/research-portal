import React from 'react';
import ButtonRowView from './ButtonRow.view';

const ButtonRow = (props) => {
	const { validationResult, handlerRight, textButtonRight, style } = props;
	const handlerLeft = props.handlerLeft ? props.handlerLeft : () => {};
	const textButtonLeft = props.textButtonLeft ? props.textButtonLeft : '';
	return (
		<ButtonRowView
			validationResult={validationResult}
			handlerRight={handlerRight}
			textButtonRight={textButtonRight}
			style={style}
			handlerLeft={handlerLeft}
			textButtonLeft={textButtonLeft}
		></ButtonRowView>
	);
};

ButtonRow.displayName = 'ButtonRow';
ButtonRow.defaultProps = {};

export default React.memo(ButtonRow);
