import React from 'react'
import { Line as LineChart } from 'react-chartjs';
import moment from 'moment'
import humanize from '../utils/humanize'
import chartEntry from '../utils/chart-entry'
import chartOptions from '../utils/chart-options'

import Widget from './widget'

const SERIES_MAX_LENGTH = 30

export default React.createClass({
  render() {
    return (
      <Widget className='total-lag-stats' name={this.props.name}>
        <LineChart data={this.chartData()}
                   options={chartOptions()}
                   width='100'
                   height='35'/>
      </Widget>
    )
  },

  chartData() {
    const consumerGroupOffsets = this.props.consumer_group.offsets
    const topicOffsets = this.props.topic.offsets
    const totalLag = topicOffsets
      .map((value, i) => value - consumerGroupOffsets[i])
      .map((value) => value >= 0 ? value : 0)
      .reduce((total, value) => total + value, 0)

    const cacheKey = `burrowStats-total-lag-${this.props.name}`
    const oldCache = JSON.parse(localStorage.getItem(cacheKey))
    let newCache = { series: [{time: moment(), totalLag: totalLag}] }

    if (oldCache) {
      oldCache.series = oldCache.series.concat(newCache.series)
      if (oldCache.series.length > SERIES_MAX_LENGTH) {
        oldCache.series.shift()
      }
      newCache = oldCache
    }

    localStorage.setItem(cacheKey, JSON.stringify(newCache))

    return {
      labels: newCache.series.map((entry) => moment(entry.time).format('H:mm:ss')),
      datasets: [
        chartEntry(newCache.series.map((entry) => entry.totalLag), 'Total Lag'),
        chartEntry(newCache.series.map((entry) => entry.totalLag/2), 'Total Lag'),
        chartEntry(newCache.series.map((entry) => entry.totalLag/3), 'Total Lag')
      ]
    }
  }

})
