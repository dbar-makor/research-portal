/* eslint-disable no-unused-vars */
const model = require('../models/Prospect')
const Service = require('./Service')

/*
* update prospect
*
* companyUnderscoreid String Update prospect by company_id
* prospectUnderscoreupdate ProspectUpdate update a prospect
* no response value expected for this operation
*/
const updateProspect = (payload) =>
  new Promise((resolve) => {
    model.updateProspect(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })

module.exports = {
  updateProspect,
}
