import React from 'react'
import { Line as LineChart } from 'react-chartjs';
import moment from 'moment'
import cache from '../utils/cache'
import chartEntry, {chartLabel, chartPalette} from '../utils/chart-entry'
import chartOptions from '../utils/chart-options'

import Widget from './widget'

export default React.createClass({
  getInitialState() {
    return { legend: '' }
  },

  componentDidMount() {
    this.setState({ legend: this.refs.chart.getChart().generateLegend() })
  },

  render() {
    return (
      <Widget className='merged-lag-stats'>
        <LineChart data={this.chartData()}
                   options={chartOptions()}
                   width='100'
                   height='35'
                   ref='chart' />
        <div dangerouslySetInnerHTML={{__html: this.state.legend}} />
      </Widget>
    )
  },

  chartData() {
    let consumers = this.props.consumers
      .filter(
        (consumer) => {return !!consumer.consumer_group.offsets}
      )
    consumers.forEach(cache.refreshTotalLag)
    const consumerNames = consumers.map(entry => entry.name)
    const caches = consumerNames.map(cache.readTotalLag)
    const labels = caches[0].series.map(chartLabel)

    return {
      labels: labels,
      datasets: caches.map((consumerCache, i) => {
        return chartEntry(
          consumerCache.series.map(entry => entry.totalLag),
          consumerNames[i],
          chartPalette(i)
        )
      })
    }
  }

})
