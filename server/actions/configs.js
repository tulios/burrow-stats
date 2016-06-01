var config = require('../../configs.json')

module.exports = function (req, res) {
  res.json({
    chartOptions: config.chartOptions,
    burrowStatsOptions: config.burrowStatsOptions
  })
}
