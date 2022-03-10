const fs = require('fs')
const query = require('../sql/queries/publication')
const notification_query = require('../sql/queries/notification')
//const bucket_service = require('../utils/bucket_service')
const db_helper = require('../utils/db_helper')
const { isArray } = require('lodash')
const moment = require('moment')
const module_notification = require('../ws/module/Notification')
const { Console } = require('console')

const DEFAULT_LIMIT = 30
const DEFAULT_OFFSET = 0

// constructor
const Publication = () => {}

//create publication
Publication.createPublication = async (payload, result) => {
  try {
    const { id: user_id } = payload.bearerAuth.user
    const unprocessed_data = payload.publicationCreate
    const processed_data = await process_data(unprocessed_data)
    processed_data.user_id = user_id
    const categories = processed_data.categories
    const tags = processed_data.tags
    const events = processed_data.events
    const attachments = processed_data.attachments
    const status = processed_data.status
    delete processed_data.status
    delete processed_data.categories
    delete processed_data.tags
    delete processed_data.events
    delete processed_data.attachments
    // Save processed payload to db
    if (status == 'published') {
      if (!(isArray(categories) && categories.length)) return result({ status: 400 })
      processed_data.published_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }
    const publication_res = await db_helper.update(query.create_publication(processed_data), processed_data)
    if (!publication_res.affectedRows) {
      return result({ status: 400 })
    }
    //UPDATE THE STATISTICS OF AUTHOR
    if (processed_data.content) {
      const blocks = JSON.parse(processed_data.content).blocks
      if (processed_data.type == 'live' && blocks) {
        let total_words = 0
        for (block of blocks) {
          let arr_words = block.text.split(' ')
          let count_words = arr_words.length
          total_words += count_words
        }
        const [res_statistics] = await db_helper.get(query.get_statistics_of_of_author(user_id))
        if (processed_data.published_at) {
          res_statistics.published_total += total_words
          res_statistics.published_avg = res_statistics.published_total / res_statistics.posts
        } else {
          res_statistics.draft_total += total_words
          res_statistics.draft_avg = res_statistics.draft_total / res_statistics.saved
        }
        delete res_statistics.user_id
        const update_statistics = await db_helper.update(query.update_statistics(res_statistics, user_id), res_statistics)
        if (!update_statistics.affectedRows) return result({ status: 400 })
      }
    }

    const publication_id = publication_res.insertId
    // Handle Categories:
    const categories_names = []
    // foreach category select suscribers to this category
    let notifiers = []
    for (category_uuid of categories) {
      const [category] = await db_helper.get(query.get_category_id_by_uuid(category_uuid))
      if (!category) {
        return result({ status: 400 })
      }

      const category_id = category.id
      const notifiers_res = await db_helper.get(notification_query.get_users_by_category_id(category.id))
      notifiers = notifiers.concat(notifiers_res)

      categories_names.push(category.name)
      const new_category_has_publication = {
        publication_id,
        category_id,
      }

      const category_has_publication_res = await db_helper.update(query.add_category_has_publication(new_category_has_publication), new_category_has_publication)
      if (!category_has_publication_res.affectedRows) {
        return result({ status: 400 })
      }
    }
    //get only the notifiers id
    notifiers_ids = []
    for (notifier of notifiers) {
      notifiers_ids.push(notifier.id)
    } //make it uniqe ids
    let uniq_notifiers = [...new Set(notifiers_ids)]
    // Handle Tags:
    if (tags) {
      for (tag of tags) {
        let tag_id
        if (tag['id']) {
          // If tag['uuid'] - get the tag_id from DB
          const tag_uuid = tag['id']
          const [tag_in_db] = await db_helper.get(query.get_tag_id_by_uuid(tag_uuid))
          if (!tag_in_db) {
            return result({ status: 400 })
          }
          tag_id = tag_in_db.id
        } else if (tag['name']) {
          // Check if there is a tag by this name. (get_tag_by_name)
          const [tag_in_db] = await db_helper.get(query.get_tag_by_name(tag['name']))
          if (tag_in_db) {
            tag_id = tag_in_db.id
          } else {
            const tag_creation_res = await db_helper.update(query.create_tag(tag), tag)
            if (!tag_creation_res.affectedRows) {
              return result({ status: 400 })
            }
            tag_id = tag_creation_res.insertId
          }
        }

        // Creating new object to save in DB
        const new_publication_has_tag = {
          publication_id,
          tag_id,
        }

        // Add publication_has_tag to DB
        const publication_has_tag_res = await db_helper.update(query.add_publication_has_tag(new_publication_has_tag), new_publication_has_tag)
        if (!publication_has_tag_res.affectedRows) {
          return result({ status: 400 })
        }
      }
    }

    // Handle Events:
    if (events) {
      for (curr_event of events) {
        const event_to_save = {
          publication_id,
          ...curr_event,
        }
        const event_creation_res = await db_helper.update(query.create_event(event_to_save), event_to_save)
        if (!event_creation_res.affectedRows) {
          return result({ status: 400 })
        }
      }
    }
    // Handle attachments:
    if (attachments) {
      // Upload files to bucket & save to db
      for (const attachment of attachments) {
        //updalod to bucket
        const { file_name, file_name_system, file_type } = attachment
        // await bucket_service.upload_file_to_bucket(file_name_system)
        //save in db
        const attachment_data = { publication_id, file_name, file_name_system, type: file_type }
        const res_save_in_db = await db_helper.update(query.create_attachments(attachment_data), attachment_data)
        if (!res_save_in_db.affectedRows) {
          console.log('failed to insert attachment_data in db')
        }
        //delelte the file
        //const filePath = './uploaded_files/' + file_name_system
        // fs.unlinkSync(filePath)
      }
    }
    const [publication_inserted] = await db_helper.get(query.get_publication_by_id(publication_res.insertId))
    if (!publication_inserted) return result({ status: 404 })
    if (status == 'published') {
      console.log('here')
      let content = {
        type: 'new publication',
        title: processed_data.title,
        categories: categories_names.join(', '),
        time: moment(),
        publication_id: publication_inserted.id,
      }
      content = JSON.stringify(content)
      const data = {
        content: content,
      }
      const notification_res = await db_helper.update(notification_query.create(data), data)
      if (!notification_res) return result({ status: 404 })
      const content_id = notification_res.insertId
      // delete author from notifiers
      var index = uniq_notifiers.indexOf(user_id)
      if (index !== -1) {
        uniq_notifiers.splice(index, 1)
      }
      // send notification to all users pf publication category
      module_notification.send_notification(uniq_notifiers, content_id)
    }
    return result({ status: 201 })
  } catch (e) {
    console.log('There was an error creating Publication', e)
    return result({ status: e.status })
  }
}

//get all publication & filter
Publication.getPublications = async (payload, result) => {
  let { id: category_uuid, limit, offset, from, to, search_string, is_bookmarks } = payload
  limit = limit ? limit : DEFAULT_LIMIT
  offset = offset ? offset : DEFAULT_OFFSET
  try {
    const filter_by = await process_filter({ limit, offset, from, to, search_string, is_bookmarks })
    // get publications

    const [category] = await db_helper.get(query.get_category_id_by_uuid(category_uuid))
    if (!category) {
      return result({ status: 404 })
    }
    const category_id = category.id

    const publications = await db_helper.get(query.get_publications_by_category_id(category_id, filter_by))
    for (publication of publications) {
      const id = publication.real_id
      delete publication.real_id
      publication.content = JSON.parse(publication.content)
      const tags = await db_helper.get(query.get_tags_by_publication_id(id))
      publication.tags = tags
      const events = await db_helper.get(query.get_events_by_publication_id(id))
      publication.events = events
      const attachments = await db_helper.get(query.get_attachments_by_publication_id(id))
      publication.attachments = attachments
    }

    const meta_data = await get_meta_data(category_id, filter_by)
    return result({
      status: 200,
      data: {
        publications,
        meta_data,
      },
    })
  } catch (e) {
    console.log(e)
    return result({ status: 500 })
  }
}

//get publication by publication_id
Publication.getPublicationById = async (payload, result) => {
  try {
    const { id: publication_uuid } = payload
    const [publication] = await db_helper.get(query.get_publication_by_uuid(publication_uuid))
    if (!publication) {
      return result({ status: 404 })
    }
    let formated_publication = {}
    const res_attachments = await db_helper.get(query.get_attachments_by_publication_id(publication.id))
    const res_categories = await db_helper.get(query.get_categories_of_publication(publication.id))
    const res_events = await db_helper.get(query.get_events_by_publication_id(publication.id))
    const res_tags = await db_helper.get(query.get_tags_by_publication_id(publication.id))
    const res_comments = await db_helper.get(query.get_comments_by_publication_id(publication.id))
    let publication_comments = []
    for (comment of res_comments) {
      const res_replies = await db_helper.get(query.get_child_comments(comment.real_id))
      let comment_replies = []
      //check if has count replies
      if (res_replies.length) {
        for (reply of res_replies) {
          format_reply = {
            id: reply.id,
            content: reply.content,
            created_at: reply.created_at,
            likes: reply.likes,
            dislikes: reply.dislikes,
            user: {
              id: reply.user_id,
              name: reply.user_name,
            },
          }
          comment_replies.push(format_reply)
        }
      }
      format_comment = {
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        likes: comment.likes,
        dislikes: comment.dislikes,
        user: {
          id: comment.user_id,
          name: comment.user_name,
        },
        count_replies: res_replies ? res_replies.length : 0,
        replies: comment_replies,
      }
      publication_comments.push(format_comment)
    }
    if (publication.type == 'live') {
      let format_publication = {
        id: publication.uuid,
        published_at: publication.status ? publication.status : null,
        status: publication.status ? 'published' : 'draft',
        attachments: res_attachments ? res_attachments : [],
        comments: publication.comments,
        content: publication.content,
        created_at: publication.created_at,
        updated_at: publication.updated_at,
        description: publication.description,
        dislikes: publication.dislikes,
        likes: publication.likes,
        author: {
          name: publication.name,
          avatar: publication.avatar,
        },
        shares: publication.shares,
        title: publication.title,
        type: publication.type,
        categories: res_categories ? res_categories : [],
        events: res_events ? res_events : [],
        tags: res_tags ? res_tags : [],
        comments: publication_comments,
      }
      formated_publication = format_publication
    }
    if (publication.type == 'dead') {
      let format_publication = {
        id: publication.uuid,
        published_at: publication.status ? publication.status : null,
        status: publication.status ? 'published' : 'draft',
        attachments: res_attachments ? res_attachments : [],
        comments: publication.comments,
        created_at: publication.created_at,
        updated_at: publication.updated_at,
        description: publication.description,
        dislikes: publication.dislikes,
        likes: publication.likes,
        author: {
          name: publication.name,
          avatar: publication.avatar,
        },
        shares: publication.shares,
        title: publication.title,
        type: publication.type,
        file_pdf: publication.file_pdf,
        title_pdf: publication.title_pdf,
        title_video: publication.title_video,
        link_video: publication.link_video,
        categories: res_categories ? res_categories : [],
        events: res_events ? res_events : [],
        tags: res_tags ? res_tags : [],
        comments: publication_comments,
      }
      formated_publication = format_publication
    }

    // Get tags & events
    return result({
      status: 200,
      data: formated_publication,
    })
  } catch (e) {
    return result({ status: 500 })
  }
}

//update publication
Publication.updatePublication = async (payload, result) => {
  try {
    const { id: user_id } = payload.bearerAuth.user
    console.log('payload', payload)
    const unprocessed_data = payload.publicationUpdate
    const status = unprocessed_data.status
    delete unprocessed_data.status
    const { id: publication_uuid } = payload
    delete unprocessed_data.id
    const processed_data = await process_data(unprocessed_data)
    const categories = processed_data.categories
    const tags = processed_data.tags
    const events = processed_data.events
    const attachments = processed_data.attachments
    delete processed_data.categories
    delete processed_data.tags
    delete processed_data.events
    delete processed_data.attachments
    if (status == 'published') {
      console.log('i`m here')
      processed_data.published_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }
    const [res_publication_id] = await db_helper.get(query.get_publication_id_by_uuid(publication_uuid))
    const publication_id = res_publication_id.id
    //get the total words befor update;
    let prev_total_words = 0
    if (res_publication_id.type == 'live') {
      const prev_blocks = JSON.parse(res_publication_id.content).blocks
      if (res_publication_id.type == 'live' && prev_blocks) {
        for (block of prev_blocks) {
          let arr_words = block.text.split(' ')
          let count_words = arr_words.length
          prev_total_words += count_words
        }
      }
    }

    // Save processed payload to db

    const publication_res = await db_helper.update(query.update_publication(processed_data, publication_uuid), processed_data)
    if (!publication_res.affectedRows) {
      return result({ status: 400 })
    }

    //  UPDATE THE STATISTICS OF AUTHOR
    if (processed_data.type == 'live') {
      const blocks = JSON.parse(processed_data.content).blocks
      if (blocks) {
        let total_words = 0
        for (block of blocks) {
          let arr_words = block.text.split(' ')
          let count_words = arr_words.length
          total_words += count_words
        }
        const [res_statistics] = await db_helper.get(query.get_statistics_of_of_author(user_id))
        if (processed_data.published_at) {
          res_statistics.published_total += -prev_total_words + total_words
          res_statistics.published_avg = res_statistics.published_total / res_statistics.posts
        } else {
          res_statistics.draft_total += -prev_total_words + total_words
          res_statistics.draft_avg = res_statistics.draft_total / res_statistics.saved
        }
        delete res_statistics.user_id
        const update_statistics = await db_helper.update(query.update_statistics(res_statistics, user_id), res_statistics)
        if (!update_statistics.affectedRows) return result({ status: 400 })
      }
    }

    // Handle Categories
    if (categories) {
      //delete all categories of publication
      const delete_categories = await db_helper.update(query.delete_categories_of_publication(publication_id), publication_id)
      if (!delete_categories.affectedRows) {
        console.log('i`m here4')

        return result({ status: 400 })
      }
      console.log('categories', categories)
      for (category_uuid of categories) {
        const [category] = await db_helper.get(query.get_category_id_by_uuid(category_uuid))
        const category_id = category.id

        const new_category_has_publication = {
          publication_id,
          category_id,
        }
        const category_has_publication_res = await db_helper.update(query.add_category_has_publication(new_category_has_publication), new_category_has_publication)
        if (!category_has_publication_res.affectedRows) {
          return result({ status: 400 })
        }
      }
    }

    // Handle Tags:
    if (tags) {
      //delete publication has tags
      const delete_publication_has_tag = await db_helper.update(query.delete_publication_has_tag(publication_id))
      console.log('delete', delete_publication_has_tag)
      if (!delete_publication_has_tag) {
        return result({ status: 400 })
      }
      for (tag of tags) {
        console.log(tag)
        let tag_id
        if (tag['id']) {
          // If tag['uuid'] - get the tag_id from DB
          const tag_uuid = tag['id']
          const [tag_in_db] = await db_helper.get(query.get_tag_id_by_uuid(tag_uuid))
          if (!tag_in_db) {
            return result({ status: 400 })
          }
          tag_id = tag_in_db.id
        } else if (tag['name']) {
          // Check if there is a tag by this name. (get_tag_by_name)
          const [tag_in_db] = await db_helper.get(query.get_tag_by_name(tag['name']))
          if (tag_in_db) {
            tag_id = tag_in_db.id
          } else {
            const tag_creation_res = await db_helper.update(query.create_tag(tag), tag)
            if (!tag_creation_res.affectedRows) {
              return result({ status: 400 })
            }
            tag_id = tag_creation_res.insertId
          }
        }
        // Creating new object to save in DB
        const new_publication_has_tag = {
          publication_id,
          tag_id,
        }
        const publication_has_tag_res = await db_helper.update(query.add_publication_has_tag(new_publication_has_tag), new_publication_has_tag)
        if (!publication_has_tag_res.affectedRows) {
          return result({ status: 400 })
        }

        // Add publication_has_tag to DB
      }
    }
    // Handle Events:
    // delete all events of publication
    const delete_evevnts = await db_helper.update(query.delete_events_of_publication(publication_id))
    if (!delete_evevnts) {
      return result({ status: 400 })
    }
    if (events) {
      for (curr_event of events) {
        const event_uuid = curr_event.uuid
        delete curr_event.uuid
        const event_to_save = {
          publication_id,
          ...curr_event,
        }
        let event_creation_res
        if (event_uuid) {
          event_creation_res = await db_helper.update(query.update_event_by_uuid(event_uuid, event_to_save), event_to_save)
        } else {
          event_creation_res = await db_helper.update(query.create_event(event_to_save), event_to_save)
        }
        if (!event_creation_res.affectedRows) {
          return result({ status: 400 })
        }
      }
    }

    // Handle attachments:
    if (attachments) {
      // Upload files to bucket & save to db
      for (const attachment of attachments) {
        //updalod to bucket
        // const { file_name, file_name_system, type } = attachment.file_name
        //let res_file = await bucket_service.upload_file_to_bucket(file_name)
        attachment.type = attachment.file_type
        delete attachment.file_type
        //save in db
        const res_save_in_db = await db_helper.update(query.update_attachments(attachment, publication_id), attachment)
        if (!res_save_in_db.affectedRows) {
          console.log('failed to insert attachment_data in db')
        }
        //delelte the file
        // const filePath = './uploaded_files/' + file_name
        // fs.unlinkSync(filePath)
      }
    }
    //UPDATE STATISTICS
    return result({ status: 201 })
  } catch (e) {
    console.log('There was an error updating Publication', e)
    return result({ status: 500 })
  }
}

//remove publication
Publication.deletePublication = async (payload, result) => {
  // Try to get publication by uuid, if its is_active property is 1, we change to 0, if its 0 return bad request
  const { id: user_id } = payload.bearerAuth.user

  const { id: publication_uuid } = payload
  try {
    const [publication] = await db_helper.get(query.get_publication_by_uuid(publication_uuid))

    if (!publication) {
      return result({ status: 404 })
    }

    //UPDATE STATISTICS TABLE words
    if (publication.status) {
      const res_statistics = await db_helper.get(query.decreas_posts(user_id))
      if (!res_statistics.affectedRows) {
        return result({ status: 400 })
      }
    } else {
      const res_statistics = await db_helper.get(query.decreas_drafts(user_id))
      if (!res_statistics.affectedRows) {
        return result({ status: 400 })
      }
    }
    //UPDATE STATISTICS TABLE words
    if (publication.type == 'live') {
      const blocks = JSON.parse(publication.content).blocks
      if (publication.type == 'live' && blocks) {
        let total_words = 0
        for (block of blocks) {
          let arr_words = block.text.split(' ')
          let count_words = arr_words.length
          total_words += count_words
        }
        const [res_statistics] = await db_helper.get(query.get_statistics_of_of_author(user_id))
        //if publication is published
        if (publication.status) {
          res_statistics.published_total -= total_words
          res_statistics.published_avg = res_statistics.published_total / res_statistics.posts ? res_statistics.published_total / res_statistics.posts : 0
        } else {
          res_statistics.draft_total -= total_words
          res_statistics.draft_avg = res_statistics.draft_total / res_statistics.saved ? res_statistics.published_total / res_statistics.posts : 0
        }
        delete res_statistics.user_id
        const update_statistics = await db_helper.update(query.update_statistics(res_statistics, user_id), res_statistics)
        if (!update_statistics.affectedRows) return result({ status: 400 })
      }
    }

    const res = await db_helper.update(query.delete_publication_by_uuid(publication_uuid))
    if (!res.affectedRows) {
      return result({ status: 400 })
    }
    return result({ status: 201 })
  } catch (e) {
    console.log('Error occurred deleting publication.', e)
    return result({ status: 500 })
  }
}

// add like / dis / share
Publication.socialPublication = async (payload, result) => {
  const { id: user_id } = payload.bearerAuth.user
  const { id: publication_uuid } = payload
  const { type } = payload.publicationType
  if (type !== 'like' && type !== 'dislike' && type !== 'share') {
    return result({ status: 400 })
  }

  try {
    const [publication] = await db_helper.get(query.get_publication_by_uuid(publication_uuid))
    if (!publication) {
      return result({ status: 404 })
    }
    if (type === 'share') {
      // Add social & update publication with new share
      await db_helper.update(query.add_share(publication.id, user_id))
    } else {
      const [social] = await db_helper.get(query.get_social_by_publication_and_user_id(publication.id, user_id))
      if (!social) {
        // Create new social
        const new_social = {
          publication_id: publication.id,
          user_id,
          type,
        }
        await db_helper.update(query.create_social(new_social), new_social)
      } else {
        // Social exists, determine whether that user already did like/dislike this publication
        const type_in_db = social.type
        if (type_in_db === type) {
          // If the given type and the type in DB are the same, remove that social
          await db_helper.get(query.delete_social_by_id(social.id))
        } else {
          // Else, update the social with provided type
          await db_helper.update(query.update_social_by_id(social.id, type), { type })
        }
      }
    }

    return result({ status: 201 })
  } catch (e) {
    console.log('Error occurred updating social', e)
    return result({ status: 500 })
  }
}

// add / remove bookmark
Publication.bookmarkPublication = async (payload, result) => {
  const { id: user_id } = payload.bearerAuth.user
  const { id: publication_uuid } = payload
  try {
    const [publication] = await db_helper.get(query.get_publication_id_by_uuid(publication_uuid))
    const { id: publication_id } = publication
    // get bookmark by publication_id & user_id
    const [bookmark] = await db_helper.get(query.get_bookmark_by_publication_and_user_id(publication.id, user_id))
    if (!bookmark) {
      // Create Bookmark
      const new_bookmark = {
        publication_id,
        user_id,
      }
      const res = await db_helper.update(query.create_bookmark(new_bookmark), new_bookmark)
      if (!res.affectedRows) {
        return result({ status: 404 })
      }
    } else {
      // Remove bookmark
      await db_helper.get(query.delete_bookmark_by_id(bookmark.id))
    }
    return result({ status: 200 })
  } catch (e) {
    console.log('Error occurred in bookmark', e)
    return result({ status: 500 })
  }
}
Publication.getPublicationsOfUser = async (payload, result) => {
  const { id: user_id } = payload.bearerAuth.user
  try {
    const res_categories = await db_helper.get(query.get_categories_of_user(user_id))
    let categories = []
    for (category of res_categories) {
      categories.push(category.id)
    }
    const publications = await db_helper.get(query.get_publications_of_user(categories))
    if (!publications) return result({ status: 404 })
    let new_publications = []
    for (let publication of publications) {
      const res_attachments = await db_helper.get(query.get_attachments_by_publication_id(publication.id))
      const res_categories = await db_helper.get(query.get_categories_of_publication(publication.id))
      let format_publication = {}
      if (publication.type == 'live') {
        format_publication = {
          id: publication.uuid,
          published_at: publication.published_at,
          attachments: res_attachments ? res_attachments : [],
          content: publication.content,
          created_at: publication.created_at,
          description: publication.description,
          name: publication.name,
          title: publication.title,
          type: publication.type,
          categories: res_categories ? res_categories : [],
        }
      }
      if (publication.type == 'dead') {
        format_publication = {
          id: publication.uuid,
          published_at: publication.published_at,
          attachments: res_attachments ? res_attachments : [],
          created_at: publication.created_at,
          description: publication.description,
          name: publication.name,
          title: publication.title,
          type: publication.type,
          file_pdf: publication.file_pdf,
          title_pdf: publication.title_pdf,
          title_video: publication.title_video,
          link_video: publication.link_video,
          categories: res_categories ? res_categories : [],
        }
      }
      new_publications.push(format_publication)
    }
    return result({ status: 200, data: new_publications })
  } catch (e) {
    console.log('Error occurred in bookmark', e)
    return result({ status: 500 })
  }
}
Publication.viewPublication = async (payload, result) => {
  const { id: user_id } = payload.bearerAuth.user
  const { id: publication_uuid } = payload
  try {
    const res = await db_helper.get(query.update_view(publication_uuid))
    if (!res.affectedRows) return result({ status: 404 })
    const [publication] = await db_helper.get(query.get_publication_by_uuid(publication_uuid))
    const update_statistics = await db_helper.get(query.statistics_view(publication.user_id))
    if (!update_statistics.affectedRows) return result({ status: 404 })
    return result({ status: 201 })
  } catch (error) {
    console.log('Error occurred adding view ', error)

    return result({ status: 500 })
  }
}

Publication.publishPublication = async (payload, result) => {
  const { id: user_id } = payload.bearerAuth.user
  const { id: publication_uuid } = payload
  try {
    const data = {
      published_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    }
    const res = await db_helper.update(query.update_publication(data, publication_uuid), data)
    if (!res.affectedRows) return result({ status: 404 })
    const statistics_res = await db_helper.get(query.publish_statistics(user_id))
    if (!statistics_res.affectedRows) return result({ status: 404 })
    return result({ status: 201 })
  } catch (error) {
    console.log('Error occurred publish draft ', error)

    return result({ status: 500 })
  }
}

module.exports = Publication

// const process_data = (unprocessed_data) => {
//   console.log("unprocessed_data",unprocessed_data)
//   return new Promise(async (resolve, reject) => {
//     const processed_data = {}
//     for (const [key, val] of Object.entries(unprocessed_data)) {
//       if (val !== undefined ) {
//         switch (key) {
//           case 'title':
//             processed_data[key] = val.trim()
//             break
//           case 'content':
//             processed_data[key] = JSON.stringify(val)
//             break
//           case 'description':
//             processed_data[key] = val.trim()
//             break
//           case 'status':
//             processed_data[key] = val.trim()
//             break
//           case 'type':
//             processed_data[key] = val.trim()
//             break
//           case 'categories':
//             processed_data[key] = val
//             break
//           case 'tags':
//             if (isArray(val) && val.length) {
//               processed_data[key] = []
//               for (const tag_value of Object.values(val)) {
//                 const new_tag = {}
//                 if (tag_value['name']) {
//                   new_tag['name'] = tag_value['name']
//                   processed_data[key].push(new_tag)
//                 } else if (tag_value['id']) {
//                   new_tag['uuid'] = tag_value['id']
//                   processed_data[key].push(new_tag)
//                 } else {
//                   console.log('here 2')
//                   return reject({ status: 400 })
//                 }
//               }
//             }
//             break
//           case 'events':
//             if (isArray(val) && val.length) {
//               processed_data[key] = []
//               for (const event_value of Object.values(val)) {
//                 const new_event = {}
//                 if (!event_value['title'] || !event_value['date']) {
//                   return reject({ status: 400 })
//                 } else {
//                   if (event_value['id']) {
//                     new_event['uuid'] = event_value['id']
//                   }
//                   if (event_value['title']) {
//                     new_event['title'] = event_value['title']
//                   }
//                   if (event_value['date']) {
//                     new_event['date'] = moment(event_value['date'], 'YYYY-MM-DD').toDate()
//                   }
//                 }
//                 processed_data[key].push(new_event)
//               }
//             }
//             break
//           case 'attachments':
//             let has_main_bg = false
//             if (isArray(val) && val.length) {
//               processed_data[key] = []
//               for (const attachment of Object.values(val)) {
//                 if (attachment.file_type == 'main_bg') has_main_bg = true
//                 if (!attachment.file_name || !attachment.file_name_system) {
//                   console.log("i am here")
//                   return reject({ status: 404 })
//                 } else {
//                   let fileTypes = []
//                   let name_of_file = attachment.file_name
//                   const fileArray = name_of_file.split('.')
//                   const extension = fileArray.pop()
//                   if (attachment.file_type == 'main_bg') {
//                     fileTypes = ['png', 'jpg', 'svg', 'jfif', 'webp']
//                     {
//                     if (!fileTypes.includes(extension))
//                     console.log('-----------')
//                     return reject({ status: 404 })
//                     }
//                   } else {
//                     fileTypes = ['png', 'jpg', 'svg', 'jfif', 'webp', 'doc', 'docx', 'pdf']
//                     if (!fileTypes.includes(extension)) {
//                       console.log('-++++++++-')
//                       return reject({ status: 404 })
//                     }
//                   }
//                   processed_data[key].push(attachment)
//                 }
//               }
//               if (!has_main_bg) {
//                 console.log('FFFFFFFF')
//                 return reject({ status: 404 })
//               }
//             }
//             break
//           case 'comments':
//             processed_data[key] = val
//             break
//           case 'shares':
//             processed_data[key] = val
//             break
//           case 'dislikes':
//             processed_data[key] = val
//             break
//           case 'likes':
//             processed_data[key] = val
//             break
//           case 'views':
//             processed_data[key] = val
//             break
//           case 'title_video':
//             processed_data[key] = val.trim()
//             break
//           case 'link_video':
//             processed_data[key] = val.trim()
//             break
//           case 'title_pdf':
//             processed_data[key] = val.trim()
//             break
//           case 'file_pdf':
//             let name_of_file = val
//             const fileArray = name_of_file.split('.')
//             const extension = fileArray.pop()
//             if (extension !== 'pdf') {
//               console.log('kjrffrirjk')
//               return reject({ status: 404 })
//             }
//             processed_data[key] = val.trim()
//             break
//           case 'published_at':
//             processed_data[key] = moment(val, 'YYYY-MM-DD').toDate()
//             break
//           default:
//             console.log('keyhsdkjk')
//             return reject({ status: 404 })
//         }
//       }
//     }
//     return resolve(processed_data)
//   })
// }
const process_data = (unprocessed_data) => {
  return new Promise(async (resolve, reject) => {
    const processed_data = {}
    for (const [key, val] of Object.entries(unprocessed_data)) {
      if (val !== undefined) {
        switch (key) {
          case 'title':
            processed_data[key] = val.trim()
            break
          case 'content':
            processed_data[key] = JSON.stringify(val)
            break
          case 'description':
            processed_data[key] = val.trim()
            break
          case 'status':
            processed_data[key] = val.trim()
            break
          case 'type':
            processed_data[key] = val.trim()
            break
          case 'categories':
            if (isArray(val) && val.length) {
              processed_data[key] = val
            } else {
              return reject({ status: 400 })
            }
            break
          case 'tags':
            if (isArray(val) && val.length) {
              processed_data[key] = []
              for (const tag_value of Object.values(val)) {
                const new_tag = {}
                if (tag_value['name']) {
                  new_tag['name'] = tag_value['name']
                  processed_data[key].push(new_tag)
                } else if (tag_value['id']) {
                  new_tag['id'] = tag_value['id']
                  processed_data[key].push(new_tag)
                } else {
                  return reject({ status: 400 })
                }
              }
            }
            break
          case 'events':
            if (isArray(val) && val.length) {
              processed_data[key] = []
              for (const event_value of Object.values(val)) {
                const new_event = {}
                if (!event_value['title'] || !event_value['date']) {
                  return reject({ status: 400 })
                } else {
                  if (event_value['id']) {
                    new_event['uuid'] = event_value['id']
                  }
                  if (event_value['title']) {
                    new_event['title'] = event_value['title']
                  }
                  if (event_value['date']) {
                    new_event['date'] = moment(event_value['date'], 'YYYY-MM-DD').toDate()
                  }
                }
                processed_data[key].push(new_event)
              }
            }
            break
          case 'attachments':
            let has_main_bg = false
            if (isArray(val) && val.length) {
              processed_data[key] = []
              for (const attachment of Object.values(val)) {
                if (attachment.file_type == 'main_bg') has_main_bg = true
                if (!attachment.file_name || !attachment.file_name_system) {
                  return reject({ status: 401 })
                } else {
                  processed_data[key].push(attachment)
                }
              }
              if (!has_main_bg) return reject({ status: 401 })
            }
            break
          case 'comments':
            processed_data[key] = val
            break
          case 'shares':
            processed_data[key] = val
            break
          case 'dislikes':
            processed_data[key] = val
            break
          case 'likes':
            processed_data[key] = val
            break
          case 'views':
            processed_data[key] = val
            break
          case 'title_video':
            processed_data[key] = val.trim()
            break
          case 'link_video':
            processed_data[key] = val.trim()
            break
          case 'title_pdf':
            processed_data[key] = val.trim()
            break
          case 'file_pdf':
            processed_data[key] = val.trim()
            break
          case 'published_at':
            processed_data[key] = moment(val, 'YYYY-MM-DD').toDate()
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

const get_meta_data = (category_id, filter_by) => {
  return new Promise(async (resolve, reject) => {
    const { limit, offset } = filter_by
    let [{ sum }] = await db_helper.get(query.get_sum_rows(category_id, filter_by))

    const meta_data = {
      sum_rows: sum,
      limit: limit,
      page: offset == 0 ? 1 : JSON.parse(Math.ceil(offset / limit)) + 1,
      sum_pages: Math.ceil(sum / limit),
    }
    return resolve(meta_data)
  })
}

const process_filter = (filters) => {
  // limit, offset, from, to, search_string, is_bookmarks
  return new Promise(async (resolve, reject) => {
    const processed_filters = {}
    for (const [key, val] of Object.entries(filters)) {
      if (val !== undefined) {
        switch (key) {
          case 'limit':
            if (typeof val === 'number') {
              processed_filters[key] = val > 100 ? 100 : Math.abs(val)
            } else {
              processed_filters[key] = DEFAULT_LIMIT
            }
            break
          case 'offset':
            if (typeof val === 'number') {
              processed_filters[key] = val > 100 ? 100 : Math.abs(val)
            } else {
              processed_filters[key] = DEFAULT_OFFSET
            }
            break
          case 'from':
          case 'to':
            // Handling both 'from' && 'to'
            processed_filters[key] = moment(val, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss')
            break
          case 'search_string':
            processed_filters[key] = val
            break
          case 'is_bookmarks':
            if (val === 'true') {
              processed_filters[key] = true
            } else {
              processed_filters[key] = false
            }
            break
          default:
            return reject({ status: 400 })
        }
      }
    }
    return resolve(processed_filters)
  })
}
