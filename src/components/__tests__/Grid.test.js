
import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

import Cell from 'Cell'
import Grid from '../Grid'
import CanvasGridDrawer from '../Grid/CanvasGridDrawer'

describe('(Component) Grid', function() {
  before(function() {
    this.props = {
      border: 15,
      cellSize: 10,
      columns: 2,
      rows: 3,
      cells: [
        // Cells within the Grid.
        new Cell(0, 1),
        new Cell(1, 1),

        // Cells outside the Grid.
        new Cell(2, 1),
        new Cell(1, 3),
        new Cell(-1, -1),
      ],
    }

    this.wrapper = function() {
      return mount(<Grid {...this.props} />)
    }
  })

  beforeEach(function() {
    // All stub/spy-ing is done in a sandbox so things are explicitly stubbed
    // only when needed for each test.
    this.sandbox = sinon.sandbox.create()
    this.props.gridDrawer = sinon.stub(new CanvasGridDrawer())
  })

  afterEach(function() {
    this.sandbox.restore()
  })

  describe('(lifecycle methods)', function() {
    beforeEach(function() {
      Grid.prototype.props = this.props
      Grid.prototype.refs = {canvas: {}}

      this.drawGridSpy = this.sandbox.stub(Grid.prototype, '_drawGrid')
      this.clearGridSpy = this.sandbox.stub(Grid.prototype, '_clearGrid')
    })

    it('draws the grid on componentDidMount', function() {
      Grid.prototype.componentDidMount()
      expect(this.drawGridSpy).to.have.been.calledOnce
    })

    it('clears then redraws the grid on componentDidUpdate', function() {
      Grid.prototype.componentDidUpdate()
      expect(this.clearGridSpy).to.have.been.calledOnce
      expect(this.drawGridSpy).to.have.been.calledOnce
    })
  })

  describe('(grid drawing)', function() {
    beforeEach(function() {
      this.wrapper()
    })

    it('begins and closes the path', function() {
      const {beginPath, closePath} = this.props.gridDrawer
      expect(beginPath).to.have.been.calledOnce
      expect(closePath).to.have.been.calledOnce
    })

    it('draws lines for the columns', function() {
      const {drawLine} = this.props.gridDrawer
      expect(drawLine).to.have.been.calledWith(0, 0, 0, 30)
      expect(drawLine).to.have.been.calledWith(10, 0, 10, 30)
      expect(drawLine).to.have.been.calledWith(20, 0, 20, 30)
    })

    it('draws lines for the rows', function() {
      const {drawLine} = this.props.gridDrawer
      expect(drawLine).to.have.been.calledWith(0, 0, 20, 0)
      expect(drawLine).to.have.been.calledWith(0, 10, 20, 10)
      expect(drawLine).to.have.been.calledWith(0, 20, 20, 20)
    })

    it('fills in squares for the cells', function() {
      const {fillSquare} = this.props.gridDrawer
      expect(fillSquare).to.have.been.calledWith(0, 1)
      expect(fillSquare).to.have.been.calledWith(1, 1)
    })

    it('does not draw squares for cells outside the grid', function() {
      const {fillSquare} = this.props.gridDrawer
      expect(fillSquare).to.not.have.been.calledWith(2, 1)
      expect(fillSquare).to.not.have.been.calledWith(1, 3)
      expect(fillSquare).to.not.have.been.calledWith(-1, -1)
    })
  })
})
