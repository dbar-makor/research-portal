const create = (invoice) => {
	return `
    INSERT INTO invoice
    (${Object.keys(invoice).map((key) => key)}) VALUES 
    (${Object.values(invoice).map((val) => '?')});`;
};
const get_contract_id_by_uuid = (contract_uuid) => {
	return `SELECT id FROM contract WHERE uuid='${contract_uuid}';`;
};
const get_company_by_contract = (contract_id) => {
	return `SELECT comp.legal_name AS name, comp.country as country, c.vat as vat FROM contract c INNER JOIN company comp 
  ON comp.id=c.company_id
  WHERE c.id= ${contract_id};`;
};
const get_invoice_by_id = (id) => {
	return `SELECT * FROM invoice  WHERE uuid='${id}'`;
};
const update = (data, invoice_id) => {
	return `
  UPDATE invoice 
  SET ${Object.keys(data).map((key) => `${key} = ? `)}
  WHERE id = '${invoice_id}' AND is_active = 1;`;
};
const get_company_by_contract_id = (contract_id) => {
	return `SELECT comp.id ,comp.legal_name as name , cntr.name as country FROM  contract c 
  INNER JOIN
  company comp ON comp.id = c.company_id
  INNER JOIN 
  country cntr ON cntr.iso_code_2 =comp.country
  WHERE c.id=${contract_id} ;`;
};
const select_company_categories = (company_id) => {
	return `SELECT distinct(c.id),c.name as category FROM user_has_category uhc 
  INNER JOIN user u ON u.id= uhc.user_id
  INNER JOIN category c ON c.id = uhc.category_id
  WHERE u.company_id=${company_id}`;
};
const get_invoices = ({ limit, offset, from, to, status, company_id, invoice_id }) => {
	return `SELECT i.uuid as id ,
   co.legal_name as company_name,
   i.invoice_date,
   i.amount ,
   i.status ,
   cur.name,
   cur.symbol
  FROM invoice i
  JOIN contract c ON c.id =i.contract_id
  JOIN company co ON co.id =c.company_id
  JOIN currency cur on cur.code = c.currency
  WHERE i.is_active=1 
  ${
		from !== undefined && to !== undefined
			? ` AND i.invoice_date >= '${from}' AND i.invoice_date <= '${to}'`
			: ''
  } 
    ${status ? `AND i.status ='${status}'` : ''}
    ${company_id ? `AND co.uuid ='${company_id}'` : ''}
    ${invoice_id ? `AND  i.uuid LIKE '%${invoice_id}%'` : ''}
  LIMIT ${limit} OFFSET ${offset}`;
};
const get_sum_rows = ({ limit, offset, from, to, status, company_id, invoice_id }) => {
	return `
  SELECT 
    COUNT(DISTINCT id) AS sum
  FROM invoice WHERE is_active=1;
  `;
};
module.exports = {
	create,
	get_contract_id_by_uuid,
	get_company_by_contract,
	update,
	get_invoice_by_id,
	get_company_by_contract_id,
	select_company_categories,
	get_sum_rows,
	get_invoices,
};
