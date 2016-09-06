
import GridInputHandler from '../GridInputHandler'
import Cell from 'Cell'

describe('GridInputHandler', function() {
  describe('#handle', function() {
    it('adds the clicked on cell to the array of cells', function() {
      const cells = [new Cell(0, 1)]
      const handler = new GridInputHandler({
        canvas: {offsetLeft: 4, offsetTop: 3},
        cells,
        border: 10,
        cellSize: 6,
      })

      const clickEvent = {pageX: 4 + 10 + 8, pageY: 3 + 10 + 15}
      handler.handle(clickEvent)

      expect(cells).to.deep.equal([new Cell(0, 1), new Cell(1, 2)])
    })
  })
})
