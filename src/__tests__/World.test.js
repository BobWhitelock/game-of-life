
import _ from 'lodash'

import Cell from '../Cell'
import World from '../World'

describe('World', function() {
  describe('#livingCells', function() {
    it('returns array of passed in living cells', function() {
      const cells = [new Cell(1, 2), new Cell(2, 4)]
      const world = new World(cells)

      expect(world.livingCells()).to.deep.equal(cells)
    })
  })

  describe('#frontier', function() {
    it('returns the frontier', function() {
      const world = new World([new Cell(1, 2), new Cell(2, 2)])

      const frontier = world.frontier()
      expect(_.sortBy(frontier, ['x', 'y'])).to.deep.equal([
        new Cell(0, 1), new Cell(0, 2), new Cell(0, 3),
        new Cell(1, 1), new Cell(1, 2), new Cell(1, 3),
        new Cell(2, 1), new Cell(2, 2), new Cell(2, 3),
        new Cell(3, 1), new Cell(3, 2), new Cell(3, 3),
      ])
    })
  })
})
