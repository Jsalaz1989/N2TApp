import React from 'react';
import Logo from './svgLogo';

import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

import LoginForm from './Routes/Auth/LoginForm'
import RegisterForm from './Routes/Auth/RegisterForm'
import RegisterConf from './Routes/Auth/RegisterConf'
import ResetForm from './Routes/Auth/ResetForm'
import ResetConf from './Routes/Auth/ResetConf'
import Home from './Routes/Home'


import Button from '@material-ui/core/Button'

import theme from './theme'; 


const App = () => {

	const styles = {
		header: {
			backgroundColor: theme.palette.primary.main,
			minHeight: '100vh',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			color: theme.palette.primary.contrastText,
		},
		headerTitle: {
			fontSize: 'calc(14px + 2vmin)',
			textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
		},
		headerSubtitle: {
			fontSize: 'calc(6px + 2vmin)',
		},
		headerButton: {
			color: theme.palette.primary.light,
		},
		logo: {
			animation: 'App-logo-spin infinite 20s linear',
			height: '30vmin',
			pointerEvents: 'none',
			animationTextContent: '@keyframes App-logo-spin { from{transform: rotate(0deg);} to{transform: rotate(360deg);} }',
			fill: theme.palette.primary.light,
		},
	}	

	var createdStyleTag = document.createElement("style");
	createdStyleTag.textContent = styles.logo.animationTextContent
	document.body.appendChild(createdStyleTag);

	const Header = () => {
		
		const NavButton = ({ to, text }) => {
			return <Button style={styles.headerButton} component={NavLink} to={to}>{text}</Button>;
		}
		
		const logoStyle = {
			...styles.logo, 
			animationPlayState: window.location.pathname === '/' ? 'running' : 'paused'
		} 

		return (
			<header style={styles.header}>
				<Logo style={logoStyle}/>
				<p style={styles.headerTitle}>
					Welcome to the <code>Nand2Tetris</code> App 
				</p>
				<p style={styles.headerSubtitle}>
					Please <NavButton to='/login' text='Log In'/> or <NavButton to='/register' text='Register'/> 
				</p>
			</header>
		)
	}

	return (
		<Router className={App}>
			<Switch>
				<Route exact path='/' component={Header} />
				<Route path="/login" component={LoginForm} />
				<Route path="/register" component={RegisterForm} />
				<Route path='/registerConfirmed' component={RegisterConf} />
				<Route path='/reset' component={ResetForm} />
				<Route path='/resetConfirmed' component={ResetConf} />
				<Route path='/home' component={Home} />
			</Switch>
		</Router>
	)
}

export default App
