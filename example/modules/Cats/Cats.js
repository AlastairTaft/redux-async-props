import React, { Component } from 'react'
import fetchCats from './../../actions/fetchCats.js'

class Cats extends Component {
  
	static defaultProps = { 
		cats: [],
	};

  render() {
  	return <div>
    	<h1>Cats</h1>
    	{this.props.cats.map(cat => {
    		return <div>
    			<h4>{cat.name}</h4>
    			<p>{cat.description}</p>
  			</div>
    	})}
    </div>
  }
}

Cats.needs = (props, store) => 
	store.dispatch(fetchCats())
	.then(() => {
		var state = store.getState()
		return {
			cats: state.cats,
		}
	})


export default Cats