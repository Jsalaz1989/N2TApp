import React from 'react'
import PropTypes from 'prop-types'

import ItemTypes from './ItemTypes'
import { DragSource } from 'react-dnd'

import Nand from '../../../Gates/Nand'
import Node from '../../../Gates/Node'


const gateTypes = {
    'Node': Node,
    'Nand': Nand
}

const boxSource = {
    beginDrag({ id, left, top }, monitor, component) {
        return { id, left, top, withDragPreview: true }
    },
    canDrag(props, monitor) {
        console.log('Source > boxSource() : props.floatingWire = ', props.floatingWire)
        return !props.floatingWire
    }
}

const Source = ({ hideSourceOnDrag, left, top, rotation, connectDragSource, isDragging, id }) => {
    
    if (isDragging && hideSourceOnDrag) return

    // console.log('Source : id = ', id)


    if (id.includes('Node')) rotation = 0

    switch(rotation) {
        case 90:
            left = left + 95
            top = top + 5
            break
        case 180:
            left = left + 85
            top = top + 100
            break
        case 270:
            left = left - 5
            top = top + 95
            break
        default:
            break
    }
    
    const type = id.replace(/[0-9]/g, '')
    // type = type.replace('Body', '')

    // console.log('Source : type = ', type)

    const Gate = gateTypes[type]
    // console.log('Source : Gate = ', Gate)

    return connectDragSource(
        <g transform={`translate(${left} ${top}) rotate(${rotation})`}>
            <Gate id={id} />
        </g>
        // <svg transform={`translate(${left} ${top}) rotate(${rotation})`}>
        //     <Gate id={id} />
        // </svg>
    )
}

Source.propTypes= {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    hideSourceOnDrag: PropTypes.bool.isRequired,
    children: PropTypes.node
}

const connect = (connect, monitor) => (
    {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
)

export default DragSource(ItemTypes.CSV, boxSource, connect)(Source)