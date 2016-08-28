
import _ from 'lodash'

import Cell from 'Cell'

const ALIVE = 'o'
const DEAD = ' '

export default class ConsoleDisplayer {
  constructor(options = {}) {
    this._borderSize = options.borderSize || 0
    this._givenTopLeftCell = options.topLeftCell
    this._givenBottomRightCell = options.bottomRightCell
  }

  display(world) {
    const topLeft = this._topLeftCell(world)
    const bottomRight = this._bottomRightCell(world)

    // TODO: Generate this in a nicer way.
    let displayString = ''
    for (let x = topLeft.x; x <= bottomRight.x; x++) {
      displayString += this._borderCellsString()
      for (let y = topLeft.y; y <= bottomRight.y; y++) {
        displayString += world.isAlive(new Cell(x, y)) ? ALIVE : DEAD
      }
      displayString += `${this._borderCellsString()}\n`
    }
    return displayString
  }

  _topLeftCell(world) {
    return this._givenTopLeftCell || world.topLeftCell()
  }

  _bottomRightCell(world) {
    return this._givenBottomRightCell || world.bottomRightCell()
  }

  _borderCellsString() {
    return _.repeat(DEAD, this._borderSize)
  }
}
