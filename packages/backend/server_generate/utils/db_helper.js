const { Console } = require('winston/lib/winston/transports');
const { query } = require('./db');
const sql = require('./db');

// get data from database
function get(sql_query) {
	return new Promise((resolve, reject) => {
		sql.query(`${sql_query}`, (err, res) => {
			if (err) {
				console.log('err', err);
				return reject({ status: 400 });
			}
			return resolve(res);
		});
	});
}

// update in database
function update(query, data = {}) {
	return new Promise((resolve, reject) => {
		try {
			sql.query(`${query}`, Object.values(data), (err, res) => {
				if (err) {
					console.log('err', err);
					// if error is because duplicate
					if (err.errno == 1062) return reject({ status: 402 });
					return reject({ status: 400 });
				}
				return resolve(res);
			});
		} catch (err) {
			return reject({ status: 400 });
		}
	});
}

module.exports = {
	get,
	update,
};
