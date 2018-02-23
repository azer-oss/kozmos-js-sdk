module.exports = version

function version (request, callback) {
  request.get('/api', (err, resp) => {
    if (err) return callback(err)
    callback(undefined, resp.version)
  })
}
