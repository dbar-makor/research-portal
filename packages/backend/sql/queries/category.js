//create category
const create_category = (data) => {
  return `
  INSERT INTO category (${Object.keys(data)})
  VALUES (${Object.values(data).map((key) => '?')});`
}

//create user_has_category
const create_user_has_category = (data) => {
  return `
    INSERT INTO user_has_category (${Object.keys(data)})
    VALUES (${Object.values(data).map((key) => '?')});`
}

//get all category by publication_id (uuid)
const get_categories_by_authorized_user = (id) => {
  return `
  SELECT 
    c.uuid AS id, c.name
  FROM category c 
  JOIN user_has_category uhc ON uhc.category_id = c.id
  WHERE uhc.user_id = ${id} AND c.is_active = 1;`
}

//get category id by category uuid
const get_category_id_by_uuid = (uuid) => {
  return `SELECT id FROM category 
   WHERE uuid = '${uuid}';`
}

//delete category by id
const delete_category = (category_uuid) => {
  return `
  UPDATE 
    category 
  SET 
    is_active = '0' 
  WHERE uuid = '${category_uuid}';`
}

//support get user id by user uuid
const get_user_id_by_uuid = (uuid, host = process.env.DB_NAME) => {
  if (host === process.env.DB_NAME) {
    return `SELECT id FROM user WHERE uuid = '${uuid}' AND is_active = 1;`
  } else {
    return `SELECT id FROM user u
    JOIN level l ON l.id = u.level_id
    WHERE u.uuid = '${uuid}' AND is_active = 1;`
  }
}

//get all category by publication_id (uuid)
const get_categories_by_user_id = (id) => {
  return `
  SELECT 
    c.uuid AS id, c.name
  FROM category c 
  JOIN user_has_category uhc ON uhc.category_id = c.id
  WHERE uhc.user_id = ${id} AND c.is_active = 1;`
}

module.exports = {
  create_category,
  get_categories_by_authorized_user,
  create_user_has_category,
  delete_category,
  get_category_id_by_uuid,
  get_user_id_by_uuid,
  get_categories_by_user_id,
}
