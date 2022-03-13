const sql = require('../../utils/db');

//create comment
const create_comment = (data) => {
	return `
    INSERT INTO comment (${Object.keys(data)})
    VALUES (${Object.values(data).map((key) => '?')});`;
};

//get all comment by publication_id (uuid)
const get_comments_by_id = (id) => {
	return `SELECT c.id as real_id,
  c.uuid as id, c.created_at , c.content ,c.likes,c.dislikes, u.uuid as user_id ,u.name as user_name 
  FROM comment c
  INNER JOIN user u  ON u.id=c.user_id
   WHERE c.publication_id=${id} AND ISNULL(c.comment_id) AND c.is_active=1
   ORDER BY c.created_at DESC;`;
};
//get comment by id
const get_comment_by_id = (id) => {
	return `SELECT id, created_at, user_id, content, publication_id, likes, dislikes 
    FROM comment WHERE id = ${id} AND  is_active = '1';`;
};
const get_child_comments = (comment_id) => {
	return `SELECT 
   c.uuid as id, c.created_at , c.content,c.likes,c.dislikes , u.uuid as user_id ,u.name as user_name
   FROM comment c
  INNER JOIN user u  ON u.id=c.user_id WHERE c.comment_id=${comment_id} AND c.is_active=1
  ORDER BY c.created_at DESC`;
};
//get comment by uuid
const get_comment_by_uuid = (comment_uuid) => {
	return `SELECT c.created_at AS date, c.content, p.uuid AS id,
    c.likes, c.dislikes, u.name AS user FROM comment c 
    INNER JOIN user u ON c.user_id = u.id AND c.uuid = '${comment_uuid}' AND c.is_active = '1'
    INNER JOIN publication p ON p.id = c.publication_id;`;
};

//get comment id by comment uuid
const get_comment_id_by_uuid = (comment_uuid) => {
	return `SELECT c.id AS comment_id FROM comment c 
    INNER JOIN user u ON c.user_id = u.id AND c.uuid = '${comment_uuid}' AND c.is_active = '1'
    INNER JOIN publication p ON p.id = c.publication_id;`;
};

//update comment by id
const update_comment = (content, comment_uuid) => {
	return `UPDATE comment SET content = '${content}' WHERE uuid = '${comment_uuid}' AND is_active = '1';`;
};

//delete comment by id
const delete_comment = (comment_uuid) => {
	return `UPDATE comment SET is_active = '0' WHERE uuid = '${comment_uuid}';`;
};

const get_social_by_comment_id = (id) => {
	return `
    SELECT * FROM social WHERE comment_id = ${id};
  `;
};

const create_social = (data) => {
	return `
  INSERT INTO social (${Object.keys(data)})
  VALUES (${Object.values(data).map((key) => '?')});
`;
};

const delete_social_by_id = (social_id) => {
	return `
    DELETE FROM social WHERE id = ${social_id};
  `;
};

const update_social_by_id = (social_id, type) => {
	return `
    UPDATE social SET type = '${type}' WHERE id = ${social_id} AND type <> 'share';
  `;
};

module.exports = {
	create_comment,
	get_comments_by_id,
	get_comment_by_id,
	get_comment_by_uuid,
	update_comment,
	delete_comment,
	get_social_by_comment_id,
	create_social,
	delete_social_by_id,
	update_social_by_id,
	get_comment_id_by_uuid,
	get_child_comments,
};
