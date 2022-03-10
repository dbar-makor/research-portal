const db_helper = require('../utils/db_helper')
const query = require('../sql/queries/company')
const { generate_password } = require('../utils/helpers/global')
const { isArray, lastIndexOf, isBoolean, conformsTo } = require('lodash')
const moment = require('moment')
const DEFAULT_LIMIT = 100
const DEFAULT_OFFSET = 0

// constructor
const Company = () => {}

Company.createCompany = async (payload, result) => {
  try {
    //salesman id who create company
    const { id } = payload.bearerAuth.user
    const { companyCreate } = payload
    const processed_data = await process_payload(companyCreate)
    const type = processed_data.type
    if (type && type !== 'client' && type !== 'prospect') {
      return result({ status: 400 })
    }
    delete processed_data.type
    const members = processed_data.members
    delete processed_data.members
    //the salesmen is the user connected
    processed_data.sales_id = id
    //company is inactive till has contract
    if (type == 'client') {
      const client = {
        start_at: processed_data.start_at,
        status: 1,
        sales_id: id,
      }
      delete processed_data.end_at
      delete processed_data.sales_id
      delete processed_data.start_at
      const res_client = await db_helper.update(query.create(client, 'client'), client)
      processed_data.client_id = res_client.insertId
    }
    if (type == 'prospect') {
      const prospect = {
        start_at: processed_data.start_at,
        end_at: processed_data.end_at,
        status: 1,
        sales_id: id,
      }
      delete processed_data.end_at
      delete processed_data.sales_id
      delete processed_data.start_at
      const res_prospect = await db_helper.update(query.create(prospect, 'prospect'), prospect)
      processed_data.prospect_id = res_prospect.insertId
    }
    const res_company = await db_helper.update(query.create(processed_data, 'company'), processed_data)
    const company_id = res_company.insertId
    //get the id of level of name = member
    const res_level = await db_helper.get(query.get_level_id_by_name('member'))
    const level_id = res_level[0].id
    if (members) {
      for (member of members) {
        const new_member = {}
        const categories = member.categories
        delete member.categories
        new_member.company_id = company_id
        new_member.level_id = level_id
        new_member.name = member.member_name
        new_member.position = member.position
        new_member.email = member.email
        new_member.password = generate_password(5)
        new_member.username = member.member_name
        new_member.status = 1
        //create user member
        const res_member = await db_helper.update(query.create(new_member, 'user'), new_member)
        console.log('user', res_member)
        if (!res_member) {
          return result({ status: 400 })
        }
        const user_id = res_member.insertId
        for (category_uuid of categories) {
          //  category = uuid
          const res_category_id = await db_helper.get(query.get_category_id_by_uuid(category_uuid))
          const category_id = res_category_id[0].id
          // const category_id
          const user_has_category_object = {
            user_id,
            category_id,
          }
          const res_category = await db_helper.update(query.create(user_has_category_object, 'user_has_category'), user_has_category_object)
          console.log('category', res_category)
        }
        // save user_has_cagtegory
      }
    }
    if (!res_company) {
      return result({ status: 400 })
    } else {
      return result({ status: 201 })
    }
  } catch (error) {
    console.log(error)
    if (error.status) {
      return result(error)
    }
    return result({ status: 500 })
  }
}

Company.getCompany = async (payload, result) => {
  try {
    let { limit, offset, type, status, search } = payload
    limit = limit && limit > 0 ? limit : DEFAULT_LIMIT
    offset = offset && offset > 0 ? offset : DEFAULT_OFFSET
    if (type && type !== 'client' && type !== 'prospect') {
      return result({ status: 400 })
    }
    const FILTER_BY = { limit, offset, status, search, type }
    let rea_companies = []
    //get all clients and prospects
    if (!type) {
      //TODO FILTER BY STATUS
      const res_all_companies = await db_helper.get(query.get_all_companies(FILTER_BY))
      for (company of res_all_companies) {
        let custom_company
        //check if is client
        if (company.client_id) {
          const [res_country] = await db_helper.get(query.get_country_by_country_code(company.country))
          const [res_contract_id] = await db_helper.get(query.get_contract_by_company_id(company.id))
          custom_company = {
            id: company.uuid,
            status: company.cli_status ? true : false,
            name: company.legal_name,
            start_at: company.cli_start_at,
            type: 'client',
            country: res_country,
            contract_status: res_contract_id ? true : false,
            periodicity: res_contract_id ? res_contract_id.periodicity : '',
          }

          rea_companies.push(custom_company)
        } else {
          const [res_country] = await db_helper.get(query.get_country_by_country_code(company.country))
          custom_company = {
            id: company.uuid,
            status: company.p_status ? true : false,
            name: company.legal_name,
            start_at: company.p_start_at,
            end_at: company.p_end_at,
            type: 'prospect',
            country: res_country,
            contract_status: false,
          }
          rea_companies.push(custom_company)
        }
      }
    }
    //get clients
    else {
      if (type == 'client') {
        const res_clients = await db_helper.get(query.get_all_clients(FILTER_BY))
        for (company of res_clients) {
          //get country object for each company
          const [res_country] = await db_helper.get(query.get_country_by_country_code(company.country))
          //get contract_status
          const [res_contract_id] = await db_helper.get(query.get_contract_by_company_id(company.id))
          let custom_client = {
            id: company.uuid,
            status: company.cli_status ? true : false,
            name: company.legal_name,
            start_at: company.cli_start_at,
            type: 'client',
            country: res_country,
            contract_status: res_contract_id ? true : false,
            periodicity: res_contract_id ? res_contract_id.periodicity : '',
          }
          rea_companies.push(custom_client)
        }
      } else if (type == 'prospect') {
        const res_prospects = await db_helper.get(query.get_all_prospects(FILTER_BY))
        for (company of res_prospects) {
          const [res_country] = await db_helper.get(query.get_country_by_country_code(company.country))
          let custom_prospect = {
            id: company.uuid,
            status: company.p_status ? true : false,
            name: company.legal_name,
            start_at: company.p_start_at,
            end_at: company.p_end_at,
            type: 'prospect',
            country: res_country,
            contract_status: false,
          }
          rea_companies.push(custom_prospect)
        }
      }
    }
    const meta_data = await get_meta_data(FILTER_BY)
    return result({ status: 200, data: { company: rea_companies, meta_data } })
  } catch (error) {
    console.log(error)
    if (error.status) {
      return result(error)
    }
    return result({ status: 500 })
  }
}

Company.getCompanyById = async (payload, result) => {
  try {
    const { id } = payload
    const [res_company] = await db_helper.get(query.get_company_by_id(id))
    if (!res_company) {
      return result({ status: 404 })
    }
    const company_id = res_company.id

    //if company is type of client
    let res_prospect
    if (res_company.client_id) {
      const [res_client] = await db_helper.get(query.get_client_by_id(res_company.client_id))
      if (!res_client) return result({ status: 404 })

      //check if was prospect before
      if (res_company.prospect_id) {
        ;[res_prospect] = await db_helper.get(query.get_prospect_by_id(res_company.prospect_id))
      }
      const [res_country] = await db_helper.get(query.get_country_by_country_code(res_company.country))
      if (!res_country) {
        return result({ status: 404 })
      }
      //get all members of company
      const res_members = await db_helper.get(query.get_users_by_company_id(company_id))
      //sharing only the uuid  as id

      if (!res_members) return result({ status: 400 })
      for (member of res_members) {
        member.status = member.status ? true : false
        //get the id of member by uuid
        const [res_member_id] = await db_helper.get(query.get_user_id_by_uuid(member.id))
        const member_id = res_member_id.id
        // add to member.categories
        const categories_uuid = []
        const res_categories_id = await db_helper.get(query.get_full_categories_uuid_by_user_id(member_id))
        for (category of res_categories_id) {
          categories_uuid.push(category)
        }
        member.categories = categories_uuid
      }
      //add type for client
      res_company.type = 'client'
      //add properties to res_company
      res_company.status = res_client.status ? true : false
      if (!res_company.prospect_id) {
        const [res_sales_agent] = await db_helper.get(query.get_user_by_user_id(res_client.sales_id))
        res_company.company_registered = {
          start_at: res_client.start_at,
          sales_agent: res_sales_agent,
        }
      } else {
        const [res_sales_agent] = await db_helper.get(query.get_user_by_user_id(res_prospect.sales_id))
        res_company.prospect_trial = {
          start_at: res_prospect.start_at,
          end_at: res_prospect.end_at,
          sales_agent: res_sales_agent,
        }
      }
      res_company.country = {
        code: res_country.code,
        name: res_country.name,
      }
      res_company.members = res_members

      //get current contract
      const [res_current_constract] = await db_helper.get(query.get_current_contract_by_company_id(company_id))
      if (res_current_constract) {
        const [res_salesman] = await db_helper.get(query.get_user_by_user_id(res_current_constract.sales_id))
        delete res_current_constract.sales_id
        res_current_constract.sales_agent = res_salesman
        res_current_constract.signed = res_current_constract.signed ? true : false
        res_company.current_contract = res_current_constract
        const [res_currency] = await db_helper.get(query.get_full_currency(res_current_constract.currency))
        res_current_constract.currency = res_currency
        res_company.contract_status = res_current_constract.status ? true : false
        delete res_current_constract.status
      } else {
        res_company.contract_status = false
      }
      const [res_last_contract] = await db_helper.get(query.get_last_contract(company_id))
      if (res_last_contract) {
        const [res_salesman] = await db_helper.get(query.get_user_by_user_id(res_last_contract.sales_id))
        delete res_last_contract.sales_id
        res_last_contract.sales_agent = res_salesman
        res_last_contract.signed = res_last_contract.signed ? true : false
        const [res_currency] = await db_helper.get(query.get_full_currency(res_last_contract.currency))
        res_last_contract.currency = res_currency
      }

      res_company.last_contract = res_last_contract ? res_last_contract : null
    }
    // prospect on
    if (res_company.prospect_id && !res_company.client_id) {
      let [res_prospect] = await db_helper.get(query.get_prospect_by_id(res_company.prospect_id))
      const [res_country] = await db_helper.get(query.get_country_by_country_code(res_company.country))
      if (!res_country) {
        return result({ status: 404 })
      }
      //get all members of company
      const res_members = await db_helper.get(query.get_users_by_company_id(company_id))
      if (!res_members) return result({ status: 400 })
      for (member of res_members) {
        member.status = member.status ? true : false
        //get the id of member by uuid
        const [res_member_id] = await db_helper.get(query.get_user_id_by_uuid(member.id))
        const member_id = res_member_id.id
        // add to member.categories
        const categories_uuid = []
        const res_categories_id = await db_helper.get(query.get_full_categories_uuid_by_user_id(member_id))
        for (category of res_categories_id) {
          categories_uuid.push(category)
        }
        member.categories = categories_uuid
      }

      //add properties to res_company
      res_company.status = res_prospect.status ? true : false
      const [res_sales_agent] = await db_helper.get(query.get_user_by_user_id(res_prospect.sales_id))
      //add type for client
      res_company.type = 'prospect'
      res_company.prospect_trial = {
        start_at: res_prospect.start_at,
        end_at: res_prospect.end_at,
        sales_agent: res_sales_agent,
      }
      res_company.country = {
        code: res_country.code,
        name: res_country.name,
      }
      res_company.members = res_members
    }
    res_company.id = res_company.uuid
    delete res_company.uuid
    //TODO DELETE FROM DB
    delete res_company.start_at
    delete res_company.end_at
    delete res_company.sales_id
    delete res_company.client_id
    delete res_company.prospect_id

    return result({ status: 200, data: res_company })
  } catch (error) {
    console.log(error)
    if (error.status) {
      return result(error)
    }
    return result({ status: 500 })
  }
}

//update Company
Company.updateCompany = async (payload, result) => {
  try {
    const { id, companyUpdate } = payload
    const [res_company] = await db_helper.get(query.get_company_by_id(id))
    if (!res_company) {
      return result({ status: 404 })
    }
    const status = companyUpdate.status
    if (res_company.client_id) {
      const res_update_client = await db_helper.update(query.set_status_of_client(status, res_company.client_id), status)
    } else {
      if (res_company.prospect_id) {
        const res_update_prospect = await db_helper.update(query.set_status_of_prospect(status, res_company.prospect_id), status)
      }
    }

    delete companyUpdate.id
    delete companyUpdate.members
    delete companyUpdate.status
    const processed_data = await process_payload(companyUpdate)
    const res_update_company = await db_helper.update(query.update_company(processed_data, id), processed_data)
    if (!res_update_company.affectedRows) {
      return result({ status: 404 })
    }
    return result({ status: 201 })
  } catch (error) {
    console.log(error)
    if (error.status) {
      return result(error)
    }
    return result({ status: 500 })
  }
}

//remove company
Company.deleteCompany = async (payload, result) => {
  try {
    const { id } = payload
    const res_company = await db_helper.update(query.delete_company(id))
    if (!res_company.affectedRows) {
      return result({ status: 404 })
    }
    return result({ status: 200 })
  } catch (error) {
    if (error.status) {
      return result(error)
    }
    return result({ status: 500 })
  }
}
Company.getContractsByCompanyId = async (payload, result) => {
  try {
    const { id } = payload
    const [res_company_id] = await db_helper.get(query.get_company_id_by_company_uuid(id))
    if (!res_company_id) {
      return result({ status: 404 })
    }
    const company_id = res_company_id.id

    const res_contracts = await db_helper.get(query.get_full_contracts_by_company_id(company_id))
    //get the currency of company
    let all_contracts = []
    for (contract of res_contracts) {
      const [res_currency] = await db_helper.get(query.get_currency_by_contract_id(contract.id))
      if (!res_currency) return result({ status: 404 })
      const res_invoices = await db_helper.get(query.get_full_invoices_by_contract_id(contract.id))
      let res_user
      if (contract.signer_user) {
        [res_user] = await db_helper.get(query.get_user_by_user_id(contract.signer_user))
      }
      let format_contract = {
        contract_id: contract.uuid,
        amount: contract.amount,
        currency: {
          code: res_currency.code,
          name: res_currency.name,
          symbol: res_currency.symbol,
        },
        id: id,
        members: contract.members,
        periodicity: contract.periodicity,
        sales: {
          id: contract.sales_id,
          name: contract.sales_name,
        },
        start_at: contract.start_at,
        vat: contract.vat ? true : false,
        signed: contract.signed ? true : false,
        end_at: contract.end_at,
        invoices: res_invoices ? res_invoices : [],
        signer_user: {
          id: res_user ? res_user.id : '',
          name: res_user ? res_user.name : '',
        },
      }
      all_contracts.push(format_contract)
    }
    return result({ status: 200, data: all_contracts })
  } catch (error) {
    console.log(error)
    if (error.status) {
      return result(error)
    }
    return result({ status: 500 })
  }
}
Company.upgradeCompany = async (payload, result) => {
  try {
    const company_id = payload.id
    const { id } = payload.bearerAuth.user

    // get full company
    const [res_company] = await db_helper.get(query.get_company_by_id(company_id))
    if (!res_company) {
      return result({ status: 404 })
    }
    //get the prospect
    let prospect
    if (res_company.prospect_id) {
      ;[prospect] = await db_helper.get(query.get_prospect_by_id(res_company.prospect_id))
    }
    // set status of prospect id if exists to false
    if (res_company.prospect_id) {
      const status = 0
      const res_prospect = await db_helper.update(query.set_status_of_prospect(status, res_company.prospect_id), status)
    }
    // insert client
    const client = {
      status: prospect.status,
      sales_id: id,
    }
    const res_client = await db_helper.update(query.create(client, 'client'), client)
    if (!res_client.affectedRows) {
      return result({ status: 404 })
    } //update client id of company
    const client_id = res_client.insertId
    const res_update_company = await db_helper.update(query.set_client_id_of_company(client_id, company_id), client_id)
    if (!res_update_company.affectedRows) {
      return result({ status: 404 })
    }
    return result({ status: 201 })
  } catch (error) {
    if (error.status) {
      return result(error)
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
            case 'name':
              processed_payload.legal_name = val.trim()
              break
            case 'type':
              processed_payload.type = val
              break
            case 'country':
              processed_payload.country = val.trim()
              break
            case 'start_at':
              processed_payload.start_at = moment(val, 'YYYY-MM-DD').format('YYYY-MM-DD hh:mm:ss')
              break
            case 'end_at':
              processed_payload.end_at = moment(val, 'YYYY-MM-DD').format('YYYY-MM-DD hh:mm:ss')
              break
            case 'members':
              processed_payload[key] = val
              break
            case 'status':
              processed_payload[key] = val
              break
            case 'logo':
              processed_payload[key] = val
              break
            default:
              console.log('key', key)
              return reject({ status: 400 })
          }
        }
      }
      return resolve(processed_payload)
    } catch (error) {
      return reject({ status: 400 })
    }
  })
}

const get_meta_data = (filter_by) => {
  return new Promise(async (resolve, reject) => {
    const { limit, offset, status, type, search } = filter_by

    let sum
    if (!type) [sum] = await db_helper.get(query.get_sum_rows({ status, search }))
    if (type == 'prospect') [sum] = await db_helper.get(query.get_sum_rows_prospect({ status, search }))
    if (type == 'client') {
      ;[sum] = await db_helper.get(query.get_sum_rows_clients({ status, search }))
    }

    const meta_data = {
      sum_rows: sum.sum,
      limit: limit,
      page: offset == 0 ? 1 : JSON.parse(Math.ceil(offset / limit)) + 1,
      sum_pages: Math.ceil(sum / limit),
    }
    return resolve(meta_data)
  })
}

module.exports = Company
