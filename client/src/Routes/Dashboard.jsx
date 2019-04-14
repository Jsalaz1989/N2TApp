import React from 'react';




const Dashboard = ({ setOpen, history }) => {

    const styles = {
        header: {
			backgroundColor: theme.palette.primary.main,
			// minHeight: '90vh',
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
	
	
	function onDropFunc(ev, history) {
		ev.preventDefault()
		console.log('onDrop id = ', ev.dataTransfer.getData('text'))
        history.push('/build')
	}

    return (
        <div style={styles.header}>
            {/* <Logo style={logoStyle}/> */}
            <p style={styles.headerTitle}>
                Dashboard 
            </p>
            <p style={styles.headerSubtitle}>
                From here you can <NavButton to='/build' text='Build'/> or <Button style={styles.headerButton} onClick={(evt) => setOpen(true)}>Open</Button> components
            </p>
			<div style={{ color: 'white', textAlign: 'center', position: 'absolute', top: '400px', left: '450px', height: '100px', width: '100px', border: "thick solid #FFFFFF"  }} onDragOver={(ev) => ev.preventDefault()} onDrop={(e) => onDropFunc(e, history)}>
                Drag here to start building
            </div>
        </div>
    )
}



export default Dashboard