/* eslint-disable no-unused-vars */
const model = require('../models/User')
const Service = require('./Service')

/*
* Create user
*
* userUnderscorecreate UserCreate Create a user
* no response value expected for this operation
*/
const createUser = (payload) =>
  new Promise((resolve) => {
    model.createUser(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Remove a specific user
*
* id String Delte user by ID
* no response value expected for this operation
*/
const deleteUser = (payload) =>
  new Promise((resolve) => {
    model.deleteUser(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* find publications by author
* return array of publications
*
* returns publication_by_author_id
*/
const getPublicationByAuthorId = (payload) =>
  new Promise((resolve) => {
    model.getPublicationByAuthorId(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* find statistics of author
* return object contains statistics
*
* returns statistics_by_author_id
*/
const getStatisticsByAuthorId = (payload) =>
  new Promise((resolve) => {
    model.getStatisticsByAuthorId(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Get user by id
* Get user by ID
*
* id String user id
* returns user
*/
const getUserById = (payload) =>
  new Promise((resolve) => {
    model.getUserById(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Get all users
* Will return all companies
*
* limit Integer limit determines the number of rows that will be returned 5 / 10 / 15 (optional)
* offset Integer skips the offset rows before beginning to return the rows - page 2 = 2 * row_count (optional)
* orderUnderscoreby String Sort order by:  * `created_at`  * `name`  * `username`  * `email`  * `last_connected_at`  (optional)
* sort String Sort order:  * `ASC` - Ascending, from A to Z  * `DESC` - Descending, from Z to A  (optional)
* search String Search user name by string (optional)
* type String  (optional)
* status Boolean  (optional)
* returns users
*/
const getUsers = (payload) =>
  new Promise((resolve) => {
    model.getUsers(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* update user
*
* id String Update user by ID
* userUnderscoreupdate UserUpdate update a user
* no response value expected for this operation
*/
const updateUser = (payload) =>
  new Promise((resolve) => {
    model.updateUser(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })

module.exports = {
  createUser,
  deleteUser,
  getPublicationByAuthorId,
  getStatisticsByAuthorId,
  getUserById,
  getUsers,
  updateUser,
}
