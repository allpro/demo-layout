import React from 'react'
import { Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'

import PropsRoute from './PropsRoute'
import App from './App'


// noinspection JSUnresolvedVariable
const isGitHubPages = /(github\.io|codesandbox\.io)/.test(window.location.hostname)


function DemoLayout({ packageName, pages, ...rest }) {
	return (
		<Router basename={isGitHubPages && packageName ? `/${packageName}` : ''}>
			<Switch>
				{pages.map(({ path, exact, props }, idx) => (
					<PropsRoute
						key={idx}
						path={path}
						exact={exact}
						component={App}
						props={props}
						pages={pages}
						{...rest}
					/>
				))}

				<PropsRoute
					path="/"
					exact
					component={App}
					pages={pages}
					{...rest}
				/>

				{/* catch any invalid URLs */}
				<Redirect to="/" />
			</Switch>
		</Router>
	)
}

export default DemoLayout
