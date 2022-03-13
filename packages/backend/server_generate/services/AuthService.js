/* eslint-disable no-unused-vars */
const model = require('../models/Auth')
const Service = require('./Service')

/*
* change password by old password
* Send new password and the old password
*
* changeUnderscorepassword ChangePassword 
* domain String  (optional)
* no response value expected for this operation
*/
const changePassword = (payload) =>
  new Promise((resolve) => {
    model.changePassword(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Create auth
*
* auth Auth Login to the site
* connectionUnderscorebyUnderscoreapp Boolean  (optional)
* deviceOrigin String  (optional)
* domain String  (optional)
* type String type:   * `mobile_app`   * `email_confirm`   * `sms_confirm`   * `dev`  (optional)
* returns user_login
*/
const createAuth = (payload) =>
  new Promise((resolve) => {
    model.createAuth(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Delete auth
* This can only be done by the logged in user.
*
* deviceOrigin String  (optional)
* no response value expected for this operation
*/
const deleteAuth = (payload) =>
  new Promise((resolve) => {
    model.deleteAuth(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* forgot password by email / phone
* Send new password to email / phone
*
* forgotUnderscorepassword ForgotPassword 
* domain String  (optional)
* no response value expected for this operation
*/
const forgotPassword = (payload) =>
  new Promise((resolve) => {
    model.forgotPassword(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Finish register auth with code
*
* registerUnderscoreauth RegisterAuth 
* returns user_login
*/
const registerAuth = (payload) =>
  new Promise((resolve) => {
    model.registerAuth(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* reset password by token
* Send token and a new password
*
* resetUnderscorepassword ResetPassword 
* domain String  (optional)
* no response value expected for this operation
*/
const resetPassword = (payload) =>
  new Promise((resolve) => {
    model.resetPassword(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Verify the answer given by the mobile to authorize user to log in in the web client
*
* twoUnderscorefactorUnderscoreverificationUnderscoremobileUnderscoreanswer TwoFactorVerificationMobileAnswer 
* domain String  (optional)
* no response value expected for this operation
*/
const verifyTwofactorAuthMobileAnswer = (payload) =>
  new Promise((resolve) => {
    model.verifyTwofactorAuthMobileAnswer(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })

module.exports = {
  changePassword,
  createAuth,
  deleteAuth,
  forgotPassword,
  registerAuth,
  resetPassword,
  verifyTwofactorAuthMobileAnswer,
}
