module.exports = {
  add: add,
  remove: remove
}

function add (request, options, callback) {
  request.put('/api/like-tags', options, callback)
}

function remove (request, options, callback) {
  request.delete('/api/like-tags', options, callback)
}
