    import React from 'react'
    
    // Render existing gates
	const Wires = ({ wires, onDoubleClick, onMouseDown, onMouseUp, style }) => {

        // console.log('Build > Gates : gates = ', gates)
        
		// Generate gates array
		let wiresArray = []
		for (let wireId in wires)		// loop through keys (gateIds) of global gates object
		{
			// console.log('Build > Gates > for loop : gateId = ', gateId)

			let currentWire = wires[wireId]		// retrieve gate info for current gateId
			// console.log('Build > Gates > for loop : currentGate = ', currentGate)

			// let fromTerminal = document.getElementById(currentWire.from)

			// // let toTerminal = document.getElementById(currentWire.to)
			// let toTerminal = currentWire.to


			// Append currentGate to array of gate components
			wiresArray.push(
				<line 				
					key={wireId}				// required by React 
					id={wireId} 				// to identify inner components (eg. div, line, circle, etc.)
					// style={style} 
					x1={currentWire.from.x}
					y1={currentWire.from.y}
					x2={currentWire.to.x}
					y2={currentWire.to.y}
					strokeWidth='3'
					stroke='black'

					// pos={currentWire.position} 
					// rot={currentGate.rotation} 
					// onDoubleClick={evt=>onDoubleClick(evt, gateId)} 	// containes hook to rotate div
                    // onMouseDown={onMouseDown}					// passed to circle svg components
                    // onMouseUp={onMouseUp}					// passed to circle svg components  
				/>
			)
		}

		// console.log('Build > Gates : gatesArray = ', gatesArray)
		if (wiresArray.length === 0) return null

		return wiresArray
    }
    
    export default Wires