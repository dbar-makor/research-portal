const moment = require('moment');
const fs = require('fs');
const db_helper = require('../utils/db_helper');
//const bucket_service = require('../utils/bucket_service')
const query = require('../sql/queries/file');

// constructor
const File = () => {};

//get file
File.getFile = async (payload, result) => {
	try {
		const { file_name } = payload;

		const local_filename = './bucket_file/' + file_name;
		const file_exist = fs.existsSync(local_filename);
		const expired_at = moment().add(20, 'm').format('YYYY-MM-DD HH:mm:ss');
		if (file_exist) {
			const res_bucket_file = await db_helper.update(
				query.update_bucket_file(file_name, expired_at),
				{},
			);
			if (!res_bucket_file.affectedRows) {
				console.log(`failed to update bucket_file ${file_name}`);
			}
			return result({ status: 200, data: { file_link: file_name } });
		} else {
			const res_download = await bucket_service.download_file_from_bucket(file_name, local_filename);
			if (res_download === 'ok') {
				const bucket_data = { file_name: file_name, expired_at };
				const res_bucket_file = await db_helper.update(
					query.create_bucket_file(bucket_data),
					bucket_data,
				);
				if (!res_bucket_file.affectedRows) {
					console.log(`failed to insert into bucket_file ${file_name}`);
				}
				return result({ status: 200, data: { file_link: file_name } });
			} else {
				return result({ status: 500 });
			}
		}
	} catch (error) {
		if (error.error) {
			return result(error);
		} else {
			return result({ status: 500 });
		}
	}
};
// update file
File.updateFile = async (payload, result) => {
	try {
		const { file } = payload;
		return result({ status: 200, data: { file } });
	} catch (error) {
		if (error.error) {
			return result(error);
		} else {
			return result({ status: 500 });
		}
	}
};

const upload_to_bucket = async (files) => {
	for (const file of files) {
		try {
			const res_file = await bucket_service.upload_file_to_bucket(file);
			// console.log(res_file);
			const filePath = './uploaded_files/' + file;
			fs.unlinkSync(filePath);
		} catch (error) {
			console.log(`file: ${file} failed to updalod to bucket, error: ${error}`);
		}
	}
};

module.exports = File;
