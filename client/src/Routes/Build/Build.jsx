import React, { useState } from 'react'

import ComponentsDrawer from './ComponentsDrawer'

import theme from '../../theme' 

import Paper from '@material-ui/core/Paper'

import './Build.css'



import DnDApp from './DnD/DnDApp'


export default () => {

	const [shift, setShift] = useState(0)
	// const [dragAreaVisible, setDragAreaVisible] = useState(false)

	const percent = 0.5
	// const factor = 0.9
	// let gateHeight = 900*0.13
	// let gateWidth = 1600*0.13

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
			position: 'relative',
			top: '-35px',
		},
		headerSubtitle: {
			fontSize: 'calc(6px + 2vmin)',
			position: 'relative',
			top: '-55px',
		},
		// logo: {
		// 	// height: gateHeight,
		// 	// width: gateWidth,
		// 	pointerEvents: 'auto',
		// 	// cursor: 'grab',
		// 	fill: theme.palette.primary.light,
		// 	position: 'absolute',
		// 	zIndex: 99998,
		// },
		paper: {
			top: -30, 
			width: 1600*percent, 
			height: 900*percent, 
			position: 'relative', 
			zIndex: 9999, 
			display: 'flex', 
			alignItems: 'center', 
			justifyContent: 'center',
		},
		// svg: { 
		// 	backgroundColor: 'transparent', 
		// 	borderStyle: dragAreaVisible ? 'dashed' : 'hidden', 
		// 	// borderStyle: 'dashed', 
		// 	borderRadius: 3, 
		// 	borderWidth: 1, 
		// 	borderColor: theme.palette.primary.light, 
		// 	width: 1600*percent*factor, 
		// 	height: 900*percent*factor, 
		// 	display: 'flex', 
		// 	justifyContent: 'center',
		// 	overflow: 'overlay' 
		// }
	}	
	
	function handleDragOver(evt) {
		evt.preventDefault()
		// setDragAreaVisible(true)
	}

	
	return (
		<div style={styles.header} onDragOver={evt=>handleDragOver(evt)}
		>
			<p style={styles.headerTitle}>
				Build 
			</p>
			<p style={styles.headerSubtitle}>
				Drag components into the observer to view their details or drag them onto the canvas to use them 
			</p>
			<ComponentsDrawer setShift={setShift} />
			<Paper id='paper' style={styles.paper}>				
				<DnDApp />
			</Paper>
		</div>
	)
}