import React from 'react'
import Header from './header'
import API from '../api'
import SettingsStore from '../utils/settings-store'

import Spinner from './spinner'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default React.createClass({
  getInitialState() {
    return {apiError: false, loaded: false}
  },

  componentWillMount() {
    API.onSuccess((stats, data) => {
      this.setState({apiError: false})
      if (this.hasNewVersion(data)) {
        location.reload(true)
      }
    })

    API.onError((request, err) => {
      this.setState({apiError: 'API failed! Dashboard offline'})
      return true
    })

    if (!SettingsStore.get()) {
      this.loadSettings()
    }
  },

  render() {
    return (
      <div className='layout'>
        <Header />
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          {
            this.state.loaded ?
              React.cloneElement(this.props.children, {apiError: this.state.apiError}) :
              <Spinner />
          }
        </MuiThemeProvider>
      </div>
    )
  },

  loadSettings() {
    API.Config
      .load()
      .then(response => {
        SettingsStore.set(response.data)
        this.setState({loaded: true})
      })
  },

  hasNewVersion(response) {
    const metadata = SettingsStore.metadata()
    return metadata && metadata.version !== response.meta.version
  }
})
