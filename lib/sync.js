module.exports = {
  push: push,
  pull: pull
}

function push (request, updates, callback) {
  request.post('/api/like-tags', { content: updates }, callback)
}

function pull (request, sinceTS, callback) {
  request.get('/api/sync/' + sinceTS, callback)
}
