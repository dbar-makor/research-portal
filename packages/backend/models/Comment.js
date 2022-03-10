const db_helper = require('../utils/db_helper');
const comments_sql = require('../sql/queries/comment');
const publication_sql = require('../sql/queries/publication');

// constructor
const Comment = () => {};

//create comment
Comment.createComment = async (payload, result) => {
	try {
		const processed_data = await process_payload_create(payload);
		const [pubs] = await db_helper.get(
			publication_sql.get_publication_id_by_uuid(processed_data.publication_id),
		);
		if (!pubs) {
			return result({ status: 500 });
		}
		processed_data.publication_id = pubs.id;
		if (processed_data.comment_id) {
			const [comment] = await db_helper.get(
				publication_sql.get_comment_by_uuid(processed_data.comment_id),
			);
			if (!comment) {
				return result({ status: 500 });
			}
			processed_data.comment_id = comment.id;
		}
		await db_helper.update(comments_sql.create_comment(processed_data), processed_data);
		return result({ status: 201 });
	} catch (error) {
		if (error.status) {
			return result(error);
		} else {
			return result({ status: 500 });
		}
	}
};

//get all comment by publication_id
Comment.getCommentsById = async (payload, result) => {
	try {
		const processed_data = await process_payload_get_by_publication_id(payload);
		const [pub] = await db_helper.get(
			publication_sql.get_publication_id_by_uuid(processed_data.publication_id),
		);
		if (!pub) {
			return result({ status: 500 });
		}
		const comments = await db_helper.get(comments_sql.get_comments_by_id(pub.id));
		const formated_comments = [];
		for (comment of comments) {
			const res_replies = await db_helper.get(comments_sql.get_child_comments(comment.real_id));
			const comment_replies = [];
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
					};
					comment_replies.push(format_reply);
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
			};
			formated_comments.push(format_comment);
		}

		return result({ status: 200, data: formated_comments });
	} catch (error) {
		if (error.status) {
			return result(error);
		} else {
			return result({ status: 500 });
		}
	}
};

//get comment by id
Comment.getCommentById = async (payload, result) => {
	try {
		const [comm] = await db_helper.get(comments_sql.get_comment_by_uuid(payload.id));
		if (!comm) {
			return result({ status: 200, data: [] });
		} else {
			return result({ status: 200, data: comm });
		}
	} catch (error) {
		if (error.status) {
			return result(error);
		} else {
			return result({ status: 500 });
		}
	}
};

//update comment by id
Comment.updateComment = async (payload, result) => {
	try {
		const { content } = payload.commentUpdate;
		const id = payload.id;
		const comm = await db_helper.update(comments_sql.update_comment(content, id), []);
		if (!comm || comm.affectedRows < 1) {
			return result({ status: 500 });
		} else {
			return result({ status: 201 });
		}
	} catch (error) {
		if (error.status) {
			return result(error);
		} else {
			return result({ status: 500 });
		}
	}
};

//delete comment by id
Comment.deleteComment = async (payload, result) => {
	try {
		const resp = await db_helper.update(comments_sql.delete_comment(payload.id), []);
		if (!resp) {
			return result({ status: 500 });
		}
		return result({ status: 200 });
	} catch (error) {
		if (error.status) {
			return result(error);
		} else {
			return result({ status: 500 });
		}
	}
};

// add like / dislike
Comment.updateCommentSocial = async (payload, result) => {
	const { id: comment_uuid } = payload;
	const { id: user_id } = payload.bearerAuth.user;
	const { type } = payload.commentSocial;
	if (type !== 'like' && type !== 'dislike') {
		return result({ status: 400 });
	}
	try {
		const [comment] = await db_helper.get(comments_sql.get_comment_id_by_uuid(comment_uuid));
		if (!comment) {
			return result({ status: 404 });
		}
		const [social] = await db_helper.get(comments_sql.get_social_by_comment_id(comment.comment_id));
		if (!social) {
			// Create
			const new_social = {
				comment_id: comment.comment_id,
				user_id,
				type,
			};
			await db_helper.update(comments_sql.create_social(new_social), new_social);
		} else {
			// Social exists, determine whether that user already did like/dislike this publication
			const type_in_db = social.type;
			if (type_in_db === type) {
				// If the given type and the type in DB are the same, remove that social
				await db_helper.get(comments_sql.delete_social_by_id(social.id));
			} else {
				// Else, update the social with provided type
				await db_helper.update(comments_sql.update_social_by_id(social.id, type), { type });
			}
		}
		return result({ status: 201 });
	} catch (e) {
		console.log('error occurred updating comments social', e);
		return result({ status: 500 });
	}
};

const process_payload_create = async (unprocessed_data) => {
	return new Promise(async (resolve, reject) => {
		const errors = [];
		const processed_data = {};
		try {
			for (const [key, val] of Object.entries(unprocessed_data)) {
				if (typeof val !== 'undefined') {
					switch (key) {
						case 'bearerAuth':
							if (val.hasOwnProperty('user') && typeof val.user !== 'undefined') {
								if (val.user.hasOwnProperty('id') && typeof val.user.id !== 'undefined') {
									processed_data['user_id'] = val.user.id;
								} else {
									errors.push(
										'[Error]: missing user id. must have user id to create comment!!!',
									);
								}
							}
							break;
						case 'commentCreate':
							for (const [key_1, val_1] of Object.entries(val)) {
								if (typeof val_1 !== 'undefined' && typeof val_1 !== 'object') {
									switch (key_1) {
										case 'id':
											processed_data[key_1] = val_1.trim();
											break;
										case 'content':
											processed_data[key_1] = val_1.trim();
											break;
										case 'publication_id':
											if (typeof val_1 === 'string') {
												processed_data[key_1] = val_1.trim();
											} else {
												errors.push(
													'[Error]: commentCreate.publication_id is not a number on create comment!!!',
												);
											}
											break;
										case 'comment_id':
											if (typeof val_1 === 'string') {
												processed_data[key_1] = val_1.trim();
											} else {
												errors.push(
													'[Error]: commentCreate.comment_id is not a number on create comment!!!',
												);
											}
											break;
										case 'type':
											const types = ['like', 'dislike'];
											if (types.includes(val.toLowerCase())) {
												processed_data[key_1] = val_1.toLowerCase();
											} else {
												processed_data[key_1] = null;
											}
											break;
										default:
											break;
									}
								}
							}
							break;
						default:
							break;
					}
				}
			}
		} catch (error) {
			return reject({ status: 404 });
		}

		if (errors && errors.length && errors.length > 0) {
			return reject({ status: 404 });
		} else {
			return resolve(processed_data);
		}
	});
};

const process_payload_get_by_publication_id = async (unprocessed_data) => {
	return new Promise(async (resolve, reject) => {
		const errors = [];
		const processed_data = {};
		try {
			for (const [key, val] of Object.entries(unprocessed_data)) {
				if (typeof val !== 'undefined') {
					switch (key) {
						case 'id':
							// NOTICE: id is the publication uuid
							if (typeof val === 'string') {
								processed_data['publication_id'] = val;
							} else {
								errors.push(
									'[Error]: publication_id is not a string on get_by_publication_id comment!!!',
								);
							}
							break;
						default:
							break;
					}
				}
			}
		} catch (error) {
			errors.push(`[Error]: ${error} on get_by_publication_id comment!!!`);
			return reject({ status: 404 });
		}

		if (errors && errors.length && errors.length > 0) {
			return reject({ status: 404 });
		} else {
			return resolve(processed_data);
		}
	});
};

module.exports = Comment;
