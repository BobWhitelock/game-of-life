
import chaiEnzyme from 'chai-enzyme'
import sinonChai from 'sinon-chai'

chai.use(chaiEnzyme())
chai.use(sinonChai)

var context = require.context('./src', true, /.test\.js$/)
context.keys().forEach(context)
