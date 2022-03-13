const create_publication = (data) => {
	return `
    INSERT INTO publication (${Object.keys(data)})
    VALUES (${Object.values(data).map((key) => '?')});
  `;
};
const create_attachments = (data) => {
	return `
    INSERT INTO attachment (${Object.keys(data)})
    VALUES (${Object.values(data).map((key) => '?')});
  `;
};

const update_publication = (data, uuid) => {
	return `
  UPDATE publication
  SET ${Object.keys(data).map((key) => `${key} = ? `)}
  WHERE uuid = '${uuid}';
  `;
};

const get_publications_by_category_id = (id, filter_by) => {
	const { limit, offset, from, to, search_string, is_bookmarks } = filter_by;
	return `
    SELECT p.id AS real_id, p.uuid AS id, p.title, p.description, p.content, p.created_at, p.updated_at, u.name AS author_name, p.views, p.likes, p.dislikes, p.shares, p.comments
    FROM publication p
    JOIN category c ON c.id = ${id}
    JOIN category_has_publication chp ON c.id = chp.category_id AND p.id = chp.publication_id 
    JOIN user u ON u.id = p.user_id
    ${is_bookmarks ? 'JOIN bookmark b ON b.publication_id = p.id' : ''}
    WHERE p.is_active = 1
    ${search_string ? ` AND p.description LIKE '%${search_string}%' ` : ''}
    ${from ? ` AND p.created_at > '${from}' ` : ''}
    ${to ? ` AND p.created_at < '${to}' ` : ''}
    LIMIT ${limit} OFFSET ${offset};
  `;
};
const get_categories_of_publication = (id) => {
	return `SELECT c.uuid as id,c.name FROM
 category_has_publication cp 
  INNER JOIN category c 
  ON c.id = cp.category_id 
  WHERE  cp.publication_id=${id}`;
};
const get_publication_by_uuid = (uuid) => {
	return `
  SELECT p.id, p.uuid ,p.published_at as status ,p.type,p.title,p.description,p.content,
  u.name ,u.avatar,
  p.created_at,
  p.updated_at,
  p.views, p.likes, p.dislikes, p.shares, p.comments ,
  p.title_video, p.link_video, p.title_pdf, p.file_pdf ,p.user_id
  FROM publication p
  inner join user u on 
  u.id=  p.user_id
  WHERE p.uuid='${uuid}' AND p.is_active=1;
  `;
};
const get_publication_id_by_uuid = (uuid) => {
	return `
    SELECT id,content ,type FROM publication WHERE uuid = '${uuid}';
  `;
};

const delete_publication_by_uuid = (uuid) => {
	return `
    UPDATE publication SET is_active = 0 WHERE uuid = '${uuid}';
  `;
};

const get_social_by_publication_and_user_id = (publication_id, user_id) => {
	return `
    SELECT * FROM social WHERE publication_id = ${publication_id} AND user_id = ${user_id} AND type IN ('like', 'dislike');
  `;
};

const create_social = (data) => {
	return `
    INSERT INTO social (${Object.keys(data)})
    VALUES (${Object.values(data).map((key) => '?')});
  `;
};

const update_social_by_id = (social_id, type) => {
	return `
    UPDATE social SET type = '${type}' WHERE id = ${social_id} AND type <> 'share';
  `;
};

const delete_social_by_id = (social_id) => {
	return `
    DELETE FROM social WHERE id = ${social_id};
  `;
};

const add_share = (publication_id, user_id) => {
	return `
    INSERT INTO social (publication_id, user_id, type) VALUES (${publication_id}, ${user_id}, 'share');
  `;
};

const create_bookmark = (data) => {
	return `
    INSERT INTO bookmark (${Object.keys(data)})
    VALUES (${Object.values(data).map((key) => '?')})
    ;
  `;
};

const delete_bookmark_by_id = (id) => {
	return `
    DELETE FROM bookmark WHERE id = ${id};
  `;
};

const get_bookmark_by_publication_and_user_id = (publication_id, user_id) => {
	return `
    SELECT * FROM bookmark WHERE publication_id = ${publication_id} AND user_id = ${user_id};
  `;
};

const get_category_id_by_uuid = (uuid) => {
	return `
    SELECT id , name FROM category WHERE uuid = '${uuid}';
  `;
};

const add_category_has_publication = (data) => {
	return `
    INSERT INTO category_has_publication (${Object.keys(data)})
    VALUES (${Object.values(data).map((key) => '?')});
  `;
};

const add_publication_has_tag = (data) => {
	return `
    INSERT INTO publication_has_tag (${Object.keys(data)})
    VALUES (${Object.values(data).map((key) => '?')});
  `;
};

const get_tag_id_by_uuid = (uuid) => {
	return `
    SELECT id FROM tag WHERE uuid = '${uuid}';
  `;
};

const get_tag_by_name = (tag_name) => {
	return `
    SELECT id, name FROM tag WHERE name = '${tag_name}';
  `;
};

const create_tag = (data) => {
	return `
    INSERT INTO tag (${Object.keys(data)})
    VALUES (${Object.values(data).map((key) => '?')})
    ;
  `;
};

const create_event = (data) => {
	return `
    INSERT INTO event (${Object.keys(data)})
    VALUES (${Object.values(data).map((key) => '?')})
    ;
  `;
};

const update_event_by_uuid = (uuid, data) => {
	return `
  UPDATE event
  SET ${Object.keys(data).map((key) => `${key} = ? `)}
  WHERE uuid = '${uuid}';
  `;
};

const get_tags_by_publication_id = (id) => {
	return `
  SELECT
   t.uuid as id, t.name as name 
   FROM publication_has_tag pt 
   INNER JOIN tag t ON 
   pt.tag_id =t.id 
   WHERE publication_id=${id};
  `;
};

const get_events_by_publication_id = (id) => {
	return `
    SELECT title, date FROM event 
    WHERE is_active = 1 AND publication_id = ${id};
  `;
};

const get_attachments_by_publication_id = (id) => {
	return `
    SELECT file_name, file_name_system, type as file_type FROM attachment
    WHERE is_active = 1 AND publication_id = ${id};
  `;
};

const get_sum_rows = (id, filter_by) => {
	const { from, to, search_string, is_bookmarks } = filter_by;
	return `
  SELECT COUNT(DISTINCT p.id) AS sum
    FROM publication p
    JOIN category c ON c.id = ${id}
    JOIN category_has_publication chp ON c.id = chp.category_id AND p.id = chp.publication_id
    JOIN user u ON u.id = p.user_id
    ${is_bookmarks ? 'JOIN bookmark b ON b.publication_id = p.id' : ''}
    WHERE p.is_active = 1
    ${search_string ? ` AND p.description LIKE '%${search_string}%' ` : ''}
    ${from ? ` AND p.created_at > '${from}' ` : ''}
    ${to ? ` AND p.created_at < '${to}' ` : ''};
  `;
};

const get_category_has_publication = (category_id, publication_id) => {
	return `SELECT * FROM category_has_publication WHERE category_id=${category_id} AND publication_id=${publication_id};`;
};
const get_publication_has_tag = (tag_id, publication_id) => {
	return `SELECT * FROM publication_has_tag WHERE tag_id=${tag_id} AND publication_id=${publication_id};`;
};
const update_attachments = (data, publication_id) => {
	return `
  UPDATE attachment
  SET ${Object.keys(data).map((key) => `${key} = ? `)}
  WHERE publication_id = ${publication_id} AND type='main_bg';
  `;
};
const decreas_posts = (user_id) => {
	return `UPDATE statistics
SET posts=posts-1
WHERE user_id=${user_id};`;
};
const decreas_drafts = (user_id) => {
	return `UPDATE statistics
  SET saved=saved-1
  WHERE user_id=${user_id};`;
};
const get_statistics_of_of_author = (user_id) => {
	return `SELECT * FROM statistics WHERE user_id=${user_id};`;
};
const update_statistics = (data, user_id) => {
	return `
  UPDATE statistics
  SET ${Object.keys(data).map((key) => `${key} = ? `)}
  WHERE user_id = '${user_id}';
  `;
};
const delete_categories_of_publication = (publication_id) => {
	return `DELETE FROM category_has_publication WHERE (publication_id) IN (${publication_id});`;
};
const delete_publication_has_tag = (publication_id) => {
	return `DELETE FROM publication_has_tag WHERE (publication_id) IN (${publication_id})`;
};
const delete_events_of_publication = (publication_id) => {
	return `DELETE FROM event WHERE (publication_id) IN (${publication_id})`;
};
const get_categories_of_user = (user_id) => {
	return `SELECT c.id ,c.name FROM user_has_category u
  INNER JOIN category c ON c.id=u.category_id WHERE u.user_id=${user_id};`;
};
const get_publications_of_user = (categories) => {
	return `SELECT distinct(p.id), p.uuid  ,p.updated_at ,p.type,p.title,p.description,p.content,p.published_at,
  u.name , u.avatar ,
  p.created_at,
  p.updated_at,
  p.views, p.likes, p.dislikes, p.shares, p.comments ,
  p.title_video, p.link_video, p.title_pdf, p.file_pdf FROM category_has_publication chp
  INNER JOIN publication p ON p.id= chp.publication_id 
  INNER JOIN user u ON 
  u.id=  p.user_id
  WHERE category_id in (${categories}) AND isnull(p.published_at)=false AND p.is_active=1
  ORDER BY p.published_at DESC;`;
};
const get_comments_by_publication_id = (id) => {
	return `SELECT c.id as real_id,
  c.uuid as id, c.created_at , c.content ,c.likes,c.dislikes, u.uuid as user_id ,u.name as user_name 
  FROM comment c
  INNER JOIN user u  ON u.id=c.user_id
   WHERE c.publication_id=${id} AND ISNULL(c.comment_id) AND c.is_active=1
   ORDER BY c.created_at DESC`;
};
const get_child_comments = (comment_id) => {
	return `SELECT 
   c.uuid as id, c.created_at , c.content,c.likes,c.dislikes , u.uuid as user_id ,u.name as user_name
   FROM comment c
  INNER JOIN user u  ON u.id=c.user_id WHERE c.comment_id=${comment_id} AND c.is_active=1
  ORDER BY c.created_at DESC`;
};
const get_comment_by_uuid = (uuid) => {
	return `SELECT * FROM comment c WHERE c.uuid='${uuid}' AND c.is_active=1;`;
};
const update_view = (uuid) => {
	return `UPDATE publication SET views = views+1 WHERE uuid='${uuid}'`;
};
const publish_statistics = (user_id) => {
	return `UPDATE statistics SET saved=saved-1 , posts=posts+1
  WHERE user_id=${user_id}`;
};
const statistics_view = (user_id) => {
	return `UPDATE statistics  SET views=views+1 
 WHERE user_id = ${user_id}`;
};
const get_publication_by_id = (id) => {
	return `SELECT uuid as id FROM publication WHERE id=${id}`;
};
module.exports = {
	create_publication,
	create_attachments,
	get_publications_by_category_id,
	get_publication_by_uuid,
	get_publication_id_by_uuid,
	update_publication,
	delete_publication_by_uuid,
	get_social_by_publication_and_user_id,
	create_social,
	update_social_by_id,
	delete_social_by_id,
	add_share,
	create_bookmark,
	delete_bookmark_by_id,
	get_bookmark_by_publication_and_user_id,
	get_category_id_by_uuid,
	add_category_has_publication,
	create_tag,
	get_tag_id_by_uuid,
	get_tag_by_name,
	add_publication_has_tag,
	create_event,
	update_event_by_uuid,
	get_tags_by_publication_id,
	get_events_by_publication_id,
	get_attachments_by_publication_id,
	get_sum_rows,
	get_category_has_publication,
	get_publication_has_tag,
	get_categories_of_publication,
	update_attachments,
	decreas_posts,
	decreas_drafts,
	get_statistics_of_of_author,
	update_statistics,
	delete_categories_of_publication,
	delete_publication_has_tag,
	delete_events_of_publication,
	get_categories_of_user,
	get_publications_of_user,
	get_comments_by_publication_id,
	get_child_comments,
	get_comment_by_uuid,
	update_view,
	publish_statistics,
	statistics_view,
	get_publication_by_id,
};
