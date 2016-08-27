import reducer, { defaultState } from 'redux/modules/helloWorld'

describe('(Redux) helloWorld', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(defaultState)
    })
  })
})
