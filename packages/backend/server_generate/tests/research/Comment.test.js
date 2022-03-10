// execute from "cd C:\<path to research base folder>\research\server_generate\tests\research"
// env is directed from active folder
require('dotenv').config({ path: './../../.env' });
//const { connection } = require('../../utils/db')
//const db_helper = require('../../utils/db_helper')
//const query = require('./db/sql/volume')
const moment = require('moment');
const logger = require('../../logger');
const path = require('path');

<<<<<<< HEAD
const axios = require('axios');
=======
let axios = require('axios');
>>>>>>> c7002297c0167df11929209b77da14040815ff78
const url = process.env.APP_URL_TEST;

let g_token;

//'Check create default access authorization token for axios http library'
const authorization_test = async () => {
	let not_failed_get_authorization_token = false;
	try {
<<<<<<< HEAD
		const body = {
=======
		let body = {
>>>>>>> c7002297c0167df11929209b77da14040815ff78
			username: 'okatz',
			password: '12345678',
		};

<<<<<<< HEAD
		const config = {
=======
		let config = {
>>>>>>> c7002297c0167df11929209b77da14040815ff78
			headers: {
				type: 'dev',
			},
		};
		console.log(process.env.APP_URL_TEST);
		const auth = await axios.put(`${url}/auth`, body, config);

		const token = auth.data.token;
		g_token = token;
		console.log(token);
		not_failed_get_authorization_token = true;
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	} catch (err) {
		not_failed_get_authorization_token = false;
	}

	if (not_failed_get_authorization_token) {
		console.log(' [v][ Comment.test ] : success get authorization token test....');
	} else {
		console.log(' [x][ Comment.test ] : fail get authorization token test');
	}
	return;
};

<<<<<<< HEAD
const get_users_json_obj = {
=======
let get_users_json_obj = {
>>>>>>> c7002297c0167df11929209b77da14040815ff78
	data: {
		origin: undefined,
		user_ip: '::1',
		limit: undefined,
		offset: undefined,
		order_by: undefined,
		sort: undefined,
		search: undefined,
	},
};

<<<<<<< HEAD
const get_category_json_obj = {};

const first_user_properties = {};

const first_company_properties = {};

const get_utils_properties = {};

const get_publication_properties = { params: {} };

const post_comments_json_obj = {
=======
let get_category_json_obj = {};

let first_user_properties = {};

let first_company_properties = {};

let get_utils_properties = {};

let get_publication_properties = { params: {} };

let post_comments_json_obj = {
>>>>>>> c7002297c0167df11929209b77da14040815ff78
	publication_id: '',
	content: 'hello test buplication comment',
};

const post_comments_tets = async () => {
<<<<<<< HEAD
	const users_rest = await axios.get(`${url}/user`, get_users_json_obj);
=======
	let users_rest = await axios.get(`${url}/user`, get_users_json_obj);
>>>>>>> c7002297c0167df11929209b77da14040815ff78
	if (!users_rest) {
		console.log(' [x][ Comment.test ] : fail get arbitrary user');
		return;
	}

	if (!users_rest.data) {
		console.log(' [x][ Comment.test ] : fail get arbitrary user data');
		return;
	}

	if (!users_rest.data.users || !users_rest.data.users.length) {
		console.log(' [x][ Comment.test ] : fail get arbitrary users list');
		return;
	}

	if (!users_rest.data.users[0] || !users_rest.data.users[0].id) {
		console.log(' [x][ Comment.test ] : fail get first user id');
		return;
	}

	get_category_json_obj.id = `${users_rest.data.users[0].id}`;

	const arbitrary_selected_user_uuid = `${users_rest.data.users[0].id}`;

<<<<<<< HEAD
	const categories_rest = await axios.get(`${url}/category/`, get_category_json_obj);
=======
	let categories_rest = await axios.get(`${url}/category/`, get_category_json_obj);
>>>>>>> c7002297c0167df11929209b77da14040815ff78

	if (!categories_rest || !categories_rest.data) {
		console.log(' [x][ Comment.test ] : fail get arbitrary categories');
		return;
	}

<<<<<<< HEAD
	const categs = [];
=======
	let categs = [];
>>>>>>> c7002297c0167df11929209b77da14040815ff78
	for (categ of categories_rest.data) {
		categs.push(`${categ.id}`);
	}

<<<<<<< HEAD
	const utils_rest = await axios.get(`${url}/utils`, get_utils_properties);
=======
	let utils_rest = await axios.get(`${url}/utils`, get_utils_properties);
>>>>>>> c7002297c0167df11929209b77da14040815ff78
	if (
		!utils_rest ||
		!utils_rest.data ||
		!utils_rest.data.level ||
		!utils_rest.data.level.length ||
		utils_rest.data.level.length < 1
	) {
		console.log(' [x][ Comment.test ] : fail get uuid-s of admin level ');
	}
	let admin_level_uuid;
	for (specific_level of utils_rest.data.level) {
		if (specific_level.name === 'admin') {
			admin_level_uuid = specific_level.id;
		}
	}

	if (!admin_level_uuid) {
		console.log(' [x][ Comment.test ] : missing admin level on levels table');
	}

<<<<<<< HEAD
	const companies_rest = await axios.get(`${url}/company`, first_company_properties);
=======
	let companies_rest = await axios.get(`${url}/company`, first_company_properties);
>>>>>>> c7002297c0167df11929209b77da14040815ff78
	if (
		!companies_rest ||
		!companies_rest.data ||
		!companies_rest.data.company ||
		!companies_rest.data.company.length ||
		companies_rest.data.company.length < 1
	) {
		console.log(' [x][ Comment.test ] : fail get arbitrary company');
	}

	const arbitrary_company = companies_rest.data.company[0];

<<<<<<< HEAD
	const user_categories_rest = await axios.get(
=======
	let user_categories_rest = await axios.get(
>>>>>>> c7002297c0167df11929209b77da14040815ff78
		`${url}/user/${arbitrary_selected_user_uuid}`,
		first_user_properties,
	);

<<<<<<< HEAD
	const update_categories_json = user_categories_rest.data;
=======
	let update_categories_json = user_categories_rest.data;
>>>>>>> c7002297c0167df11929209b77da14040815ff78
	delete update_categories_json.id;
	delete update_categories_json.avatar;
	delete update_categories_json.last_login;
	delete update_categories_json.connection_count;
	delete update_categories_json.created_at;
	delete update_categories_json.categories;
	update_categories_json.category = categs;
	update_categories_json.company = arbitrary_company.id;
	update_categories_json.position = 'CTO';
	update_categories_json.level = admin_level_uuid;

<<<<<<< HEAD
	const update_categories_res = await axios.put(
=======
	let update_categories_res = await axios.put(
>>>>>>> c7002297c0167df11929209b77da14040815ff78
		`${url}/user/${arbitrary_selected_user_uuid}`,
		update_categories_json,
	);

	const timestamp = moment().subtract(5, 'minutes').utc().format('yyyy-MM-DD');
<<<<<<< HEAD
	const publication_to_create = {
=======
	let publication_to_create = {
>>>>>>> c7002297c0167df11929209b77da14040815ff78
		title: 'Test_publication',
		description: 'publication to test comments',
		content: 'publication to test comments',
		categories: [`${categs[0]}`],
		tags: [
			{
				name: 'testing',
			},
		],
		events: [
			{
				title: 'test_creation',
				date: `${timestamp}`,
			},
		],
	};

<<<<<<< HEAD
	const create_publication_res = await axios.post(`${url}/publication`, publication_to_create);

	get_publication_properties.params['id'] = `${categs[0]}`;

	const get_publication_res = await axios.get(`${url}/publication`, get_publication_properties);

	const publication_uuid = get_publication_res.data[0].id;

	post_comments_json_obj.publication_id = `${publication_uuid}`;

	const current_timestamp = moment().utc();
	post_comments_json_obj.content = `${current_timestamp}`;

	const comments_res = await axios.post(`${url}/comment`, post_comments_json_obj);

	const get_comments_json_obj = { params: { id: `${publication_uuid}` } };

	const get_comment_res = await axios.get(`${url}/comment`, get_comments_json_obj);
=======
	let create_publication_res = await axios.post(`${url}/publication`, publication_to_create);

	get_publication_properties.params['id'] = `${categs[0]}`;

	let get_publication_res = await axios.get(`${url}/publication`, get_publication_properties);

	let publication_uuid = get_publication_res.data[0].id;

	post_comments_json_obj.publication_id = `${publication_uuid}`;

	let current_timestamp = moment().utc();
	post_comments_json_obj.content = `${current_timestamp}`;

	let comments_res = await axios.post(`${url}/comment`, post_comments_json_obj);

	let get_comments_json_obj = { params: { id: `${publication_uuid}` } };

	let get_comment_res = await axios.get(`${url}/comment`, get_comments_json_obj);
>>>>>>> c7002297c0167df11929209b77da14040815ff78

	for (specific_comment of get_comment_res.data) {
		if (specific_comment.content === post_comments_json_obj.content) {
			console.log(' [v][ Comment.test ] : pass successfully create and get comment');
			console.log('specific_comment = ', specific_comment);
		}
	}
};

const authorize_and_workflow = async () => {
	await authorization_test();
	await post_comments_tets();
};

authorize_and_workflow();
