
import _ from 'lodash'

export default class World {
  constructor(livingCells) {
    this._livingCells = livingCells
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
}
