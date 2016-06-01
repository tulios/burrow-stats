import React from 'react'
import API from '../api'

import APIStatus from '../components/api-status'
import TotalLagStats from '../components/total-lag-stats'
import Spinner from '../components/spinner'
import Toggle from 'material-ui/Toggle';

const INTERVAL_TIME = 10 * 1000
const MERGE_CHARTS_CACHE_KEY = 'burrowStats-lag-view-merge-charts'

export default React.createClass({
  fetch() {
    API.Consumer
      .lag()
      .then((data) => !this.props.apiError && this._isMounted ? this.setState(data) : null)
  },

  getInitialState() {
    return {
      mergeCharts: false,
      data: null
    }
  },

  componentWillMount() {
    this._isMounted = true
    const mergeCharts = JSON.parse(localStorage.getItem(MERGE_CHARTS_CACHE_KEY))
    this.setState({mergeCharts})
    this.fetch()
  },

  render() {
    return (
      <div className='consumer-lag-view'>
        <APIStatus text={this.props.apiError} />
        <Toggle className='chart-merge-toggle'
                label='Merge charts'
                labelPosition='right'
                defaultToggled={this.state.mergeCharts}
                onToggle={this.toggleMergeCharts}/>
        {
          this.state.data ?
            this.renderTotalLagStats() :
            <Spinner />
        }
      </div>
    )
  },

  componentDidMount() {
    this._intervalId = setInterval(() => this.fetch(), INTERVAL_TIME)
  },

  componentWillUnmount() {
    this._isMounted = false
    clearInterval(this._intervalId)
  },

  toggleMergeCharts(event, enabled) {
    localStorage.setItem(MERGE_CHARTS_CACHE_KEY, enabled)
  },

  renderTotalLagStats() {
    return this.state
      .data
      .map((consumerData) => {
        return <TotalLagStats key={consumerData.name} {...consumerData} />
      })
  }
})
