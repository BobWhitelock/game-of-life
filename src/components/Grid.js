
import React, { Component, PropTypes } from 'react'

const propTypes = {
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
    this._context().strokeStyle = '#000000'

    this._context().beginPath()
    this._drawColumns()
    this._drawRows()
    this._context().closePath()
  }

  _canvas() {
    return this.refs.canvas
  }

  _context() {
    return this._canvas().getContext('2d')
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

  _drawLine(startX, startY, endX, endY) {
    this._context().moveTo(startX, startY)
    this._context().lineTo(endX, endY)
    this._context().stroke()
  }
}

Grid.propTypes = propTypes
export default Grid

