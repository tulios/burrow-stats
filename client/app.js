import './app.scss'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

import Layout from './components/layout'
import PartitionsLagView from './views/partitions-lag-view'
import ConsumerLagView from './views/consumer-lag-view'
import StatusView from './views/status-view'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRedirect to='/consumers-lag' />
      <Route path="/consumers-lag" component={ConsumerLagView} name='consumers-lag-view' />
      <Route path='/partitions-lag' component={PartitionsLagView} name='partitions-lag-view' />
      <Route path="/status" component={StatusView} name='status-view' />
    </Route>
  </Router>
), document.getElementById('main'))
