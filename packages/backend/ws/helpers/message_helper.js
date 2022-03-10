//const { get_order_book } = require('../helpers/handle_ob_generator_message')
const { SchemaVersionContext } = require('twilio/lib/rest/events/v1/schema/version');
const { update_session, get_session } = require('../../utils/session_manager');
const module_notification = require('../module/Notification');
const handle_message = async (ws, message) => {
	const session = get_session(ws.id);
	try {
		const data = JSON.parse(message);
		let message__send;
		switch (data.type) {
			case 'close-connection':
				delete_client_from_sessions(ws.id, data.headers.client_id);
				break;
			case 'get-notifications':
				if (session.user_id) {
					const notifications = await module_notification.get_notifications(session.user_id);
					if (data.is_new) {
						const new_notification = await module_notification.set_new_notification(data.id);
					}
					if (notifications) {
						let send_data = {
							type: 'alert',
							notifications,
						};
						ws.send(JSON.stringify(send_data));
						//update notificatoin is_sent to true
						// for (notification of notifications) {
						//   notification.is_sent = true
						//   try {
						//     const update = await module_notification.update_notification(notification)
						//   } catch (e) {
						//     console.log(e)
						//     return result({ status: 400 })
						// }
						// }
					}
				}

				break;
			case 'set-is-read':
				if (data.id) {
					await module_notification.set_is_read(data.id);
					message = {
						type: 'succeed',
					};
					ws.send(JSON.stringify(message));
				}
				break;
			case 'set-is-new':
				await module_notification.set_is_new(data.id);
				message__send = {
					type: 'succeed',
				};
				ws.send(JSON.stringify(message__send));
				break;
			case 'get-all-notiofications':
				const all_notifications = await module_notification.get_all_notifications(session.user_id);
				if (all_notifications) {
					let send = {
						type: 'notifcations',
						notifications: all_notifications,
					};
					ws.send(JSON.stringify(send));
				}
				break;
			case 'mark-all-read':
				console.log('i am here');
				await module_notification.mark_all_read(session.user_id);
				message__send = {
					type: 'succeed',
				};
				ws.send(JSON.stringify(message__send));
				break;
			case 'unsubscription':
				update_session(ws, message);
				break;
			default:
				throw new Error('Invalid message type');
		}
	} catch (e) {
		console.log(e);
		ws.send(
			JSON.stringify({
				error: true,
				message: e.message,
			}),
		);
	}
};

module.exports = {
	handle_message,
};
