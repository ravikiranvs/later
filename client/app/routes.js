import {IndexRoute, Route} from 'react-router'
import App from './routes/common/app'
import HomePage from './routes/home/home-page'
import React from 'react'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
  </Route>
)