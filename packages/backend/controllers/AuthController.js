/**
 * The AuthController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/AuthService');
const changePassword = async (request, response) => {
	await Controller.handleRequest(request, response, service.changePassword);
};

const createAuth = async (request, response) => {
	await Controller.handleRequest(request, response, service.createAuth);
};

const deleteAuth = async (request, response) => {
	await Controller.handleRequest(request, response, service.deleteAuth);
};

const forgotPassword = async (request, response) => {
	await Controller.handleRequest(request, response, service.forgotPassword);
};

const registerAuth = async (request, response) => {
	await Controller.handleRequest(request, response, service.registerAuth);
};

const resetPassword = async (request, response) => {
	await Controller.handleRequest(request, response, service.resetPassword);
};

const verifyTwofactorAuthMobileAnswer = async (request, response) => {
	await Controller.handleRequest(request, response, service.verifyTwofactorAuthMobileAnswer);
};

module.exports = {
	changePassword,
	createAuth,
	deleteAuth,
	forgotPassword,
	registerAuth,
	resetPassword,
	verifyTwofactorAuthMobileAnswer,
};
