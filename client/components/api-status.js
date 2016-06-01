import React from 'react'

export default React.createClass({
  render() {
    return (
      <div className={`api-status ${this.props.text ? '' : 'disabled'}`}>
        <span className='text'>
          {this.props.text}
        </span>
      </div>
    )
  }
})
