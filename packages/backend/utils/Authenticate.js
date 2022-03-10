const jwt = require('jsonwebtoken');
const db_helper = require('./db_helper');
const query = require('../sql/queries/auth');
const AceBase64Crypto = require('./AceBase64Crypto');
require('dotenv').config();

exports.checkJWT = (req, is_ws) => {
	return new Promise(async (resolve, reject) => {
		const authHeader = req.headers.authorization;
		let token = authHeader && authHeader.split(' ')[1];
		if (is_ws) {
			token = req.url.split('/?token=')[1];
			console.log('token', token);
		}

		if (token === null) {
			return resolve('Unauthorized');
		}
		// console.log(token)
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data_token) => {
			if (err) {
				console.log('errorrrrr', err);
				return resolve('Unauthorized');
			}

			const data = await AceBase64Crypto.decrypt(data_token.data);
			if (req.url !== '/auth/reset-password' && data.user.token_type === 'reset-password') {
				return reject('Unauthorized');
			}
			const [token_exsist] = await db_helper.get(query.get_token(token), data.user.host);
			if (token_exsist === undefined) {
				return reject('Unauthorized');
			}
			req.headers.bearerAuth = { ...data, token };

			return resolve('ok');
		});
	});
};
