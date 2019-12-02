import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MapContainer from './MapContainer'

class App extends Component {
  render() {
    return (
      <div>
        <MapContainer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

