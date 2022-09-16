'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IMG_URL: '"localhost:8899/api/"',
  SOCKET_URL: '"localhost:9999/IO/socket.io/"'
})
