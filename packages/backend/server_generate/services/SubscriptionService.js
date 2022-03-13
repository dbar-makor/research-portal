/* eslint-disable no-unused-vars */
const model = require('../models/Subscription')
const Service = require('./Service')

/*
* Create request to subscription by reader
*
* subscriptionUnderscorecreate SubscriptionCreate create subscription
* no response value expected for this operation
*/
const createSubscription = (payload) =>
  new Promise((resolve) => {
    model.createSubscription(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Delete a subscription
*
* id Integer subscription id to delete
* no response value expected for this operation
*/
const deleteSubscription = (payload) =>
  new Promise((resolve) => {
    model.deleteSubscription(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Find all subscriptions
* Returns all subscriptions
*
* returns subscription
*/
const getSubscription = (payload) =>
  new Promise((resolve) => {
    model.getSubscription(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })
/*
* Update subscription by id
*  reader can update: expired_at , admin can update: all
*
* id Integer Id of subscription to return
* subscriptionUnderscoreupdate SubscriptionUpdate Update date subscription
* no response value expected for this operation
*/
const updatesubScription = (payload) =>
  new Promise((resolve) => {
    model.updatesubScription(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    })
  })

module.exports = {
  createSubscription,
  deleteSubscription,
  getSubscription,
  updatesubScription,
}
