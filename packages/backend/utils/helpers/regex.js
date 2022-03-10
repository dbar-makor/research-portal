function check_password(password) {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-,]).{8,200}/.test(password)
}

function uuid_is_valid(id) {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)
}

function check_ip_is_valid(ip) {
  return /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip)
}

function check_ipv6_is_valid(ip) {
  return /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/.test(ip)
}

function is_sub_domain_valid(sub_domain) {
  return /^\w[\w-]{0,60}\w$/.test(sub_domain)
}

module.exports = {
  check_password,
  uuid_is_valid,
  check_ip_is_valid,
  check_ipv6_is_valid,
  is_sub_domain_valid,
}
