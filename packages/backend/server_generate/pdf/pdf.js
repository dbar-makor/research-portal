const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { createInvoice } = require('./invoicePdf');
const { createContract } = require('./contractPdf');
const { v4: uuidv4 } = require('uuid');

const return_pdf = (file_name) => {
	return new Promise((resolve, reject) => {
		setTimeout(async () => {
			const path_upload = path.join(path.resolve(), 'uploaded_files', file_name);
			console.log('path_upload', path_upload);
			if (fs.existsSync(path_upload)) {
				console.log('file  exist');
				const pdf = await fs.readFileSync(path_upload).toString('base64');
				return resolve(pdf);
			} else {
				console.log('file does not exist');
				return reject({ status: 404 });
			}
		}, 1500);
	});
};
const create_pdf = async (data, type) => {
	console.log(type);
	// Create a document
	try {
		const unique = uuidv4();
		const file_name = `${type}${unique}.pdf`;
		let file_path = path.join(__dirname, '..', 'uploaded_files');
		const doc = new PDFDocument({ margin: 50 });
		file_path = path.join(file_path, file_name);
		doc.pipe(fs.createWriteStream(file_path));
		if (type == 'contract') {
			createContract(doc, data);
			const pdf = await return_pdf(file_name);
			console.log(file_name);
			//delete file from server
			fs.unlinkSync(file_path);
			return pdf;
		}
		if (type == 'contractsave') {
			createContract(doc, data);
			console.log(file_name);
			return file_name;
		}
		if (type == 'invoice') {
			console.log('i am here');
			createInvoice(doc, data);
			const pdf = await return_pdf(file_name);
			//delete file from server
			fs.unlinkSync(file_path);
			console.log(pdf);
			return pdf;
		}
	} catch (e) {
		console.log('e', e);
	}
};
module.exports = { create_pdf };
