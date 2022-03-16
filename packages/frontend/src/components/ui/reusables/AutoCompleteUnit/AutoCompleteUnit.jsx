import React from 'react';

import AutoCompleteUnitView from './AutoCompleteUnit.view';

const AutoCompleteUnit = (props) => {
  return (<AutoCompleteUnitView
  className={props.className}
	name={props.name}
	label={props.label}
	options={props.options}
	fieldForLabel={props.fieldForLabel}
	handler={props.handler}
	formObject={props.formObject}
	preChosenValue={props.preChosenValue}
	error = {props.error ? props.error : null}
	disabled = {props.disabled ? props.disabled : null}
	inputValue = {props.inputValue ? props.inputValue : '' }
	setInputValue = {props.setInputValue ? props.setInputValue : () => {}}
  />);
};


AutoCompleteUnit.displayName = 'AutoCompleteUnit';
AutoCompleteUnit.defaultProps = {};

export default React.memo(AutoCompleteUnit);
