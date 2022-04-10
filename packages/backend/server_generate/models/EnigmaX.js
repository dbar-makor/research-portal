const query = require('../sql/queries/enigma-x');
const db_helper = require('../utils/db_helper');

const EnigmaX = () => {};

EnigmaX.enigmaXGetPublications = async (payload, result) => {
	try {
		const publications = await db_helper.get(query.get_publications());
		if (!publications) return result({ status: 404 });
		console.log(publications);
		if (publications.length) {
			for (publication of publications) {
				delete publication.user_id;
				const id = publication.real_id;
				delete publication.real_id;
				publication.content = JSON.parse(publication.content);
				const tags = await db_helper.get(query.get_tags_by_publication_id(id));
				publication.tags = tags;
				const events = await db_helper.get(query.get_events_by_publication_id(id));
				publication.events = events;
				const attachments = await db_helper.get(query.get_attachments_by_publication_id(id));
				publication.attachments = attachments;
			}
		}

		return result({
			status: 200,
			data: { publications },
		});
	} catch (e) {
		console.log(e);
		return result({ status: 500 });
	}
};

module.exports = EnigmaX;
