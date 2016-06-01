import React from 'react'
import moment from 'moment'
import humanize from '../utils/humanize'

export default React.createClass({
  render() {
    return (
      <div className='consumer-lag-report'>
        {
          this.props.maxLag > 0 ?
            this.renderLaggingReport() :
            this.renderCompleteReport()
        }
      </div>
    )
  },

  renderLaggingReport() {
    const maxLag = this.props.maxLag
    const totalLag = this.props.lag.reduce((total, value) => total + value, 0)
    const partitionsLagging = this.props.lag.reduce((total, value) => value > 0 ? total + 1 : total, 0)

    return (
      <div className='report'>
        <span className='box'>
          <strong>{humanize(totalLag)}</strong> messages left
        </span>
        <span className='box'>
          {partitionsLagging}/{this.props.lag.length} partitions lagging
        </span>
        {
          this.renderHistory(totalLag)
        }
      </div>
    )
  },

  renderCompleteReport() {
    return (
      <div className='report'>
        <span className='box'>
          Complete
        </span>
      </div>
    )
  },

  renderHistory(totalLag) {
    const cacheKey = `burrowStats-history-${this.props.name}`
    const oldCache = JSON.parse(localStorage.getItem(cacheKey))
    const newCache = { time: moment(), totalLag: totalLag }
    localStorage.setItem(cacheKey, JSON.stringify(newCache))

    if (oldCache) {
      const difference = oldCache.totalLag - totalLag
      const humanizedValue = humanize(Math.abs(difference))

      return (
        <span className='box'>
          compared to {moment(oldCache.time).fromNow()} : {
            difference === 0 ?
            'same total' :
            `${humanizedValue} messages ${difference > 0 ? 'less' : 'more'}`
          }
        </span>
      )
    }
  }
})
