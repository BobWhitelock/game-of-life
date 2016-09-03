
import _ from 'lodash'

export default class CanvasGridDrawer {
  setCanvas(canvas) {
    this._canvas = canvas
    this._context = canvas.getContext('2d')
    this._context.strokeStyle = '#000000'
    return this
  }

  setBorder(border) {
    this._border = border
    return this
  }

  setSquareSize(squareSize) {
    this._squareSize = squareSize
    return this
  }

  beginPath() {
    this._context.beginPath()
  }

  closePath() {
    this._context.closePath()
  }

  drawLine(...args) {
    // Offset the coordinates to draw between.
    const borderShiftedArgs = _.map(args, this._borderShift.bind(this))
    const [startX, startY, endX, endY] = borderShiftedArgs

    this._context.moveTo(startX, startY)
    this._context.lineTo(endX, endY)
    this._context.stroke()
  }

  _borderShift(number) {
    return number + this._border
  }

  fillSquare(...args) {
    // The actual coordinate to start drawing from is a multiple of the
    // size, offset by the border.
    const [startX, startY] = _.map(
      args, arg => this._borderShift(arg * this._squareSize)
    )

    this._context.fillRect(startX, startY, this._squareSize, this._squareSize)
    this._context.stroke()
  }

  clear() {
    this._context.clearRect(
      0, 0, this._canvas.width, this._canvas.height
    )
  }
}
