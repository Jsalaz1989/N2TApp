import React from 'react'
import { DragLayer } from 'react-dnd'

import Nand from '../../../Gates/Nand'
import Node from '../../../Gates/Node'



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

    return (
        {
            left: currentOffset.x+left,
            top: currentOffset.y+top,
            position: 'fixed',
            opacity: 0.5,
            transform: `rotate(${rotation}deg)`
        }
    )
}

const gateTypes = {
    'Node': Node,
    'Nand': Nand
}

const DragPreview = ({ isDragging, currentOffset, item }) => {

    // console.log('DragPreview : item = ', item)

    let Gate
    if (isDragging) {
        const id = item.id.replace(/[0-9]/g, '')
        // console.log('DragPreview > DragPreview() : id = ', id)
        
        Gate = gateTypes[id]
        // Gate = document.getElementById(item.id)
    }
    // console.log('Gate = ', Gate)

    return (
        !isDragging || !currentOffset || !item.withDragPreview ?
            null
            :
            <svg style={defaultStyle(item, currentOffset)}>
                <Gate id={item.id} />
            </svg>
    )
}

export default DragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
}))(DragPreview)