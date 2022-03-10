const db_helper = require('../utils/db_helper')
const query = require('../sql/queries/settings')

const Settings = () => {}

Settings.getNotificationsSettings = async (payload, result) => {
  try {
    const { id: user_id } = payload.bearerAuth.user
    const [res_settings_notifications] = await db_helper.get(query.get_notifications_settings(user_id))
    if (!res_settings_notifications) {
      return result({ status: 500 })
    }
    res_settings_notifications.settings = JSON.parse(res_settings_notifications.settings)
    res_settings_notifications.is_active = res_settings_notifications.is_active ? true : false
    return result({ status: 200, data: res_settings_notifications })
  } catch (e) {
    return result({ status: 500 })
  }
}

Settings.updateNotificationsSettings = async (payload, result) => {
  try {
    const { id: user_id } = payload.bearerAuth.user
    const unprocessed_data = payload.notificationsSettingsUpdate
    const [res_settings_notifications] = await db_helper.get(query.get_notifications_settings(user_id))
    const processed_data = await process_data(unprocessed_data)
    if (!res_settings_notifications) {
      return result({ status: 500 })
    }
    const uuid = res_settings_notifications.uuid
    const res_notification = await db_helper.update(query.update(processed_data, uuid), processed_data)
    if (!res_notification.affectedRows) {
      return result({ status: 400 })
    }
    return result({ status: 200 })
  } catch (e) {
    return result({ status: e.status })
  }
}
module.exports = Settings
const process_data = (unprocessed_data) => {
  return new Promise(async (resolve, reject) => {
    const processed_data = {}
    for (const [key, val] of Object.entries(unprocessed_data)) {
      if (val !== undefined || val !== null) {
        switch (key) {
          case 'is_active':
            processed_data[key] = val
            break
          case 'settings':
            processed_data[key] = JSON.stringify(val)
            break
          default:
            console.log('key', key)
            return reject({ status: 404 })
        }
      }
    }
    return resolve(processed_data)
  })
}
