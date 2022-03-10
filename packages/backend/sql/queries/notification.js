const create = (data) => {
  return `
    INSERT INTO content_notification
    (${Object.keys(data).map((key) => key)}) VALUES 
    (${Object.values(data).map((val) => '?')});`
}
const get_users_by_category_id = (category_id) => {
  return `SELECT u.id  
    FROM user u   
    INNER JOIN user_has_category uc  
    ON u.id = uc.user_id WHERE u.is_active=1 AND uc.category_id=${category_id};`
}

module.exports = {
  create,
  get_users_by_category_id,
}
