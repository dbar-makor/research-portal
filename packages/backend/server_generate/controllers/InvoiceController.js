/**
 * The InvoiceController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller')
const service = require('../services/InvoiceService')
const createInvoice = async (request, response) => {
  await Controller.handleRequest(request, response, service.createInvoice)
}

const createInvoicePdf = async (request, response) => {
  await Controller.handleRequest(request, response, service.createInvoicePdf)
}

const getInvoices = async (request, response) => {
  await Controller.handleRequest(request, response, service.getInvoices)
}

module.exports = {
  createInvoice,
  createInvoicePdf,
  getInvoices,
}
