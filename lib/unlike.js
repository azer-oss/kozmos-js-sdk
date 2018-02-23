module.exports = unlike

function unlike (request, url, callback) {
  request.delete('/api/like', { url: url }, callback)
}
