import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from './Alerts'

import MapContainer from './OLD_MapContainer'
import FrontPage from './FrontPage'
import Header from './Header'
import About from './About'
import Register from "./accounts/Register"
import PrivateRoute from "./common/PrivateRoute";
import Login from "./accounts/Login"
import MemoryForm from "./form/MemoryForm"

import { loadUser } from "../actions/auth";


import store from '../store'
import { Provider } from 'react-redux'

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  //<Alerts />
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container"></div>
              <Switch>
                <PrivateRoute exact path="/add-memory" component={MemoryForm} />
                <Route exact path="/" component={FrontPage} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/about" component={About} />
                <Route exact path="/login" component={Login} />
              </Switch>
              <div />
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>

    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))

