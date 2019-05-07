import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

const isDocSite = /allpro\.github\.io/.test(window.location.hostname)

function RepoNameDemo() {
	return (
		<Router basename={isDocSite ? '/repo-name' : ''}>
			<App />
		</Router>
	)
}

render(<RepoNameDemo />, document.getElementById('root'))
