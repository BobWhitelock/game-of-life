
import GridInputHandler from '../GridInputHandler'
import Cell from 'Cell'

describe('GridInputHandler', function() {
  it('returns the clicked on cell of the click event', function() {
    const handler = new GridInputHandler({
      canvas: {offsetLeft: 4, offsetTop: 3},
      border: 10,
      cellSize: 6,
    })
    const clickEvent = {pageX: 4 + 10 + 8, pageY: 3 + 10 + 15}

    expect(handler.handle(clickEvent)).to.deep.eql(new Cell(1, 2))

    // TODO: Actually do something with the cell instead
  })
})
