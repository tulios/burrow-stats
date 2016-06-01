var express = require('express')
var http = require('http')
var app = express()
var server = http.createServer(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./dist'))
} else {
  require('./assets').default.middleware(app)
}

require('./routes')(app)

export default server
