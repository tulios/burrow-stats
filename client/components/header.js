import React from 'react'
import {Link} from 'react-router'
import logo from '../logo.svg'
import EnvLabel from './env-label'
import SettingsStore from '../utils/settings-store'

export default React.createClass({
  render() {
    return (
      <div className='header'>
        <Link to='/' title='Burrow Stats' className='home-link'>
          <div className='logo-wrapper'>
            <img src={logo} title='Burrow Stats' width={'100px'}/>
          </div>
        </Link>
        <EnvLabel burrowStatsOptions={this.configs()} />
        <Link to='/consumers-lag'
              className='menu-item'
              activeClassName='active'>Consumers Lag</Link>
        <Link to='/partitions-lag'
              className='menu-item'
              activeClassName='active'>Partitions Lag</Link>
        <Link to='/status'
              className='menu-item'
              activeClassName='active'>Status</Link>
      </div>
    )
  },

  configs() {
    const settings = SettingsStore.get() || {}
    return settings.burrowStatsOptions
  }
})
