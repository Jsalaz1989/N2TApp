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

const Source = ({ hideSourceOnDrag, left, top, rotation, connectDragSource, isDragging, id, selected=false }) => {
    
    if (isDragging && hideSourceOnDrag) return

    // console.log('Source : id = ', id)


    if (id.includes('Node')) rotation = 0

    switch(rotation) {
        // case 0:
        //     left = left
        //     top = top - 50
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

    const translation = `${left} ${top}`
    // console.log('Source : translation = ', translation)

    // const transformOriginX = left + 50
    // const transformOriginY = top + 25
    // // const transformOrigin = `${transformOriginX}px ${transformOriginY}px`
    // const transformOrigin = null

    // console.log('Source : transformOrigin = ', transformOrigin)

    const type = id.replace(/[0-9]/g, '')
    // type = type.replace('Body', '')

    // console.log('Source : type = ', type)

    const Gate = gateTypes[type]
    // console.log('Source : Gate = ', Gate)

    console.log('Source : selected = ', selected)

    return connectDragSource(
        // <g transform={`translate(${translation}) rotate(${rotation})`} style={{ transformOrigin: transformOrigin }}>
        
        // <g transform={`translate(${translation}) rotate(${rotation})`}>
        //     <Gate id={id} />
        // </g>

        <svg>
            <defs>
                <filter id="f2" x="-20" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
                    <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                </filter>
            </defs>
            <g 
                transform={`translate(${translation}) rotate(${rotation})`} 
                filter={ selected ? "url(#f2)" : null}
            >
                <Gate 
                    id={id} 
                    stroke={ selected ? 'purple' : 'black' } 
                    fill={ selected ? 'purple' : 'black' }
                />
            </g>
        </svg>

        // <svg style={{ transform: `translate(${translation}) rotate(${rotation})` }}>
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