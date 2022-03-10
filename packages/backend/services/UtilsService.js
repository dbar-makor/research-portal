/* eslint-disable no-unused-vars */
const model = require('../models/Utils');
const Service = require('./Service');

/*
 * Get Utils
 * Data object that contains the following lists: Theme, Countries, Apis, Controls, modules & Languages
 *
 * returns get_utils
 */
const getUtils = (payload) =>
	new Promise((resolve) => {
		model.getUtils(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});

module.exports = {
	getUtils,
};
