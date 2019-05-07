import React, { createRef } from 'react'
import { Switch, NavLink, withRouter, matchPath } from 'react-router-dom'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import MenuIcon from '@material-ui/icons/Menu'

import PropsRoute from './PropsRoute'
import Home from './Home'

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark'
	}
})

const drawerWidth = 200

const styles = theme => ({
	root: {
		display: 'flex'
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		}
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		}
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: '#24306b'
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3
	},
	menuButton: {
		marginRight: 20,
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	topLeftToolbar: {
		...theme.mixins.toolbar,
		backgroundColor: 'rgba(0, 0, 0, 0.54)',
		color: 'white'
	}
})


const navLinkActiveStyle = {
	fontWeight: 'bold',
	color: '#900',
	textDecoration: 'none'
}
const navLinkStyle = {
	textDecoration: 'none'
}

const ListNavItem = withRouter(props => {
	const { label, to, external = false, exact = false, location } = props

	const itemProps = {
		style: navLinkStyle,
		selected: matchPath(location.pathname, { path: to, exact })
	}
	if (external) {
		Object.assign(itemProps, {
			href: to,
			component: 'a',
			target: '_blank'
		})
	}
	else {
		Object.assign(itemProps, {
			to,
			exact,
			component: NavLink,
			activeStyle: navLinkActiveStyle
		})
	}

	return (
		<ListItem button {...itemProps}>
			<ListItemText>
				{label}
			</ListItemText>
		</ListItem>
	)
})

const { arrayOf, bool, object, shape, string } = PropTypes

ListNavItem.propTypes = {
	to: string,
	label: string,
	exact: bool,
	external: bool,
	location: object
}

function DrawerContents(props) {
	const { classes, pages, readme, demo } = props;

	let useDefaultHomepage = true
	for (let page of pages) {
		if (page.path === '/') {
			useDefaultHomepage = false
			break
		}
	}

	return (
		<MuiThemeProvider theme={darkTheme}>
			<CssBaseline />

			<div className={classes.topLeftToolbar}>
				<Toolbar>
					<Typography
						variant="subheading"
						color="inherit"
						noWrap
					>
						Navigation
					</Typography>
				</Toolbar>
			</div>

			<Divider />

			<List>
				{useDefaultHomepage && (
					<ListNavItem
						label="Home"
						to="/"
						exact
					/>
				)}

				{pages.map(({ label, path, exact, external }, idx) => (
					<ListNavItem
						key={idx}
						label={label}
						to={path}
						exact={exact || false}
						external={external || false}
					/>
				))}
			</List>

			<Divider />

			<List>
				<ListNavItem
					label="Readme"
					to={readme || ''}
					external
				/>
				<ListNavItem
					label="CodeSandbox Demo"
					to={demo || ''}
					external
				/>
			</List>

			<Divider />

			<List>
				<ListNavItem
					label="More Components"
					to="https://allpro.github.io/"
					external
				/>
			</List>
		</MuiThemeProvider>
	)
}

class NavTabsDemo extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			openDrawer: false,
		}

		// Use wrapper as container for Drawer so works well inside CodeSandbox
		this.containerRef = createRef()

		this.toggleDrawer = this.toggleDrawer.bind(this)
	}

	toggleDrawer() {
		this.setState(state => ({ openDrawer: !state.openDrawer }));
	}

	render() {
		const { props } = this
		const { classes, pages } = props

		let useDefaultHomepage = true
		for (let page of pages) {
			if (page.path === '/') {
				useDefaultHomepage = false
				break
			}
		}

		return (
			<div className={classes.root} ref={this.containerRef}>
				<CssBaseline />

				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.toggleDrawer}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>

						<Typography variant="h6" color="inherit" noWrap>
							{props.title || 'Demo Title'}
						</Typography>
					</Toolbar>
				</AppBar>

				<nav className={classes.drawer}>
					<Hidden smUp implementation="css">
						<Drawer
							variant="temporary"
							container={this.containerRef.current}
							anchor="left"
							open={this.state.openDrawer}
							onClose={this.toggleDrawer}
							classes={{ paper: classes.drawerPaper }}
						>
							<DrawerContents {...props} />
						</Drawer>
					</Hidden>

					<Hidden xsDown implementation="css">
						<Drawer
							variant="permanent"
							open
							classes={{
								paper: classes.drawerPaper,
							}}
						>
							<DrawerContents {...props} />
						</Drawer>
					</Hidden>
				</nav>

				<main id="top" className={classes.content}>
					<div className={classes.toolbar} />

					<Switch>
						{useDefaultHomepage && (
							<PropsRoute
								path="/"
								exact
								component={Home}
							/>
						)}

						{pages.map(({ path, exact, component }, idx) => (
							<PropsRoute
								key={idx}
								path={path}
								exact={exact}
								component={component}
							/>
						))}
					</Switch>
				</main>
			</div>
		)
	}
}

NavTabsDemo.propTypes = {
	classes: object.isRequired,
	pages: arrayOf(shape({
		label: string,
		path: string,
		exact: bool,
		external: bool
	})),
	title: string,
	readme: string,
	demo: string
}

export default withStyles(styles)(NavTabsDemo)
