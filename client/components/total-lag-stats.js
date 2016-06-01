import React from 'react'
import { Line as LineChart } from 'react-chartjs';
import moment from 'moment'
import cache from '../utils/cache'
import chartEntry, {chartLabel} from '../utils/chart-entry'
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
    const labels = totalLagData.series.map(chartLabel)

    return {
      labels: labels,
      datasets: [chartEntry(totalLagData.series.map(entry => entry.totalLag), 'Total Lag')]
    }
  }

})
