
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import {shallow} from 'enzyme'

import HelloWorld from 'components/HelloWorld'

chai.use(chaiEnzyme())

describe('(Component) HelloWorld', function() {
  it('displays Hello World', function() {
    const wrapper = shallow(<HelloWorld />)
    expect(wrapper.find('h1')).to.have.text('Hello World')
  })
})
