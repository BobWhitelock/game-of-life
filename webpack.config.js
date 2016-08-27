
var getConfig = require('hjs-webpack')
var path = require('path')

var config = module.exports = getConfig({
  // This seems to be required for Karma to work properly; TODO don't hardcode
  // this.
  isDev: true,

  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,
})

config.resolve.root = [
  path.resolve('src'),
]

config.module.loaders = [
  ...config.module.loaders,
  { test: /sinon\/pkg\/sinon\.js/, loader: 'imports?define=>false,require=>false' },
]

config.resolve.alias = {}
config.resolve.alias.sinon = 'sinon/pkg/sinon.js'

module.exports = config
