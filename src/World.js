
import _ from 'lodash'

import Cell from 'Cell'

export default class World {
  constructor(livingCells) {
    this._validateCells(livingCells)

    this._livingCells = livingCells
  }

  _validateCells(cells) {
    if (this._notArray(cells) || this._containsNonCells(cells)) {
      const prettyPrintedCells = JSON.stringify(cells)
      throw new Error(
        `World must be passed an array of Cells but received: ${prettyPrintedCells}`
      )
    }
  }

  _notArray(cells) {
    return !_.isArray(cells)
  }

  _containsNonCells(cells) {
    return _.some(cells, cell => !(cell instanceof Cell))
  }

  livingCells() {
    return this._livingCells
  }

  // An array of all cells which may potentially be changed in the next
  // iteration (the set of all currently alive cells and their neighbours).
  frontier() {
    return _.chain(this.livingCells())
    .map(cell => cell.surroundings())
    .flatten()
    .uniqWith(_.isEqual)
    .value()
  }

  isAlive(cell) {
    return _.some(this.livingCells(), {x: cell.x, y: cell.y})
  }

  isDead(cell) {
    return !this.isAlive(cell)
  }

  countLivingNeighboursOf(cell) {
    return _.filter(
      cell.neighbours(),
      neighbour => this.isAlive(neighbour)
    ).length
  }

  topLeftCell() {
    const xCoordinate = _.min(this._xCoordinates())
    const yCoordinate = _.min(this._yCoordinates())
    return new Cell(xCoordinate, yCoordinate)
  }

  bottomRightCell() {
    const xCoordinate = _.max(this._xCoordinates())
    const yCoordinate = _.max(this._yCoordinates())
    return new Cell(xCoordinate, yCoordinate)
  }

  _xCoordinates() {
    return _.map(this.livingCells(), 'x')
  }

  _yCoordinates() {
    return _.map(this.livingCells(), 'y')
  }

  nextState() {
    const newCells = _.filter(
      this.frontier(),
      cell => this._passesStayAliveRule(cell) || this._passesComeAliveRule(cell)
    )
    return new World(newCells)
  }

  _passesStayAliveRule(cell) {
    return this.isAlive(cell) &&
      _.includes([2, 3], this.countLivingNeighboursOf(cell))
  }

  _passesComeAliveRule(cell) {
    return this.isDead(cell) &&
      this.countLivingNeighboursOf(cell) === 3
  }
}
