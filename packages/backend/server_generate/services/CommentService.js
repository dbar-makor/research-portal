/* eslint-disable no-unused-vars */
const model = require('../models/Comment')
const Service = require('./Service')

/*
* Create comment
*
* commentUnderscorecreate CommentCreate insert name of comment
* no response value expected for this operation
*/
const createComment = (payload) =>
  new Promise((resolve) => {
    model.createComment(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Delete comment by id
*
* id String comment uuid to delete
* no response value expected for this operation
*/
const deleteComment = (payload) =>
  new Promise((resolve) => {
    model.deleteComment(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Find comment by comment ID
* Returns comment by uuid
*
* id String comment id
* returns comment
*/
const getCommentById = (payload) =>
  new Promise((resolve) => {
    model.getCommentById(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Find all comments by publication ID (uuid)
* Returns all comment by publication_id (uuid)
*
* id String publication id
* returns comment
*/
const getCommentsById = (payload) =>
  new Promise((resolve) => {
    model.getCommentsById(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Update comment by id
*
* id String UUID of comment to return
* commentUnderscoreupdate CommentUpdate insert name of comment to update
* no response value expected for this operation
*/
const updateComment = (payload) =>
  new Promise((resolve) => {
    model.updateComment(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Like / dislike comment
* update  Like / dislike comment by id
*
* id String comment id
* commentUnderscoresocial CommentSocial insert social:  Like / dislike
* no response value expected for this operation
*/
const updateCommentSocial = (payload) =>
  new Promise((resolve) => {
    model.updateCommentSocial(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })

module.exports = {
  createComment,
  deleteComment,
  getCommentById,
  getCommentsById,
  updateComment,
  updateCommentSocial,
}
