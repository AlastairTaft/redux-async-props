import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
  render() {
    return <div>
    	<h1>Animals</h1>

    	<h5>A simple async props example.</h5>

    	<ul role="nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cats">Cats</Link></li>
        <li><Link to="/dogs">Dogs</Link></li>
      </ul>

      {this.props.children}

    </div>
  }
}