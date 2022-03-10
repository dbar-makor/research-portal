require('dotenv').config()

exports.checkAuthorization = (req) => {
  return new Promise((resolve, reject) => {
    if (req.openapi.openApiRoute === '/auth') return resolve('ok')

    const permissionTo = req.openapi.schema.security['OAuth2']
    if (permissionTo === undefined) {
      return resolve('ok')
    }
    const role = req.headers.bearerAuth.user.role
    if (permissionTo.includes(role)) {
      return resolve('ok')
    }

    return resolve('Forbidden')
  })
}
