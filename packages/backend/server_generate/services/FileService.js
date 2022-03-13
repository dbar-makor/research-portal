/* eslint-disable no-unused-vars */
const model = require('../models/File')
const Service = require('./Service')

/*
* Get file from server
* get file
*
* fileUnderscorename String The file name
* no response value expected for this operation
*/
const getFile = (payload) =>
  new Promise((resolve) => {
    model.getFile(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Update file
*
* file File  (optional)
* no response value expected for this operation
*/
const updateFile = (payload) =>
  new Promise((resolve) => {
    model.updateFile(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })

module.exports = {
  getFile,
  updateFile,
}
