const axios = require('axios');
const lodash = require('lodash');

async function get_location(user_ip) {
	try {
		// get location dev
		if (process.env.NODE_ENV !== 'production') {
			const location = await axios.get('http://ip-api.com/json/82.81.27.189');
			if (location.status === 200) {
				return location.data;
			}
		}
		// get location production
		else {
			const location = await axios.get('http://ip-api.com/json/' + user_ip);
			if (location.status === 200) {
				return location.data;
			}
		}
	} catch (error) {
		console.log(`location error:  ${error}`);
		return null;
	}
}

function encrypt_api_key(api_key) {
	return `${api_key.slice(0, 3)}${'*'.repeat(10)}`;
}
function encrypt_phone(phone) {
<<<<<<< HEAD
	const p_len = phone.length;
=======
	let p_len = phone.length;
>>>>>>> c7002297c0167df11929209b77da14040815ff78
	return `${phone.slice(0, 4)}${'*'.repeat(7)}${phone.slice(p_len - 3)}`;
}

function encrypt_email(email) {
	if (typeof email !== 'string') {
		email = email[0];
	}
<<<<<<< HEAD
	const split_email = email.split('@');
=======
	let split_email = email.split('@');
>>>>>>> c7002297c0167df11929209b77da14040815ff78
	split_email[0] = split_email[0][0] + '*'.repeat(split_email[0].length - 1);
	return split_email[0] + '@' + split_email[1];
}

function determine_host(host) {
	if (process.env.BASE_DOMAIN.includes(host)) {
		return process.env.DB_NAME;
	} else {
		return host.split('.')[0];
	}
}

function get_host(request) {
	if (process.env.NODE_ENV === 'production') {
		if (request.headers.bearerAuth) {
			return request.headers.bearerAuth.user.host;
		}
		if ('domain' in request.headers) {
			return determine_host(request.headers.domain);
		}
		if (process.env.BASE_DOMAIN.includes(request.headers.origin)) {
			return determine_host(request.headers.origin);
		}
		if ('origin' in request.headers) {
			return determine_host(request.headers.origin.split('://')[1]);
		}
		if ('referer' in request.headers) {
			return determine_host(request.headers.referer.split('://')[1]);
		}
		if ('host' in request.headers) {
			return determine_host(request.headers.host);
		}

		return process.env.DB_NAME;
	} else {
		if (request.headers.bearerAuth) {
			return request.headers.bearerAuth.user.host;
		} else {
			return determine_host(request.headers.host);
		}
	}
}

function get_random_number(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const get_three_random_numbers = () => {
	return new Promise((resolve, reject) => {
		const Answer = lodash.random(1, 100);
		let random2 = 0;
		let random3 = 0;

		do {
			random2 = lodash.random(1, 100);
		} while (Answer === random2);

		do {
			random3 = lodash.random(1, 100);
		} while (random3 === random2 && Answer === random3);

		return resolve([Answer, random2, random3]);
	});
};

function generate_password(length) {
<<<<<<< HEAD
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const characters_length = characters.length;
	for (let i = 0; i < length; i++) {
=======
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var characters_length = characters.length;
	for (var i = 0; i < length; i++) {
>>>>>>> c7002297c0167df11929209b77da14040815ff78
		result += characters.charAt(Math.floor(Math.random() * characters_length));
	}
	return result;
}

module.exports = {
	get_location,
	encrypt_phone,
	encrypt_api_key,
	encrypt_email,
	determine_host,
	get_host,
	get_random_number,
	get_three_random_numbers,
	generate_password,
};
