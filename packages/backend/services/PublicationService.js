/* eslint-disable no-unused-vars */
const model = require('../models/Publication');
const Service = require('./Service');

/*
 * Add / Remove bookmark
 * Add / Remove bookmark by ID
 *
 * id String ID of publication to create / delete
 * no response value expected for this operation
 */
const bookmarkPublication = (payload) =>
	new Promise((resolve) => {
		model.bookmarkPublication(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * Create publication
 *
 * publicationUnderscorecreate PublicationCreate insert publication details
 * no response value expected for this operation
 */
const createPublication = (payload) =>
	new Promise((resolve) => {
		model.createPublication(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * Deletes a publication
 *
 * id String publication id to delete
 * no response value expected for this operation
 */
const deletePublication = (payload) =>
	new Promise((resolve) => {
		model.deletePublication(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * Find publication by ID
 * Returns a single publication
 *
 * id String The publication ID
 * returns publication_by_id
 */
const getPublicationById = (payload) =>
	new Promise((resolve) => {
		model.getPublicationById(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * Finds all publications / filtered by params by specific category ID
 * get publications by specific category ID & filtered by params
 *
 * id String Specific category ID
 * searchUnderscorestring String Will return publications that contain the search_string in its title, content, description (optional)
 * from String From specific date (optional)
 * to String To specific date (optional)
 * isUnderscorebookmarks Boolean User bookmarks: true / false (optional)
 * limit Integer limit determines the number of rows that will be returned 5 / 10 / 15 (optional)
 * offset Integer skips the offset rows before beginning to return the rows - for example, to get page 2: 2 * limit (optional)
 * returns publication
 */
const getPublications = (payload) =>
	new Promise((resolve) => {
		model.getPublications(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * Finds all publications of user categories
 * get publications by user categories
 *
 * returns publication
 */
const getPublicationsOfUser = (payload) =>
	new Promise((resolve) => {
		model.getPublicationsOfUser(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * publish publication
 * publish publication by ID
 *
 * id String ID of publication to update publish
 * no response value expected for this operation
 */
const publishPublication = (payload) =>
	new Promise((resolve) => {
		model.publishPublication(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * Like / dislike /share publication
 * like / dis publication by ID
 *
 * id String ID of publication to update
 * publicationUnderscoretype PublicationType insert publication social
 * no response value expected for this operation
 */
const socialPublication = (payload) =>
	new Promise((resolve) => {
		model.socialPublication(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * Update an existing publication
 *
 * id String ID of publication to return
 * publicationUnderscoreupdate PublicationUpdate insert publication content
 * no response value expected for this operation
 */
const updatePublication = (payload) =>
	new Promise((resolve) => {
		model.updatePublication(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * view publication
 * view publication by ID
 *
 * id String ID of publication to update view
 * no response value expected for this operation
 */
const viewPublication = (payload) =>
	new Promise((resolve) => {
		model.viewPublication(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});

module.exports = {
	bookmarkPublication,
	createPublication,
	deletePublication,
	getPublicationById,
	getPublications,
	getPublicationsOfUser,
	publishPublication,
	socialPublication,
	updatePublication,
	viewPublication,
};
