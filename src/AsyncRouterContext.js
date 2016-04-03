import React, { Component } from 'react'
import { RouterContext } from 'react-router'

class AsyncPropsContainer extends Component {
	
	static contextTypes = {
		store: React.PropTypes.object,
	};

	state = { newProps: {}, };

	componentWillReceiveProps = (props) => {
		if (props.Component == this.props.Component) return		
		const { Component, componentProps } = props
		this.loadNeeds(Component, componentProps)
	};

	loadNeeds = (Component, componentProps) => {
		if (!Component.needs) return
		this.setState({newProps: {},})
		Promise.resolve(Component.needs(componentProps, this.context.store))
		.then(newProps => {
			this.setState({newProps: newProps})
		})
	};

	render = () => {
		const { Component, componentProps } = this.props
		return <Component {...componentProps} {...this.state.newProps} />
	}
}

class AsyncRouterContext extends Component {
	render = () => {
		var asyncProps = this.props.asyncProps || []
		var i = this.props.components.length - 1
		return <RouterContext {...this.props} 
			createElement={(Component, props) => {
					var iAsyncProps = asyncProps[i--] || {}
	  			return <AsyncPropsContainer 
	  				Component={Component} 
	  				componentProps={{
	  					...props,
	  					...iAsyncProps,
	  				}} 
					/>
				}
			} 
		/>
	}
};

export default AsyncRouterContext