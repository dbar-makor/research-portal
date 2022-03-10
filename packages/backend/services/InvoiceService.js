/* eslint-disable no-unused-vars */
const model = require('../models/Invoice')
const Service = require('./Service')

/*
* Create request to invoice by reader
*
* invoiceUnderscorecreate InvoiceCreate create invoice
* returns String
*/
const createInvoice = (payload) =>
  new Promise((resolve) => {
    model.createInvoice(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* create pdf and return pdf invoice
* Returns pdf for invoice
*
* id UUID Id of invoice to return
* returns File
*/
const createInvoicePdf = (payload) =>
  new Promise((resolve) => {
    model.createInvoicePdf(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Find all invoices
* Returns all invoices
*
* limit Integer limit determines the number of rows that will be returned 5 / 10 / 15 (optional)
* offset Integer skips the offset rows before beginning to return the rows - page 2 = 2 * row_count (optional)
* from String date to search from (optional)
* to String date to search to (optional)
* status String status of invoice (optional)
* companyUnderscoreid String serch by company Id (optional)
* invoiceUnderscoreid String search by invoice id (optional)
* returns invoices
*/
const getInvoices = (payload) =>
  new Promise((resolve) => {
    model.getInvoices(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })

module.exports = {
  createInvoice,
  createInvoicePdf,
  getInvoices,
}
