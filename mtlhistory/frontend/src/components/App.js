import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MapContainer from './MapContainer'
import Header from './Header'
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MapContainer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

