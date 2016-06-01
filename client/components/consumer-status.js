import React from 'react'

import humanize from '../utils/humanize'

export default React.createClass({
  render() {
    return (
      <div className={`consumer-status ${this.props.status.toLowerCase()}`}
           key={this.props.name}>
        <h2 className='consumer-name'>{this.props.name}</h2>
        <div className='status'>{this.props.status}</div>
        <div className={`complete ${this.props.complete ? 'true' : 'false'}`}
             title={this.props.complete ? 'complete' : 'incomplete'}></div>
      </div>
    )
  }
})
