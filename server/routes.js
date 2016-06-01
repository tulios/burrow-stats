var request = require('request')

module.exports = function (app) {
  app.get('/api/configs.json', require('./actions/configs'))
  app.get('/api/consumers/lag.json', require('./actions/consumers'))
  app.get('/api/consumers/status.json', require('./actions/status'))

  if (process.env.NODE_ENV === 'production') {
    app.get('*', require('./actions/catch-all'));
  }
}
