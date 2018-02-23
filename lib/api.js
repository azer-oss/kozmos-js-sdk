const request = require("./request")()

class API {
  constructor(options) {
    this.host = options.host || 'https://getkozmos.com'
    this.apiKey = options.apiKey
    this.apiSecret = options.apiSecret
    this.deprecatedToken = options.deprecatedToken
  }

  get(url, callback) {
    this.sendJSON('GET', url, null, callback)
  }

  post(url, data, callback) {
    this.sendJSON('POST', url, data, callback)
  }

  put(url, data, callback) {
    this.sendJSON('PUT', url, data, callback)
  }

  delete(url, data, callback) {
    this.sendJSON('DELETE', url, data, callback)
  }

  sendJSON (method, url, data, callback) {
    request({
      apiKey: this.apiKey,
      apiSecret: this.apiSecret,
      method: method,
      url: this.host + url,
      data: data
    }, callback)
  }
}

module.exports = API
