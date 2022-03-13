const get_all_active_contracts = () => {
	return `SELECT * FROM contract WHERE is_active=1 AND signed=1 ;`;
};
const create_invoice = (invoice) => {
	return `
    INSERT INTO invoice
    (${Object.keys(invoice).map((key) => key)}) VALUES 
    (${Object.values(invoice).map((val) => '?')});`;
};

module.exports = {
	get_all_active_contracts,
	create_invoice,
};
