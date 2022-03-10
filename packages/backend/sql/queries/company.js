const create = (company, table_name) => {
  return `
    INSERT INTO ${table_name}
    (${Object.keys(company).map((key) => key)}) VALUES 
    (${Object.values(company).map((val) => '?')});`
}

const get_company = ({ limit, offset, status }) => {
  return `
    SELECT 
    uuid AS id,
    status,
    legal_name AS name,
    country,
    type,
    logo
    FROM company 
    ${status ? ` WHERE` : ''}
    ${status ? ` status = '${status}' AND ` : ''}
    LIMIT ${limit} OFFSET ${offset};`
}
const get_all_companies = ({ limit, offset, status, search }) => {
  return `SELECT c.* ,
  p.id as p_id , p.start_at as p_start_at , p.end_at as p_end_at , p.status as p_status, p.sales_id as p_sales_id,
  cli.start_at as cli_start_at, cli.status as cli_status, cli.sales_id as cli_sales_id
  FROM company c
  LEFT JOIN prospect p ON p.id = c.prospect_id AND ISNULL(c.client_id)
  LEFT JOIN client cli ON cli.id=c.client_id WHERE c.is_active=1
  ${status !== undefined || search !== undefined ? ` AND` : ''}
  ${
    status !== undefined
      ? `(cli.status = ${status} 
  OR p.status =  ${status}) ${search !== undefined ? `AND` : ''} `
      : ''
  }
   ${
     search !== undefined
       ? ` 
  c.legal_name LIKE '%${search}%' `
       : ''
   } 
  ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset};`
}

const get_all_clients = ({ limit, offset, status, search }) => {
  return `SELECT c.* ,
   cli.start_at as cli_start_at , cli.status as cli_status, cli.sales_id as cli_sales_id
    FROM company c 
    INNER JOIN  client cli
     ON c.client_id =cli.id 
     WHERE c.is_active=1
     ${status !== undefined || search !== undefined ? ` AND` : ''}
     ${
       status !== undefined
         ? `cli.status = ${status} 
     ${search !== undefined ? `AND` : ''} `
         : ''
     } ${search !== undefined ? `c.legal_name LIKE '%${search}%' ` : ''} 
     ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset};`
}
const get_all_prospects = ({ limit, offset, status, search }) => {
  return `SELECT c.* ,
   p.start_at as p_start_at , p.end_at as p_end_at , p.status as p_status, p.sales_id as p_sales_id 
   FROM company c 
   INNER JOIN  prospect p
   ON c.prospect_id =p.id 
   AND  ISNULL(c.client_id)
   WHERE c.is_active=1
   ${status !== undefined || search !== undefined ? ` AND` : ''}
   ${
     status !== undefined
       ? ` 
    p.status =  ${status} ${search !== undefined ? `AND` : ''} `
       : ''
   }
    ${search !== undefined ? `c.legal_name LIKE '%${search}%' ` : ''} 
   ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset};`
}
const get_company_by_id = (id) => {
  return `
    SELECT 
    id,
    uuid ,
    legal_name AS name,
    country,
    logo,
    prospect_id,
    client_id,
    sales_id
    FROM company 
    WHERE uuid = '${id}';`
}
const get_client_by_id = (id) => {
  return `SELECT * FROM client WHERE id=${id};`
}
const get_prospect_by_id = (id) => {
  return `SELECT * FROM prospect WHERE id=${id};`
}
const get_sum_rows = ({ status, search }) => {
  return `
  SELECT 
  COUNT(DISTINCT c.id) AS sum
  FROM company c
  LEFT JOIN prospect p ON p.id = c.prospect_id AND ISNULL(c.client_id)
  LEFT JOIN client cli ON cli.id=c.client_id 
  WHERE c.is_active=1
  ${status !== undefined || search !== undefined ? ` AND` : ''}
  ${
    status !== undefined
      ? `(cli.status = ${status} 
  OR p.status =  ${status}) ${search !== undefined ? `AND` : ''} `
      : ''
  }
   ${
     search !== undefined
       ? ` 
  c.legal_name LIKE '%${search}%' `
       : ''
   } `
}
const get_sum_rows_prospect = ({ status, search }) => {
  return `SELECT 
  COUNT(DISTINCT c.id) AS sum 
  FROM company c 
  INNER JOIN  prospect p
  ON c.prospect_id =p.id 
  AND  ISNULL(c.client_id)
  WHERE c.is_active=1
  ${status !== undefined || search !== undefined ? ` AND` : ''}
  ${
    status !== undefined
      ? ` 
   p.status =  ${status} ${search !== undefined ? `AND` : ''} `
      : ''
  }
   ${search !== undefined ? `c.legal_name LIKE '%${search}%' ` : ''} `
}
const get_sum_rows_clients = ({ status, search }) => {
  return `SELECT  
    COUNT(DISTINCT c.id) AS sum
    FROM company c 
    INNER JOIN  client cli
     ON c.client_id =cli.id
     WHERE c.is_active=1
     ${status !== undefined || search !== undefined ? ` AND` : ''}
     ${
       status !== undefined
         ? `cli.status = ${status} 
     ${search !== undefined ? `AND` : ''} `
         : ''
     } ${search !== undefined ? `c.legal_name LIKE '%${search}%' ` : ''} `
}
const set_status_of_prospect = (status, id) => {
  return `
  UPDATE prospect 
  SET status=${status}
  WHERE id = ${id};`
}
const set_status_of_client = (status, id) => {
  return `
  UPDATE client 
  SET status=${status}
  WHERE id = ${id} ;`
}
const set_client_id_of_company = (client_id, uuid) => {
  return ` UPDATE company 
 SET client_id=${client_id}
 WHERE uuid = '${uuid}' ;`
}

const update_company = (company, uuid) => {
  return `
    UPDATE company 
    SET ${Object.keys(company).map((key) => `${key} = ? `)}
    WHERE uuid = '${uuid}' AND is_active = 1;`
}

const delete_company = (uuid) => {
  return `
  UPDATE company 
  SET is_active = 0
  WHERE uuid = '${uuid}' AND is_active = 1;`
}

const get_company_id_by_company_uuid = (uuid) => {
  return `SELECT id FROM company WHERE uuid = '${uuid}';`
}
const get_level_id_by_name = (name) => {
  return `SELECT id FROM level WHERE name='${name}';`
}
const get_category_id_by_uuid = (uuid) => {
  return `SELECT id FROM category WHERE uuid='${uuid}';`
}
const get_users_by_company_id = (company_id) => {
  return `SELECT uuid AS id ,status ,name,username ,email , position 
  FROM user 
  WHERE company_id=${company_id}
  AND is_active=1
  ORDER BY created_at DESC;`
}
const update_user = (user, uuid) => {
  return `
    UPDATE user 
    SET ${Object.keys(user).map((key) => `${key} = ? `)}
    WHERE uuid = '${uuid}' AND is_active = 1;`
}
const get_categories_uuid_by_user_id = (user_id) => {
  return ` SELECT c.uuid AS id
  FROM user_has_category uhc
  JOIN category c ON c.id = uhc.category_id = c.id
  WHERE uhc.user_id=${user_id};`
}
const get_full_categories_uuid_by_user_id = (user_id) => {
  return ` SELECT c.uuid AS id, c.name
  FROM user_has_category uhc
  JOIN category c ON c.id = uhc.category_id 
  WHERE uhc.user_id=${user_id};`
}
const get_user_id_by_uuid = (uuid) => {
  return `SELECT id FROM user WHERE uuid='${uuid}';`
}
const get_contract_by_company_id = (company_id) => {
  return `SELECT id, periodicity  FROM contract WHERE company_id=${company_id} AND is_active=1;`
}
const get_full_contract_by_company_id = (company_id) => {
  return `SELECT uuid , id,start_at,end_at, members, periodicity, amount,sales_id,signed,status , currency FROM contract WHERE company_id=${company_id};`
}
const get_full_contracts_by_company_id = (company_id) => {
  return `SELECT c.uuid , c.id, c.start_at,c.end_at,u.name as sales_name, u.uuid as sales_id , c.members, c.periodicity, c.amount,
  c.signed , c.vat, c.signer_user FROM contract c inner join user u on u.id = c.sales_id  WHERE c.company_id=${company_id} AND c.is_active=1;`
}
const get_full_invoices_by_contract_id = (contract_id) => {
  return ` SELECT uuid as id, invoice_date,amount,status FROM invoice WHERE contract_id=${contract_id};`
}
const get_current_contract_by_company_id = (company_id) => {
  return `SELECT uuid as id,start_at, periodicity, amount,sales_id , currency, signed , status , vat as contract_vat
   FROM contract WHERE company_id=${company_id} AND is_active=1`
}
const get_last_contract = (company_id) => {
  return `SELECT uuid as id,start_at, periodicity, amount,sales_id , currency,signed
  FROM contract c WHERE c.is_active=0 AND c.company_id=${company_id}
  ORDER BY c.start_at DESC limit 1`
}
const get_user_by_user_id = (user_id) => {
  return `SELECT uuid as id ,name FROM user WHERE id=${user_id};`
}
const get_country_by_country_code = (country_code) => {
  return `SELECT iso_code_2 AS code ,name FROM country where iso_code_2='${country_code}'`
}
const get_full_currency = (code) => {
  return `SELECT code , name,symbol  FROM research.currency WHERE code='${code}'`
}
const get_currency_by_contract_id = (contract_id) => {
  return `SELECT cr.code,cr.name ,cr.symbol
  FROM contract c 
  INNER JOIN currency cr
   ON cr.code=c.currency 
   WHERE c.id=${contract_id};`
}
module.exports = {
  create,
  get_company,
  get_sum_rows,
  get_company_by_id,
  update_company,
  delete_company,
  get_company_id_by_company_uuid,
  get_level_id_by_name,
  get_category_id_by_uuid,
  get_users_by_company_id,
  update_user,
  get_user_by_user_id,
  get_categories_uuid_by_user_id,
  get_user_id_by_uuid,
  get_contract_by_company_id,
  get_full_contract_by_company_id,
  get_current_contract_by_company_id,
  get_country_by_country_code,
  get_full_categories_uuid_by_user_id,
  get_all_companies,
  get_all_clients,
  get_all_prospects,
  get_client_by_id,
  get_prospect_by_id,
  get_full_currency,
  get_last_contract,
  get_full_invoices_by_contract_id,
  get_full_contracts_by_company_id,
  get_sum_rows_prospect,
  get_sum_rows_clients,
  set_status_of_prospect,
  set_status_of_client,
  set_client_id_of_company,
  get_currency_by_contract_id,
}
