
import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

const propTypes = {
  border: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
}

class Grid extends Component {
  render() {
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
    this._drawGrid()
  }

  componentDidUpdate() {
    this._clearGrid()
    this._drawGrid()
  }

  _canvas() {
    return this.refs.canvas
  }

  _context() {
    return this._canvas().getContext('2d')
  }

  _drawGrid() {
    this._context().strokeStyle = '#000000'

    this._context().beginPath()
    this._drawColumns()
    this._drawRows()
    this._context().closePath()
  }

  _clearGrid() {
    this._context().clearRect(
      0, 0, this._canvas().width, this._canvas().height
    )
  }

  _drawColumns() {
    const {
      cellSize,
      columns,
      rows,
    } = this.props

    const columnLength = rows * cellSize
    for (let i = 0; i <= columns; i++) {
      const x = i * cellSize
      this._drawLine(x, 0, x, columnLength)
    }
  }

  _drawRows() {
    const {
      cellSize,
      columns,
      rows,
    } = this.props

    const rowLength = columns * cellSize
    for (let i = 0; i <= rows; i++) {
      const y = i * cellSize
      this._drawLine(0, y, rowLength, y)
    }
  }

  _drawLine(...args) {
    // Offset the coordinates to draw between by the border.
    const borderShiftedArgs = _.map(args, this._borderShift.bind(this))
    const [startX, startY, endX, endY] = borderShiftedArgs

    this._context().moveTo(startX, startY)
    this._context().lineTo(endX, endY)
    this._context().stroke()
  }

  _fillSquare(...args) {
    const {cellSize} = this.props

    // The actual coordinate to start drawing from is a multiple of the
    // cellSize, offset by the border.
    const [startX, startY] = _.map(
      args, arg => this._borderShift(arg * cellSize)
    )

    this._context().fillRect(startX, startY, cellSize, cellSize)
    this._context().stroke()
  }

  _borderShift(number) {
    return number + this.props.border
  }
}

Grid.propTypes = propTypes
export default Grid

