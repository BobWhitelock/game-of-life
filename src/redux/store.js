
import {combineReducers, compose, createStore} from 'redux'

import helloWorld from 'redux/modules/helloWorld'

export default function configureStore(initialState) {
  const rootReducer = combineReducers({
    helloWorld,
  })

  const enhancers = [
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ]
  const enhancer = compose(...enhancers)

  const store = createStore(rootReducer, initialState, enhancer)

  return store
}
