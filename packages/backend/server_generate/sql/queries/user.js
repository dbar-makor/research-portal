const create_user = (user) => {
	return `
    INSERT INTO user
    (${Object.keys(user).map((key) => key)}) VALUES 
    (${Object.values(user).map((val) => '?')});`;
};

const update_user = (user, uuid) => {
	return `
    UPDATE user 
    SET ${Object.keys(user).map((key) => `${key} = ? `)}
    WHERE uuid = '${uuid}';`;
};

const get_users = ({ order_by, sort, limit, offset, search, level_id, status }) => {
	return `
    SELECT
    u.uuid AS id, u.status , u.created_at, u.name, u.username, u.email,u.country,
      u.last_login_at AS last_connected_at 
    FROM user u
    JOIN level l ON l.id = u.level_id
    WHERE
      ${search ? `( u.name LIKE '%${search}%' ) AND ` : ''}
      is_active = 1 
      ${level_id ? ` AND u.level_id = ${level_id}` : ''}
      ${status !== undefined ? ` AND u.status = ${status}` : ''}

      ${order_by ? ` ORDER BY ${order_by} ${sort || 'ASC'} ` : ' ORDER BY created_at DESC'}
    LIMIT ${limit} OFFSET ${offset};
  `;
};

const get_columns_order_by_name = (name) => {
	return `
    SELECT uuid AS id, content
    FROM column_order
    WHERE name = '${name}';`;
};

const get_sum_rows_users = ({ order_by, sort, search, level_id }) => {
	return `
    SELECT
      COUNT(DISTINCT u.id) AS sum
    FROM user u
    WHERE
      ${search ? `( u.name LIKE '%${search}%' ) AND ` : ''}
      is_active = 1
      ${level_id ? ` AND u.level_id = ${level_id}` : ''}
      ${order_by ? ` ORDER BY ${order_by} ${sort || 'ASC'} ` : ''};`;
};

// REMARK: store aside and remove user_id from returnd JSON, it is only for related post processing
const get_user_by_uuid = (uuid) => {
	return `
    SELECT
    u.id AS user_id, u.uuid AS id, u.name,u.status,u.country, u.username, u.avatar, u.email,u.phone, 
    u.last_login_at AS last_connected_at, u.connection_count, u.created_at ,u.position
    FROM user u
    JOIN level l ON l.id = u.level_id
    WHERE u.uuid = '${uuid}' AND is_active = 1;`;
};

const delete_user = (uuid) => {
	return `
  UPDATE user 
  SET is_active = 0
  WHERE uuid = '${uuid}' AND is_active = 1;`;
};

const get_level_by_uuid = (uuid) => {
	return `SELECT * FROM level WHERE uuid = '${uuid}';`;
};
const get_level_by_id = (id) => {
	return `SELECT * FROM level WHERE id = ${id};`;
};
const get_user_id_by_uuid = (uuid, host) => {
	if (host === process.env.DB_NAME) {
		return `SELECT id FROM user WHERE uuid = '${uuid}' ;`;
	} else {
		return `SELECT u.id FROM user u
    JOIN level l ON l.id = u.level_id
    WHERE u.uuid = '${uuid}' AND is_active = 1;`;
	}
};

const get_company_id_by_company_uuid = (uuid) => {
	return `SELECT * FROM company WHERE uuid = '${uuid}';`;
};

const get_level_by_level_uuid = (uuid) => {
	return `SELECT id FROM level WHERE uuid = '${uuid}';`;
};
const get_level_by_level_name = (name) => {
	return `SELECT id FROM level WHERE name = '${name}';`;
};

const get_publications_by_author_id = (id) => {
	return `SELECT p.id, p.uuid ,p.published_at as status,p.type,p.title,p.description,p.content,
u.name ,
p.created_at,
p.updated_at,
 p.views, p.likes, p.dislikes, 
 p.shares, p.comments ,p.file_pdf,
 p.title_pdf,
 p.title_video,
 p.link_video
FROM publication p
inner join user u on 
u.id=  p.user_id
WHERE p.user_id=${id}  AND p.is_active=1
ORDER BY p.created_at DESC;`;
};
const get_attachments_by_publication_id = (id) => {
	return `
    SELECT file_name, file_name_system, type as file_type FROM attachment
    WHERE is_active = 1 AND publication_id = ${id};
  `;
};
const get_statistics_by_author_id = (id) => {
	return `SELECT * FROM statistics WHERE user_id=${id};`;
};
const get_most_interacted = (id) => {
	return `select count(*) , s.publication_id ,p.title from publication p
  inner join social s
  where s.publication_id = p.id
  and p.user_id=${id} group by (s.publication_id) ORDER BY COUNT(*) DESC LIMIT 1`;
};
const get_most_read = (user_id) => {
	return `SELECT max(views)as views, p.title as title FROM publication p 
  WHERE p.user_id=${user_id} 
  AND isnull(p.published_at)=false AND p.is_active=1;`;
};
const delete_categories_of_user = (user_id) => {
	return ` DELETE FROM user_has_category WHERE (user_id) IN (${user_id});`;
};
const get_coutry_by_country_code = (code) => {
	return `SELECT iso_code_2 as code , name FROM country WHERE iso_code_2='${code}'`;
};
const get_full_country_of_user = (uuid) => {
	return `SELECT c.iso_code_2 as code , c.name FROM user u 
  INNER JOIN country c ON u.country=c.iso_code_2 
  WHERE u.uuid='${uuid}';`;
};
const get_level_of_user_by_uuid = (uuid) => {
	return `
  SELECT l.name as name FROM user u
  INNER JOIN level l ON l.id= u.level_id
   WHERE u.uuid='${uuid}';`;
};
const get_date_last_client = (user_id) => {
	return `SELECT cli.created_at FROM 
 client cli INNER JOIN company c
 ON c.client_id= cli.id
  WHERE c.sales_id=${user_id} 
  ORDER BY cli.created_at DESC limit 1;`;
};
const get_date_last_prospect = (user_id) => {
	return `SELECT p.created_at FROM 
   prospect p INNER JOIN company c 
   ON c.prospect_id= p.id
   WHERE c.sales_id=${user_id} 
   ORDER BY p.created_at DESC limit 1 ;`;
};
const get_count_clients = (user_id) => {
	return `SELECT count(cli.id) as count FROM 
  client cli INNER JOIN company c ON c.client_id= cli.id
   WHERE c.sales_id=${user_id};`;
};
const get_count_prospects = (user_id) => {
	return `SELECT count(p.id) as count FROM 
  prospect p INNER JOIN company c 
  ON c.prospect_id= p.id
   WHERE c.sales_id=${user_id};`;
};
const get_last_publication = (user_id) => {
	return `SELECT p.published_at FROM 
  publication p INNER JOIN user u 
  ON u.id= p.user_id
  WHERE u.id=${user_id}  AND isnull(p.published_at)=false
  ORDER BY p.published_at DESC limit 1;`;
};
module.exports = {
	create_user,
	update_user,
	get_users,
	get_user_by_uuid,
	delete_user,
	get_level_by_uuid,
	get_sum_rows_users,
	get_columns_order_by_name,
	get_user_id_by_uuid,
	get_company_id_by_company_uuid,
	get_level_by_level_uuid,
	get_level_by_level_name,
	get_publications_by_author_id,
	get_level_by_id,
	get_attachments_by_publication_id,
	get_statistics_by_author_id,
	get_most_interacted,
	get_most_read,
	delete_categories_of_user,
	get_coutry_by_country_code,
	get_full_country_of_user,
	get_level_of_user_by_uuid,
	get_date_last_client,
	get_date_last_prospect,
	get_count_clients,
	get_count_prospects,
	get_last_publication,
};
