/**
 * The PublicationController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller')
const service = require('../services/PublicationService')
const bookmarkPublication = async (request, response) => {
  await Controller.handleRequest(request, response, service.bookmarkPublication)
}

const createPublication = async (request, response) => {
  await Controller.handleRequest(request, response, service.createPublication)
}

const deletePublication = async (request, response) => {
  await Controller.handleRequest(request, response, service.deletePublication)
}

const getPublicationById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getPublicationById)
}

const getPublications = async (request, response) => {
  await Controller.handleRequest(request, response, service.getPublications)
}

const getPublicationsOfUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.getPublicationsOfUser)
}

const publishPublication = async (request, response) => {
  await Controller.handleRequest(request, response, service.publishPublication)
}

const socialPublication = async (request, response) => {
  await Controller.handleRequest(request, response, service.socialPublication)
}

const updatePublication = async (request, response) => {
  await Controller.handleRequest(request, response, service.updatePublication)
}

const viewPublication = async (request, response) => {
  await Controller.handleRequest(request, response, service.viewPublication)
}

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
}
