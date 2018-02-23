const API = require("./lib/api")
const call = require('./lib/methods')

class SDK {
  constructor(options) {
    this.api = new API(options)
  }

  like(url, callback) {
    call.like(this.api, url, callback)
  }

  search(options, callback) {
    call.search(this.api, options, callback)
  }

  tag(url, tags, callback) {
    call.tagging.add(this.api, { url: url, tags: tags }, callback)
  }

  unlike(url, callback) {
    call.unlike(this.api, url, callback)
  }

  untag(url, tag, callback) {
    call.tagging.remove(this.api, { url: url, tag: tag }, callback)
  }

  push(updates, callback) {
    call.sync.push(this.api, updates, callback)
  }

  pull(sinceTS, callback) {
    call.sync.push(this.api, sinceTS, callback)
  }

  version (callback) {
    return call.version(this.api, callback)
  }
}

module.exports = SDK
