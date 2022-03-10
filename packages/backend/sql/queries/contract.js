const create_contract = (contract) => {
  return `
    INSERT INTO contract
    (${Object.keys(contract).map((key) => key)}) VALUES 
    (${Object.values(contract).map((val) => '?')});`
}

const get_contract = ({ limit, offset, from, to, period, signed, status, company_id }) => {
  return `
    SELECT 
      c.uuid AS id,
      c.status,
      c.signed,
      c.start_at,
      c.end_at,
      co.legal_name as company_name ,
      count.name as company_country,
      cur.name,
      cur.symbol,
      c.amount,
      c.periodicity
    FROM contract c
    JOIN user u ON u.id = c.sales_id
    JOIN company co  ON co.id = c.company_id
    JOIN country count on count.iso_code_2=co.country 
    JOIN currency cur on cur.code = c.currency
    WHERE c.is_active=1
    ${
      from !== undefined && to !== undefined
        ? ` AND date(c.start_at) >= '${from}' AND date(c.end_at) <= '${to}'`
        : ` ${from !== undefined ? ` AND date(c.start_at) >= '${from}' ` : `${to !== undefined ? ` AND date(c.end_at) <= '${to}'` : ``} `}`
    } 
  
    ${period ? `AND c.periodicity ='${period}'` : ``}
    ${signed !== undefined ? `AND c.signed =${signed}` : ``}
    ${status !== undefined ? `AND c.status =${status}` : ``}
    ${company_id ? `AND co.uuid ='${company_id}'` : ``}

    LIMIT ${limit} OFFSET ${offset}
    ;
  `
}
const get_contract_by_id = (id) => {
  return `
    SELECT 
      c.uuid AS id,
      u.name,
      co.legal_name,
      c.amount,
      c.periodicity,
      c.members,
      c.currency,
      c.is_active,
      c.start_at,
      c.created_at,
      c.updated_at
    FROM contract c
    JOIN user u ON u.id = c.sales_id
    JOIN company co  ON co.id = c.company_id
    WHERE c.uuid = '${id}';
  `
}
const get_contract_uuid_by_id = (id) => {
  return `SELECT uuid as id FROM contract WHERE id=${id};`
}
const get_company_id = (id) => {
  return `
    SELECT id FROM company WHERE uuid = '${id}';
  `
}
const get_selas_id = (id) => {
  return `
    SELECT id FROM user WHERE uuid = '${id}';
  `
}

const get_sum_rows = ({ limit, offset, from, to, period, signed, status, company_id }) => {
  return `
  SELECT 
    COUNT(DISTINCT c.id) AS sum
  FROM contract c
  JOIN user u ON u.id = c.sales_id
  JOIN company co  ON co.id = c.company_id
  JOIN country count on count.iso_code_2=co.country 
  JOIN currency cur on cur.code = c.currency
  WHERE c.is_active=1
  ${from !== undefined && to !== undefined ? ` AND c.start_at >= '${from}' AND c.end_at <= '${to}'` : ``} 
  ${period ? `AND c.periodicity ='${period}'` : ``}
  ${signed ? `AND c.signed =${signed}` : ``}
  ${status ? `AND c.status =${status}` : ``}
  ${company_id ? `AND co.uuid ='${company_id}'` : ``}

  LIMIT ${limit} OFFSET ${offset};
  `
}

const update_contract = (contract, uuid) => {
  return `
    UPDATE contract 
    SET ${Object.keys(contract).map((key) => `${key} = ? `)}
    WHERE uuid = '${uuid}' AND is_active = 1;`
}

const delete_contract = (uuid) => {
  return `
  UPDATE contract 
  SET is_active = 0
  WHERE uuid = '${uuid}' AND is_active = 1;`
}
const update_company_status = (company_id) => {
  return `UPDATE company 
  SET status = 1
  WHERE id = '${company_id}' AND status = 0;`
}
const update_contract_status_to_false = (contract) => {
  return `UPDATE contract 
  SET status = 0
  WHERE id ='${contract.id}' AND status = 1;`
}
const get_contracts_by_company = (company_id) => {
  return `SELECT * FROM contract WHERE company_id=${company_id};`
}
const get_contract_id_by_uuid = (contract_id) => {
  return ` SELECT id FROM contract WHERE uuid='${contract_id}';`
}
const get_full_invoices_by_contract_id = (contract_id) => {
  return ` SELECT uuid as id, invoice_date,amount,status, invoice_pdf FROM invoice WHERE contract_id=${contract_id};`
}
const get_user_by_uuid = (uuid) => {
  return `SELECT * FROM user WHERE uuid='${uuid}'`
}
const get_user_by_id = (id) => {
  return `SELECT * FROM user WHERE id=${id}`
}
module.exports = {
  create_contract,
  get_contract,
  get_company_id,
  get_selas_id,
  get_sum_rows,
  get_contract_by_id,
  update_contract,
  delete_contract,
  update_company_status,
  get_contracts_by_company,
  update_contract_status_to_false,
  get_contract_id_by_uuid,
  get_full_invoices_by_contract_id,
  get_contract_uuid_by_id,
  get_user_by_uuid,
  get_user_by_id,
}
