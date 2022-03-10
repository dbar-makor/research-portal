const get_notifications_settings = (user_id) => {
	return `SELECT * FROM settings_notification WHERE user_id=${user_id}`;
};
const create = (data) => {
	return `
  INSERT INTO settings_notification
  (${Object.keys(data).map((key) => key)}) VALUES 
  (${Object.values(data).map((val) => '?')});`;
};
const update = (data, uuid) => {
	return `
  UPDATE settings_notification 
  SET ${Object.keys(data).map((key) => `${key} = ? `)}
  WHERE uuid = '${uuid}'`;
};
module.exports = {
	get_notifications_settings,
	create,
	update,
};
