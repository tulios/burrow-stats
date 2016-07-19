import React from 'react'
import moment from 'moment'
import API from '../api'

import APIStatus from '../components/api-status'
import PartitionLagStats from '../components/partition-lag-stats'
import Spinner from '../components/spinner'
import burrowStatsOptions from '../utils/burrow-stats-options'


export default React.createClass({
  fetch() {
    API.Consumer
      .lag()
      .then((response) => {
        !this.props.apiError && this._isMounted ? this.setState(response.data) : null
      })
  },

  componentWillMount() {
    this._isMounted = true
    this.fetch()
  },

  render() {
    return (
      <div className='partition-lag-view'>
        <APIStatus text={this.props.apiError} />
        {
          this.state ?
            this.renderPartitionLagStats() :
            <Spinner />
        }
      </div>
    )
  },

  componentDidMount() {
    console.log(`Polling partitions-lag-view every ${burrowStatsOptions().pollInterval}s`)
    this._intervalId = setInterval(() => this.fetch(), burrowStatsOptions().pollInterval * 1000)
  },

  componentWillUnmount() {
    this._isMounted = false
    clearInterval(this._intervalId)
  },

  renderPartitionLagStats() {
    return this.state
      .data
      .map((consumerData) => {
        return <PartitionLagStats key={consumerData.name} {...consumerData} />
      })
  }
})
