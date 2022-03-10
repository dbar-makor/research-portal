const apn = require('apn');
const Hashes = require('jshashes');
const SHA256 = new Hashes.SHA256();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const mail_util = require('../utils/mail');
const auth_helper = require('../utils/helpers/auth');
const global_helper = require('../utils/helpers/global');
const regex_helper = require('../utils/helpers/regex');
const admin = require('../utils/firebase');
const lodash = require('lodash');
const db_helper = require('../utils/db_helper');
const query = require('../sql/queries/auth');
const Company = require('./Company');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const options = {
	token: {
		key: './certificates/AuthKey_2RD5Q8XN79.p8',
		keyId: process.env.APN_KEY_ID,
		teamId: process.env.APN_TEAM_ID,
	},
	production: process.env.NODE_ENV === 'production' ? true : false,
};

const apn_provider = new apn.Provider(options);

// constructor
const Auth = () => {};

Auth.createAuth = async (payload, result) => {
	const { password, username, device_id } = payload.auth;
	const { origin, 'userIp': user_ip, 'device-origin': device_origin, type, connection_by_app } = payload;
<<<<<<< HEAD
	const is_2fa_active = process.env.IS_TWO_FACTOR_AUTH_ACTIVATED === 'true' ? true : false;
	const location = await global_helper.get_location(user_ip);
=======
	let is_2fa_active = process.env.IS_TWO_FACTOR_AUTH_ACTIVATED === 'true' ? true : false;
	let location = await global_helper.get_location(user_ip);
>>>>>>> c7002297c0167df11929209b77da14040815ff78
	try {
		const [user] = await db_helper.get(
			query.get_user_by_username_and_password(username, SHA256.hex(password)),
		);
		if (user === undefined) {
			return result({ status: 404 });
		} // authors sales and members that arent active
		if (user.status == 0) {
			return result({ status: 405 });
		}
		//user.level_id if member
		const [level_id_member] = await db_helper.get(query.get_level_id_by_name('member'));

		if (level_id_member.id == user.level_id) {
			let company_status = 0;

			if (!user.company_id) {
				return result({ status: 404 });
			}

			const [comapny_res] = await db_helper.get(query.get_company_by_id(user.company_id));

			// check status of if prospect or client
			if (comapny_res.client_id) {
				const [res_client] = await db_helper.get(query.get_client_by_id(comapny_res.client_id));
				company_status = res_client.status;
				let contract_status = 0;

				// check status of current contract status
				const [res_contract] = await db_helper.get(
					query.get_current_contract_by_company_id(user.company_id),
				);

				if (res_contract) contract_status = res_contract.status;

				// if one of them is not true //return status 405
				if (!(contract_status && company_status && user.status)) {
					// console.log(contract_status, company_status, user.status)
					return result({ status: 405 });
				}
			} else if (comapny_res.prospect_id) {
				const [res_prospect] = await db_helper.get(query.get_prospect_by_id(comapny_res.prospect_id));
				company_status = res_prospect.status;
				if (!(company_status && user.status)) {
					// console.log(company_status, user.status)
					return result({ status: 405 });
				}
			}
			// check ip is valid
		}

		if (process.env.FLAG_IP_VALIDATE === '1') {
			const [is_ip_valid] = await db_helper.get(query.check_ip(user_ip));
			if (is_ip_valid === undefined) {
				return result({ status: 404 });
			}
		}

		//  check origin is valid
		if (process.env.FLAG_ORIGIN_VALIDATE === '1') {
			const [is_origin_valid] = await db_helper.get(query.check_origin(origin));
			if (!is_origin_valid) {
				return result({ status: 404 });
			}
		}

		if (device_origin && device_id) {
			return connection_with_mobile(user, device_id, device_origin, location, result);
		}

		if (process.env.TWO_STEP_ACTIVE === 'true') {
			/* TRY TO CONNECT FROM WEB APPLICATION */
			/* APPLICATION VERIFICATION OPTION */
			if (type) {
				if (type === 'mobile_app' && user.device_id) {
					return connection_with_web_notification_to_mobile(user, location, result);
				} else if (type === 'email_confirm' && user.email) {
					return connection_with_web_confirmation_to_email(user, location, result);
				} else if (type === 'sms_confirm' && user.phone) {
					return connection_with_app_confirmation_to_sms(user, location, result);
				} else if (type === 'dev') {
					return connection_with_dev(user, location, result);
				} else {
					return result({ status: 404 });
				}
			} else {
				if (user.device_id && !connection_by_app) {
					return connection_with_web_notification_to_mobile(user, location, result);
					// } else if (user.phone) {
					//   return connection_with_app_confirmation_to_sms(user, location, result)
				} else if (user.email) {
					return connection_with_web_confirmation_to_email(user, location, result);
				} else {
					return result({ status: 404 });
				}
			}
		}
		return connection_with_dev(user, location, result);
	} catch (error) {
		console.log(error);
		if ('status' in error) {
			return result(error);
		}
		return result({ status: 500 });
	}
};

Auth.registerAuth = async (payload, result) => {
	try {
		const six_digits = payload.registerAuth.six_digits;
		const { userIp: user_ip } = payload;
		const { id } = payload.bearerAuth.user;
		const { token: six_digit_token } = payload.bearerAuth;
		const [user] = await db_helper.get(query.get_user_by_id(id));
		const [res_six_digits] = await db_helper.get(
			query.check_six_digits(six_digit_token, six_digits, user.id),
		);
		if (res_six_digits === undefined) {
			return result({ status: 404 });
		}

		const location = await global_helper.get_location(user_ip);
		const token = await auth_helper.create_token(user, process.env.TOKEN_EXP_PLATFORM, 'platform');
		await auth_helper.save_token_in_db(token, user.id, location, 'web', 'platform', null);

		const res = await auth_helper.get_payload_login(user, token);
		return result({ status: 200, data: res });
	} catch (error) {
		console.log(error);
		return result({ status: 400 });
	}
};

// Verification of two factor auth answer from mobile app
Auth.verifyTwofactorAuthMobileAnswer = async (payload, result) => {
	try {
		const { device_id, confirmation_number } = payload.twoFactorVerificationMobileAnswer;
		const { userIp: user_ip } = payload;

		const [token_content] = await db_helper.get(
			query.get_user_by_device_id_and_code(device_id, confirmation_number),
		);
		if (token_content === undefined) {
			return result({ status: 400 });
		}

		const [user] = await db_helper.get(query.get_user_by_id(token_content.user_id));
		const location = await global_helper.get_location(user_ip);
		const token = await auth_helper.create_token(user, process.env.TOKEN_EXP_PLATFORM, 'platform');

		await auth_helper.save_token_in_db(token, user.id, location, 'web', 'platform', null);

		const res = await auth_helper.get_payload_login(user, token);
		return result({ status: 200, data: res });
	} catch (error) {
		return result({ status: 404 });
	}
};

// logout with mobile app
Auth.deleteAuth = async (payload, result) => {
	try {
		const { id } = payload.bearerAuth.user;
		const { token } = payload.bearerAuth;
		const { 'device-origin': device_origin } = payload;

		if (device_origin) {
			await db_helper.update(query.delete_auth(id), []);
			return result({ status: 200 });
		} else {
			await db_helper.update(query.delete_token(token), []);
			return result({ status: 200 });
		}
	} catch (error) {
		console.log(error);
		return result({ status: 404 });
	}
};

// forgot password by email / phone
Auth.forgotPassword = async (payload, result) => {
	try {
		const { userIp: user_ip } = payload;
		const { email, phone } = payload.forgotPassword;

		let user;

		if (email) {
			[user] = await db_helper.get(query.get_user_by_email(email));
			if (!user) {
				return result({ status: 404 });
			}
			const message_to = user.email;
			const message_bcc = process.env.AUTH_SEND_MAIL_BCC
				? JSON.parse(process.env.AUTH_SEND_MAIL_BCC).filter((email) => message_to != email)
				: [];

			const token = await auth_helper.create_token(
				user,
				process.env.TOKEN_EXP_RESET_PASSWORD,
				'reset-password',
			);
			const location = await global_helper.get_location(user_ip);

			await auth_helper.save_token_in_db(token, user.id, location, 'web', 'reset-password', null);
			const reset_url = process.env.FRONT_URL + '?token=' + token;
			const msg = {
				to: message_to,
				bcc: message_bcc,
				from: `no-reply@${process.env.DOMAIN_URL}`,
				subject: 'Enigma: forgot password',
				html: mail_util.forgotPassword(reset_url),
			};

			sgMail.send(msg, (err, res) => {
				if (err) {
					return result({ status: 404 });
				}
				return result({
					status: 200,
					data: `reset password link been sent to email:${email}`,
				});
			});
		} else if (phone) {
			[user] = await db_helper.update(query.get_user_by_phone(phone), []);
			if (!user) {
				return result({ status: 404 });
			}

			const token = await auth_helper.create_token(
				user,
				process.env.TOKEN_EXP_RESET_PASSWORD,
				'reset-password',
			);
			const location = await global_helper.get_location(user_ip);

			await auth_helper.save_token_in_db(token, user.id, location, 'web', 'reset-password', null);
			const reset_url = process.env.FRONT_URL + '?token=' + token;
			const message = `Your reset password link is: ${reset_url}`;
			client.messages
				.create({
					body: message,
					from: process.env.TWILIO_PHONE_NUMBER,
					to: phone,
				})
				.then((message) => {
					return result({
						status: 200,
						data: `reset password link been sent to phone:${phone}`,
					});
				})
				.catch((error) => {
					console.log(error);
					return result({ status: 404 });
				});
		} else {
			return result({ status: 400 });
		}
	} catch (error) {
		console.log(error);
		return result({ status: 404 });
	}
};

// Reset password
Auth.resetPassword = async (payload, result) => {
	try {
		const { id: user_id } = payload.bearerAuth.user;
		const { new_password, new_password_confirm } = payload.resetPassword;
		if (new_password !== new_password_confirm || !regex_helper.check_password(new_password)) {
			return result({ status: 400 });
		}

		[user] = await db_helper.update(query.get_user_by_id(user_id), []);
		if (!user) {
			return result({ status: 404 });
		}
		const message_to = user.email;
		const message_bcc = process.env.AUTH_SEND_MAIL_BCC
			? JSON.parse(process.env.AUTH_SEND_MAIL_BCC).filter((email) => message_to != email)
			: [];

		const msg = {
			to: message_to,
			bcc: message_bcc,
			from: `no-reply@${process.env.DOMAIN_URL}`,
			subject: 'Enigma: Reset password',
			html: mail_util.reset_password(),
		};

		sgMail.send(msg, (err, res) => {
			if (err) {
				return result({ status: 404 });
			}
		});

<<<<<<< HEAD
		const proccess_data = {
=======
		let proccess_data = {
>>>>>>> c7002297c0167df11929209b77da14040815ff78
			password: SHA256.hex(new_password),
		};
		await db_helper.update(query.update_user_by_id(proccess_data, user.id), proccess_data);
		return result({ status: 200 });
	} catch (error) {
		console.log(error);
		return result({ status: 404 });
	}
};

// Reset password
Auth.changePassword = async (payload, result) => {
	try {
		const { id: user_id } = payload.bearerAuth.user;
		const { old_password, new_password, new_password_confirm } = payload.changePassword;
		if (new_password !== new_password_confirm || !regex_helper.check_password(new_password)) {
			return result({ status: 400 });
		}
		const encrypt_old_password = SHA256.hex(old_password);

		[user] = await db_helper.get(query.get_user_by_id(user_id));
		if (!user) {
			return result({ status: 404 });
		}
		if (user.password !== encrypt_old_password) {
			return result({ status: 400 });
		}
		const message_to = user.email;
		const message_bcc = process.env.AUTH_SEND_MAIL_BCC
			? JSON.parse(process.env.AUTH_SEND_MAIL_BCC).filter((email) => message_to != email)
			: [];

		const msg = {
			to: message_to,
			bcc: message_bcc,
			from: `no-reply@${process.env.DOMAIN_URL}`,
			subject: 'Enigma: Reset password',
			html: mail_util.reset_password(),
		};

		sgMail.send(msg, (err, res) => {
			if (err) {
				return result({ status: 404 });
			}
		});

<<<<<<< HEAD
		const proccess_data = {
=======
		let proccess_data = {
>>>>>>> c7002297c0167df11929209b77da14040815ff78
			password: SHA256.hex(new_password),
		};
		await db_helper.update(query.update_user_by_id(proccess_data, user.id), proccess_data);
		return result({ status: 200 });
	} catch (error) {
		console.log(error);
		return result({ status: 404 });
	}
};

module.exports = Auth;

const connection_with_mobile = async (user, device_id = null, device_origin, location, result) => {
	await db_helper.update(query.update_device_id(user.id, device_id, device_origin), []);

	const token = await auth_helper.create_token(user, process.env.TOKEN_EXP_APP, 'platform');
	await auth_helper.save_token_in_db(token, user.id, location, device_origin, 'platform', null);

	const res = await auth_helper.get_payload_login(user, token);
	return result({ status: 200, data: res });
};

const connection_with_dev = async (user, location, result) => {
	try {
		const token = await auth_helper.create_token(user, process.env.TOKEN_EXP_PLATFORM, 'platform');
		await auth_helper.save_token_in_db(token, user.id, location, 'web', 'platform', null);

		const res = await auth_helper.get_payload_login(user, token);
		return result({ status: 200, data: res });
	} catch (error) {
		return result({ status: 500 });
	}
};

const connection_with_web_notification_to_mobile = async (user, location, result) => {
	/* GET 3 random numbers  */
	let temp_numbers = [];
	do {
		temp_numbers = await global_helper.get_three_random_numbers();
	} while (temp_numbers.some((val, i) => temp_numbers.indexOf(val) !== i));
	const verification_numbers = lodash.shuffle([temp_numbers[0], temp_numbers[1], temp_numbers[2]]);

	/* SEND message to FB updating about 2FA  */
	if (user.device_os === 'android') {
		console.log('ANDROID');
		const message = {
			notification: {
				title: '2 Step Verification',
				body: 'Please tap on the correct answer in order to register your account.',
			},
			android: {
				direct_boot_ok: true,
				notification: {
					click_action: '.activity.MainActivity',
				},
			},
			data: {
				'Option 1': `${verification_numbers[0]}`,
				'Option 2': `${verification_numbers[1]}`,
				'Option 3': `${verification_numbers[2]}`,
				'forceStart': '1',
				'deviceId': `${user.device_id}`,
				'location': `${location.regionName}, ${location.country}`,
				'message': 'Please type on the correct answer in order to register your account.',
			},
			token: user.device_id,
		};
		admin
			.messaging()
			.send(message)
			.then(async (response) => {
				await db_helper.update(query.delete_token(user.device_id), []);
				await auth_helper.save_token_in_db(
					user.device_id,
					user.id,
					location,
					'web',
					'login',
					temp_numbers[0],
				);
				return result({
					status: 200,
					data: {
						type: 'app_confirm',
						digitAnswer: temp_numbers[0],
						user_id: user.id,
						device_id: user.device_id,
						email: global_helper.encrypt_email(user.email),
					},
				});
			})
			.catch((error) => {
				console.log('Error sending message:', error);
				return result({ status: 500 });
			});
	} else if (user.device_os === 'ios') {
		console.log('IOS');
		const notification = new apn.Notification();
		notification.expiry = Math.floor(Date.now() / 1000) + 24 * 3600; // will expire in 24 hours from now
		notification.title = '2 Step Verification';
		notification.contentAvailable = 1;
		notification.payload = {
			'Option 1': `${verification_numbers[0]}`,
			'Option 2': `${verification_numbers[1]}`,
			'Option 3': `${verification_numbers[2]}`,
			'forceStart': '1',
			'deviceId': `${user.device_id}`,
			'location': location,
			'message': 'Please type on the correct answer in order to register your account.',
		};
		notification.badge = 1;
		notification.sound = 'ping.aiff';
		notification.category = 'custom1';
		notification.alert = '\uD83D\uDCE7 \u2709 You trying to log In';
		notification.topic = 'enigma.secureLogIn'; // Replace this with your app bundle ID:

		apn_provider
			.send(notification, user.device_id)
			.then(async (response) => {
				console.log('Successfully sent message');
				await auth_helper.save_token_in_db(
					user.device_id,
					user.id,
					location,
					'web',
					'login',
					temp_numbers[0],
				);
				return result({
					data: {
						type: 'app_confirm',
						digitAnswer: temp_numbers[0],
						user_id: user.id,
						device_id: user.device_id,
						email: global_helper.encrypt_email(user.email),
					},
					status: 200,
				});
			})
			.catch((error) => {
				console.log('Error sending message:', error);
				return result({ status: 500 });
			});
		apn_provider.shutdown();
	}
};

const connection_with_web_confirmation_to_email = async (user, location, result) => {
	if (!user.email) {
		return result({ status: 404 });
	}
	const device_type = 'web';
	const token_type = 'login';
	const six_digits = Math.floor(100000 + Math.random() * 900000);
	const token = await auth_helper.create_token(user, process.env.TOKEN_EXP_LOGIN);
	await auth_helper.save_token_in_db(token, user.id, location, device_type, token_type, six_digits);

	const message_to = user.email;
	const message_bcc = process.env.AUTH_SEND_MAIL_BCC
		? JSON.parse(process.env.AUTH_SEND_MAIL_BCC).filter((email) => message_to != email)
		: [];

	const msg = {
		to: message_to,
		bcc: message_bcc,
		from: `no-reply@${process.env.DOMAIN_URL}`,
		subject: 'Enigma: Registration verification',
		html: mail_util.confirm_user(six_digits),
	};

	sgMail.send(msg, (err, res) => {
		if (err) {
			return result({ status: 404 });
		} else {
			return result({
				status: 200,
				data: {
					type: 'email_confirm',
					token,
					email: global_helper.encrypt_email(message_to),
				},
			});
		}
	});
};

const connection_with_app_confirmation_to_sms = async (user, location, result) => {
	try {
		if (!user.phone) {
			return result({ status: 404 });
		}
		user.phone = JSON.parse(user.phone);
		if (!user.phone.dialing_code || !user.phone.number) {
			return result({ status: 404 });
		}
<<<<<<< HEAD
		const phone = '+' + user.phone.dialing_code + user.phone.number;
=======
		let phone = '+' + user.phone.dialing_code + user.phone.number;
>>>>>>> c7002297c0167df11929209b77da14040815ff78
		const device_type = 'web';
		const token_type = 'login';
		const six_digits = Math.floor(100000 + Math.random() * 900000);
		const token = await auth_helper.create_token(user, process.env.TOKEN_EXP_LOGIN, token_type);
		await auth_helper.save_token_in_db(token, user.id, location, device_type, token_type, six_digits);

		const message = `Your verfaction code is: ${six_digits}`;
		client.messages
			.create({
				body: message,
				from: process.env.TWILIO_PHONE_NUMBER,
				to: phone,
			})
			.then((message) => {
				return result({
					status: 200,
					data: {
						type: 'sms_confirm',
						token,
						phone: global_helper.encrypt_phone(phone),
					},
				});
			})
			.catch((error) => {
				console.log(error);
				return result({ status: 404 });
			});
	} catch (error) {
		console.log(error);
		return result({ status: 404 });
	}
};
