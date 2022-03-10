//import NewNewCompanyStepper from "../SalesScreens/NewCompanyStepper";
import clsx from 'clsx';
import { isValid, format } from 'date-fns';

export function validateCompany(fieldValues, errors, setErrors, setValidationResult, company) {
	const temp = { ...errors };

	if ('name' in fieldValues) {
		temp.name = fieldValues.name ? '' : 'This field is required';
	}

	if ('type' in fieldValues) {
		temp.type = fieldValues.type.length > 0 ? '' : 'This field is required';
	}

	if ('country' in fieldValues) {
		temp.country = fieldValues.country ? '' : 'This field is required';
	}

	if ('start_at' in fieldValues) {
		if (fieldValues['start_at']) {
			temp['start_at'] = '';
		} else {
			temp['start_at'] = 'This field is required';
		}

		if (isValid(new Date(fieldValues['start_at']))) {
			temp['start_at'] = '';
		} else {
			temp['start_at'] = 'Date is invalid';
		}
	}

	if ('end_at' in fieldValues) {
		if (fieldValues['end_at']) {
			temp['end_at'] = '';
		} else {
			temp['end_at'] = 'This field is required';
		}

		if (isValid(new Date(fieldValues['end_at']))) {
			temp['end_at'] = '';
		} else {
			temp['end_at'] = 'Date is invalid';
		}
	}

	if ('start_at' in temp && 'end_at' in fieldValues) {
		if (
			isValid(new Date(company['start_at'])) &&
			isValid(new Date(fieldValues['end_at'])) &&
			company['start_at'].getTime() > fieldValues['end_at'].getTime()
		) {
			temp['end_at'] = 'End date must be later than start date';
		} else {
			temp['end_at'] = '';
		}
	}

	setErrors({ ...temp });
	const allFields =
		company.type === 'prospect'
			? ['name', 'country', 'type', 'start_at', 'end_at']
			: ['name', 'country', 'type', 'start_at'];
	const tempResult1 = allFields.every((field) => Object.keys(temp).includes(field));
	const tempResult2 = Object.values(temp).every((x) => x === '');

	const result = tempResult1 && tempResult2;
	setValidationResult(result);
}

export function validateMember(fieldValues, errors, setErrors, setValidationResult) {
	const temp = { ...errors };
	const someFields = ['member_name', 'username', 'position'];
	const allFields = ['member_name', 'username', 'email', 'position', 'categories'];

	someFields.forEach((field) => {
		if (field in fieldValues) {
			temp[field] = fieldValues[field] ? '' : 'This field is required';
		}
	});

	if ('email' in fieldValues) {
		const pattern =
			/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (fieldValues.email) {
			temp.email = '';
		} else {
			temp.email = 'This field is required';
		}
		if (fieldValues.email && pattern.test(fieldValues.email.toLowerCase())) {
			temp.email = '';
		} else {
			temp.email = 'Email is invalid';
		}
	}

	if ('categories' in fieldValues) {
		temp.categories = fieldValues.categories.length >= 1 ? '' : 'This field is required';
	}

	setErrors({ ...temp });
	const tempResult1 = allFields.every((field) => Object.keys(temp).includes(field));
	const tempResult2 = Object.values(temp).every((x) => x === '');
	//const tempResult3 = (company.members > 1) && ()

	const result = tempResult1 && tempResult2;
	setValidationResult(result);
}

export function validateContract(fieldValues, errors, setErrors, setValidationResult) {
	const temp = { ...errors };
	const someFields = ['currency', 'amount', 'periodicity', 'members'];
	const allFields = ['sales', 'currency', 'amount', 'periodicity', 'members'];

	someFields.forEach((field) => {
		if (field in fieldValues) {
			temp[field] = fieldValues[field] ? '' : 'This field is required';
		}
	});

	temp['sales'] = '';

	if ('sales' in fieldValues) {
		temp.sales = fieldValues.sales ? '' : 'This field is required';
	}

	temp['start_at'] = '';

	if ('start_at' in fieldValues) {
		temp.start_at = fieldValues.start_at ? '' : 'This field is required';

		if (isValid(new Date(fieldValues.start_at))) {
			temp.start_at = '';
			console.log('inside is valid');
			if (!fieldValues.start_at) {
				temp.start_at = 'This field is required';
			}
		} else {
			temp.start_at = 'Date is invalid';
		}
	}

	setErrors({ ...temp });
	const tempResult1 = allFields.every((field) => Object.keys(temp).includes(field));
	const tempResult2 = Object.values(temp).every((x) => x === '');
	const result = tempResult1 && tempResult2;
	setValidationResult(result);
}

export function validateEditedContract(fieldValues, errors, setErrors, setValidationResult) {
	const temp = { ...errors };
	const someFields = ['currency', 'amount', 'periodicity', 'members'];
	const allFields = ['sales', 'currency', 'amount', 'periodicity', 'members'];

	someFields.forEach((field) => {
		if (field in fieldValues) {
			temp[field] = fieldValues[field] ? '' : 'This field is required';
		}
	});

	temp['sales'] = '';

	if ('sales' in fieldValues) {
		temp.sales = fieldValues.sales ? '' : 'This field is required';
	}

	temp['start_at'] = '';

	if ('start_at' in fieldValues) {
		temp.start_at = fieldValues.start_at ? '' : 'This field is required';

		if (isValid(new Date(fieldValues.start_at))) {
			temp.start_at = '';
			console.log('inside is valid');
			if (!fieldValues.start_at) {
				temp.start_at = 'This field is required';
			}
		} else {
			temp.start_at = 'Date is invalid';
		}
	}

	setErrors({ ...temp });
	const result = Object.values(temp).every((x) => x === '');
	setValidationResult(result);
}

export function validateLogin(fieldValues, errors, setErrors, validationResult, setValidationResult) {
	const temp = { ...errors };
	const allFields = ['username', 'password'];

	if ('username' in fieldValues) {
		temp['username'] = fieldValues['username'] ? '' : 'This field is required';
	}

	if ('password' in fieldValues) {
		if (fieldValues['password']) {
			temp['password'] = '';
		} else {
			temp['password'] = 'This field is required';
		}

		if (fieldValues['password'] && fieldValues['password'].length >= 6) {
			temp['password'] = '';
		} else {
			temp['password'] = 'Password is too short';
		}
	}

	setErrors({ ...temp });
	const tempResult1 = allFields.every((field) => Object.keys(temp).includes(field));
	const tempResult2 = Object.values(temp).every((x) => x === '');

	const result = tempResult1 && tempResult2;
	setValidationResult(result);
}

export function validateProspectTrial(fieldValues, errors, setErrors, trial) {
	console.log('fieldValues', fieldValues);
	console.log('trial', trial);
	console.log('IM HERE');
	const temp = { ...errors };

	if ('sales_agent' in fieldValues) {
		console.log('fieldValuesfieldValues', fieldValues);
		temp.sales_agent = fieldValues.sales_agent ? '' : 'This field is required';
	}

	if ('start_at' in fieldValues) {
		console.log('"start_at" in fieldValues');
		if (fieldValues['start_at']) {
			temp['start_at'] = '';
		} else {
			temp['start_at'] = 'This field is required';
		}

		if (isValid(new Date(fieldValues['start_at']))) {
			temp['start_at'] = '';
		} else {
			console.log('INVALIIIIID');
			temp['start_at'] = 'Date is invalid';
		}
	}

	if ('end_at' in fieldValues) {
		if (fieldValues['end_at']) {
			temp['end_at'] = '';
		} else {
			temp['end_at'] = 'This field is required';
		}

		if (isValid(new Date(fieldValues['end_at']))) {
			temp['end_at'] = '';
		} else {
			temp['end_at'] = 'Date is invalid';
		}
	}

	if ('start_at' in fieldValues && 'end_at' in trial) {
		console.log(
			'"start_at" in fieldValues && "end_at" in trial',
			'start_at' in fieldValues && 'end_at' in trial,
		);
		console.log(
			'"end_at" in fieldValues && "start_at" in trial',
			'end_at' in fieldValues && 'start_at' in trial,
		);
		if (
			isValid(new Date(fieldValues['start_at'])) &&
			isValid(new Date(trial['end_at'])) &&
			new Date(trial['end_at']) < new Date(fieldValues['start_at'])
		) {
			console.log('nu NU 1');
			temp['start_at'] = `Min.date is ${format(new Date(trial['end_at']), 'dd/MM/yyyy')}`;
			temp['end_at'] = '';
		} else {
			temp['start_at'] = '';
			temp['end_at'] = '';
		}
	}

	if ('end_at' in fieldValues && 'start_at' in trial) {
		if (
			isValid(new Date(fieldValues['end_at'])) &&
			isValid(new Date(trial['start_at'])) &&
			new Date(trial['start_at']) > new Date(fieldValues['end_at'])
		) {
			console.log('nu NU 2');
			temp['end_at'] = `Min.date is ${format(new Date(trial['start_at']), 'dd/MM/yyyy')}`;
			temp['start_at'] = '';
		} else {
			temp['end_at'] = '';
			temp['start_at'] = '';
		}
	}

	setErrors({ ...temp });
}

export function validateUser(fieldValues, errors, setErrors, setValidationResult) {
	const temp = { ...errors };
	const someFields = ['name', 'username', 'country'];
	const allFields = ['name', 'username', 'email', 'country'];

	someFields.forEach((field) => {
		if (field in fieldValues) {
			temp[field] = fieldValues[field] ? '' : 'This field is required';
		}
	});

	if ('email' in fieldValues) {
		const pattern =
			/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (fieldValues.email) {
			temp.email = '';
		} else {
			temp.email = 'This field is required';
		}
		if (fieldValues.email && pattern.test(fieldValues.email.toLowerCase())) {
			temp.email = '';
		} else {
			temp.email = 'Email is invalid';
		}
	}

	setErrors({ ...temp });
	const tempResult1 = allFields.every((field) => Object.keys(temp).includes(field));
	const tempResult2 = Object.values(temp).every((x) => x === '');

	const result = tempResult1 && tempResult2;
	setValidationResult(result);
}

export function validateDeadPublication(fieldValues, errors, setErrors, setValidationResult, selectedValue) {
	const temp = { ...errors };
	console.log('temp', temp);
	const someFields = ['title', 'description'];
	const allFields =
		selectedValue === 'pdf'
			? ['title', 'description', 'categories', 'title_pdf', 'file_pdf']
			: ['title', 'description', 'categories', 'title_video', 'link_video'];

	//coverImage is validated independently, not here
	//event date is validated independently, not here

	someFields.forEach((field) => {
		if (field in fieldValues) {
			temp[field] = fieldValues[field] ? '' : 'This field is required';
			console.log('validated!');
		}
	});

	if ('categories' in fieldValues) {
		temp.categories = fieldValues.categories.length >= 1 ? '' : 'This field is required';
	}

	if (selectedValue === 'pdf') {
		if ('title_pdf' in fieldValues) {
			temp.title_pdf = fieldValues.title_pdf ? '' : 'This field is required';
		}
		if ('file_pdf' in fieldValues) {
			temp.file_pdf = fieldValues.file_pdf ? '' : 'This field is required';
		}
	}

	if (selectedValue === 'video') {
		if ('title_video' in fieldValues) {
			temp.title_video = fieldValues.title_video ? '' : 'This field is required';
		}
		if ('link_video' in fieldValues) {
			temp.link_video = fieldValues.link_video ? '' : 'This field is required';
		}
	}

	setErrors({ ...temp });
	console.log('temp', temp);
	const tempResult1 = allFields.every((field) => Object.keys(temp).includes(field));
	const tempResult2 = Object.values(temp).every((x) => x === '');

	const result = tempResult1 && tempResult2;
	console.log('tempResult1', tempResult1);
	console.log('tempResult2', tempResult2);
	setValidationResult(result);
}

export function validateEditedDeadPublication(
	fieldValues,
	errors,
	setErrors,
	setValidationResult,
	selectedValue,
) {
	const temp = { ...errors };
	console.log('temp', temp);
	const someFields = ['title', 'description'];
	const allFields =
		selectedValue === 'pdf'
			? ['title', 'description', 'categories', 'title_pdf', 'file_pdf']
			: ['title', 'description', 'categories', 'title_video', 'link_video'];

	//coverImage is validated independently, not here
	//event date is validated independently, not here

	someFields.forEach((field) => {
		if (field in fieldValues) {
			temp[field] = fieldValues[field] ? '' : 'This field is required';
			console.log('validated!');
		}
	});

	if ('categories' in fieldValues) {
		temp.categories = fieldValues.categories.length >= 1 ? '' : 'This field is required';
	}

	if (selectedValue === 'pdf') {
		if ('title_pdf' in fieldValues) {
			temp.title_pdf = fieldValues.title_pdf ? '' : 'This field is required';
		}
		if ('file_pdf' in fieldValues) {
			temp.file_pdf = fieldValues.file_pdf ? '' : 'This field is required';
		}
	}

	if (selectedValue === 'video') {
		if ('title_video' in fieldValues) {
			temp.title_video = fieldValues.title_video ? '' : 'This field is required';
		}
		if ('link_video' in fieldValues) {
			temp.link_video = fieldValues.link_video ? '' : 'This field is required';
		}
	}

	setErrors({ ...temp });
	console.log('temp', temp);
	const result = Object.values(temp).every((x) => x === '');
	console.log('edited version validation, result:', result);
	setValidationResult(result);
}

export function validateLivePublication(fieldValues, errors, setErrors, setValidationResult) {
	const temp = { ...errors };
	console.log('temp', temp);
	const allFields = ['title', 'categories'];

	//coverImage, event date, content are validated independently, not here

	if ('title' in fieldValues) {
		temp['title'] = fieldValues['title'] ? '' : 'This field is required';
	}

	if ('categories' in fieldValues) {
		temp.categories = fieldValues.categories.length >= 1 ? '' : 'This field is required';
	}

	setErrors({ ...temp });
	console.log('temp', temp);
	const tempResult1 = allFields.every((field) => Object.keys(temp).includes(field));
	const tempResult2 = Object.values(temp).every((x) => x === '');

	const result = tempResult1 && tempResult2;
	console.log('tempResult1', tempResult1);
	console.log('tempResult2', tempResult2);
	setValidationResult(result);
}

export function validateEditedLivePublication(fieldValues, errors, setErrors, setValidationResult) {
	const temp = { ...errors };
	console.log('temp', temp);
	const allFields = ['title', 'categories'];

	//coverImage, event date are validated independently, not here

	if ('title' in fieldValues) {
		temp['title'] = fieldValues['title'] ? '' : 'This field is required';
	}

	if ('categories' in fieldValues) {
		temp.categories = fieldValues.categories.length >= 1 ? '' : 'This field is required';
	}

	setErrors({ ...temp });
	console.log('temp', temp);

	const result = Object.values(temp).every((x) => x === '');

	console.log('result', result);
	setValidationResult(result);
}

export function validateEvent(fieldValues, errors, setErrors, setValidationResult) {
	const temp = { ...errors };

	const allFields = ['title', 'date'];

	if ('title' in fieldValues) {
		temp.title = fieldValues.title ? '' : 'This field is required';
	}

	if ('date' in fieldValues) {
		temp.date = fieldValues.date ? '' : 'This field is required';

		if (isValid(new Date(fieldValues.date))) {
			temp.date = '';
			console.log('inside is valid');
			if (!fieldValues.date) {
				temp.date = 'This field is required';
			}
		} else {
			temp.date = 'Date is invalid';
		}
	}

	setErrors({ ...temp });
	const tempResult1 = allFields.every((field) => Object.keys(temp).includes(field));
	const tempResult2 = Object.values(temp).every((x) => x === '');

	const result = tempResult1 && tempResult2;

	setValidationResult(result);
}
