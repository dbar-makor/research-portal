const db_helper = require('../utils/db_helper');
const query = require('../sql/queries/invoice');
const moment = require('moment');
const pdf = require('../pdf/pdf');
const DEFAULT_LIMIT = 30;
const DEFAULT_OFFSET = 0;
const Invoice = () => {};

Invoice.createInvoice = async (payload, result) => {
	try {
		const { invoiceCreate } = payload;
		const processed_data = await process_payload(invoiceCreate);
		const res_invoice = await db_helper.update(query.create(processed_data), processed_data);
		const invoice_id = res_invoice.insertId;
		if (!res_invoice) {
			return result({ status: 400 });
		}
		return result({ status: 200 });
	} catch (error) {
		console.log(error);
		if (error.status) {
			return result(error);
		}
		return result({ status: 500 });
	}
};
Invoice.getInvoices = async (payload, result) => {
	try {
		let { limit, offset, from, to, status, company_id, invoice_id } = payload;
		limit = limit && limit > 0 ? limit : DEFAULT_LIMIT;
		offset = offset && offset > 0 ? offset : DEFAULT_OFFSET;
		const FILTER_BY = { limit, offset, from, to, status, company_id, invoice_id };
		const res_invoices = await db_helper.get(query.get_invoices(FILTER_BY));
		const meta_data = await get_meta_data(FILTER_BY);

		return result({ status: 200, data: { invoices: res_invoices, meta_data } });
	} catch (error) {
		console.log(error);
		if (error.status) {
			return result(error);
		}
		return result({ status: 500 });
	}
};

Invoice.createInvoicePdf = async (payload, result) => {
	try {
		const { id } = payload;
		const [res_invoice] = await db_helper.get(query.get_invoice_by_id(id));
		if (!res_invoice) {
			return result({ status: 404 });
		}
		const [res_company] = await db_helper.get(query.get_company_by_contract_id(res_invoice.contract_id));
		if (!res_company) {
			return result({ status: 404 });
		}
		const res_categories = await db_helper.get(query.select_company_categories(res_company.id));

		const data = {
			id: res_invoice.uuid,
			invoice_date: res_invoice.invoice_date,
			amount: res_invoice.amount,
			company: {
				name: res_company.name,
				country: res_company.country,
			},
			categories: res_categories ? res_categories : [],
		};
		console.log('here');
		const pdf_file = await pdf.create_pdf(data, 'invoice');
		const data2 = {
			pdf: pdf_file,
		};
		return result({ status: 200, data: data2 });
	} catch (error) {
		if (error.status) {
			return result(error);
		}
		return result({ status: 500 });
	}
};
const process_payload = (payload) => {
	return new Promise(async (resolve, reject) => {
		try {
			const processed_payload = {};
			for (const [key, val] of Object.entries(payload)) {
				if (val !== undefined || typeof val !== 'object') {
					switch (key) {
						case 'invoice_date':
							processed_payload.invoice_date = moment(val, 'YYYY-MM-DD').format(
								'YYYY-MM-DD hh:mm:ss',
							);
							break;
						case 'amount':
							processed_payload[key] = val;
							break;
						case 'status':
							processed_payload[key] = val;
							break;
						case 'contract_id':
							const [res_contract_id] = await db_helper.get(query.get_contract_id_by_uuid(val));
							if (!res_contract_id) return reject({ status: 404 });
							processed_payload[key] = res_contract_id.id;
							break;
						default:
							return reject({ status: 400 });
					}
				}
			}
			return resolve(processed_payload);
		} catch (error) {
			console.log(error);
			return reject({ status: 400 });
		}
	});
};
const get_meta_data = (filter_by) => {
	return new Promise(async (resolve, reject) => {
		const { limit, offset } = filter_by;
<<<<<<< HEAD
		const [{ sum }] = await db_helper.get(query.get_sum_rows(filter_by));
=======
		let [{ sum }] = await db_helper.get(query.get_sum_rows(filter_by));
>>>>>>> c7002297c0167df11929209b77da14040815ff78

		const meta_data = {
			sum_rows: sum,
			limit: limit,
			page: offset == 0 ? 1 : JSON.parse(Math.ceil(offset / limit)) + 1,
			sum_pages: Math.ceil(sum / limit),
		};
		return resolve(meta_data);
	});
};
module.exports = Invoice;
