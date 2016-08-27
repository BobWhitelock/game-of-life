
import Cell from '../Cell'
import {sortedCells} from './utils'

describe('Cell', function() {
  it('provides access to coordinates', function() {
    const cell = new Cell(2, 3)

    expect(cell.x).to.eql(2)
    expect(cell.y).to.eql(3)
  })

  describe('#surroundings', function() {
    it('returns array of all adjacent cells and this cell', function() {
      const cell = new Cell(1, 2)

      const surroundings = cell.surroundings()
      expect(sortedCells(surroundings)).to.deep.equal([
        new Cell(0, 1), new Cell(0, 2), new Cell(0, 3),
        new Cell(1, 1), new Cell(1, 2), new Cell(1, 3),
        new Cell(2, 1), new Cell(2, 2), new Cell(2, 3),
      ])
    })
  })
})
