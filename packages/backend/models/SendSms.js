const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)
const logger = require('../logger')
const config_process = require('../utils/swagger.config').swagger.send_sms

// constructor
const SendSms = () => {}

//get file
SendSms.sendSmsToPhone = async (payload, result) => {
  try {
    const unprocessed_data = payload.sendSms
    const processed_data = await process_payload(unprocessed_data)
  
    client.messages
      .create({
        body: processed_data.message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: processed_data.phone,
      })
      .then((message) => {
        return result({
          status: 200,
        })
      })
      .catch((error) => {
        logger.error(`Failed to send sms, error: ${error}`)
        return result({
          status: error.status,
        })
      })
  } catch (error) {
    logger.error(`Failed to send sms, error: ${error}`)
    if (error.status) {
      return result(error)
    }
    return result({
      status: 500,
      message: `Server error: ${error.message}`,
    })
  }
}

module.exports = SendSms

// process payload to query string
function process_payload(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const processed_payload = {}
      for (const [key, val] of Object.entries(payload)) {
        if (val !== undefined || typeof val !== 'object') {
          switch (key) {
            case config_process.send_sms.phone:
              const dialing_code = val[config_process.send_sms.dialing_code].trim()
              const number = val[config_process.send_sms.number].trim()

              if (dialing_code && number) {
                processed_payload.phone = '+' + dialing_code + number
              } else {
                return reject({ status: 400 })
              }
              break
            case config_process.send_sms.message:
              processed_payload.message = val.toUpperCase().trim()
              break
            default:
              return reject({ status: 400 })
          }
        }
      }
      return resolve(processed_payload)
    } catch (error) {
      logger.error(`Failed to process payload, The error: ${error}`)
      return reject({ status: 400 })
    }
  })
}
