import React, { Component } from 'react'
import { RouterContext } from 'react-router'

class AsyncPropsContainer extends Component {
	
	static contextTypes = {
		store: React.PropTypes.object,
	};

	state = {};

	componentDidMount = () => {
		const { Component, componentProps } = this.props
		if (Component.needs)
			Component.needs(componentProps, this.context.store)
			.then(newProps => {
				this.setState(newProps)
			})
	};

	render = () => {
		const { Component, componentProps } = this.props
		return <Component {...componentProps} {...this.state} />
	}
}

class AsyncRouterContext extends Component {
	render = () => {
		var props = this.props
		var { additionalProps } = props
		return <RouterContext {...this.props} 
			createElement={(Component, props) => 
  			<AsyncPropsContainer 
  				Component={Component} 
  				componentProps={{
  					...props,
  					...additionalProps,
  				}} 
				/>
			} 
		/>
	}
};

export default AsyncRouterContext