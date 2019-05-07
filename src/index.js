import React from 'react'
import { Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'

import PropsRoute from './PropsRoute'
import App from './App'


const isGitHubPages = /(github\.io|codesandbox\.io)/.test(window.location.hostname)


function DemoLayout(props) {
	const { packageName, title, pages } = props

	// console.log('DemoLayout', props)

	return (
		<Router basename={isGitHubPages && packageName ? `/${packageName}` : ''}>
			<Switch>
				{pages.map(({ path, exact }, idx) => (
					<PropsRoute
						key={idx}
						path={path}
						exact={exact}
						component={App}
						{...props}
					/>
				))}

				<PropsRoute
					path="/"
					exact
					component={App}
					{...props}
				/>

				{/* catch any invalid URLs */}
				<Redirect to="/" />
			</Switch>
		</Router>
	)
}

export default DemoLayout
