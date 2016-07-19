var config = require('../../configs.json')
var version = require('../../package.json').version
var axios = require('axios')
var q = require('q')

module.exports = function (req, res) {
  q.allSettled(config.consumers.map((consumer) => {
    return q
      .all([
        axios.get(consumer.consumer_group_offset),
        axios.get(consumer.topic_offset)
      ]).then((result) => {
        return {
          name: consumer.name,
          consumer_group: result[0].data,
          topic: result[1].data
        }
      })
  })).then((data) => {
    data = data
      .filter((promise) => promise.state === 'fulfilled')
      .map((promise) => promise.value)
    res.json({ data: data, meta: { version: version } })
  })
}
