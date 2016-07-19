var config = require('../../configs.json')
var version = require('../../package.json').version
var axios = require('axios')
var q = require('q')

module.exports = function (req, res) {
  q.allSettled(config.consumers.map((consumer) => {
      return axios
        .get(consumer.status)
        .then((request) => {
          const maxLag = request.data.status.maxlag
          const generalStatus = request.data.status.status
          const lagStatus = maxLag ? maxLag.status : null

          return {
            name: consumer.name,
            status: lagStatus || generalStatus,
            complete: request.data.status.complete
          }
        })
    }))
    .then((data) => {
      data = data
        .filter((promise) => promise.state === 'fulfilled')
        .map((promise) => promise.value)
      res.json({ data: data, meta: { version: version }})
    })
}
