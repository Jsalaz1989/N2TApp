    import React from 'react'
    
    // Render existing gates
	const Gates = ({ gates, onDoubleClick, onMouseDown, onMouseUp, style }) => {

        // console.log('Build > Gates : gates = ', gates)
        
		// Generate gates array
		let gatesArray = []
		for (let gateId in gates)		// loop through keys (gateIds) of global gates object
		{
			// console.log('Build > Gates > for loop : gateId = ', gateId)

			let currentGate = gates[gateId]		// retrieve gate info for current gateId
			// console.log('Build > Gates > for loop : currentGate = ', currentGate)

			// Append currentGate to array of gate components
			gatesArray.push(
				<currentGate.type 				// gate type (eg. Nand, And, Or, etc.)
					key={gateId}				// required by React 
					id={gateId} 				// to identify inner components (eg. div, line, circle, etc.)
					style={style} 
					// divWrap={false} 				// to allow for div wrapper (needed to drag) or direct svg access (for drawer dragging image)
					pos={currentGate.position} 
					// rot={currentGate.rotation} 
					// onDoubleClick={evt=>onDoubleClick(evt, gateId)} 	// containes hook to rotate div
                    // onMouseDown={onMouseDown}					// passed to circle svg components
                    // onMouseUp={onMouseUp}					// passed to circle svg components  
				/>
			)
		}

		// console.log('Build > Gates : gatesArray = ', gatesArray)
		if (gatesArray.length === 0) return null

		return gatesArray
    }
    
    export default Gates