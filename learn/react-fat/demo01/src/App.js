import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div>
        <div>Hello React</div>
        <ul className="list">
          <li>{true ? '1' : '2'}</li>
          <li>2</li>
        </ul>
      </div>
    )
  }
}

export default App