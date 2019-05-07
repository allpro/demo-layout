import React from 'react'
import { render } from 'react-dom'
import { Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'

import PropsRoute from './PropsRoute'
import App from './App'


const isGitHubPages = /(github\.io|codesandbox\.io)/.test(window.location.hostname)


function DemoLayout(props) {
	const { title, pages } = props.pages

	return (
		<Router basename={isGitHubPages ? '/react-nav-tabs' : ''}>
			<Switch>
				{pages.map(({ path, exact }, idx) => (
					<PropsRoute
						key={idx}
						path={path}
						exact={exact}
						component={App}
						pages={pages}
						title={title}
					/>
				))}

				{/* catch any invalid URLs */}
				<Redirect to="/" />
			</Switch>
		</Router>
	)
}

render(<DemoLayout />, document.getElementById('root'))
