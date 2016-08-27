
import _ from 'lodash'

export default class World {
  constructor(livingCells) {
    this._livingCells = livingCells
  }

  livingCells() {
    return this._livingCells
  }

  frontier() {
    const cell = this._livingCells[0]
    const frontier = []

    _.forEach([-1, 0, 1], x => {
      _.forEach([-1, 0, 1], y => {
        frontier.push({x: cell.x + x, y: cell.y + y})
      })
    })

    return frontier
  }
}
