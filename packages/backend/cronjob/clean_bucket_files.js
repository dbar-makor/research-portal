const moment = require('moment')
const path = require('path')
const fs = require('fs')
const db_helper = require('../utils/db_helper')
const db = require('../utils/db')
const query = require('../sql/queries/clean_bucket_files')

const clean_files = async () => {
  try {
    const expired_at = moment().format('YYYY-MM-DD HH:mm:ss')
    const res_bucket_files = await db_helper.get(query.get_bucket_files(expired_at))
    for (const bucket_file of res_bucket_files) {
      const delete_path = path.join(path.resolve(), '..', 'bucket_file', bucket_file.file_name)
      if (fs.existsSync(delete_path)) {
        fs.unlinkSync(delete_path)
        const res_delete = await db_helper.get(query.delete_file_from_bucket(bucket_file.id))
        if (!res_delete.affectedRows) {
          console.log(`failed to delete ${bucket_file.file_name}`)
        }
      }
    }
    db.end()
  } catch (error) {
    console.log(error)
  }
}
clean_files()
