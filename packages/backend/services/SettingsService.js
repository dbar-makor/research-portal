/* eslint-disable no-unused-vars */
const model = require('../models/Settings');
const Service = require('./Service');

/*
 * get users notifications settings
 * get users notifications settings
 *
 * returns notifications_settings
 */
const getNotificationsSettings = (payload) =>
	new Promise((resolve) => {
		model.getNotificationsSettings(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});
/*
 * update  or create notifications settings
 *
 * notificationsUnderscoresettingsUnderscoreupdate NotificationsSettingsUpdate insert settings notification content
 * no response value expected for this operation
 */
const updateNotificationsSettings = (payload) =>
	new Promise((resolve) => {
		model.updateNotificationsSettings(payload, ({ data, status }) => {
			resolve(Service.successResponse(data, status || 500));
		});
	});

module.exports = {
	getNotificationsSettings,
	updateNotificationsSettings,
};
