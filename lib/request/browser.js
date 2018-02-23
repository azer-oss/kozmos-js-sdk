const common = require('./common')

module.exports = {
  test: test,
  send: send
}

function test () {
  return typeof XMLHttpRequest !== 'undefined'
}

function send (options, callback) {
  const xmlhttp = new XMLHttpRequest
  xmlhttp.open(options.method, options.url)

  xmlhttp.setRequestHeader("X-API-Key", options.apiKey || "")
  xmlhttp.setRequestHeader("X-API-Secret", options.apiSecret || "")

  if (options.data) {
    xmlhttp.setRequestHeader("Content-Type", "application/json")
    xmlhttp.send(JSON.stringify(options.data))
  } else {
    xmlhttp.send(null)
  }

  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState !== 4) return

    let parsed

    try {
      parsed = JSON.parse(xmlhttp.responseText)
    } catch (err) {
      return callback(err)
    }

    let err = common.checkForErrors(xmlhttp.status, parsed)
    if (err) {
      return callback(err)
    }

    callback(null, parsed)
  }
}
