/**
 * The ContractController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller')
const service = require('../services/ContractService')
const createContract = async (request, response) => {
  await Controller.handleRequest(request, response, service.createContract)
}

const createContractPdf = async (request, response) => {
  await Controller.handleRequest(request, response, service.createContractPdf)
}

const deleteContract = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteContract)
}

const getContract = async (request, response) => {
  await Controller.handleRequest(request, response, service.getContract)
}

const getContractById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getContractById)
}

const getInvocesByContractId = async (request, response) => {
  await Controller.handleRequest(request, response, service.getInvocesByContractId)
}

const updateContract = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateContract)
}

module.exports = {
  createContract,
  createContractPdf,
  deleteContract,
  getContract,
  getContractById,
  getInvocesByContractId,
  updateContract,
}
