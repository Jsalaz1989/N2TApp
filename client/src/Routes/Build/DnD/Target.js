import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'

import ItemTypes from './ItemTypes'
import Source from './Source'
import { DropTarget } from 'react-dnd'

import { getMousePosition } from '../BuildFuncs'

import { addWire, connectWire, updateWires } from '../WireFuncs'
import { addGate, rotateGate, addNode } from '../GateFuncs'

import Wire from './Wire'


let percent = 0.6
let factor = 0.7
const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 1600*percent*factor,
    height: 900*percent*factor,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: 'purple',
    borderRadius: 3,
    zIndex: 1001
}

const boxTarget = {
    drop(props, monitor, component) {   // component is null when using functional components so I can't do component.moveBox, needs Target to be a class so I had to workaround
        const item = monitor.getItem()
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)

        moveBox(item.id, left, top)
    }
}

let moveBox = () => null  // global variable to rewrite in Target but used in boxTarget

const Target = ({ hideSourceOnDrag, connectDropTarget, state, setState }) => {

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
            rotateGate(id, state, setState)
        else if (id.includes('_'))
            addNode(evt, state, setState)
    }

    const [selectedElement, setSelectedElement] = useState(null)

    function handleClick(evt) {
        let id = evt.target.id
        console.log('Target > handleClick() : id = ', id)

        if (id.includes('Body') || id.includes('Text')) {
            id = id.replace('Body', '').replace('Text', '')
            console.log('Target > selectElement() : id = ', id)

            setSelectedElement(id)
        }
        else if (id.includes('_')) {
            console.log('Target > selectElement() : id = ', id)

            setSelectedElement(id)
        }
            
        else
            setSelectedElement(null)
    }

    console.log('Target : selectedElement = ', selectedElement)

    function handleKeyDown(evt) {

        if (evt.keyCode === 48 || evt.keyCode === 49) return

        // evt.preventDefault()
        // evt.stopPropagation()

        const DEL_KEY = 46
        const ESC_KEY = 27


        // console.log('Target : handleKeyDown() : evt = ', evt)

        const keyId = evt.keyCode
        console.log('Target : handleKeyDown() : keyId = ', keyId)

        console.log('Target : handleKeyDown() : selectedElement = ', selectedElement)

        if (selectedElement && keyId === DEL_KEY) {
            let newState = state

            console.log('Target : handleKeyDown() > if : selectedElement = ', selectedElement)

            if (selectedElement.includes('_'))
                delete newState.wires[selectedElement]
            else {
                delete newState.gates[selectedElement]

                const wireIds = Object.keys(state.wires)  

                wireIds.forEach(wireId => {
                    if (wireId.includes(selectedElement))
                        delete newState.wires[wireId]
                })
            } 

            console.log('GateFuncs > handleKeyDown() > if : newState = ', newState)
            setState({ ...newState })
            setSelectedElement(null)
        }
        if (selectedElement && keyId === ESC_KEY) {
            setSelectedElement(null)
        }   
    }

    document.onkeydown = handleKeyDown
    // function enableKeys() {

    //     const svg = document.getElementById('svg')
    //     console.log('Target > enableKeys() : svg = ', svg)
        
    //     svg.onkeydown = handleKeyDown
    // }

    return connectDropTarget(
        <svg 
            id='svg' 
            xmlns="http://www.w3.org/2000/svg"
            style={styles} 
            onDrop={evt=>addGate(evt, state, setState)} 
            onMouseMove={recordMousePosition}
            onMouseDown={evt=>addWire(evt, state, setState, setFloatingWire)}
            onMouseUp={evt=>connectWire(evt, state, setState, floatingWire, setFloatingWire)}                         
            onDoubleClick={handleDoubleClick} 
            onClick={handleClick}
        >
            {Object.keys(state.wires).map(id => {
                const { from, to } = state.wires[id]
                return (
                    <Wire
                        key={id}
                        id={id}
                        from={from}
                        to={to}
                        floatingWire={floatingWire}
                        creatingNode={creatingNode}
                        setCreatingNode={setCreatingNode}
                        selected={selectedElement === id ? true : false}
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
                        selected={selectedElement === id ? true : false}
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