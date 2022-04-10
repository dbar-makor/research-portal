const get_publications = () => {
	return `
  SELECT p.id as real_id, p.uuid as id ,p.published_at ,p.type,p.title,p.description,p.content,
  u.name ,u.avatar,
  p.created_at,
  p.updated_at,
  p.views, p.likes, p.dislikes, p.shares, p.comments ,
  p.title_video, p.link_video, p.title_pdf, p.file_pdf ,p.user_id
  FROM publication p
  JOIN user u On 
  u.id=  p.user_id
  JOIN category c ON c.id = 14
  JOIN category_has_publication chp ON c.id = chp.category_id AND p.id = chp.publication_id 
  AND p.is_active=1 AND  ISNULL(p.published_at)=false;
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
module.exports = {
	get_publications,
	get_tags_by_publication_id,
	get_events_by_publication_id,
	get_attachments_by_publication_id,
};
