import React from 'react'
import { DragLayer } from 'react-dnd'

import Nand from '../../../Gates/Nand'
import Node from '../../../Gates/Node'
import { getTerminalPoint } from '../BuildFuncs'

import snapToGrid from '../snapToGrid'


const dragOpacity = 0.3

const defaultStyle = (item, currentOffset) => {

    // console.log('DragPreview > defaultStyle() : item = ', item)

    const gate = document.getElementById(item.id)
    // console.log('DragPreview > defaultStyle() : gate = ', gate)

    const gateParent = gate.parentElement
    // console.log('DragPreview > defaultStyle() : gateParent = ', gateParent)

    const transform = gateParent.transform
    // console.log('DragPreview > defaultStyle() : transform = ', transform)
    
    const rotation = transform.baseVal['1'].angle
    // console.log('DragPreview > defaultStyle() : rotation = ', rotation)
    
    let left, top
    if (!item.id.includes('Node')) {
        switch(rotation) {
            case 0:
                left = 0
                top = -25
                break
            case 90:
                left = -150
                top = 75
                break
            case 180:
                left = -200
                top = -75
                break
            case 270:
                left = -100
                top = -125
                break
            default:
                break
        }
    }
    else if (item.id.includes('Node')) {
        switch(rotation) {
            case 0:
                left = -45
                top = -45
                break
            case 90:
                left = -150
                top = 75
                break
            case 180:
                left = -200
                top = -75
                break
            case 270:
                left = -100
                top = -125
                break
            default:
                break
        }
    }

    // ;[left, top] = snapToGrid(left, top)


    return (
        {
            left: currentOffset.x+left,
            top: currentOffset.y+top,
            position: 'fixed',
            opacity: dragOpacity,
            transform: `rotate(${rotation}deg)`,
            // nonOffsetLeft: left,
            // nonOffsetTop: top,
        }
    )
}

const draggedWireStyle = {
    opacity: dragOpacity,
    // imitate Target svg border to supperpose that svg with this one perfectly
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'transparent',
    borderRadius: 3
}

const gateTypes = {
    'Node': Node,
    'Nand': Nand
}

function getConnectedWires(gateId, wires) {
    // console.log('DragPreview > getConnectedWires() : gateId = ', gateId)
    // console.log('DragPreview > getConnectedWires() : wires = ', wires)

    const wireIds = Object.keys(wires)
    // console.log('DragPreview > getConnectedWires() : wireIds = ', wireIds)

    let connectedWires = {}
    wireIds.forEach(wireId => {
        // console.log('DragPreview > getConnectedWires() : wireId = ', wireId)
        
        if (wireId.includes(gateId)) {
            connectedWires[wireId] = {
                from: {x: null, y: null}, 
                to: {x: null, y: null}
            }
        }

    })
    // console.log('DragPreview > getConnectedWires() : connectedWires = ', connectedWires)

    return connectedWires
}

function moveConnectedWires(gateId, wires, currentOffset, item) {
    // console.log('DragPreview > moveConnectedWires() : gateId = ', gateId)
    // console.log('DragPreview > moveConnectedWires() : wires = ', wires)

    const wireIds = Object.keys(wires)
    let newWires = wires
    wireIds.forEach(wireId => {

        // console.log('DragPreview > moveConnectedWires() : wireId = ', wireId)
        
        const fromId = wireId.split('_')[0]
        const toId = wireId.split('_')[1]
        // console.log('DragPreview > moveConnectedWires() : fromId = ', fromId)
        // console.log('DragPreview > moveConnectedWires() : toId = ', toId)

        const from = document.getElementById(fromId)
        const to = document.getElementById(toId)
        // console.log('DragPreview > moveConnectedWires() : from = ', from)
        // console.log('DragPreview > moveConnectedWires() : to = ', to)

        const fromPoint = getTerminalPoint(from)
        const toPoint = getTerminalPoint(to)
        // console.log('DragPreview > moveConnectedWires() : fromPoint = ', fromPoint)
        // console.log('DragPreview > moveConnectedWires() : toPoint = ', toPoint)

        const bboxGate = document.getElementById(item.id).getBoundingClientRect()
        // console.log('DragPreview > moveConnectedWires() : bboxGate = ', bboxGate)

        // const dStyle = defaultStyle(item, currentOffset)
        
        // console.log('DragPreview > moveConnectedWires() : item.id = ', item.id)

        const diff = {x: currentOffset.x-bboxGate.x, y: currentOffset.y-bboxGate.y}

        if (fromId.includes(item.id)) {
            newWires[wireId] = {
                from: {x: fromPoint.x+diff.x, y: fromPoint.y+diff.y}, 
                to: {x: toPoint.x, y: toPoint.y}
            } 
        }
        else if (toId.includes(item.id)) {
            newWires[wireId] = {
                from: {x: fromPoint.x, y: fromPoint.y},
                to: {x: toPoint.x+diff.x, y: toPoint.y+diff.y} 
            } 
        }
            
    })


    return newWires
}


const DragPreview = ({ isDragging, currentOffset, item, state }) => {

    // console.log('DragPreview : item = ', item)

    let Gate
    let connectedWires = {}
    let draggedWires = {}
    if (isDragging && currentOffset) {
        const id = item.id.replace(/[0-9]/g, '')
        // console.log('DragPreview > DragPreview() : id = ', id)
        
        Gate = gateTypes[id]
        // Gate = document.getElementById(item.id)

        connectedWires = getConnectedWires(item.id, state.wires)
        // console.log('DragPreview > DragPreview() : connectedWires = ', connectedWires)
    
        // console.log('DragPreview > DragPreview() : currentOffset = ', currentOffset)

        draggedWires = moveConnectedWires(item.id, connectedWires, currentOffset, item) 
    }

    // console.log('DragPreview : dragState = ', dragState)
    // console.log('DragPreview : draggedWires = ', draggedWires)

    const bbox = document.getElementById('svg').getBoundingClientRect()
    // console.log('DragPreview > DragPreview() : bbox = ', bbox)

    const svg = document.getElementById('svg')
    // console.log('DragPreview > DragPreview() : svg = ', svg)
    // console.log('DragPreview > DragPreview() : svg.style = ', svg.style.cssText)

    // function printPos() {
    //     const dragSVG = document.getElementById('dragSVG')
    //     // console.log('dragSVG = ', dragSVG)

    //     const svgBbox = dragSVG.getBoundingClientRect()
    //     // console.log('svgBbox = ', svgBbox)

    // }

    // isDragging && currentOffset && console.log('DragPreview > defaultStyle() = ', defaultStyle(item, currentOffset))

    return (
        !isDragging || !currentOffset || !item.withDragPreview ?
            null
            :
            <>
                <svg style={defaultStyle(item, currentOffset)}>
                    <Gate id={item.id} />
                </svg>
                <svg width={bbox.width} height={bbox.height} style={draggedWireStyle}>
                    {Object.keys(draggedWires).map(id => {
                        const { from, to } = draggedWires[id]
                        return (
                            <line 
                                key={id}
                                id={id}
                                stroke='black'
                                strokeWidth='3' 
                                x1={from.x}
                                y1={from.y}
                                x2={to.x}
                                y2={to.y}
                                style={{ pointerEvents: 'none' }}
                            />
                        )
                    })}
                </svg>
            </>
    )
}

export default DragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
}))(DragPreview)

