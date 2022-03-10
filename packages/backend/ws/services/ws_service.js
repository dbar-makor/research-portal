const WebSocket = require('ws');
require('dotenv').config();
const auth_helper = require('../../utils/Authenticate');
const { v1: uuidv1 } = require('uuid');

const session_manager = require('../../utils/session_manager');
const massage_helper = require('../helpers/message_helper');
//const logger = Logger.create('src/services/ws_service.js')
const wss = new WebSocket.Server({ port: process.env.WS_PORT });
const get_wss_of_ws_service = () => wss;
const ws_connection = async () => {
	try {
		console.log(`Creating WS server on port ${process.env.WS_PORT}`);

		wss.on('connection', async (ws, req) => {
			ws.id = uuidv1();
			console.log(`new session connected id: ${ws.id}`);
			handle_token(req, ws);
			ws.on('message', (message) => {
				massage_helper.handle_message(ws, message);
			});
			ws.on('close', () => session_manager.delete_session(ws.id));
			ws.on('pong', () => heartbeat(ws));
		});
		wss.on('close', () => clearInterval(interval));

		const interval = setInterval(() => {
			wss.clients.forEach((ws) => {
				if (ws.isAlive === false) {
					return ws.close();
				}

				ws.isAlive = false;
				ws.ping();
			});
		}, 30000);
		const heartbeat = (ws) => {
			ws.isAlive = true;
		};
		wss.on('error', (err) => {
			console.log('err', err);
		});
	} catch (error) {
		console.log('error', error);
	}
};
const handle_token = async (req, ws) => {
	try {
		let status = await auth_helper.checkJWT(req, true);
		if (status == 'ok') {
			const user = req.headers.bearerAuth.user;
			console.log('user that requested ws', user);
			const new_session = {
				user_id: user.id,
				channel: 'ws',
			};
			session_manager.add_session(ws.id, new_session);
		} else {
			return result({ status: 400 });
		}
	} catch (e) {
		console.log(e);
	}
};

exports.ws_connection = ws_connection;
exports.get_wss_of_ws_service = get_wss_of_ws_service;
