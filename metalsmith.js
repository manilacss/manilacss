var Metalsmith = require('metalsmith')
var permalinks  = require('metalsmith-permalinks');

var app = Metalsmith(__dirname)
  .metadata({
    APP_HOST: process.env.APP_HOST || 'https://manilacss.herokuapp.com'
  })
  .source('./web/assets')
  .destination('./public')

  .use(permalinks({
    relative: false,
    pattern: ':title'

  }))
  .use(require('metalsmith-jstransformer')())
  .use(require('metalsmith-sense-sass')())
  .use(require('metalsmith-browserify-alt')({
    defaults: {
      cache: {},
      packageCache: {},
      transform: ['babelify', 'require-globify'],
      plugin: process.env.NODE_ENV === 'development' ? ['watchify'] : []
    }
  }))

if (process.env.NODE_ENV === 'production') {
  app = app.use(require('metalsmith-uglifyjs')({
    override: true,
    uglifyOptions: {
      mangle: true, compress: { warnings: false }
    }
  }))
}

if (module.parent) {
  module.exports = app
} else {
  app.build(function (err) { if (err) { console.error(err); process.exit(1) } })
}
