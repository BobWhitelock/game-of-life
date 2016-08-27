
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import HelloWorld from 'components/HelloWorld'
import configureStore from 'redux/store'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <HelloWorld />
  </Provider>,
  document.getElementById('root')
)
