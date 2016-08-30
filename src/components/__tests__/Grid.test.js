
import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

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

    it('draws the grid on componentDidUpdate', function() {
      Grid.prototype.componentDidUpdate()
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
      this.stubCanvasContext = this.sandbox.stub({
        beginPath: () => null,
        closePath: () => null,
        lineTo: () => null,
        moveTo: () => null,
        stroke: () => null,
      })

      this.sandbox.stub(Grid.prototype, '_context', () => this.stubCanvasContext)
    })

    describe('#_drawLine', function() {
      it('draws a line on the canvas between the two points, offset by the border', function() {
        Grid.prototype.props = this.props
        Grid.prototype._drawLine(0, 5, 10, 15)

        expect(this.stubCanvasContext.moveTo).to.have.been.calledOnce
        expect(this.stubCanvasContext.moveTo).to.have.been.calledWith(15, 20)

        expect(this.stubCanvasContext.lineTo).to.have.been.calledOnce
        expect(this.stubCanvasContext.lineTo).to.have.been.calledWith(25, 30)

        expect(this.stubCanvasContext.stroke).to.have.been.calledOnce
      })
    })
  })
})
