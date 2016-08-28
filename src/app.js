
import World from 'World'
import Cell from 'Cell'
import ConsoleDisplayer from 'ConsoleDisplayer'

let world = new World([
  new Cell(1, 0),
  new Cell(2, 1),
  new Cell(0, 2), new Cell(1, 2), new Cell(2, 2)
])

const displayer = new ConsoleDisplayer({
  topLeftCell: new Cell(0, 0),
  bottomRightCell: new Cell(10, 10),
})

window.setInterval(function() {
  console.log(displayer.display(world))
  world = world.nextState()
}, 1000)
