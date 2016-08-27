
import Cell from '../Cell'

describe('Cell', function() {
  it('provides access to coordinates', function() {
    const cell = new Cell(2, 3)

    expect(cell.x).to.eql(2)
    expect(cell.y).to.eql(3)
  })
})
