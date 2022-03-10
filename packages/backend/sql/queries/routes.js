const create_token = (data) => {
  return `
  INSERT INTO token (${Object.keys(data)})
  VALUES (${Object.values(data).map((key) => '?')});`
}

const create_connection = (data) => {
  return `
  INSERT INTO connection (${Object.keys(data)})
  VALUES (${Object.values(data).map((key) => '?')});`
}

const create_social = (data) => {
  return `
  INSERT INTO social (${Object.keys(data)})
  VALUES (${Object.values(data).map((key) => '?')});`
}

const get_user_by_email = (email) => {
  return `
  SELECT * FROM user WHERE email LIKE '%${email}%' AND is_active = 1;
  `
}

const update_social_user = (social, id) => {
  return `
  UPDATE user SET ${social} = '${JSON.stringify(data)}' WHERE id = ${id};
  `
}

module.exports = {
  create_token,
  create_connection,
  create_social,
  get_user_by_email,
  update_social_user,
}
