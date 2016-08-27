
import _ from 'lodash'

const COORD_DIFFS = [-1, 0, 1]

export default class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  neighbours() {
    return _.reject(this.surroundings(), {x: this.x, y: this.y})
  }

  surroundings() {
    return _.flatMap(COORD_DIFFS, x => {
      return _.map(COORD_DIFFS, y => {
        return this._neighbourAt(x, y)
      })
    })
  }

  _neighbourAt(relativeX, relativeY) {
    return new Cell(this.x + relativeX, this.y + relativeY)
  }
}
