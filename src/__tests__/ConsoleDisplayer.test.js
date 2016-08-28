
import ConsoleDisplayer from '../ConsoleDisplayer'
import World from '../World'
import Cell from '../Cell'

describe('ConsoleDisplayer', function() {
  describe('#display', function() {
    before(function() {
      this.world = new World([new Cell(0, 1), new Cell(2, 2), new Cell(1, 0)])
    })

    it('displays all living cells of world', function() {
      const displayer = new ConsoleDisplayer()
      expect(displayer.display(this.world)).to.equal(' o \no  \n  o\n')
    })

    it('displays border of given size around cells', function() {
      const displayer = new ConsoleDisplayer({borderSize: 2})
      expect(displayer.display(this.world)).to.equal('   o   \n  o    \n    o  \n')
    })

    it('uses cells as bounds when given', function() {
      const displayer = new ConsoleDisplayer({
        topLeftCell: new Cell(0, 0),
        bottomRightCell: new Cell(1, 1),
      })
      expect(displayer.display(this.world)).to.equal(' o\no \n')
    })
  })
})
