import React from 'react'
import { Bar as BarChart } from 'react-chartjs';
import moment from 'moment'
import humanize from '../utils/humanize'
import chartEntry from '../utils/chart-entry'
import chartOptions from '../utils/chart-options'
import offsetsNormalizer from '../utils/offsets-normalizer'

import Widget from './widget'
import ConsumerLagReport from './consumer-lag-report'

export default React.createClass({
  render() {
    const consumerGroupOffsets = offsetsNormalizer(this.props.consumer_group.offsets)
    const topicOffsets = offsetsNormalizer(this.props.topic.offsets)
    const lag = topicOffsets
      .map((value, i) => value - consumerGroupOffsets[i])
      .map((value) => value >= 0 ? value : 0)

    const maxLag = Math.max.apply(null, lag)

    const chartData = {
      labels: topicOffsets.map((_, i) => i),
      datasets: [chartEntry(lag, 'Partition Lag', {fillColor: 'rgba(0, 137, 207, 1)'})]
    }

    return (
      <Widget className='partition-lag-stats' name={this.props.name}>
        <BarChart data={chartData}
                  options={chartOptions()}
                  width='100'
                  height='25'/>

        <ConsumerLagReport name={this.props.name}
                           maxLag={maxLag}
                           lag={lag}/>
      </Widget>
    )
  }

})
