import React from 'react'

import './Nand.css'

const WireNode = ({ style, pos={ top: 0, left: 0 }, id }) => {

    // console.log('Nand : id = ', id, ' pos = ' + JSON.stringify(pos), ' rot = ' + rot)

    const pathStyle  = {
        fill: style.fill, 
        fillOpacity: '0.75', 
        fillRule: 'evenodd', 
        stroke: '#000000', 
        strokeWidth: '12', 
        strokeLinecap: 'square', 
        strokeLinejoin: 'miter', 
        strokeOpacity: '1', 
        strokeMiterlimit: '4', 
        strokeDasharray: 'none'
    }

    const translation = 'translate(' + pos.left + ' ' + pos.top + ')'
    // console.log('Nand : translation = ', translation)

    return (
        // <g 
        //     id={id}
        //     // width='10' height='10' 
        //     stroke='black' strokeWidth='1' fill='black'
        //     // style={{ transform: translation }} 
        //     transform={translation}
        // >
            <circle 
                id={id} className="draggable confine"
                cx='50' cy='50' r='4'
                transform={translation}
                // style={{ zIndex: 9999999 }}
            />             
        // </g>
    )
}

export default WireNode