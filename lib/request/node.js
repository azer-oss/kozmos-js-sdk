const common = require("./common")

const nodeRequire = require
let https, url

try {
  https = nodeRequire('https')
  url = nodeRequire('url')
} catch (err) {
}

module.exports = {
  test: test,
  send: send
}

function test () {
  return !!https
}

function send (options, callback) {
  const parsedURL = url.parse(options.url)
  const requestOptions = {
    host: parsedURL.host,
    path: parsedURL.path,
    port: parsedURL.port,
    method: options.method,
    headers: headers(options)
  }

  const req = https.request(requestOptions, concatResponse(callback))

  req.on('error', callback)

  if (options.data) {
    req.write(options.stringifiedData)
  }

  req.end()
}

function headers (options) {
  const result = {
    "X-API-Key": options.apiKey || "",
    "X-API-Secret": options.apiSecret || ""
  }

  if (options.data) {
    options.stringifiedData = JSON.stringify(options.data)
    result["Content-Type"] = "application/json"
    result["Content-Length"] = options.stringifiedData.length
  }

  return result
}

function concatResponse (callback) {
  return res => {
    let err = common.checkForErrors(res.status, null)
    if (err) {
      return callback(err)
    }

    var body = '';
    res.on('data', chunk => { body += chunk })
    res.on('error', err => callback(err))
    res.on('end', () => {
      let parsed

      try {
        parsed = JSON.parse(body)
      } catch (err) {
        return callback(err)
      }

      err = common.checkForErrors(res.status, parsed)
      if (err) {
        return callback(err)
      }

      callback(undefined, parsed)
    })
  }
}
