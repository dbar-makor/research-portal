import React from 'react';

import TagsAutoCompleteView from './TagsAutoComplete.view';

const TagsAutoComplete = (props) => {
	const { formObject, setFormObject, handler } = props;
	const className = props.className ? props.className : '';
	const label = props.label ? props.label : '';
	const error = props.error ? props.error : null;
	const chipVariant = props.chipVariant ? props.chipVariant : 'outlined';

	const deleteItem = (index) => {
		const tagsCopy = [...formObject];
		tagsCopy.splice(index, 1);
		setFormObject(tagsCopy);
	};

	return (
		<TagsAutoCompleteView
			deleteItem={deleteItem}
			className={className}
			label={label}
			formObject={formObject}
			error={error}
			handler={handler}
			chipVariant={chipVariant}
		/>
	);
};

TagsAutoComplete.displayName = 'TagsAutoComplete';
TagsAutoComplete.defaultProps = {};

export default React.memo(TagsAutoComplete);
