const get_country = () => {
	return `
    SELECT name, iso_code_2 AS code, dialing_code FROM country; 
  `;
};
const get_sales = () => {
	return `
  SELECT u.uuid AS id, u.name FROM user u
  JOIN level l ON l.id  = u.level_id
  WHERE l.name = 'sales'
  ; 
  `;
};
const get_company = () => {
	return `
  SELECT uuid AS id, legal_name AS name FROM company; 
  `;
};
const get_tag = () => {
	return `
    SELECT uuid AS id, name FROM tag; 
  `;
};
const get_category = () => {
	return `
  SELECT uuid AS id, name FROM category; 
  `;
};
const get_level = () => {
	return `
  SELECT uuid AS id, name FROM level; 
  `;
};
const get_currency = () => {
	return `
  SELECT code, name, symbol FROM currency 
  WHERE is_active = 1
  ; 
  `;
};

module.exports = {
	get_country,
	get_sales,
	get_company,
	get_tag,
	get_category,
	get_level,
	get_currency,
};
