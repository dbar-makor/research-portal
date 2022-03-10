const query = require('../sql/queries/notificaion');
const settings_query = require('../../sql/queries/settings');
const db_helper = require('../../utils/db_helper');
const ws_service = require('../services/ws_service');
const session_manager = require('../../utils/session_manager');
const { result } = require('lodash');

const send_notification = async (notifiers, content_id) => {
	try {
		//get the content from db
		const [res_notification_content] = await db_helper.get(query.get_content_by_id(content_id));
		if (!res_notification_content) return result({ status: 500 });
		let content = res_notification_content.content;
		content = JSON.parse(content);
		const wss = ws_service.get_wss_of_ws_service();
		// all connected users
		for (const ws of wss.clients) {
			const session = session_manager.get_session(ws.id);
			//create notification  object
			//check if connected user is in users
			if (notifiers.includes(session.user_id)) {
				const [res_settings_notifications] = await db_helper.get(
					settings_query.get_notifications_settings(session.user_id),
				);
				if (!res_settings_notifications) return result({ status: 500 });
				const settings = JSON.parse(res_settings_notifications.settings);
				console.log('settings', settings);
				let notification;
				//create notification data to save in db
				if (res_settings_notifications.is_active && settings.publications.new_publications) {
					notification = {
						is_sent: true,
						is_read: false,
						user_id: session.user_id,
						content_notification_id: content_id,
					};
					//update in db notification table
					const res_insert_notification = await db_helper.update(
						query.insert_notification(notification),
						notification,
					);
					if (!res_insert_notification) return result({ status: 500 });
					const [inserted_notification] = await db_helper.get(
						query.get_notification_by_id(res_insert_notification.insertId),
					);
					if (!inserted_notification) return result({ status: 500 });
					// send notification
					const data = {
						id: inserted_notification.uuid,
						is_read: 0,
						content,
					};
					notifiers = notifiers.filter((val) => {
						return val !== session.user_id;
					});
					ws.send(JSON.stringify(data));
				}
				// update notification sent
			}
			//delete  the user from users
			else {
				console.log('not included');
			}

			// )
			//for all of thoes who are not connected
			for (const notifier of notifiers) {
				const [res_settings_notifications] = await db_helper.get(
					settings_query.get_notifications_settings(session.user_id),
				);
				const settings = JSON.parse(res_settings_notifications.settings);
				if (res_settings_notifications.is_active && settings.publications.new_publications) {
					// create notification object for users not connected
					const notification = {
						is_sent: false,
						is_read: false,
						user_id: notifier,
						content_notification_id: content_id,
					};
					// update table notification
					const res_insert_notification = await db_helper.update(
						query.insert_notification(notification),
						notification,
					);
					if (!res_insert_notification) return result({ status: 500 });
				}
				console.log('-------', notifier);
			}
		}
	} catch (e) {
		console.log(e);
		return result({ status: 400 });
	}
};
const get_notifications = async (user_id) => {
	try {
		const res_get_notification = await db_helper.get(query.get_notifications_by_user_id(user_id));
		if (!res_get_notification) return result({ status: 500 });
		return res_get_notification;
	} catch (e) {
		console.log('error', e);
		return result({ status: 400 });
	}
};
const get_all_notifications = async (user_id) => {
	try {
		const res_get_notification = await db_helper.get(query.get_all_notifications_by_user_id(user_id));
		if (!res_get_notification) return result({ status: 500 });
		return res_get_notification;
	} catch (e) {
		console.log('error', e);
		return result({ status: 400 });
	}
};
const update_notification = async (notification) => {
	try {
		const res_update_notification = await db_helper.update(
			query.update_notification(notification),
			notification,
		);
	} catch (e) {
		console.log(e);
		return result({ status: 400 });
	}
};
const set_is_read = async (notify_id) => {
	try {
		const res_update_notification = await db_helper.update(query.set_read(notify_id));
		if (!res_update_notification.affectedRows) return result({ status: 400 });
		return result({ status: 200 });
	} catch (e) {
		console.log(e);
		return result({ status: 500 });
	}
};
const set_new_notification = async (notify_id) => {
	try {
		const res_update_notification = await db_helper.update(query.set_new(notify_id));
		if (!res_update_notification.affectedRows) return result({ status: 400 });
		return result({ status: 200 });
	} catch (e) {
		console.log(e);
		return result({ status: 500 });
	}
};
const set_is_new = async (notify_id) => {
	try {
		const res_update_notification = await db_helper.update(query.set_unnew(notify_id));
		if (!res_update_notification.affectedRows) return result({ status: 400 });
		return result({ status: 200 });
	} catch (e) {
		console.log(e);
		return result({ status: 500 });
	}
};

const mark_all_read = async (user_id) => {
	try {
		const res_update_notification = await db_helper.update(query.mark_all_read(user_id));
		if (!res_update_notification.affectedRows) return result({ status: 400 });
		return result({ status: 200 });
	} catch (e) {
		console.log(e);
		return result({ status: 500 });
	}
};
module.exports = {
	send_notification,
	get_notifications,
	update_notification,
	set_is_read,
	set_new_notification,
	set_is_new,
	get_all_notifications,
	mark_all_read,
};
