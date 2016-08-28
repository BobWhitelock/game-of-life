
import Cell from 'Cell'

const ALIVE = 'o'
const DEAD = ' '

export default class ConsoleDisplayer {
  display(world) {
    // TODO: Generate this in a nicer way.
    let displayString = ''
    for (let x = world.topLeftCell().x; x <= world.bottomRightCell().x; x++) {
      for (let y = world.topLeftCell().y; y <= world.bottomRightCell().y; y++) {
        displayString += world.isAlive(new Cell(x, y)) ? ALIVE : DEAD
      }
      displayString += '\n'
    }
    return displayString
  }
}
