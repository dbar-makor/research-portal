const db_helper = require('../../utils/db_helper')
const query_route = require('../../sql/queries/routes')
const query_auth = require('../../sql/queries/auth')
const AceBase64Crypto = require('../AceBase64Crypto')
const jwt = require('jsonwebtoken')
const { query } = require('../db')

const save_token_in_db = (token, user_id, location, device_type, token_type, code) => {
  return new Promise(async (resolve, reject) => {
    try {
      location = location ? JSON.stringify(location) : null
      const res_connection = await db_helper.update(query_auth.create_connection(), { user_id, device_type, location })
      if (token_type.toLowerCase() === 'platform') {
        await db_helper.update(query_auth.update_login_status(user_id), [])
      }
      const res_token = await db_helper.update(query_auth.create_token(), [res_connection.insertId, token_type, token, code])
      return resolve(res_token.insertId)
    } catch (error) {
      return reject('error')
    }
  })
}

const create_token = async (user, exp = '1d', token_type) => {
  return new Promise(async (resolve, reject) => {
    const [res_level] = await db_helper.get(query_auth.get_level(user.level_id))
    let role
    if (res_level.name === 'member') {
      const [res_company] = await db_helper.get(query_auth.get_full__company_by_id(user.company_id))
      if (!res_company) return reject({ status: 404 })
      role = res_company.client_id ? 'client' : 'prospect'
    } else {
      role = res_level.name
    }

    const payload = {
      user: {
        id: user.id,
        level: user.level_id,
        role,
        token_type,
      },
    }
    const encrypted_and_encoded = AceBase64Crypto.encrypt(payload)
    jwt.sign({ data: encrypted_and_encoded, algorithm: 'HS256', expiresIn: exp }, process.env.ACCESS_TOKEN_SECRET, async (err, token) => {
      if (err) {
        return reject(err)
      }
      return resolve(token)
    })
  })
}

const get_payload_login = (user, token) => {
  return new Promise(async (resolve, reject) => {
    const [res_level] = await db_helper.get(query_auth.get_level(user.level_id))
    let type
    let res_categories
    if (res_level.name === 'member') {
      const [res_company] = await db_helper.get(query_auth.get_full__company_by_id(user.company_id))
      //get categories of memeber
      res_categories = await db_helper.get(query_auth.get_categories_of_user(user.id))
      if (!res_company) return reject({ status: 404 })
      type = res_company.client_id ? 'client' : 'prospect'
    } else {
      type = res_level.name
    }
    let data = {
      user: {
        id: user.uuid,
        name: user.name,
        last_connection: user.last_login_at,
        type,
        categories: res_categories ? res_categories : [],
      },
      token: token,
      payload: {
        user: {
          level: user.level,
          avatar: user.avatar,
          email: user.email,
        },
      },
      message: 'success',
    }

    return resolve(data)
  })
}

const get_user_by_email = (email) => {
  return new Promise(async (resolve, reject) => {
    const [user] = await db_helper.get(query_route.get_user_by_email(email))
    if (user) {
      return resolve(user)
    } else {
      return resolve(undefined)
    }
  })
}

const create_social_user = (user_id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const name = data.authFrom === 'G' ? 'google' : data.authFrom === 'L' ? 'linkedin' : 'microsoft'
      const payload = {
        name,
        user_id,
        content: JSON.stringify(data),
      }
      const res = await db_helper.update(query_route.create_social(payload), payload)
      return resolve(res)
    } catch (error) {
      return reject(error)
    }
  })
}

module.exports = {
  save_token_in_db,
  get_payload_login,
  create_token,
  get_user_by_email,
  create_social_user,
}
