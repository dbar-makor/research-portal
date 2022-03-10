const get_token = (token) => {
	return `
  SELECT *
  FROM token 
  WHERE content = '${token}';`;
};

const get_user_by_username_and_password = (username, password) => {
	return `
  SELECT *
  FROM user 
  WHERE username = '${username}' 
  AND password = '${password}' AND is_active = 1 ;`;
};

const check_origin = (origin) => {
	return `
    SELECT u.id 
    FROM user u 
    JOIN user_permission up ON u.id = up.user_id
    JOIN permission p ON up.permission_id = p.id
    WHERE p.content = '${origin}';`;
};

const create_connection = () => {
	return `
  INSERT INTO connection 
  (user_id, device_type, location) 
  VALUES (?, ?, ?);`;
};

const update_login_status = (userId) => {
	return `
    UPDATE
     user 
    SET last_login_at = NOW(),
     connection_count = (SELECT connection_count) + 1
    WHERE id = ${userId};
  `;
};

const delete_token = (token) => {
	return `
  DELETE FROM token WHERE content='${token}';`;
};

const create_token = () => {
	return `
  INSERT INTO token 
  (connection_id, type, content, code) 
  VALUES (?, ?, ?, ?);`;
};

const update_device_id = (user_id, device_id, mobile_os) => {
	return `
  UPDATE user 
  SET device_id = '${device_id}', device_os = '${mobile_os}'
  WHERE id = '${user_id}';`;
};

const check_six_digits = (token, code, user_id) => {
	return `
  SELECT * 
  FROM connection 
  JOIN token ON connection.id = token.connection_id AND token.type='login' AND token.content = '${token}' AND token.code = '${code}'
  WHERE connection.user_id = '${user_id}';`;
};

const get_user_by_id = (user_id) => {
	return `
  SELECT *
  FROM user 
  WHERE id = ${user_id} AND is_active = 1;`;
};

const get_user_by_device_id_and_code = (device_id, confirmation_number) => {
	return `
  SELECT *
  FROM token t
  JOIN connection c ON c.id = t.connection_id
  WHERE t.content = '${device_id}' AND t.type = 'login' AND t.code = '${confirmation_number}' 
  AND DATE_SUB(NOW(), INTERVAL 31 SECOND) < t.created_at;`;
};

const delete_auth = (id) => {
	return `
  UPDATE user SET device_os = NULL, device_id = NULL WHERE id = ${id};`;
};

const check_ip = (ip) => {
	return `SELECT id FROM ip_whitelist WHERE ip = '${ip}';`;
};

const get_company_modules = () => {
	return `
  SELECT name, id FROM module WHERE is_active = 1;
  `;
};

const get_widgets_per_module = (module) => {
	return `
  SELECT w.uuid AS id, w.name, w.config 
  FROM module m
  JOIN module_has_widget mhw ON mhw.module_id = m.id
  JOIN widget w ON w.id = mhw.widget_id
  WHERE m.id = ${module.id};
  `;
};
const get_company_details = (host) => {
	return `
  SELECT *
  FROM company
  WHERE sub_domain = '${host}';
  `;
};
const get_user_products = (user_id) => {
	return `
  SELECT p.name, uhp.config
  FROM user_has_product uhp
  JOIN product p ON p.id = uhp.product_id
  WHERE user_id = ${user_id};
  `;
};

const get_level = (level_id) => {
	return `
  SELECT name
  FROM level
  WHERE id = ${level_id};
  `;
};
const get_company_by_id = (company_id) => {
	return `
  SELECT *
  FROM company
  WHERE id = ${company_id} AND is_active=1;`;
};
const get_full__company_by_id = (company_id) => {
	return `
  SELECT status, client_id , prospect_id
  FROM company
  WHERE id = ${company_id};`;
};

const get_user_by_email = (email) => {
	return `
  SELECT *
  FROM user 
  WHERE email = '${email}' 
  AND is_active = 1;`;
};

const get_user_by_phone = (phone) => {
	return `
  SELECT *
  FROM user 
  WHERE full_phone = '${phone}' 
  AND is_active = 1;`;
};

const update_user_by_id = (user, id) => {
	return `
    UPDATE user 
    SET ${Object.keys(user).map((key) => `${key} = ? `)}
    WHERE id = ${id} AND is_active = 1;`;
};
const get_level_id_by_name = (name) => {
	return `SELECT id FROM level WHERE name='${name}';`;
};
const get_client_by_id = (id) => {
	return `SELECT * FROM client WHERE id=${id};`;
};
const get_prospect_by_id = (id) => {
	return `SELECT * FROM prospect WHERE id=${id};`;
};
const get_current_contract_by_company_id = (company_id) => {
	return `SELECT * FROM contract WHERE company_id=${company_id} AND is_active=1 AND status=1`;
};
const get_categories_of_user = (user_id) => {
	return `SELECT c.uuid as id ,c.name FROM user_has_category u
  INNER JOIN category c ON c.id=u.category_id WHERE u.user_id=${user_id} AND u.is_active=1;`;
};
module.exports = {
	get_token,
	get_user_by_username_and_password,
	check_origin,
	check_six_digits,
	create_connection,
	delete_token,
	update_device_id,
	get_user_by_id,
	get_user_by_device_id_and_code,
	delete_auth,
	check_ip,
	create_token,
	update_login_status,
	get_company_modules,
	get_widgets_per_module,
	get_company_details,
	get_user_products,
	get_level,
	get_company_by_id,
	get_user_by_email,
	get_user_by_phone,
	update_user_by_id,
	get_full__company_by_id,
	get_level_id_by_name,
	get_client_by_id,
	get_prospect_by_id,
	get_current_contract_by_company_id,
	get_categories_of_user,
};
