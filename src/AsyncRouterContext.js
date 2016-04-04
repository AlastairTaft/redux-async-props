import React, { Component } from 'react'
import { RouterContext } from 'react-router'
import getRouteParams from 'react-router/lib/getRouteParams'

class AsyncPropsContainer extends Component {
	
	static contextTypes = {
		store: React.PropTypes.object,
	};

	state = { newProps: {}, };

	componentWillMount = () => this.onComponentLoad(this.props);

	componentWillReceiveProps = props => this.onComponentLoad(props);

	onComponentLoad = (props) => {
		const { Component, componentProps, asyncProps } = props
		// If there is asyncProps don't load needs as this is the initial render
		if (asyncProps) return
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
		const { Component, componentProps, asyncProps } = this.props
		return <Component {...componentProps} {...asyncProps} {...this.state.newProps} />
	}
}

class AsyncRouterContext extends Component {

	constructor(props){
		super(props)

		this.asyncProps = props.asyncProps
	};

	componentDidMount = () => {
		// Clear out the asyncProps, as we only want these to be used on the 
		// initial render
		this.asyncProps = null
	};

	render = () => {
		var asyncProps = this.asyncProps
		var i = this.props.components.length - 1
		return <RouterContext {...this.props} 
			createElement={(Component, props) => {
					return <AsyncPropsContainer 
	  				Component={Component} 
	  				componentProps={props} 
	  				asyncProps={asyncProps != null ? (asyncProps[i--] || {}) : null}
					/>
				}
			} 
		/>
	}
};

export default AsyncRouterContext