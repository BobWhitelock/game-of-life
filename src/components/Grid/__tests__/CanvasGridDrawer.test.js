
import _ from 'lodash'
import sinon from 'sinon'

import CanvasGridDrawer from '../CanvasGridDrawer'

describe('CanvasGridDrawer', function() {
  before(function() {
    this.stubOutCanvas = function() {
      const contextMethods = [
        'beginPath',
        'clearRect',
        'closePath',
        'fillRect',
        'lineTo',
        'moveTo',
        'stroke',
      ]

      const stubContextMethods = _(contextMethods)
      .map(name => [name, () => null])
      .fromPairs()
      .value()

      const stubCanvasContext = this.sandbox.stub(stubContextMethods)

      const stubCanvas = {
        getContext: () => stubCanvasContext,
        width: 20,
        height: 10,
      }

      return stubCanvas
    }
  })

  beforeEach(function() {
    // All stub/spy-ing is done in a sandbox so things are explicitly stubbed
    // only when needed for each test.
    this.sandbox = sinon.sandbox.create()

    // We stub out the canvas and context so that we can assert the correct
    // context method calls are made.
    this.stubCanvas = this.stubOutCanvas()
    this.stubContext = this.stubCanvas.getContext()

    this.canvasGridDrawer = new CanvasGridDrawer()
    .setCanvas(this.stubCanvas)
    .setBorder(15)
    .setSquareSize(10)
  })

  describe('#beginPath', function() {
    it("calls context's beginPath", function() {
      const {beginPath} = this.stubContext

      this.canvasGridDrawer.beginPath()

      expect(beginPath).to.have.been.calledOnce
    })
  })

  describe('#closePath', function() {
    it("calls context's closePath", function() {
      const {closePath} = this.stubContext

      this.canvasGridDrawer.closePath()

      expect(closePath).to.have.been.calledOnce
    })
  })

  describe('#drawLine', function() {
    it('draws an (offset) line on the canvas between the two points', function() {
      const {moveTo, lineTo, stroke} = this.stubContext

      this.canvasGridDrawer.drawLine(0, 5, 10, 15)

      expect(moveTo).to.have.been.calledOnce
      expect(moveTo).to.have.been.calledWith(15, 20)

      expect(lineTo).to.have.been.calledOnce
      expect(lineTo).to.have.been.calledWith(25, 30)

      expect(stroke).to.have.been.calledOnce
    })
  })

  describe('#clear', function() {
    it('clears the entire canvas', function() {
      const {clearRect} = this.stubContext

      this.canvasGridDrawer.clear()

      expect(clearRect).to.have.been.calledOnce
      expect(clearRect).to.have.been.calledWith(0, 0, 20, 10)
    })
  })

  describe('#fillSquare', function() {
    it('fills in the square at the given coordinates', function() {
      const {fillRect, stroke} = this.stubContext

      this.canvasGridDrawer.fillSquare(1, 2)

      expect(fillRect).to.have.been.calledOnce
      expect(fillRect).to.have.been.calledWith(25, 35, 10, 10)

      expect(stroke).to.have.been.calledOnce
    })
  })
})
