/* eslint-disable no-unused-vars */
const model = require('../models/EnigmaX')
const Service = require('./Service')

/*
* public publications for enigma-x 
* return array of publications
*
* returns enigma-x_publications
*/
const enigmaXGetPublications = (payload) =>
  new Promise((resolve) => {
    model.enigmaXGetPublications(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })

module.exports = {
  enigmaXGetPublications,
}
