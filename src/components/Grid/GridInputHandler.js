
import Cell from 'Cell'

export default class GridInputHandler {
  constructor(args) {
    this._canvas = args.canvas
    this._border = args.border
    this._cellSize = args.cellSize
  }

  handle(clickEvent) {
    const {pageX, pageY} = clickEvent

    const gridX = pageX - (this._canvas.offsetLeft + this._border)
    const gridY = pageY - (this._canvas.offsetTop + this._border)

    const cellX = Math.floor(gridX / this._cellSize)
    const cellY = Math.floor(gridY / this._cellSize)

    return new Cell(cellX, cellY)
  }
}
