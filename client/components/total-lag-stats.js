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
      <Widget className='total-lag-stats' name={this.props.name}>
        <LineChart data={this.chartData()}
                   options={chartOptions()}
                   width='100'
                   height='35'/>
      </Widget>
    )
  },

  chartData() {
    const totalLagData = cache.refreshTotalLag(this.props)

    return {
      labels: totalLagData.series.map((entry) => moment(entry.time).format('H:mm:ss')),
      datasets: [chartEntry(totalLagData.series.map((entry) => entry.totalLag), 'Total Lag')]
    }
  }

})
