
import World from '../World'

describe('World', function() {
  describe('#livingCells', function() {
    it('returns array of passed in living cells', function() {
      const cells = [{x: 1, y: 2}, {x: 2, y: 4}]
      const world = new World(cells)

      expect(world.livingCells()).to.deep.equal(cells)
    })
  })
})
