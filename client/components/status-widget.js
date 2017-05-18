import React from 'react'
import Widget from './widget'

export default React.createClass({
  render() {
    return (
      <Widget className='status-widget-view' name={this.props.name}>
        <span className="status-label">{this.props.status}</span>
      </Widget>
    )
  }

})
