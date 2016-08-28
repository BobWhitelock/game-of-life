
import _ from 'lodash'

import Cell from '../Cell'
import World from '../World'
import {sortedCells} from './utils'

describe('World', function() {
  it('raises an exception if not passed an array', function() {
    const createWorld = () => {
      new World(new Cell(1, 2)) // eslint-disable-line no-new
    }
    expect(createWorld).to.throw(Error)
  })

  it('raise an exception if passed array does not contain only cells', function() {
    const createWorld = () => {
      new World([new Cell(1, 2), undefined]) // eslint-disable-line no-new
    }
    expect(createWorld).to.throw(Error)
  })

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

  describe('#countLivingNeighboursOf', function() {
    it("returns the cell's number of living neighbours", function() {
      const world =
        new World([new Cell(1, 2), new Cell(2, 2), new Cell(1, 1), new Cell(4, 4)])

      const livingNeighbours = world.countLivingNeighboursOf(new Cell(1, 2))
      expect(livingNeighbours).to.eql(2)
    })
  })

  describe('#topLeftCell', function() {
    before(function() {
      this.world = new World([new Cell(2, 3), new Cell(1, 5), new Cell(3, 1)])
    })

    it("uses leftmost x-coordinate of world's living cells as x coordinate", function() {
      expect(this.world.topLeftCell().x).to.equal(1)
    })

    it("uses topmost y-coordinate of world's living cells as y coordinate", function() {
      expect(this.world.topLeftCell().y).to.equal(1)
    })
  })

  describe('#bottomRightCell', function() {
    before(function() {
      this.world = new World([new Cell(2, 3), new Cell(1, 5), new Cell(3, 1)])
    })

    it("uses rightmost x-coordinate of world's living cells as x coordinate", function() {
      expect(this.world.bottomRightCell().x).to.equal(3)
    })

    it("uses bottommost y-coordinate of world's living cells as y coordinate", function() {
      expect(this.world.bottomRightCell().y).to.equal(5)
    })
  })

  describe('#nextState', function() {
    before(function() {
      this.cell = new Cell(1, 2)

      this.withLivingNeighbours = function(number) {
        this.livingNeighbours = _.take(this.cell.neighbours(), number)
      }

      this.whenCellIsAlive = function(isAlive) {
        this.cellIsAlive = isAlive
      }

      this.world = function() {
        const cells = this.cellIsAlive
          ? [this.cell, ...this.livingNeighbours]
          : this.livingNeighbours
        return new World(cells)
      }

      this.nextWorld = function() {
        return this.world().nextState()
      }

      this.expectCellToBeAlive = function() {
        expect(this.nextWorld().isAlive(this.cell)).to.be.true
      }

      this.expectCellToBeDead = function() {
        expect(this.nextWorld().isDead(this.cell)).to.be.true
      }
    })

    context('a living cell', function() {
      before(function() {
        this.whenCellIsAlive(true)
      })

      it('dies when no live neighbours', function() {
        this.withLivingNeighbours(0)
        this.expectCellToBeDead()
      })

      it('dies when 1 live neighbour', function() {
        this.withLivingNeighbours(1)
        this.expectCellToBeDead()
      })

      it('lives when 2 live neighbours', function() {
        this.withLivingNeighbours(2)
        this.expectCellToBeAlive()
      })

      it('lives when 3 live neighbours', function() {
        this.withLivingNeighbours(3)
        this.expectCellToBeAlive()
      })

      it('dies when 4 live neighbours', function() {
        this.withLivingNeighbours(4)
        this.expectCellToBeDead()
      })

      it('dies when more than 4 live neighbours', function() {
        this.withLivingNeighbours(8)
        this.expectCellToBeDead()
      })
    })

    context('a dead cell', function() {
      before(function() {
        this.whenCellIsAlive(false)
      })

      it('stays dead when 2 live neighbours', function() {
        this.withLivingNeighbours(2)
        this.expectCellToBeDead()
      })

      it('comes alive when 3 live neighbours', function() {
        this.withLivingNeighbours(3)
        this.expectCellToBeAlive()
      })

      it('stays dead when 4 live neighbours', function() {
        this.withLivingNeighbours(4)
        this.expectCellToBeDead()
      })
    })
  })
})
