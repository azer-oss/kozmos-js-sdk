module.exports = like

function like (request, url, callback) {
  request.put('/api/like', { url: url }, callback)
}
