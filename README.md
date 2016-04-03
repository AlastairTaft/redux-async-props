
A simple way to load props asynchonously with react-router and redux.

# Why?

Often pages will have a bunch of resources they need to fetch before rendering
properly. The easy way to do this is add all your fetching logic to the 
`componentDidMount` method. However this offers a poor experience for the user as 
they'll end up waiting longer to view the final page. The best way is to have
everything that's needed already loaded into the initial state of the redux
store so that the page loads instantly.

# How to use
Add a `needs` property to any of your root components that require async data.
This should be a function that accepts the router props and then the redux store object. e.g.

```javascript
class Cats extends Component {
  
  static needs = (props, store) => store.dispatch(fetchCats())
		.then(() => {
			var state = store.getState()
			return {
				cats: state.cats,
			}
		})
	
  render = () => <div> ... </div>
 
}
```

Why do we pass the store in and not the state? This allows more freedom, you can construct the promise in any way shape or form that makes sense for optimal data loading. Just make sure at the end of your promise you return an object of new props. These props will be passed into your component on both
the client and server. Any redux actions you dispatch here will also populate your redux store, which means your initial load will be instant, you won't have to go fetching data in the `componentDidMount` method.

You'll also need to configure your server and client render scripts to get up and running. See the next steps below.

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


Start by importing `fetchNeeds` and the `AsyncRoutingContext`.
```javascript
import { fetchNeeds, AsyncRoutingContext } from 'redux-async-props'
```

We'll then add an asynchronous step to that last part of that code before 
sending our html response.
```
fetchNeeds(props, store)
  .then((asyncProps) => {
  	const appHtml = renderToString(
  		<Provider store={store}>
  			<AsyncRouterContext {...props} asyncProps={asyncProps} />
			</Provider>
		)
    
    var html = require("raw!./public/index.html")
    html = html.replace('<!--__APP_HTML__-->', appHtml)

    // This bit is slightly different, we need to persist the props we've 
    // already fetched on the server so we don't have to run the needs function
    // again on the initial load.
    const initialState = {asyncProps, store: store.getState()}
    html = html.replace('{/*__INITIAL_STATE__*/}', JSON.stringify(initialState))
    
    res.send(html)
  })
```

that's it for the server.

# On the client

The client is rendered synchonously so we can't wait while the data is fetched.
We need to render something right away, if it's the first page the user visted
everything the component needs will have been gathered and put in the redux
store initially. However if they navigate to a new page or load a new component
without a page refresh then the server will not of been able to fetch the data
before hand. This means all the component `needs` will be fetched at this point.

It's for this reason that your fetch methods should check to see if the data 
already exists and exit if so. So that requests aren't made more times than is
necessary.

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
replacing the default RoutingContext. This will execute the needs promise 
whenever the user navigates to a new route.

So your code becomes this
```
const initialState = window.__INITIAL_STATE__
// Notice we've moved the store JSON into a seperate property
const store = createStore(reducer, initialState.store)

render((
  <Provider store={store}>
	  <Router 
	  	routes={routes} 
	  	history={browserHistory}
			render={(props) => <AsyncRouterContext 
				{...props} 
				asyncProps={initialState.asyncProps}
			/>}
		/>
	</Provider>
), document.getElementById('app'))
```

# Things that have to work
Your asynchronous actions have to run on both the client and server. 
If your using `fetch` commands then 'isomorphic-fetch' is a good way to ensure
it works on the server too.

