const sql = require('../../utils/db');

const create_user_has_category = (data) => {
	return `
    INSERT INTO user_has_category (${Object.keys(data)})
    VALUES (${Object.values(data).map((key) => '?')});`;
};

const exists_category_id_for_user_id = (user_id, category_id) => {
	return `SELECT user_id FROM user_has_category WHERE user_id = '${user_id}' AND category_id = '${category_id}';`;
};

const update_user_has_category = (data) => {
	return `UPDATE user_has_category 
    SET is_active = ${data.is_active}
    WHERE user_id = '${data.user_id}' AND category_id = '${data.category_id}';`;
};

const get_categories_id_for_user_id = (user_id) => {
	return `SELECT c.uuid AS id, c.name FROM user_has_category uhc
  INNER JOIN category c ON c.id = uhc.category_id AND uhc.user_id = '${user_id}' AND uhc.is_active = '1';`;
};

module.exports = {
	create_user_has_category,
	exists_category_id_for_user_id,
	update_user_has_category,
	get_categories_id_for_user_id,
};
