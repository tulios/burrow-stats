import React from 'react'
import { Line as LineChart } from 'react-chartjs';
import moment from 'moment'
import cache from '../utils/cache'
import chartEntry from '../utils/chart-entry'
import chartOptions from '../utils/chart-options'

import Widget from './widget'

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

  chartData() {
    this.props.consumers.forEach(cache.refreshTotalLag)
    const consumerNames = this.props.consumers.map(entry => entry.name)
    const caches = consumerNames.map(cache.readTotalLag)

    return {
      labels: caches[0].series.map(entry => moment(entry.time).format('H:mm:ss')),
      datasets: caches.map((consumerCache, i) => {
        return chartEntry(consumerCache.series.map(entry => entry.totalLag), consumerNames[i])
      })
    }
  }

})
