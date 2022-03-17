import React from 'react';
import { validateMember } from '../../../../utils/helpers/validationFunctions';

import CategoriesAutoCompleteView from './CategoriesAutoComplete.view';

const CategoriesAutoComplete = (props) => {
	const { formObject, setFormObject, handler } = props;
	const label = props.label ? props.label : '';
	const className = props.className ? props.className : '';
	const error = props.error ? props.error : null;
	const errors = props.errors ? props.errors : null;
	const setErrors = props.setErrors ? props.setErrors : () => {};
	const setValidationResult = props.setValidationResult ? props.setValidationResult : () => {};
	const setParentArr = props.setParentArr ? props.setParentArr : () => {};
	const parentArr = props.parentArr ? props.parentArr : null;
	const chipVariant = props.chipVariant ? props.chipVariant : 'outlined';

	const itemIndex =
		parentArr && parentArr.length && parentArr.findIndex((item) => item.id === formObject.id);

	//always an arr:
	const adjustedFormObject = formObject.categories ? formObject.categories : formObject;

	const deleteItem = (index) => {
		const categoryCopy = [...adjustedFormObject];
		categoryCopy.splice(index, 1);
		const formObjectCopy = { ...formObject, categories: categoryCopy };

		setFormObject(formObjectCopy);
		if (parentArr?.length) {
			const parentArrCopy = [...parentArr];
			parentArrCopy.splice(itemIndex, 1, formObjectCopy);
			setParentArr(parentArrCopy);
		}
		errors && validateMember({ categories: categoryCopy }, errors, setErrors, setValidationResult);
	};

	return <CategoriesAutoCompleteView
  label={label}
  className={className}
  handler={handler}
  formObject={formObject}
  error={error}
  adjustedFormObject={adjustedFormObject}
  chipVariant={chipVariant}
  deleteItem={deleteItem}

  />;
};

CategoriesAutoComplete.displayName = 'CategoriesAutoComplete';
CategoriesAutoComplete.defaultProps = {};

export default React.memo(CategoriesAutoComplete);
