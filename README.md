
*WARNING: Still very beta, a work in progress. The below are just notes as I dev, will evolve into something more coherent*

# Why?

Often pages will have a bunch of resources they need to fetch before rendering
properly. The easy way to do this is add all your fetching logic to the 
`componentDidMount` method. However this offers a poor experience for the user as 
they'll end up waiting longer to view the final page. The best way is to have
everything that's needed already loaded into the initial state of the redux
store so that the page loads instantly.



# Installing on the server side.
However you've setup your server rendering you'll need to extend it by fetching 
all your asynchronous data before sending your response to the client.

Your redux server side rendering will normally look similar to this, it creates
* a store for every request, renders the html matching the request. And then
subsitutes that html into a file template along with adding the redux state
into the template so it can be hydrated on load. 
```
	const store = createStore(reducer)

  const appHtml = renderToString(
		<Provider>
			<App {...props}/>
		</Provider>
	)
  // dump the HTML into a template, lots of ways to do this, we're just using
  // webpack's raw-loader
  var html = require("raw!./index.template.html")
  html = html.replace('__APP_HTML__', appHtml)
  // dump the redux state into the html
  html = html.replace('$__INITIAL_STATE__', JSON.stringify(store.getState()))
  res.send(html)
```

We need to extend this to populate the redux initial state with everything each
component needs ready to be hyrdated when the client loads the page. Which means
the data won't have to be fetched on the client.


Start by importing `fetchNeeds`.
```javascript
import { fetchNeeds } from 'redux-async-props'
```

We'll then add an asynchronous step to that last part of that code before 
sending our html response.
```
fetchNeeds(props, store)
.then(() => {
	html = html.replace('$__INITIAL_STATE__', JSON.stringify(store.getState()))
  res.send(html)
})

that's it for the server.

# On the client
Disclaimer: This is designed to work with react-router. If you're not using
react-router you can fire off all your methods that are otherwise in the needs
property manually in the `componentDidMount` lifecycle event.

The client is rendered synchonously so we can't wait while the data is fetched.
We need to render something right away, if it's the first page the user visted
everything the component needs will have been gathered and put in the redux
store initially. However if they navigate to a new page or load a new component
without a page refresh then the server will not of been able to fetch the data
before hand. This means all the component `needs` will be fetched at this point.

It's for this reason that your fetch methods should check to see if the data 
already exists and exit if so. So that data isn't fetched twice (on the server
and client).

Start by importing the `AsyncRouterContext`.
```javascript
import AsyncRouterContext from 'redux-async-props'
```

You're client side might already look something like this
```javascript
const initialState = window.__INITIAL_STATE__
const store = createStore(reducer, initialState)

render((
  <Router routes={routes} history={browserHistory}></Router>
), document.getElementById('app'))
```

You simple need to extend it to wrap our render in the AsyncRouterContext,
replacing the default RoutingContext. This will fire off the needs automatically
in the `componentDidMount` lifecylce event.

So your code becomes this
```
...
```

# Highjacking the redux initial state.
Because the needs method is asynchronous and the initial client render is always synchronous. A render would be done before the needs method could
be evaluated. We also don't want to run the method again if we've already
processed it on the server. For this reason we need to persist the props
that were returned from running the method on the server. Hence we already
have a redux initial state object so we may as well add it to that.

We recommend adding a '__asyncProps' prop to the initial state and hydrating
that on the client. But you're free to use and persist it however you like it
just needs to get passed into the additionalProps prop on the AsyncRoutingContext.

# Things that have to work
Your actions have to run on both the client and server. I recommend 'isomorphic-fetch'.

# TODO
 - Doesn't yet work with nested routes, next on the list.
