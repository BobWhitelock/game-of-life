import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

import App from '../App'
import Grid from 'components/Grid'
import Cell from 'Cell'
import World from 'World'

describe('(Component) App', function() {
  before(function() {
    this.wrapper = function() {
      return mount(<App />)
    }

    // This is a glider.
    this.initialWorld = new World([
      new Cell(1, 0),
      new Cell(2, 1),
      new Cell(0, 2), new Cell(1, 2), new Cell(2, 2),
    ])
  })

  beforeEach(function() {
    // All stub/spy-ing is done in a sandbox so things are explicitly stubbed
    // only when needed for each test.
    this.sandbox = sinon.sandbox.create()
  })

  afterEach(function() {
    this.sandbox.restore()
  })

  it('has an initial world state', function() {
    expect(this.wrapper().state()).to.deep.equal({
      world: this.initialWorld,
    })
  })

  it('updates world state every 250ms', function() {
    const setStateSpy = this.sandbox.spy(App.prototype, 'setState')
    const clock = this.sandbox.useFakeTimers()

    this.wrapper()
    clock.tick(250)

    expect(setStateSpy).to.have.been.calledOnce
    expect(setStateSpy).to.have.been.calledWithMatch({
      world: this.initialWorld.nextState()})
  })

  it('renders the world in a Grid', function() {
    expect(
      this.wrapper().find(Grid).prop('cells')
    )
    .to.deep.equal(this.initialWorld.livingCells())
  })
})
