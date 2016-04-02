import React, { Component } from 'react'
import fetchDogs from './../../actions/fetchDogs.js'

class Dogs extends Component {
  
	static defaultProps = { 
		dogs: [],
	};

  render() {
  	//console.log(require('util').inspect(this.props))
    return <div>
    	<h1>Dogs</h1>
    	{this.props.dogs.map(dog => {
    		return <div>
    			<h4>{dog.name}</h4>
    			<p>{dog.description}</p>
  			</div>
    	})}
    </div>
  }
}

Dogs.needs = (props, store) => {
	return store.dispatch(fetchDogs())
	.then(() => {
		var state = store.getState()
		return {
			dogs: state.dogs,
		}
	})
}

export default Dogs