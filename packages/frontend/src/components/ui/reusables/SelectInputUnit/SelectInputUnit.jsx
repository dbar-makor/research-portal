import React from 'react';

import SelectInputUnitView from './SelectInputUnit.view';

const SelectInputUnit = (props) => {

  const variant = props.variant ? props.variant : 'outlined';
  const error = props.error ? props.error : null;

  return <SelectInputUnitView
  variant={variant}
  error={error}
  className={props.className}
    name={props.name}
    label={props.label}
    value={props.value}
    onChange={props.onChange}
    optionsArray={props.optionsArray}
    optionLabelField={props.optionLabelField}
    valueField={props.valueField}
    placeholder={props.placeholder}
  />;
};

SelectInputUnit.displayName = 'SelectInputUnit';
SelectInputUnit.defaultProps = {};

export default React.memo(SelectInputUnit);
