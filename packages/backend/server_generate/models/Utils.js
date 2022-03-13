const db_helper = require('../utils/db_helper');
const query = require('../sql/queries/utils');

// constructor
const Utils = () => {};

//get utils
Utils.getUtils = async (payload, result) => {
	try {
		const data = {};

		data['sales'] = await db_helper.get(query.get_sales());
		data['company'] = await db_helper.get(query.get_company());
		data['tag'] = await db_helper.get(query.get_tag());
		data['category'] = await db_helper.get(query.get_category());
		data['level'] = await db_helper.get(query.get_level());
		data['currency'] = await db_helper.get(query.get_currency());
		data['country'] = await db_helper.get(query.get_country());

		return result({ status: 200, data });
	} catch (error) {
		if (error.status) {
			return result(err);
		}
		return result({ status: 500 });
	}
};

module.exports = Utils;
