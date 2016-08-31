
import React, {Component} from 'react'

import Grid from 'components/Grid'
import World from 'World'
import Cell from 'Cell'

const propTypes = {
}

class App extends Component {
  constructor() {
    super()
    this.state = {world: this._initialWorld()}
  }

  render() {
    return (
      <div>
        <Grid
          border={20}
          cellSize={10}
          cells={this.state.world.livingCells()}
          columns={20}
          rows={20}
        />
      </div>
    )
  }

  _initialWorld() {
    return new World([
      new Cell(1, 0),
      new Cell(2, 1),
      new Cell(0, 2), new Cell(1, 2), new Cell(2, 2),
    ])
  }

  componentDidMount() {
    window.setInterval(this._updateWorldState.bind(this), 250)
  }

  _updateWorldState() {
    const newWorld = this.state.world.nextState()
    this.setState({world: newWorld})
  }
}

App.propTypes = propTypes
export default App
