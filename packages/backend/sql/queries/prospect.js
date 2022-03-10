const get_sales_id_by_uuid = (uuid) => {
  return `SELECT id FROM user WHERE uuid='${uuid}'`
}

const get_company_id_by_uuid = (uuid) => {
  return `SELECT * FROM company WHERE uuid='${uuid}'`
}
const update_prospect = (data, id) => {
  return `
      UPDATE prospect 
      SET ${Object.keys(data).map((key) => `${key} = ? `)}
      WHERE id = '${id}'`
}
module.exports = {
  get_sales_id_by_uuid,
  get_company_id_by_uuid,
  update_prospect,
}
