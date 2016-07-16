import React from 'react'

export default React.createClass({
  render() {
    const configs = this.props.burrowStatsOptions || {}
    if (!configs.envLabel) return <span />

    const style = {}
    if (configs.envLabelColor) style.color = configs.envLabelColor
    if (configs.envLabelBgColor) style.backgroundColor = configs.envLabelBgColor

    return (
      <span className='env-label' style={style}>
        {configs.envLabel}
      </span>
    )
  }
})
