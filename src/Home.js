import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'

function Home() {
	return (
		<Fragment>
			<Typography variant="h6" gutterBottom>
				Home
			</Typography>
			<Typography variant="subtitle1">
				Use the navigation at left to load demos.
			</Typography>
		</Fragment>
	)
}

export default Home
