const get_categories_by_publication_id = (publication_id) => {
  return `SELECT category_id as id FROM research.category_has_publication where publication_id=${publication_id};`
}

const get_users_by_category_id = (category_id) => {
  return `SELECT u.id  
    FROM user u   
    INNER JOIN user_has_category uc  
    ON u.id = uc.user_id WHERE u.is_active=1 AND uc.category_id=${category_id};`
}
const insert_notification = (data) => {
  return `
  INSERT INTO notification (${Object.keys(data)})
  VALUES (${Object.values(data).map((key) => '?')});`
}
const get_notifications_by_user_id = (user_id) => {
  return `SELECT n.uuid as id, n.is_read ,content.content, n.is_new  FROM notification n
  INNER JOIN  content_notification content  ON content.id =n.content_notification_id
   WHERE n.user_id=${user_id} ORDER BY n.created_at DESC LIMIT 3;`
}
const get_all_notifications_by_user_id = (user_id) => {
  return `SELECT n.uuid as id, n.is_read ,content.content, n.is_new  FROM notification n
  INNER JOIN  content_notification content  ON content.id =n.content_notification_id
   WHERE user_id=${user_id} ORDER BY n.created_at DESC;`
}
const update_notification = (notification) => {
  return `
  UPDATE notification 
  SET ${Object.keys(notification).map((key) => `${key} = ? `)}
  WHERE id = ${notification.id}`
}
const get_content_by_id = (content_id) => {
  return `SELECT content FROM content_notification WHERE id=${content_id}`
}
const get_notification_by_id = (id) => {
  return `SELECT * FROM notification WHERE id=${id}`
}
const set_read = (uuid) => {
  return `UPDATE notification SET is_read=1 WHERE uuid='${uuid}'`
}
const set_new = (uuid) => {
  return `UPDATE notification SET is_new=1 WHERE uuid='${uuid}'`
}
const set_unnew = (uuid) => {
  return `UPDATE notification SET is_new=0 WHERE uuid='${uuid}'`
}
const mark_all_read = (user_id) => {
  return `UPDATE notification SET is_read=1 WHERE user_id=${user_id} AND is_read=0`
}
module.exports = {
  get_categories_by_publication_id,
  get_users_by_category_id,
  insert_notification,
  get_notifications_by_user_id,
  update_notification,
  get_content_by_id,
  get_notification_by_id,
  set_read,
  set_new,
  set_unnew,
  get_all_notifications_by_user_id,
  mark_all_read,
}
