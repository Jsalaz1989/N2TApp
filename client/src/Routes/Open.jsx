import React from 'react';

import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button'

import ComponentDrawer from './ComponentsDrawer'

import theme from '../theme'; 


const Open = ({ open, setOpen }) => {

    const styles = {
        header: {
			backgroundColor: theme.palette.primary.main,
			minHeight: '100vh',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'top',
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
    
    const NavButton = ({ to, text }) => {
        return <Button style={styles.headerButton} component={NavLink} to={to}>{text}</Button>;
    }
    
    const logoStyle = {
        ...styles.logo, 
        animationPlayState: window.location.pathname === '/' ? 'running' : 'paused'
    } 

    return (
        <div style={styles.header}>
            <ComponentDrawer open={open} setOpen={setOpen}/>
        </div>
    )
}



export default Open