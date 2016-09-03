
import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import Cell from 'Cell'
import CanvasGridDrawer from './CanvasGridDrawer'

const propTypes = {
  border: PropTypes.number.isRequired,
  cells: PropTypes.arrayOf(PropTypes.instanceOf(Cell)).isRequired,
  cellSize: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,

  // Grid currently takes gridDrawer as a prop, to allow a stub implementation
  // to be passed instead for testing - may be a better way to do this to avoid
  // needing to do this.
  gridDrawer: PropTypes.instanceOf(CanvasGridDrawer).isRequired,
}

class Grid extends Component {
  render() {
    const {border, cellSize} = this.props

    this.props.gridDrawer
    .setBorder(border)
    .setSquareSize(cellSize)

    return (
      <canvas
        width={500}
        height={500}
        style={{border: '1px solid red'}}
        ref='canvas'
      >
      </canvas>
    )
  }

  componentDidMount() {
    this.props.gridDrawer.setCanvas(this.refs.canvas)
    this._drawGrid()
  }

  componentDidUpdate() {
    this._clearGrid()
    this._drawGrid()
  }

  _drawGrid() {
    const {gridDrawer} = this.props

    gridDrawer.beginPath()
    this._drawColumns()
    this._drawRows()
    this._drawCells()
    gridDrawer.closePath()
  }

  _clearGrid() {
    this.props.gridDrawer.clear()
  }

  _drawColumns() {
    const {
      cellSize,
      columns,
      gridDrawer,
      rows,
    } = this.props

    const columnLength = rows * cellSize
    for (let i = 0; i <= columns; i++) {
      const x = i * cellSize
      gridDrawer.drawLine(x, 0, x, columnLength)
    }
  }

  _drawRows() {
    const {
      cellSize,
      columns,
      gridDrawer,
      rows,
    } = this.props

    const rowLength = columns * cellSize
    for (let i = 0; i <= rows; i++) {
      const y = i * cellSize
      gridDrawer.drawLine(0, y, rowLength, y)
    }
  }

  _drawCells() {
    const {
      cells,
      gridDrawer,
    } = this.props

    _.forEach(cells, cell => {
      if (this._isWithinGrid(cell)) {
        gridDrawer.fillSquare(cell.x, cell.y)
      }
    })
  }

  _isWithinGrid(cell) {
    const {columns, rows} = this.props
    const xWithin = cell.x < columns && cell.x >= 0
    const yWithin = cell.y < rows && cell.y >= 0
    return xWithin && yWithin
  }
}

Grid.propTypes = propTypes
export default Grid
