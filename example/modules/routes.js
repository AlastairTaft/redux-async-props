import React from 'react'
import App from './App/App.js'
import Dogs from './Dogs/Dogs.js'
import Cats from './Cats/Cats.js'
import { Route } from 'react-router'

export default (
	<Route path="/" component={App}>
		<Route path="/cats" component={Cats}/>
		<Route path="/dogs" component={Dogs}/>
	</Route>
)