module.exports = {
  checkForErrors: checkForErrors
}

function checkForErrors (statusCode, body) {
  if (statusCode >= 300 && body && body.error) {
    return new Error(body.error)
  }

  if (statusCode == 401) {
    return new Error('Unauthorized (401)')
  }

  if (statusCode == 404) {
    return new Error('Not found')
  }

  if (statusCode >= 300) {
    return new Error('Request error (' + statusCode + ')')
  }

  return null
}
