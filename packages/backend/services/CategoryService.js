/* eslint-disable no-unused-vars */
const model = require('../models/Category');
const Service = require('./Service');

/*
 * Create category
 *
 * categoryUnderscorecreate CategoryCreate Create category by name
 * no response value expected for this operation
 */
const createCategory = (payload) =>
	new Promise((resolve) => {
		model.createCategory(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * Delete category
 *
 * id String category id to delete
 * no response value expected for this operation
 */
const deleteCategory = (payload) =>
	new Promise((resolve) => {
		model.deleteCategory(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * Get all categories
 * Will return all user categories
 *
 * id String user uuid
 * returns category
 */
const getCategoriesById = (payload) =>
	new Promise((resolve) => {
		model.getCategoriesById(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * Get all category & user subscription
 * Returns all category & user subscription
 *
 * returns category
 */
const getCategory = (payload) =>
	new Promise((resolve) => {
		model.getCategory(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});

module.exports = {
	createCategory,
	deleteCategory,
	getCategoriesById,
	getCategory,
};
