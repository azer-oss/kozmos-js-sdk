const test = require("prova")
const SDK = require("./")
const sdk = new SDK({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
})

test('version', t => {
  t.plan(2)

  sdk.version((err, version) => {
    t.error(err)
    t.equal(version, '5.0.1')
  })
})

test('search', t => {
  t.plan(2)

  const options = {
    query: "javascript",
    from: 0,
    size: 25
  }

  sdk.search(options, (err, resp) => {
    t.error(err)
    t.equal(resp.results.likes.length, 25)
  })
})

test('like', t => {
  t.plan(2)

  sdk.like('github.com/kozmos', (err, resp) => {
    t.error(err)
    t.equal(resp.url, 'github.com/kozmos')
  })
})

test('unlike', t => {
  t.plan(2)

  sdk.unlike('github.com/kozmos', (err, resp) => {
    t.error(err)
    t.equal(resp.deleted, 'github.com/kozmos')
  })
})

test('add & remove tags', t => {
  t.plan(4)

  sdk.tag('github.com/kozmos', ['personal', 'github'], (err, resp) => {
    t.error(err)
    t.equal(resp.ok, true)

    sdk.untag('github.com/kozmos', 'personal', (err, resp) => {
      t.error(err)
      t.equal(resp.ok, true)
    })
  })
})
