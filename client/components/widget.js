import React from 'react'

export default React.createClass({
  render() {
    return (
      <div className={`widget ${this.props.className || ''}`} key={this.props.name}>
        <h2 className='header'>{this.props.name}</h2>
        <div className='body'>{this.props.children}</div>
      </div>
    )
  }
})
