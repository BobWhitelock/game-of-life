
import _ from 'lodash'

import Cell from 'Cell'

const COORD_DIFFS = [-1, 0, 1]

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
    .map(cell => {
      return _.map(COORD_DIFFS, x => {
        return _.map(COORD_DIFFS, y => {
          return new Cell(cell.x + x, cell.y + y)
        })
      })
    })
    .flattenDeep()
    .uniqWith(_.isEqual)
    .value()
  }
}
