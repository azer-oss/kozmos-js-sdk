const API = require("./lib/api")
const call = require('./lib/methods')

class SDK {
  constructor(options) {
    this.api = new API(options)
  }

  version (callback) {
    return call.version(this.api, callback)
  }
}

module.exports = SDK
