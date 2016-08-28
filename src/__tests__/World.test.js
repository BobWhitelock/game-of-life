
import Cell from '../Cell'
import World from '../World'
import {sortedCells} from './utils'

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
      expect(sortedCells(frontier)).to.deep.equal([
        new Cell(0, 1), new Cell(0, 2), new Cell(0, 3),
        new Cell(1, 1), new Cell(1, 2), new Cell(1, 3),
        new Cell(2, 1), new Cell(2, 2), new Cell(2, 3),
        new Cell(3, 1), new Cell(3, 2), new Cell(3, 3),
      ])
    })
  })

  describe('#isAlive', function() {
    it('returns if the given cell is alive', function() {
      const world = new World([new Cell(1, 2), new Cell(2, 2)])

      expect(world.isAlive(new Cell(1, 2))).to.be.true
      expect(world.isAlive(new Cell(3, 2))).to.be.false
    })
  })

  describe('#isDead', function() {
    it('returns if the given cell is dead', function() {
      const world = new World([new Cell(1, 2), new Cell(2, 2)])

      expect(world.isDead(new Cell(1, 2))).to.be.false
      expect(world.isDead(new Cell(3, 2))).to.be.true
    })
  })

  describe('#livingNeighbours', function() {
    it("returns the cell's number of living neighbours", function() {
      const world =
        new World([new Cell(1, 2), new Cell(2, 2), new Cell(1, 1), new Cell(4, 4)])

      const livingNeighbours = world.livingNeighbours(new Cell(1, 2))
      expect(livingNeighbours).to.eql(2)
    })
  })

  describe('#nextState', function() {
    context('a living cell with no live neighbours', function() {
      it('dies', function() {
        const world = new World([new Cell(1, 2)])
        expect(world.nextState().isDead(new Cell(1, 2))).to.be.true
      })
    })

    context('a living cell with 1 live neighbour', function() {
      it('dies', function() {
        const world = new World([new Cell(1, 2), new Cell(2, 2)])
        expect(world.nextState().isDead(new Cell(1, 2))).to.be.true
      })
    })

    context('a living cell with 2 live neighbours', function() {
      it('lives', function() {
        const world = new World([new Cell(1, 2), new Cell(2, 2), new Cell(1, 1)])
        expect(world.nextState().isAlive(new Cell(1, 2))).to.be.true
      })
    })

    context('a living cell with 3 live neighbours', function() {
      it('lives', function() {
        const world = new World([new Cell(1, 2), new Cell(2, 2), new Cell(1, 1), new Cell(0, 2)])
        expect(world.nextState().isAlive(new Cell(1, 2))).to.be.true
      })
    })

    context('a living cell with 4 live neighbours', function() {
      it('dies', function() {
        const world = new World([new Cell(1, 2), new Cell(2, 2), new Cell(1, 1), new Cell(0, 2), new Cell(0, 1)])
        expect(world.nextState().isDead(new Cell(1, 2))).to.be.true
      })
    })

    context('a living cell with lots of live neighbours', function() {
      it('dies', function() {
        const cell = new Cell(1, 2)
        const world = new World([cell, ...cell.neighbours()])
        expect(world.nextState().isDead(new Cell(1, 2))).to.be.true
      })
    })

    context('a dead cell with 2 live neighbours', function() {
      it('stays dead', function() {
        const world = new World([new Cell(2, 2), new Cell(1, 1)])
        expect(world.nextState().isDead(new Cell(1, 2))).to.be.true
      })
    })

    context('a dead cell with 3 live neighbours', function() {
      it('comes alive', function() {
        const world = new World([new Cell(2, 2), new Cell(1, 1), new Cell(0, 2)])
        expect(world.nextState().isAlive(new Cell(1, 2))).to.be.true
      })
    })

    context('a dead cell with 4 live neighbours', function() {
      it('stays dead', function() {
        const world = new World([new Cell(2, 2), new Cell(1, 1), new Cell(0, 2), new Cell(0, 1)])
        expect(world.nextState().isDead(new Cell(1, 2))).to.be.true
      })
    })
  })
})
