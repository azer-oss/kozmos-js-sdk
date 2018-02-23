module.exports = search

function search (request, options, callback) {
  request.post('/api/search', options, callback)
}
