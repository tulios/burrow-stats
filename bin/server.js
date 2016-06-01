#!/usr/bin/env node
require('babel-core/register')
var fs = require('fs')
var path = require('path')
var configPath = path.resolve(__dirname, '../configs.json')

fs.access(configPath, fs.F_OK, function(err) {
  if (err) {
    console.error('ERROR: Configuration file is missing, please create a "configs.json" in the root folder. Expecting path: ', configPath)

  } else {
    var app = require('../server/index')
    var port = process.env.PORT || 8031
    app.default.listen(port)
    console.log('Server started on port %s', port)
  }
})
