const get_file_name = (file_name) => {
  return `SELECT file_name_system FROM file WHERE file_name = '${file_name}';`
}
const create_bucket_file = (data) => {

  return `
  INSERT INTO bucket_file (${Object.keys(data)})
  VALUES (${Object.values(data).map((key) => '?')});`

}

const update_bucket_file = (file_name, expired_at) => {
  return `UPDATE bucket_file SET expired_at = '${expired_at}' WHERE file_name = '${file_name}';`

}

module.exports = {
  get_file_name,
  create_bucket_file,
  update_bucket_file,
}
