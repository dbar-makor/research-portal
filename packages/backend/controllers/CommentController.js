/**
 * The CommentController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller')
const service = require('../services/CommentService')
const createComment = async (request, response) => {
  await Controller.handleRequest(request, response, service.createComment)
}

const deleteComment = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteComment)
}

const getCommentById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getCommentById)
}

const getCommentsById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getCommentsById)
}

const updateComment = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateComment)
}

const updateCommentSocial = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateCommentSocial)
}

module.exports = {
  createComment,
  deleteComment,
  getCommentById,
  getCommentsById,
  updateComment,
  updateCommentSocial,
}
