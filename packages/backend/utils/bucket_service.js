// const fs = require('fs')
// const path = require('path')
// const Client = require('ssh2-sftp-client')

// const files_path = './research/'
// let cert_name = process.env.CERT_NAME
// let cert_path_file = path.join(path.resolve(), 'certificates', cert_name)

// const payload = {
//   username: process.env.BUCKET_USERNAME,
//   host: process.env.BUCKET_URL,
//   privateKey: fs.readFileSync(cert_path_file), // Buffer or string that contains
// }

// const upload_file_to_bucket = async (file) => {
//   return new Promise(async (resolve, reject) => {
//     const sftp = new Client()

//     sftp
//       .connect(payload)
//       .then(async (data) => {
//         const file_path = './uploaded_files/' + file
//         const res = await sftp.fastPut(file_path, `${files_path}${file}`)
//         sftp.end()
//         return resolve(res)
//       })
//       .catch((err) => {
//         console.log(`Error: ${err.message}`) // error message will include 'example-client'
//         return reject('err')
//       })
//   })
// }

// const download_file_from_bucket = async (file, local_filename) => {
//   return new Promise(async (resolve, reject) => {
//     const sftp = new Client()

//     sftp
//       .connect(payload)
//       .then(() => {
//         return sftp.list(files_path)
//       })
//       .then(async (data) => {
//         await sftp.fastGet(files_path + file, local_filename)
//         sftp.end()
//         return resolve('ok')
//       })
//       .catch((err) => {
//         console.log(`Error: ${err.message}`) // error message will include 'example-client'
//         return reject('err')
//       })
//   })
// }

// module.exports = {
//   upload_file_to_bucket,
//   download_file_from_bucket,
// }
