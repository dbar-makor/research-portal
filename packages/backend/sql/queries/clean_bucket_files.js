

const delete_file_from_bucket = (id) => {
  return ` DELETE FROM bucket_file WHERE id = ${id};`
}
const get_bucket_files = (expired_at) => {
  return `SELECT id, file_name FROM bucket_file WHERE expired_at < '${expired_at}';`
}
module.exports = {
  get_bucket_files,
  delete_file_from_bucket,
}
