import React from 'react'
import API from '../api'

import APIStatus from '../components/api-status'
import ConsumerStatus from '../components/consumer-status'
import Spinner from '../components/spinner'
import burrowStatsOptions from '../utils/burrow-stats-options'

export default React.createClass({
  fetch() {
    API.Consumer
      .status()
      .then((data) => !this.props.apiError && this._isMounted ? this.setState(data) : null)
  },

  componentWillMount() {
    this._isMounted = true
    this.fetch()
  },

  render() {
    return (
      <div className='status-view'>
        <APIStatus text={this.props.apiError} />
        {
          this.state ?
            this.renderStatus() :
            <Spinner />
        }
      </div>
    )
  },

  componentDidMount() {
    console.log(`Polling status-view every ${burrowStatsOptions().pollInterval}s`)
    this._intervalId = setInterval(() => this.fetch(), burrowStatsOptions().pollInterval * 1000)
  },

  componentWillUnmount() {
    this._isMounted = false
    clearInterval(this._intervalId)
  },

  renderStatus() {
    return this.state
      .data
      .map((consumerData) => {
        return <ConsumerStatus key={consumerData.name} {...consumerData} />
      })
  }
})
