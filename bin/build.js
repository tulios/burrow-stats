#!/usr/bin/env node

require('babel-core/register')

var assets = require('../server/assets')

assets.default.build(function (err) {
  if (err) {
    console.log('Build failed')
    console.log(arguments)
    process.exit(1)
  }

  console.log('Build success!')
})
