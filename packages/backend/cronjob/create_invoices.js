const db_helper = require('../utils/db_helper');
const query = require('../sql/queries/create_invoice');
const moment = require('moment');
require('moment-precise-range-plugin');

const invoiceCreation = async (amount, contract_id, invoice_date) => {
	console.log('createInvoice');
	invoice_date = moment(invoice_date).format('YYYY-MM-DD hh:mm:ss');
	let invoice = {
		amount: amount,
		contract_id: contract_id,
		invoice_date: invoice_date,
		status: 'pending',
		is_active: 1,
	};
	try {
		const create_invoice = await db_helper.update(query.create_invoice(invoice), invoice);
	} catch (e) {
		throw new ServerError('couldnt create invoice', 400);
	}
};
//let quater = moment(contract.start_at, 'YYYY-MM-DD').add(3, 'month')
//LOGIC :
//check if
const createInvoices = async () => {
	try {
		const res_contracts = await db_helper.get(query.get_all_active_contracts());
		if (res_contracts) {
			// let today = new Date(2000, 01, 01)
			let today = moment(new Date(), 'YYYY-MM-DD');
			for (contract of res_contracts) {
				let contract_date = moment(contract.start_at, 'YYYY-MM-DD');
				let diff = moment.preciseDiff(today, contract_date, true);
				let end_of_month = today.endOf('month');
				let day_end_of_month = end_of_month.format('D');
				let day_contract_date = contract_date.format('D');
				//  console.log('today:', today, '   contract_date:', contract_date, '   end_of_month', end_of_month)
				switch (contract.periodicity) {
					case 'monthly':
						console.log('endofmonth_day', end_of_month);
						if (day_end_of_month < day_contract_date) {
							if (end_of_month == today) {
								console.log('monthly diff', diff);
								console.log('month passed from today', today);
								invoiceCreation(contract.amount, contract.id, today);
							}
						} else if (diff.days == 0 && diff.months % 1 == 0) {
							console.log('monthly diff', diff);
							console.log('month passed from today', today);
							invoiceCreation(contract.amount, contract.id, today);
						}
						break;
					case 'quarterly':
						if (day_end_of_month < day_contract_date) {
							if (end_of_month == today && diff.months == 2) {
								console.log('quarterly diff', diff);
								console.log('quarter year passed from today', today);
								invoiceCreation(contract.amount, contract.id, today);
							}
						} else if (diff.days == 0 && diff.months % 3 == 0) {
							console.log('quarterly diff', diff);
							console.log('quarter year passed from today', today);
							invoiceCreation(contract.amount, contract.id, today);
						}
						break;
					case 'half':
						if (day_end_of_month < day_contract_date) {
							if (end_of_month == today && diff.months == 5) {
								console.log('half diff', diff);
								console.log('half year passed from today', today);
								invoiceCreation(contract.amount, contract.id, today);
							}
						}
						if (diff.days == 0 && diff.months % 6 == 0) {
							console.log('half diff', diff);
							console.log('half year passed from today', today);
							invoiceCreation(contract.amount, contract.id, today);
						}
						break;
					case 'fully':
						if (day_end_of_month < day_contract_date) {
							if (end_of_month == today && diff.months == 11) {
								console.log('fully diff', diff);
								console.log('year passed from today', today);
								invoiceCreation(contract.amount, contract.id, today);
							}
						} else if (diff.months == 0 && diff.days == 0 && diff.years >= 1) {
							console.log('fully diff', diff);
							console.log('year passed from today', today);
							invoiceCreation(contract.amount, contract.id, today);
						}
						break;
					default:
						throw new ServerError('no periodicity', 404);
				}
			}
		}
	} catch (e) {
		console.log(e);
	}
};
createInvoices();
