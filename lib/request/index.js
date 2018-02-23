const node = require("./node")
const browser = require("./browser")

const clients = [
  node,
  browser
]

module.exports = client

function client () {
  const len = clients.length

  let i = -1
  while (++i < len) {
    if (clients[i].test()) {
      return clients[i].send
    }
  }
}
