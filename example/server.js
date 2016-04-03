import express from 'express'
import path from 'path'
// import some new stuff
import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './modules/routes.js'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import fetchNeeds from './../lib/fetchNeeds.js'
import AsyncRouterContext from './../lib/AsyncRouterContext.js'
import callAPIMiddleware from './lib/callAPIMiddleware.js'

// Api stuff
import apiRouter from './api/index.js'

var app = express()

app.use('/api', apiRouter)

app.get('*', function (req, res, next) {
	match({ routes: routes, location: req.url }, (err, redirect, props) => {
		
		if (err) {
			res.status(500).send(err.message)
    } else if (redirect) {
    	return res.redirect(302, redirect.pathname + redirect.search)
    } else if (!props) {
    	return next()
    }

		const store = createStore(reducer, applyMiddleware(callAPIMiddleware))

    // `RouterContext` is the what `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.


    fetchNeeds(props, store)
    /**
     * asyncProps will be an array here, one props object for each route
     * that matches the current location, i.e. nested routes.
     */
    .then((asyncProps) => {
    	// Have to do the render after needs are fetched else we won't have the
    	// returned props
    	// We can't use the standard RouterContext because it filters out which
    	// props are passed down, only only passes a specific RouterContext
    	// subset. We want to pass on anything we add additionaly, i.e. the 
    	// async props.
	    const appHtml = renderToString(
	  		<Provider store={store}>
	  			<AsyncRouterContext {...props} asyncProps={asyncProps} />
				</Provider>
			)
	    
	    // dump the HTML into a template, lots of ways to do this, but none are
	    // really influenced by React Router 
	    var html = require("raw!./public/index.html")
	    html = html.replace('<!--__APP_HTML__-->', appHtml)

	    const initialState = {asyncProps, store: store.getState()}
	    html = html.replace('{/*__INITIAL_STATE__*/}', JSON.stringify(initialState))
	    
	    res.send(html)
    })
  })
})

app.use(express.static(path.join(__dirname, 'public')))

var PORT = process.env.PORT || 8081
app.listen(PORT, function() {
  console.log('Express running at localhost:' + PORT)
})