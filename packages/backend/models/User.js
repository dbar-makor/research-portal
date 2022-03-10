const db_helper = require('../utils/db_helper')
const logger = require('../logger')
const query = require('../sql/queries/user')
const settings_query = require('../sql/queries/settings')
const category_query = require('../sql/queries/category')
const query_user_has_category = require('../sql/queries/user_has_category')
const global_helper = require('../utils/helpers/global')
const Hashes = require('jshashes')
const SHA256 = new Hashes.SHA256()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const mail = require('../utils/mail')
const config_process = require('../utils/swagger.config').swagger.user
const config_table = require('../sql/config').tables

// constructor
const User = () => {}

const DEFAULT_LIMIT = 30
const DEFAULT_OFFSET = 0

// create user and send_reset_email({ name, email }, password, sub_domain)
User.createUser = async (payload, result) => {
  try {
    const { level } = payload.bearerAuth.user
    const { userCreate: user } = payload
    const company = user.company
    const type = user.type
    delete user.type
    delete user.company
    const processed_data = await process_payload(user)
    processed_data.status = true
    const [res_level] = await db_helper.get(query.get_level_by_id(level))
    if (res_level.name == 'sales' || res_level.name == 'admin') {
      if (res_level.name == 'admin' && type) {
        //type of sales or author
        const [res_level_id] = await db_helper.get(query.get_level_by_level_name(type))
        const level_id = res_level_id.id
        processed_data.level_id = level_id
      }
      if (!type) {
        const [res_level_id] = await db_helper.get(query.get_level_by_level_name('member'))
        const level_id = res_level_id.id
        processed_data.level_id = level_id
      }
    }
    if (company) {
      const [res_company] = await db_helper.get(query.get_company_id_by_company_uuid(company))
      const company_id = res_company.id
      processed_data.company_id = company_id
    }
    const password = global_helper.generate_password(10)
    processed_data.password = SHA256.hex(password)
    let categories = processed_data.categories
    delete processed_data.categories
    const res = await db_helper.update(query.create_user(processed_data), processed_data)
    send_reset_email(user, password)
    if (!res || res.affectedRows < 1 || !res.insertId) {
      return result({ status: 500 })
    }
    let any_category_fail = false
    let user_id = res.insertId
    if (categories) {
      for (category_uuid of categories) {
        const [category_id_obj] = await db_helper.get(category_query.get_category_id_by_uuid(category_uuid))
        if (!category_id_obj) return result({ status: 404 })
        let user_category = { user_id, category_id: category_id_obj.id }
        const res_categ = await db_helper.update(query_user_has_category.create_user_has_category(user_category), user_category)
        if (!res_categ || res_categ.affectedRows < 1) {
          any_category_fail = true
        }
      }
      if (any_category_fail) {
        return result({ status: 404 })
      }
    }
    let data
    let settings
    console.log('id', processed_data.level_id)
    switch (processed_data.level_id) {
      case 2:
        //author

        settings = {
          interactions: {
            likes: true,
            dislikes: true,
            milestones_views: true,
          },
          comments_replies: {
            comments: true,
            replies: true,
          },
        }
        break
      case 3:
        settings = {
          publications: {
            new_publications: true,
            recommended: true,
          },
          replies: {
            all_users: true,
            company_members: true,
            author: true,
          },
        }
        //member

        break
      case 4:
        //sales

        settings = {
          new_company: {
            prospects: true,
            clients: true,
          },
        }
      default:
        break
    }
    data = {
      is_active: true,
      settings: JSON.stringify(settings),
      user_id: res.insertId,
    }
    const res_settings = await db_helper.update(settings_query.create(data), data)
    if (!res_settings || res_settings.affectedRows < 1 || !res_settings.insertId) {
      return result({ status: 500 })
    }
    return result({ status: 201 })
  } catch (err) {
    console.log(err)
    if (err.status) {
      return result(err)
    }
    return result({ status: 500 })
  }
}

// get companies
User.getUsers = async (payload, result) => {
  try {
    let { limit, order_by, sort, offset, search, type, status } = payload

    limit = limit || DEFAULT_LIMIT
    offset = offset || DEFAULT_OFFSET
    let level_id
    if (type == 'sales') {
      // get the level id by name
      const [res_level] = await db_helper.get(query.get_level_by_level_name('sales'))
      level_id = res_level.id
    }
    if (type == 'author') {
      // get the level id by name
      const [res_level] = await db_helper.get(query.get_level_by_level_name('author'))
      level_id = res_level.id
    }
    const FILTER_BY = await process_filter({ limit, offset, order_by, sort, search })
    FILTER_BY.level_id = level_id
    FILTER_BY.status = status
    let users = await db_helper.get(query.get_users(FILTER_BY))
    if (!users) {
      return result({ status: 404 })
    }
    for (user of users) {
      const [res_country] = await db_helper.get(query.get_coutry_by_country_code(user.country))
      if (!res_country) {
        return result({ status: 404 })
      }
      const country = {
        code: res_country.code,
        name: res_country.name,
      }
      user.country = country
      user.status = user.status ? true : false
    }
    const meta_data = await get_meta_data(FILTER_BY)

    return result({ status: 200, data: { users, meta_data } })
  } catch (err) {
    if (err.status) {
      return result(err)
    }
    return result({ status: 500 })
  }
}

// get user by id
User.getUserById = async (payload, result) => {
  const { id: uuid } = payload
  try {
    //get the level of user
    const [res_level] = await db_helper.get(query.get_level_of_user_by_uuid(uuid))
    if (!res_level) return result({ status: 404 })

    //check the type of user
    let [user] = await db_helper.get(query.get_user_by_uuid(uuid))

    if (user === undefined) {
      return result({ status: 404 })
    }
    const user_id = user.user_id
    if (res_level.name == 'sales') {
      const [res_country] = await db_helper.get(query.get_full_country_of_user(uuid))
      if (!res_country) return result({ status: 404 })
      const [res_last_client] = await db_helper.get(query.get_date_last_client(user_id))
      const [res_last_prospect] = await db_helper.get(query.get_date_last_prospect(user_id))
      const [res_count_clients] = await db_helper.get(query.get_count_clients(user_id))
      const [res_count_prospects] = await db_helper.get(query.get_count_prospects(user_id))
      const format_user = {
        id: user.id,
        type: res_level.name,
        avatar: user.avatar,
        name: user.name,
        status: user.status ? true : false,
        country: {
          code: res_country.code,
          name: res_country.name,
        },
        username: user.username,
        last_client_added: res_last_client ? res_last_client.created_at : null,
        email: user.email,
        last_prospect_added: res_last_prospect ? res_last_prospect.created_at : null,
        created_at: user.created_at,
        total_clients: res_count_clients ? res_count_clients.count : 0,
        last_connected_at: user.last_connected_at,
        total_prospects: res_count_prospects ? res_count_prospects.count : 0,
      }
      user = format_user
    }
    if (res_level.name == 'author') {
      const [res_country] = await db_helper.get(query.get_full_country_of_user(uuid))
      if (!res_country) return result({ status: 404 })
      const [res_most_read] = await db_helper.get(query.get_most_read(user_id))
      const [res_last_publication] = await db_helper.get(query.get_last_publication(user_id))
      const [res_statistics] = await db_helper.get(query.get_statistics_by_author_id(user_id))
      const format_user = {
        id: user.id,
        type: res_level.name,
        avatar: user.avatar,
        name: user.name,
        status: user.status ? true : false,
        country: {
          code: res_country.code,
          name: res_country.name,
        },
        username: user.username,
        last_publication: res_last_publication ? res_last_publication.published_at : null,
        email: user.email,
        most_read: res_most_read ? res_most_read.title : null,
        created_at: user.created_at,
        total_views: res_statistics ? res_statistics.views : null,
        last_connected_at: user.last_connected_at,
        total_published: res_statistics ? res_statistics.posts : null,
      }
      user = format_user
    }
    // get categories
    const category_id_obj = await db_helper.get(query_user_has_category.get_categories_id_for_user_id(user_id))
    if (category_id_obj.length) {
      user.categories = category_id_obj
      // user.phone = JSON.parse(user.phone)
    }
    return result({ status: 200, data: user })
  } catch (err) {
    if (err.status) {
      console.log(err)
      return result(err)
    }
    return result({ status: 500 })
  }
}

// update user
User.updateUser = async (payload, result) => {
  try {
    const host = process.env.DB_NAME
    const { id } = payload
    const unprocessed_payload = payload.userUpdate
    delete unprocessed_payload.id
    const data_processed = await process_payload(unprocessed_payload)
    let category_ids = data_processed.categories ? data_processed.categories : []
    delete data_processed.categories
    const [res_user] = await db_helper.get(query.get_user_id_by_uuid(id, host))
    let user_id
    if (res_user.id) {
      user_id = res_user.id
      //delete all categories of user_id
      const delete_categories = await db_helper.update(query.delete_categories_of_user(user_id), user_id)
      if (!delete_categories) return result({ status: 404 })
    }
    let any_category_fail = false
    if (category_ids.length) {
      //
      for (category_uuid of category_ids) {
        const [category_id_obj] = await db_helper.get(category_query.get_category_id_by_uuid(category_uuid))
        let user_category = { user_id, category_id: category_id_obj.id }
        const res_categ = await db_helper.update(query_user_has_category.create_user_has_category(user_category), user_category)
        if (!res_categ || res_categ.affectedRows < 1) {
          any_category_fail = true
        }
      }
    }
    if (any_category_fail) {
      return result({ status: 404 })
    }
    const res = await db_helper.update(query.update_user(data_processed, id), data_processed)

    if (!res.affectedRows) {
      return result({ status: 404 })
    }

    return result({ status: 200 })
  } catch (error) {
    console.log(error)
    if (error.status) {
      return result(error)
    }
    return result({ status: 500 })
  }
}

// delete user
User.deleteUser = async (payload, result) => {
  try {
    const { id } = payload

    if (!id) {
      return result({ status: 400 })
    }

    const res = await db_helper.get(query.delete_user(id))

    if (!res.affectedRows) {
      return result({ status: 404 })
    }

    return result({ status: 200 })
  } catch (err) {
    return result({ status: 400 })
  }
}
User.getPublicationByAuthorId = async (payload, result) => {
  try {
    const { id } = payload.bearerAuth.user

    if (!id) {
      return result({ status: 400 })
    }
    const res_publication = await db_helper.get(query.get_publications_by_author_id(id))
    let publications = []
    for (let publication of res_publication) {
      const attachments = await db_helper.get(query.get_attachments_by_publication_id(publication.id))
      if (publication.type == 'live') {
        const format_publication = {
          attachments: attachments ? attachments : [],
          comments: publication.comments,
          content: publication.content,
          created_at: publication.created_at,
          description: publication.description,
          dislikes: publication.dislikes,
          id: publication.uuid,
          likes: publication.likes,
          views: publication.views,
          name: publication.name,
          shares: publication.shares,
          status: publication.status ? 'published' : 'draft',
          title: publication.title,
          type: publication.type,
        }
        publications.push(format_publication)
      }
      if (publication.type == 'dead') {
        const format_publication = {
          attachments: attachments ? attachments : [],
          comments: publication.comments,
          created_at: publication.created_at,
          description: publication.description,
          dislikes: publication.dislikes,
          id: publication.uuid,
          likes: publication.likes,
          name: publication.name,
          shares: publication.shares,
          views: publication.views,
          status: publication.status ? 'published' : 'draft',
          title: publication.title,
          type: publication.type,
          file_pdf: publication.file_pdf,
          title_pdf: publication.title_pdf,
          title_video: publication.title_video,
          link_video: publication.link_video,
        }
        publications.push(format_publication)
      }
      delete publication.id
    }
    return result({ status: 200, data: publications })
  } catch (err) {
    return result({ status: 400 })
  }
}
User.getStatisticsByAuthorId = async (payload, result) => {
  try {
    const { id } = payload.bearerAuth.user

    if (!id) {
      return result({ status: 400 })
    }
    const [res_statistics] = await db_helper.get(query.get_statistics_by_author_id(id))
    const [res_most_interacted] = await db_helper.get(query.get_most_interacted(id))
    const [res_most_read] = await db_helper.get(query.get_most_read(id))

    const data = {
      published: {
        posts: res_statistics ? res_statistics.posts : null,
        total_words: res_statistics ? res_statistics.published_total : null,
        average_word_count: res_statistics ? res_statistics.published_avg : null,
        comments: res_statistics ? res_statistics.comments : null,
        views: res_statistics ? res_statistics.views : null,
        shares: res_statistics ? res_statistics.shares : null,
        most_read: res_most_read ? res_most_read.title : '',
        most_interacted: res_most_interacted ? res_most_interacted.title : '',
      },
      drafts: {
        saved: res_statistics ? res_statistics.saved : null,
        total_words: res_statistics ? res_statistics.draft_total : null,
        average_word_count: res_statistics ? res_statistics.draft_avg : null,
      },
    }
    return result({ status: 200, data: data })
  } catch (err) {
    return result({ status: 400 })
  }
}
module.exports = User

const process_payload = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const processed_payload = {}
      for (const [key, val] of Object.entries(payload)) {
        if (val !== undefined || typeof val !== 'object') {
          switch (key) {
            case 'name':
              processed_payload.name = val.trim()
              break
            case 'username':
              processed_payload.username = val
              break
            case 'email':
              processed_payload.email = val.trim()
              break
            case 'categories':
              processed_payload.categories = val
              break
            case 'position':
              processed_payload.position = val
              break
            case 'status':
              processed_payload.status = val ? 1 : 0
              break
            case 'country':
              const [res_country] = await db_helper.get(query.get_coutry_by_country_code(val))
              if (!res_country) return reject({ status: 404 })
              processed_payload.country = res_country.code
              break
            default:
              return reject({ status: 400 })
          }
        }
      }
      return resolve(processed_payload)
    } catch (error) {
      console.log('err', error)
      return reject({ status: 400 })
    }
  })
}

const process_filter = (payload) => {
  return new Promise(async (resolve, reject) => {
    const processed_filter = {}
    for (const [key, val] of Object.entries(payload)) {
      if (val !== undefined) {
        switch (key) {
          case config_process.filter.limit:
            processed_filter.limit = Number(val)
            break
          case config_process.filter.offset:
            processed_filter.offset = Number(val)
            break
          case config_process.filter.sort:
            processed_filter.sort = val.trim()
            break
          case config_process.filter.order_by:
            switch (val) {
              case config_process.filter.created_at:
                processed_filter.order_by = 'u.created_at'
                break
              case config_process.filter.name:
                processed_filter.order_by = 'u.name'
                break
              case config_process.filter.username:
                processed_filter.order_by = 'u.username'
                break
              case config_process.filter.email:
                processed_filter.order_by = 'u.email'
                break
              case config_process.filter.last_connected_at:
                processed_filter.order_by = 'u.last_login_at'
                break
              case config_process.filter.is_active:
                processed_filter.order_by = 'u.is_active'
                break
              case config_process.filter.level:
                processed_filter.order_by = 'l.name'
                break
              default:
                break
            }
            break
          case config_process.filter.search:
            processed_filter.search = val.trim()
            break
          default:
            return reject({ status: 400 })
        }
      }
    }
    return resolve(processed_filter)
  })
}

const send_reset_email = async (user, password) => {
  try {
    const message_to = user.email
    const bcc_array = JSON.parse(process.env.NEW_USER_BCC)
    const message_bcc = bcc_array.filter((email) => message_to != email)

    const msg = {
      to: message_to,
      bcc: message_bcc,
      from: `no-reply@${process.env.DOMAIN_URL}`,
      subject: 'Enigma X: Preliminary login',
      html: mail.user_get_access(user.name, user.username, password, `https://${process.env.DOMAIN_URL}`),
    }

    sgMail.send(msg, async (err, res) => {
      if (err) {
        logger.error('failed to send email')
      }
    })
  } catch (error) {
    logger.error('error in sending email')
  }
}

function get_meta_data(filter_by) {
  return new Promise(async (resolve, reject) => {
    const { limit, offset } = filter_by
    let [{ sum }] = await db_helper.get(query.get_sum_rows_users(filter_by))

    const meta_data = {
      sum_rows: sum,
      limit: limit,
      page: offset == 0 ? 1 : JSON.parse(Math.ceil(offset / limit)) + 1,
      sum_pages: Math.ceil(sum / limit),
    }
    return resolve(meta_data)
  })
}
