const test = require("prova")
const SDK = require("./")
const sdk = new SDK({})

test('version', t => {
  t.plan(2)

  sdk.version((err, version) => {
    t.error(err)
    t.equal(version, '5.0.1')
  })
})
