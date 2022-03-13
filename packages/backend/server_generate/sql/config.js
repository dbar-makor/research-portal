const tables = {
	api_key: {
		content: 'content',
		channel: 'channel',
		expires_at: 'expires_at',
		is_active: 'is_active',
	},
	column_order: {
		content: 'content',
	},
	ip: {
		content: 'content',
	},
	api_key_has_ip: {
		ip_id: 'ip_id',
		api_key_id: 'api_key_id',
	},
	user: {
		name: 'name',
		username: 'username',
		email: 'email',
		phone: 'phone',
		company_cnt: 'company_cnt',
		level_id: 'level_id',
		uuid: 'uuid',
		company_id: 'company_id',
		position: 'position',
	},
	user_has_category: {
		user_id: 'user_id',
		category_id: 'category_id',
		is_active: 'is_active',
		created_at: 'created_at',
		updated_at: 'updated_at',
	},
	company: {
		legal_name: 'legal_name',
		nick_name: 'nick_name',
		sub_domain: 'sub_domain',
		country: 'country',
		language: 'language',
		logo: 'logo',
		expires_at: 'expires_at',
		module: 'module',
		api: 'api',
		control: 'control',
		theme_id: 'theme_id',
		company_status: 'company_status',
		status: 'status',
	},
	company_log: {
		status: 'status',
		company_expires_at: 'company_expires_at',
	},
};

module.exports = {
	tables,
};
