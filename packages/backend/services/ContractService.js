/* eslint-disable no-unused-vars */
const model = require('../models/Contract')
const Service = require('./Service')

/*
* Create request to contract by reader
*
* contractUnderscorecreate ContractCreate create contract
* returns UUID
*/
const createContract = (payload) =>
  new Promise((resolve) => {
    model.createContract(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* create pdf and return pdf contract
* Returns pdf for contract
*
* id UUID Id of contract to return
* returns File
*/
const createContractPdf = (payload) =>
  new Promise((resolve) => {
    model.createContractPdf(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Delete a contract
*
* id UUID contract id to delete
* no response value expected for this operation
*/
const deleteContract = (payload) =>
  new Promise((resolve) => {
    model.deleteContract(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Find all contract
* Returns all contracts
*
* limit Integer limit determines the number of rows that will be returned 5 / 10 / 15 (optional)
* offset Integer skips the offset rows before beginning to return the rows - page 2 = 2 * row_count (optional)
* from String from date (optional)
* to String to date (optional)
* period String  (optional)
* signed Boolean  (optional)
* status Boolean  (optional)
* companyUnderscoreid String  (optional)
* returns contract
*/
const getContract = (payload) =>
  new Promise((resolve) => {
    model.getContract(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* get contract by id
*  get contract by id
*
* id UUID Id of contract to return
* no response value expected for this operation
*/
const getContractById = (payload) =>
  new Promise((resolve) => {
    model.getContractById(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* get invoices by  contract id
*  get invoices by contract id
*
* id UUID Id of contract to return invoices contract
* returns invoices
*/
const getInvocesByContractId = (payload) =>
  new Promise((resolve) => {
    model.getInvocesByContractId(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Update contract by id
*  reader can update: expired_at , admin can update: all
*
* id UUID Id of contract to return
* contractUnderscoreupdate ContractUpdate Update date contract
* no response value expected for this operation
*/
const updateContract = (payload) =>
  new Promise((resolve) => {
    model.updateContract(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })

module.exports = {
  createContract,
  createContractPdf,
  deleteContract,
  getContract,
  getContractById,
  getInvocesByContractId,
  updateContract,
}
