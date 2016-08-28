
import _ from 'lodash'

import Cell from 'Cell'

const ALIVE = 'o'
const DEAD = ' '

export default class ConsoleDisplayer {
  constructor(options = {}) {
    this._borderSize = options.borderSize || 0
  }

  display(world) {
    // TODO: Generate this in a nicer way.
    let displayString = ''
    for (let x = world.topLeftCell().x; x <= world.bottomRightCell().x; x++) {
      displayString += this._borderCellsString()
      for (let y = world.topLeftCell().y; y <= world.bottomRightCell().y; y++) {
        displayString += world.isAlive(new Cell(x, y)) ? ALIVE : DEAD
      }
      displayString += `${this._borderCellsString()}\n`
    }
    return displayString
  }

  _borderCellsString() {
    return _.repeat(DEAD, this._borderSize)
  }
}
