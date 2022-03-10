const db_helper = require('../utils/db_helper');
const category_sql = require('../sql/queries/category');

//constructor
const Category = () => {};

//create category
Category.createCategory = async (payload, result) => {
	try {
		const processed_data = { name: payload.categoryCreate.name };
		const categs = await db_helper.update(category_sql.create_category(processed_data), processed_data);

		if (!categs || categs.affectedRows < 1) {
			return result({ status: 500 });
		}

		return result({ status: 201 });
	} catch (error) {
		if (error.status) {
			return result(error);
		} else {
			return result({ status: 500 });
		}
	}
};

//get all categorys and subscription
Category.getCategory = async (payload, result) => {
	try {
		const { id: user_id } = payload.bearerAuth.user;
		const data = await db_helper.get(category_sql.get_categories_by_authorized_user(user_id));

		return result({ status: 200, data });
	} catch (error) {
		if (error.status) {
			return result(error);
		} else {
			return result({ status: 500 });
		}
	}
};

//get allspecific user categorys by user uuid
Category.getCategoriesById = async (payload, result) => {
	try {
		const { id } = payload;

		const [res_user_id] = await db_helper.get(category_sql.get_user_id_by_uuid(id));
		if (!res_user_id || !res_user_id.id) {
			return result({ status: 404 });
		}

		const data = await db_helper.get(category_sql.get_categories_by_user_id(res_user_id.id));
		if (!data) {
			return result({ status: 404 });
		}

		return result({ status: 200, data });
	} catch (error) {
		if (error.status) {
			return result(error);
		} else {
			return result({ status: 500 });
		}
	}
};

//remove category
Category.deleteCategory = async (payload, result) => {
	try {
		const processed_data = { category_uuid: payload.id };
		await db_helper.update(category_sql.delete_category(payload.id), processed_data);

		return result({ status: 201 });
	} catch (error) {
		if (error.status) {
			return result(error);
		} else {
			return result({ status: 500 });
		}
	}
};

module.exports = Category;
