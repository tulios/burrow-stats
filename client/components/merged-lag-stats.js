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
      <Widget className='merged-lag-stats'>
        <LineChart data={this.chartData()}
                   options={chartOptions()}
                   width='100'
                   height='35'/>
      </Widget>
    )
  },

  cacheConsumer(consumer) {
    const consumerGroupOffsets = consumer.consumer_group.offsets
    const topicOffsets = consumer.topic.offsets
    const totalLag = topicOffsets
      .map((value, i) => value - consumerGroupOffsets[i])
      .map((value) => value >= 0 ? value : 0)
      .reduce((total, value) => total + value, 0)

    const oldCache = this.readCache(consumer.name)
    let newCache = { series: [{time: moment(), totalLag: totalLag}] }

    if (oldCache) {
      oldCache.series = oldCache.series.concat(newCache.series)
      if (oldCache.series.length > SERIES_MAX_LENGTH) {
        oldCache.series.shift()
      }
      newCache = oldCache
    }

    this.writeCache(consumer.name, newCache)
  },

  writeCache(name, cache) {
    const cacheKey = `burrowStats-total-lag-${name}`
    localStorage.setItem(cacheKey, JSON.stringify(cache))
  },

  readCache(name) {
    const cacheKey = `burrowStats-total-lag-${name}`
    return JSON.parse(localStorage.getItem(cacheKey))
  },

 chartData() {
    this.props.data.forEach(this.cacheConsumer)
    const consumerNames = this.props.data.map(entry => entry.name)
    const caches = consumerNames.map(this.readCache)

    return {
      labels: caches[0].series.map(entry => moment(entry.time).format('H:mm:ss')),
      datasets: caches.map((consumerCache, i) => {
        return chartEntry(consumerCache.series.map(entry => entry.totalLag), consumerNames[i])
      })
    }
  }

})
