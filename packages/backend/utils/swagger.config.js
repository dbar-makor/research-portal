const swagger = {
  api_key: {
    api_key: {
      api_key: 'api_key',
      channel: 'channel',
      expiration_date: 'expiration_date',
      is_active: 'is_active',
    },
  },
  column_order: {
    column_order: {
      content: 'content',
    },
  },
  ip: {
    ip: {
      ip: 'ip',
      ip_id: 'ip_id',
      api_key_id: 'api_key_id',
    },
  },
  user: {
    user: {
      name: 'name',
      username: 'username',
      password: 'password',
      email: 'email',
      phone: 'phone',
      company_cnt: 'company_cnt',
      level: 'level',
      id: 'id',
      category: 'category',
      company: 'company',
      position: 'position',
    },
    filter: {
      limit: 'limit',
      offset: 'offset',
      sort: 'sort',
      host: 'host',
      order_by: 'order_by',
      created_at: 'created_at',
      name: 'name',
      username: 'username',
      email: 'email',
      company_count: 'company_count',
      last_connected_at: 'last_connected_at',
      is_active: 'is_active',
      level: 'level',
      search: 'search',
    },
  },
  send_sms: {
    send_sms: {
      phone: 'phone',
      dialing_code: 'dialing_code',
      number: 'number',
      message: 'message',
    },
  },
  company: {
    company: {
      legalName: 'legalName',
      nickName: 'nickName',
      subDomain: 'subDomain',
      country: 'country',
      language: 'language',
      logo: 'logo',
      expires_at: 'expires_at',
      modules: 'modules',
      APIs: 'APIs',
      adminUsers: 'adminUsers',
      credentials: 'credentials',
      theme: 'theme',
      company_status: 'status',
    },
    company_log: {
      status: 'company_status',
      expires_at: 'expires_at',
    },
    filter: {
      limit: 'limit',
      offset: 'offset',
      sort: 'sort',
      host: 'host',
      order_by: 'order_by',
      created_at: 'created_at',
      name: 'name',
      country: 'country',
      status: 'status',
      expire_on: 'expire_on',
      users: 'users',
      search: 'search',
    },
  },
}

module.exports = {
  swagger,
}
