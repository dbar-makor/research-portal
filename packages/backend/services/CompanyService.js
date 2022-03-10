/* eslint-disable no-unused-vars */
const model = require('../models/Company');
const Service = require('./Service');

/*
 * Create request to company by reader
 *
 * companyUnderscorecreate CompanyCreate create company
 * no response value expected for this operation
 */
const createCompany = (payload) =>
	new Promise((resolve) => {
		model.createCompany(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * Delete a company
 *
 * id UUID company id to delete
 * no response value expected for this operation
 */
const deleteCompany = (payload) =>
	new Promise((resolve) => {
		model.deleteCompany(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * Find all company
 * Returns all companies
 *
 * limit Integer limit determines the number of rows that will be returned 5 / 10 / 15 (optional)
 * offset Integer skips the offset rows before beginning to return the rows - page 2 = 2 * row_count (optional)
 * type String  (optional)
 * status Boolean  (optional)
 * search String Will return companies that contain the search in name (optional)
 * returns companies
 */
const getCompany = (payload) =>
	new Promise((resolve) => {
		model.getCompany(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * get company by id
 *  get company by id
 *
 * id UUID Id of contract to return
 * returns company
 */
const getCompanyById = (payload) =>
	new Promise((resolve) => {
		model.getCompanyById(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * get  by id
 *  get contracts by company id
 *
 * id UUID Id of company to return contracts company
 * returns contracts
 */
const getContractsByCompanyId = (payload) =>
	new Promise((resolve) => {
		model.getContractsByCompanyId(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * Update company by id
 *  reader can update: expired_at , admin can update: all
 *
 * id UUID Id of company to return
 * companyUnderscoreupdate CompanyUpdate Update date company
 * no response value expected for this operation
 */
const updateCompany = (payload) =>
	new Promise((resolve) => {
		model.updateCompany(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * upgrade company to client by id
 *  upgrade company to client by id
 *
 * id UUID Id of company to upgrade
 * no response value expected for this operation
 */
const upgradeCompany = (payload) =>
	new Promise((resolve) => {
		model.upgradeCompany(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});

module.exports = {
	createCompany,
	deleteCompany,
	getCompany,
	getCompanyById,
	getContractsByCompanyId,
	updateCompany,
	upgradeCompany,
};
