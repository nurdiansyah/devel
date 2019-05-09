const _devel = require('./devel')
const _production = require('./production')

module.exports = {
  devel: _devel(),
  production: _production()
}
