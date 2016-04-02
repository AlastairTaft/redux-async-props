import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import routes from './modules/routes.js'
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import AsyncRouterContext from './../lib/AsyncRouterContext.js'
import callAPIMiddleware from './lib/callAPIMiddleware.js'

const initialState = window.__INITIAL_STATE__
const store = createStore(
	reducer, 
	initialState.store,
	applyMiddleware(callAPIMiddleware)
)

render((
  <Provider store={store}>
	  <Router 
	  	routes={routes} 
	  	history={browserHistory}
			render={(props) => <AsyncRouterContext 
				{...props} 
				additionalProps={initialState.asyncProps}
			/>}
		/>
	</Provider>
), document.getElementById('app'))