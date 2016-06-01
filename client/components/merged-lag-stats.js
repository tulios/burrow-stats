import React from 'react'
import { Line as LineChart } from 'react-chartjs';
import moment from 'moment'
import humanize from '../utils/humanize'
import chartEntry from '../utils/chart-entry'
import chartOptions from '../utils/chart-options'

import Widget from './widget'

const SERIES_MAX_LENGTH = 30
const CACHE_KEY = 'burrowStats-merged-total-lag'

export default React.createClass({
  render() {
    return (
      <Widget className='merged-lag-stats' name='Merged lag'>
        <LineChart data={this.chartData()}
                   options={chartOptions()}
                   width='100'
                   height='35'/>
      </Widget>
    )
  },

  getTotalLag(consumer) {
    const consumerGroupOffsets = consumer.consumer_group.offsets
    const topicOffsets = consumer.topic.offsets
    const totalLag = topicOffsets
      .map((value, i) => value - consumerGroupOffsets[i])
      .map((value) => value >= 0 ? value : 0)
      .reduce((total, value) => total + value, 0)

    const oldCache = JSON.parse(localStorage.getItem(CACHE_KEY)) || {}
    let newCacheEntry = { series: [{time: moment(), totalLag: totalLag}] }

    if (oldCache[consumer.name]) {
      let oldCacheEntry = oldCache[consumer.name]
      oldCacheEntry.series = oldCacheEntry.series.concat(newCacheEntry.series)
      if (oldCacheEntry.series.length > SERIES_MAX_LENGTH) {
        oldCacheEntry.series.shift()
      }
      newCacheEntry = oldCacheEntry
    }

    oldCache[consumer.name] = newCacheEntry
    localStorage.setItem(CACHE_KEY, JSON.stringify(oldCache))
  },

   chartData() {
    this.props.data.forEach(this.getTotalLag)
    const newCache = JSON.parse(localStorage.getItem(CACHE_KEY))
    const cacheKeys = Object.keys(newCache)
    return {
      labels: newCache[cacheKeys[0]].series.map(entry => moment(entry.time).format('H:mm:ss')),
      datasets: cacheKeys.map(key => {
        const entry = newCache[key]
        return chartEntry(entry.series.map(entry => entry.totalLag), key)
      })
    }
  }

})
