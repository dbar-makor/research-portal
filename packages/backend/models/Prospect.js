const db_helper = require('../utils/db_helper')
const query = require('../sql/queries/prospect')
const moment = require('moment')
const pdf = require('../pdf/pdf')

const Prospect = () => {}

Prospect.updateProspect = async (payload, result) => {
  try {
    const { prospectUpdate, company_id } = payload
    const processed_data = await process_payload(prospectUpdate)
    const [res_company] = await db_helper.get(query.get_company_id_by_uuid(company_id))
    if (!res_company) return result({ status: 404 })
    const id = res_company.prospect_id
    if (!id) return result({ status: 404 })

    const res_update_prospect = await db_helper.update(query.update_prospect(processed_data, id), processed_data)
    if (!res_update_prospect.affectedRows) return result({ status: 400 })
    return result({ status: 201 })
  } catch (e) {
    if (e.status) {
      return result(e)
    }
    return result({ status: 500 })
  }
}
const process_payload = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const processed_payload = {}
      for (const [key, val] of Object.entries(payload)) {
        if (val !== undefined || typeof val !== 'object') {
          switch (key) {
            case 'start_at':
              processed_payload.start_at = moment(val, 'YYYY-MM-DD').format('YYYY-MM-DD hh:mm:ss')
              break
            case 'end_at':
              processed_payload.end_at = moment(val, 'YYYY-MM-DD').format('YYYY-MM-DD hh:mm:ss')
              break
            case 'sales_agent':
              const [res_sales] = await db_helper.get(query.get_sales_id_by_uuid(val))
              if (!res_sales) return reject({ status: 404 })
              processed_payload.sales_id = res_sales.id
              break
            default:
              return reject({ status: 400 })
          }
        }
      }
      return resolve(processed_payload)
    } catch (error) {
      console.log(error)
      return reject({ status: 400 })
    }
  })
}

module.exports = Prospect
