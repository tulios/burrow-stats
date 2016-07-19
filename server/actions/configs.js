var config = require('../../configs.json')
var version = require('../../package.json').version

module.exports = function (req, res) {
  res.json({
    data: {
      chartOptions: config.chartOptions,
      burrowStatsOptions: config.burrowStatsOptions
    },
    meta: { version: version }
  })
}
