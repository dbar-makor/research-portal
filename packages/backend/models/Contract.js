const db_helper = require('../utils/db_helper');
const query = require('../sql/queries/contract');
const moment = require('moment');
const pdf = require('../pdf/pdf');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const mail = require('../utils/mail');
const { from } = require('responselike');

const DEFAULT_LIMIT = 30;
const DEFAULT_OFFSET = 0;

// constructor
const Contract = () => {};

Contract.createContract = async (payload, result) => {
	try {
		const { contractCreate } = payload;
		const processed_data = await process_payload(contractCreate);
		processed_data.is_active = 1;
		processed_data.status = true;
		//update all contracts of company to be inactive
		const last_contracts = await db_helper.get(query.get_contracts_by_company(processed_data.company_id));
		if (last_contracts.length > 0) {
			for (contract of last_contracts) {
				if (contract.status == 1) {
					contract.status == 0;
					contract.end_at = new Date();
					const update_status = await db_helper.update(
						query.update_contract_status_to_false(contract),
						contract,
					);
					if (!update_status) {
						return result({ status: 400 });
					}
				}
			}
		}

		const res_contract = await db_helper.update(query.create_contract(processed_data), processed_data);
		if (!res_contract) {
			return result({ status: 400 });
		}
		const [res_contract_uuid] = await db_helper.get(query.get_contract_uuid_by_id(res_contract.insertId));
		if (!res_contract_uuid) return result({ status: 400 });
		return result({ status: 200, data: res_contract_uuid });
	} catch (error) {
		if (error.status) {
			return result(error);
		}
		return result({ status: 500 });
	}
};

Contract.getContract = async (payload, result) => {
	try {
		let { limit, offset, from, to, period, signed, status, company_id } = payload;
		limit = limit && limit > 0 ? limit : DEFAULT_LIMIT;
		offset = offset && offset > 0 ? offset : DEFAULT_OFFSET;
		const FILTER_BY = { limit, offset, from, to, period, signed, status, company_id };
		const res_contract = await db_helper.get(query.get_contract(FILTER_BY));
		for (const contract of res_contract) {
			contract.status = contract.status ? true : false;
			contract.signed = contract.signed ? true : false;
			contract.currency = {
				name: contract.name,
				symbol: contract.symbol,
			};
			delete contract.name;
			delete contract.symbol;
		}
		const meta_data = await get_meta_data(FILTER_BY);

		return result({ status: 200, data: { contract: res_contract, meta_data } });
	} catch (error) {
		if (error.status) {
			return result(error);
		}
		return result({ status: 500 });
	}
};

//get Contract by admin
Contract.getContractById = async (payload, result) => {
	try {
		const { id } = payload;
		const [res_contract] = await db_helper.get(query.get_contract_by_id(id));

		if (!res_contract) {
			return result({ status: 404 });
		}

		return result({ status: 200, data: res_contract });
	} catch (error) {
		if (error.status) {
			return result(error);
		}
		return result({ status: 500 });
	}
};

//update Contract
Contract.updateContract = async (payload, result) => {
	try {
		const { id, contractUpdate } = payload;
		const processed_data = await process_payload(contractUpdate);
		const res_contract = await db_helper.update(
			query.update_contract(processed_data, id),
			processed_data,
		);
		if (processed_data.signer_user) {
			const id_user = processed_data.signer_user;
			const [res_user] = await db_helper.get(query.get_user_by_id(id_user));
			const [contract] = await db_helper.get(query.get_contract_by_id(id));
			if (!contract) {
				return result({ status: 404 });
			}
<<<<<<< HEAD
			const format_contract = {
=======
			let format_contract = {
>>>>>>> c7002297c0167df11929209b77da14040815ff78
				id: contract.id,
				company: {
					name: res_contract.legal_name,
				},
				start_at: contract.start_at,
			};
			const file_name = await pdf.create_pdf(format_contract, 'contractsave');
			console.log(file_name);
			//res_user.path_upload = process.env.APP_URL_DOWNLOAD_FILES + file_name
			res_user.path_upload = `${process.env.APP_URL_DOWNLOAD_FILES}${file_name}`;
			console.log(res_user);
			send_contract_email(res_user);
		}
		if (!res_contract.affectedRows) {
			return result({ status: 404 });
		}
		return result({ status: 200 });
	} catch (error) {
		if (error.status) {
			return result(error);
		}
		return result({ status: 500 });
	}
};

//remove Contract
Contract.deleteContract = async (payload, result) => {
	try {
		const { id } = payload;
		const res_contract = await db_helper.update(query.delete_contract(id));

		if (!res_contract.affectedRows) {
			return result({ status: 404 });
		}

		return result({ status: 200 });
	} catch (error) {
		if (error.status) {
			return result(error);
		}
		return result({ status: 500 });
	}
};
Contract.getInvocesByContractId = async (payload, result) => {
	try {
		const { id } = payload;
		const [res_contract_id] = await db_helper.get(query.get_contract_id_by_uuid(id));
		const contract_id = res_contract_id.id;
		if (!res_contract_id) {
			return result({ status: 404 });
		}
		const res_invoices = await db_helper.get(query.get_full_invoices_by_contract_id(contract_id));

		return result({ status: 200, data: res_invoices });
	} catch (error) {
		console.log(error);
		if (error.status) {
			return result(error);
		}
		return result({ status: 500 });
	}
};
Contract.createContractPdf = async (payload, result) => {
	try {
		const { id } = payload;
		const [res_contract] = await db_helper.get(query.get_contract_by_id(id));
		if (!res_contract) {
			return result({ status: 404 });
		}
<<<<<<< HEAD
		const format_contract = {
=======
		let format_contract = {
>>>>>>> c7002297c0167df11929209b77da14040815ff78
			id: res_contract.id,
			company: {
				name: res_contract.legal_name,
			},
			start_at: res_contract.start_at,
			periodicity: res_contract.periodicity,
			amount: res_contract.amount,
		};
		const pdf_file = await pdf.create_pdf(format_contract, 'contract');
		const data = {
			pdf: pdf_file,
		};
		return result({ status: 200, data: data });
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
						case 'amount':
							processed_payload.amount = val;
							break;
						case 'vat':
							processed_payload.vat = val;
							break;
						case 'currency':
							processed_payload.currency = val.trim();
							break;
						case 'sales':
							const [res_sales] = await db_helper.get(query.get_selas_id(val));
							processed_payload.sales_id = res_sales.id;
							break;
						case 'id':
							const [res_company] = await db_helper.get(query.get_company_id(val));
							processed_payload.company_id = res_company.id;
							break;
						case 'periodicity':
							if (
								val !== 'monthly' &&
								val !== 'quarterly' &&
								val !== 'half' &&
								val !== 'fully'
							) {
								return reject({ status: 400 });
							}
							processed_payload.periodicity = val;
							break;
						case 'members':
							processed_payload.members = val;
							break;
						case 'start_at':
							const start_at = moment(val).format('YYYY-MM-DD hh:mm:ss');
							processed_payload.start_at = start_at;
							break;
						case 'end_at':
							const end_at = moment(val).format('YYYY-MM-DD hh:mm:ss');
							processed_payload.end_at = end_at;
							break;
						case 'signer_user':
							if (val != '') {
								const [res_user] = await db_helper.get(query.get_user_by_uuid(val));
								processed_payload.signer_user = res_user.id;
							}

							break;
						case 'signed':
							processed_payload.signed = val;
							break;
						default:
							console.log('key', key);
							return reject({ status: 400 });
					}
				}
			}
			return resolve(processed_payload);
		} catch (error) {
			console.log('err', error);
			return reject({ status: 400 });
		}
	});
};
const send_contract_email = async (user) => {
	try {
		const message_to = user.email;
		const bcc_array = JSON.parse(process.env.NEW_USER_BCC);
		const message_bcc = bcc_array.filter((email) => message_to != email);

		const msg = {
			to: message_to,
			bcc: message_bcc,
			from: `no-reply@${process.env.DOMAIN_URL}`,
			subject: 'Enigma X: Sign Your Contract',
			html: mail.signContract(user, user.path_upload),
		};

		sgMail.send(msg, async (err, res) => {
			if (err) {
				logger.error('failed to send email');
			}
		});
	} catch (error) {
		logger.error('error in sending email');
	}
};
const get_meta_data = (filter_by) => {
	return new Promise(async (resolve, reject) => {
<<<<<<< HEAD
		const [{ sum }] = await db_helper.get(query.get_sum_rows(filter_by));
		const { limit, offset, from, to, period, signed, status, company_id } = filter_by;
=======
		let [{ sum }] = await db_helper.get(query.get_sum_rows(filter_by));
		let { limit, offset, from, to, period, signed, status, company_id } = filter_by;
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

module.exports = Contract;
