
import _ from 'lodash'

import World from '../World'

describe('World', function() {
  describe('#livingCells', function() {
    it('returns array of passed in living cells', function() {
      const cells = [{x: 1, y: 2}, {x: 2, y: 4}]
      const world = new World(cells)

      expect(world.livingCells()).to.deep.equal(cells)
    })
  })

  describe('#frontier', function() {
    it('returns the frontier', function() {
      const world = new World([{x: 1, y: 2}, {x: 2, y: 2}])

      const frontier = world.frontier()
      expect(_.sortBy(frontier, ['x', 'y'])).to.deep.equal([
          {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3},
          {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3},
          {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3},
          {x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3},
      ])
    })
  })
})
