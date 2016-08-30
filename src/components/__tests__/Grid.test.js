
import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import _ from 'lodash'

import Grid from '../Grid'

describe('(Component) Grid', function() {
  before(function() {
    this.props = {
      border: 15,
      cellSize: 10,
      columns: 2,
      rows: 2,
    }

    this.wrapper = function() {
      return mount(<Grid {...this.props} />)
    }

    this.stubOutCanvasContext = function() {
      const contextMethods = [
        'beginPath',
        'clearRect',
        'closePath',
        'lineTo',
        'moveTo',
        'stroke',
      ]

      const stubContextMethods = _(contextMethods)
      .map(name => [name, () => null])
      .fromPairs()
      .value()

      this.stubCanvasContext = this.sandbox.stub(stubContextMethods)

      this.sandbox.stub(Grid.prototype, '_context', () => this.stubCanvasContext)
    }
  })

  beforeEach(function() {
    // All stub/spy-ing is done in a sandbox so things are explicitly stubbed
    // only when needed for each test.
    this.sandbox = sinon.sandbox.create()
  })

  afterEach(function() {
    this.sandbox.restore()
  })

  describe('(lifecycle methods)', function() {
    beforeEach(function() {
      this.drawGridSpy = this.sandbox.stub(Grid.prototype, '_drawGrid')
    })

    it('draws the grid on componentDidMount', function() {
      Grid.prototype.componentDidMount()
      expect(this.drawGridSpy).to.have.been.calledOnce
    })

    it('clears then redraws the grid on componentDidUpdate', function() {
      const clearGridSpy = this.sandbox.stub(Grid.prototype, '_clearGrid')

      Grid.prototype.componentDidUpdate()
      expect(clearGridSpy).to.have.been.calledOnce
      expect(this.drawGridSpy).to.have.been.calledOnce
    })
  })

  describe('#_drawGrid', function() {
    beforeEach(function() {
      this.drawLineSpy = this.sandbox.spy(Grid.prototype, '_drawLine')
      this.wrapper()
    })

    it('draws lines for the columns', function() {
      expect(this.drawLineSpy).to.have.been.calledWith(0, 0, 0, 20)
      expect(this.drawLineSpy).to.have.been.calledWith(10, 0, 10, 20)
      expect(this.drawLineSpy).to.have.been.calledWith(20, 0, 20, 20)
    })

    it('draws lines for the rows', function() {
      expect(this.drawLineSpy).to.have.been.calledWith(0, 0, 20, 0)
      expect(this.drawLineSpy).to.have.been.calledWith(0, 10, 20, 10)
      expect(this.drawLineSpy).to.have.been.calledWith(0, 20, 20, 20)
    })
  })

  describe('(canvas drawing)', function() {
    // TODO: Maybe we want to split out a separate component for drawing so we
    // can test this and the Grid more independently?

    beforeEach(function() {
      // These tests test the actual canvas drawing methods; we create a stub
      // canvas context with all needed methods and stub the Grid so this is
      // used instead, so we can assert the correct context method calls are
      // made.
      this.stubOutCanvasContext()

      Grid.prototype.props = this.props
    })

    describe('#_drawLine', function() {
      it('draws a line on the canvas between the two points, offset by the border', function() {
        const {moveTo, lineTo, stroke} = this.stubCanvasContext

        Grid.prototype._drawLine(0, 5, 10, 15)

        expect(moveTo).to.have.been.calledOnce
        expect(moveTo).to.have.been.calledWith(15, 20)

        expect(lineTo).to.have.been.calledOnce
        expect(lineTo).to.have.been.calledWith(25, 30)

        expect(stroke).to.have.been.calledOnce
      })
    })

    describe('#_clearGrid', function() {
      it('clears the entire canvas', function() {
        const {clearRect} = this.stubCanvasContext
        this.sandbox.stub(Grid.prototype, '_canvas', () => ({width: 20, height: 10}))

        Grid.prototype._clearGrid()

        expect(clearRect).to.have.been.calledOnce
        expect(clearRect).to.have.been.calledWith(0, 0, 20, 10)
      })
    })
  })
})
