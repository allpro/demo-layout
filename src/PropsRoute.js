/**
 * Helpers for React Router to simplify special handling.
 * Ideas taken from this discussion:
 * https://github.com/ReactTraining/react-router/issues/4105#issuecomment-291834881
 */

import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'


/**
 * Subroutine to create a React component with props
 *
 * @param {Object} component    The React component specified in Route
 * @param {Object} routeProps   Props passed by Route component, like 'history'
 * @param {Object} props        An object of props to pass along
 * @param {Object} rest         The rest of the passed props
 * @returns {Function}			A React component
 */
const renderMergedProps = (component, routeProps, props, ...rest) => {
	const finalProps = Object.assign({}, ...rest, routeProps, props)
	// console.log('renderMergedProps', { finalProps, routeProps, props, rest })
	return React.createElement(component, finalProps)
}

/**
 * Special route component that simplifies syntax for passing props
 * to the component specified in Route arguments.
 *
 * Special router props are destructured so are NOT included in 'rest',
 * and therefore not passed on to the route component - cleaner.
 *
 * @constructor
 * @param {Object} component        A React component
 * @param {string} path             All passed props other than component
 * @param {Object} computedMatch    All passed props other than component
 * @param {Object} [children]		Possible child-routes
 * @param {Object} props            Extra props passed AS props.props
 * @param {Object} rest             The rest of the passed props
 * @returns {Object}                Returns a React component WITH PROPS
 */
// eslint-disable-next-line
const PropsRoute = ({ component, path, computedMatch, props, ...rest }) => {
	// console.log('PropsRoute', { component, path, computedMatch, props, rest })
	// if (!component) debugger

	return (
		<Route
			{...rest}
			render={routeProps => renderMergedProps(component, routeProps, props, rest)}
		/>
	)
}

PropsRoute.propTypes = {
	component: PropTypes.func.isRequired
}

export default PropsRoute
