import React, { useState } from 'react'

import ComponentsDrawer from './ComponentsDrawer'

import theme from '../../theme' 

import Paper from '@material-ui/core/Paper'

import Nand from '../../Gates/Nand'

import Node from '../../Gates/Node'

import Gates from './Gates'
import Wires from './Wires'

import './Build.css'

import { getMousePosition } from './BuildFuncs'
import { startDragBody, dragBody, endDragBody, rotateGate } from './BuildBodyFuncs'
import { createFloatingTerminal, moveFloatingTerminal, connectFloatingTerminal, createWireNode, connectWireNode } from './BuildTerminalFuncs'

const Build = ({ history }) => {

	const [shift, setShift] = useState(0)
	const [dragAreaVisible, setDragAreaVisible] = useState(false)
	const [gates, setGates] = useState({})
	const [floatingTerminal, setFloatingTerminal] = useState()
	const [wires, setWires] = useState({})

	const gateTypes = {
		'Node': Node,
		'Nand': Nand
	}

	// eslint-disable-next-line
	String.prototype.hashCode = function() {
		var hash = 0, i, chr;
		if (this.length === 0) return hash;
		for (i = 0; i < this.length; i++) {
			chr   = this.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}

	

	console.log('Build : gates = ', gates)
	console.log('Build : wires = ', wires)


	let percent = 0.44
	let factor = 0.8
	let gateHeight = 900*0.13
	let gateWidth = 1600*0.13

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
		logo: {
			height: gateHeight,
			width: gateWidth,
			pointerEvents: 'auto',
			// cursor: 'grab',
			fill: theme.palette.primary.light,
			position: 'absolute',
			zIndex: 99998,
		},
		paper: {
			top: -30, 
			width: 1600*percent, 
			height: 900*percent, 
			position: 'relative', 
			zIndex: 9999, 
			display: 'flex', 
			alignItems: 'center', 
			justifyContent: 'center'
		},
		svg: { 
			backgroundColor: 'transparent', 
			borderStyle: dragAreaVisible ? 'dashed' : 'hidden', 
			// borderStyle: 'dashed', 
			borderRadius: 3, 
			borderWidth: 1, 
			borderColor: theme.palette.primary.light, 
			width: 1600*percent*factor, 
			height: 900*percent*factor, 
			display: 'flex', 
			justifyContent: 'center',
			overflow: 'overlay' 
		}
	}	
	
	function handleMouseDown(evt) {

		console.log('Build > handleMouseDown() : evt.target.id = ', evt.target.id)

		// if (evt.target.id.includes('Node'))
		// 	console.log('Build > handleMouseDown() : mousedown on node')
		if (evt.target.id.includes('Body') || evt.target.id.includes('Node'))
			startDragBody(evt)
		else if (evt.target.id.includes('_'))
			createWireNode(evt, gates, setGates, gateTypes)
		else if (evt.target.id.includes('In') || evt.target.id.includes('Out'))
			createFloatingTerminal(evt, setFloatingTerminal, wires, setWires)
	}

	function handleMouseMove(evt) {

		// console.log('Build > handleMouseMove() : evt.target.id = ', evt.target.id)
		// console.log('Build > handleMouseMove() : evt.target.id.includes(Node) = ', evt.target.id.includes('Node'))

		if (evt.target.id.includes('Body') || evt.target.id.includes('Node'))
			dragBody(evt)
		else if (floatingTerminal)
			moveFloatingTerminal(evt, floatingTerminal)
	}

	function handleMouseUp(evt) {

		console.log('Build > handleMouseUp() : evt.target.id = ', evt.target.id)
		console.log('Build > handleMouseUp() : evt.target.id.includes(Node) = ', evt.target.id.includes('Node'))
		
		if (evt.target.id.includes('NewNode'))
			connectWireNode(evt, gates, setGates)
		else if (evt.target.id.includes('Body') || evt.target.id.includes('Node'))
			endDragBody()
		else if (floatingTerminal)
			connectFloatingTerminal(evt, floatingTerminal, setFloatingTerminal)
	}

	function handleDragOver(evt) {
		evt.preventDefault()
		setDragAreaVisible(true)
	}

	function handleDragDrop(evt, gates) {
		evt.preventDefault()

		let id = evt.dataTransfer.getData('text')

		console.log('Build > handleDragDrop() : id = ', id)

		const getPos = getMousePosition(evt)

		let position = { 
			left: getPos.x-100/2, 
			top: getPos.y-100/2
		}

		console.log('Build > handleDragDrop : gates = ', gates)

		if (!id.includes('new')) return

		const type = gateTypes[id.replace('new', '')]
		const gateType = Object.keys(gateTypes).find(key => gateTypes[key] === type)	// string version of gate type

		// Generate unique gate id
		// id = `${gateType}${JSON.stringify(position)}`	// create estring with gate function definition and position
		// id = id.hashCode()								// generate hash 						
		// id = [gateType] + id								// prefix with gate type for console clarity
		// id = id.toString()								// convert to string to use as key

		let count = 0
		for (let gate in gates) {
			console.log('Build > handleDragDrop > for : gate = ', gate)

			if (gate.includes(gateType)) count++
		}
		id = gateType + count.toString()

		// Prepare new gate info
		const newGate = {
			[id]: {							// use id as object key for quick lookup
				type: type,					// record gate type (eg. Nand, And, Or, etc.)
				position: position,			// record initial gate position
				// rotation: 'rotate(0deg)',	// gate initially not rotated
			}
		}
		console.log('Build > handleDragDrop() : newGate = ', newGate)

		setGates({ ...gates, ...newGate })	// add to existing gates collection

		setDragAreaVisible(false)
	}



	// console.log('Build : floatingTerminal = ', floatingTerminal)


	// var selectedElement, offset, transform, bbox, minX, maxX, minY, maxY, confined;

	// var boundaryX1 = 0
	var boundaryX2 = styles.svg.width//10
	// var boundaryY1 = 0
	var boundaryY2 = styles.svg.height//10
	var viewBox = "0 0 " + boundaryX2.toString() + " " + boundaryY2.toString()


	
	return (
		<div style={styles.header} onDragOver={evt=>handleDragOver(evt)}>
			<p style={styles.headerTitle}>
				Build 
			</p>
			<p style={styles.headerSubtitle}>
				Drag components into the observer to view their details or drag them onto the canvas to use them 
			</p>
			<ComponentsDrawer setShift={setShift} />
			<Paper 
				id='paper' 
				style={styles.paper}
				onMouseDown={evt=>handleMouseDown(evt)}
				onMouseMove={evt=>handleMouseMove(evt)}
				onMouseUp={evt=>handleMouseUp(evt)}
				onDoubleClick={evt=>rotateGate(evt)} 
			>
				<svg 
					id='svg' 
					xmlns="http://www.w3.org/2000/svg" 
					// width={boundaryX2} height={boundaryY2} 
					viewBox={viewBox} 
					style={styles.svg}
					onDrop={evt=>handleDragDrop(evt, gates)}
					onMouseOut={endDragBody} 
				>
					<Gates 
						gates={gates} 
						style={styles.logo} 
					/>
					<Wires 
						wires={wires} 
					/>
					{/* <polygon className="draggable confine" fill="#ffa500" points="16.9 15.6 17.4 18.2 15 17 12.6 18.2 13.1 15.6 11.2 13.8 13.8 13.4 15 11 16.2 13.4 18.8 13.8"/> */}
				</svg>
			</Paper>
		</div>
	)
}



export default Build