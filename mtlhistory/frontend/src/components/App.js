import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import MapContainer from './MapContainer'
import Header from './Header'
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Register from "./accounts/Register"
import Login from "./accounts/Login"

import store from '../store'
import { Provider } from 'react-redux'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <div className="container"></div>
            <Switch>
              <Route exact path="/" component={MapContainer} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

            </Switch>
            <div />
          </Fragment>
        </Router>
      </Provider>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

