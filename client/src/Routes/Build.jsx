import React, { useState } from 'react'

import ComponentsDrawer from './ComponentsDrawer'

import theme from '../theme' 


const Build = ({ history }) => {

    const [shift, setShift] = useState(0)

    const styles = {
        header: {
			backgroundColor: theme.palette.primary.main,
			// minHeight: '90vh',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'top',
			color: theme.palette.primary.contrastText,
			marginLeft: shift,
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
    
    const logoStyle = {
        ...styles.logo, 
        animationPlayState: window.location.pathname === '/' ? 'running' : 'paused'
	} 
	
	
	function onDropFunc(ev, history) {
		ev.preventDefault()
        console.log('onDrop id = ', ev.dataTransfer.getData('text'))
        history.push('/build')
	}

    return (
        <div style={styles.header}>
            {/* <Logo style={logoStyle}/> */}
            <p style={styles.headerTitle}>
                Build 
            </p>
            <p style={styles.headerSubtitle}>
                Drag components into the observer to view their details or drag them onto the canvas to use them 
            </p>
			<ComponentsDrawer setShift={setShift}/>
        </div>
    )
}



export default Build