const search = require("./search")
const version = require("./version")
const like = require("./like")
const unlike = require("./unlike")
const tagging = require("./tagging")
const sync = require("./sync")

module.exports = {
  like: like,
  unlike: unlike,
  search: search,
  tagging: tagging,
  sync: sync,
  version: version
}
