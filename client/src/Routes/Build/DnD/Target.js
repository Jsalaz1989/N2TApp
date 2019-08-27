import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'

import ItemTypes from './ItemTypes'
import Source from './Source'
import { DropTarget } from 'react-dnd'

import { getMousePosition } from '../BuildFuncs'

import { addWire, connectWire, updateWires } from '../WireFuncs'
import { addGate, rotateGate, addNode } from '../GateFuncs'


let percent = 0.5
let factor = 0.9
const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 1600*percent*factor,
    height: 900*percent*factor,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'purple',
    borderRadius: 3
}

const boxTarget = {
    drop(props, monitor, component) {   // component is null so I can't do component.moveBox, needs Target to be a class so I had to workaround
        const item = monitor.getItem()
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)

        moveBox(item.id, left, top)
    }
}

let moveBox = () => null  // global variable to rewrite in Target but used in boxTarget

const Target = ({ hideSourceOnDrag, connectDropTarget, state, setState }) => {

	// const [state, setState] = useState({
    //     gates: {}, 
	// 	wires: {}
    // })

    const [floatingWire, setFloatingWire] = useState(null)
    const [mousePosition, setMousePosition] = useState(null)
    
    const [creatingNode, setCreatingNode] = useState(null)

    useEffect(()=>updateWires(state, setState, mousePosition), [state.gates, mousePosition])
        
    moveBox = (id, left, top) => {
        setState(update(state, {
            gates: {
                [id]: {
                    $merge: {
                        left: left,
                        top: top
                    }
                }
            }
        }))
    }

    console.log('Target : state = ', state)
    // console.log('Target : creatingNode = ', creatingNode)

    function recordMousePosition(evt) {

        if (!floatingWire) return

        const mousePos = getMousePosition(evt)
        // console.log('Target > recordMousePosition() : mousePos = ', mousePos)
        setMousePosition(mousePos)
    }
    
    function handleDoubleClick(evt) {
        
        const id = evt.target.id
        console.log('Target > handleDoubleClick() : id = ', id)

        // const element = document.getElementById(id)
        // console.log('Target > handleDoubleClick() : element = ', element)

        if (id.includes('Body'))
            rotateGate(evt, state, setState)
        else if (id.includes('_'))
            addNode(evt, state, setState)
    }

    return connectDropTarget(
        <svg 
            id='svg' 
            style={styles} 
            onDrop={evt=>addGate(evt, state, setState)} 
            onMouseMove={recordMousePosition}
            onMouseDown={evt=>addWire(evt, state, setState, setFloatingWire)}
            onMouseUp={evt=>connectWire(evt, state, setState, floatingWire, setFloatingWire)}                         
            onDoubleClick={handleDoubleClick} 
        >
            {Object.keys(state.wires).map(id => {
                const { from, to } = state.wires[id]
                return (
                    <line 
                        key={id}
                        id={id}
                        stroke={
                            (floatingWire && floatingWire.includes(id)) ||
                            (creatingNode === id) 
                                ? 'purple' 
                                : 'black'
                        }  
                        strokeWidth='3' 
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        style={{ pointerEvents: floatingWire ? 'none' : 'all' }}
                        onMouseOver={()=>setCreatingNode(id)}
                        onMouseOut={()=>setCreatingNode(null)}
                    />
                )
            })}
            {Object.keys(state.gates).map(id => {
                const { left, top, rotation } = state.gates[id]
                return (
                    <Source 
                        key={id}
                        id={id}
                        left={left}
                        top={top}
                        rotation={rotation}
                        floatingWire={floatingWire}
                        hideSourceOnDrag={hideSourceOnDrag}
                    />
                )
            })}
        </svg>
    )
}

Target.propTypes = {
    hideSourceOnDrag: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(ItemTypes.CSV, boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
}))(Target)