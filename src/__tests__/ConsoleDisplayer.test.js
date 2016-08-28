
import ConsoleDisplayer from '../ConsoleDisplayer'
import World from '../World'
import Cell from '../Cell'

describe('ConsoleDisplayer', function() {
  describe('#display', function() {
    it('displays all living cells of world', function() {
      const world = new World([new Cell(0, 1), new Cell(2, 2), new Cell(1, 0)])
      const displayer = new ConsoleDisplayer()
      expect(displayer.display(world)).to.equal(' o \no  \n  o\n')
    })
  })
})
