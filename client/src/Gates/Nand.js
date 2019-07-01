import React from 'react'

// import { renderToStaticMarkup } from 'react-dom/server';

import './Nand.css'

const Nand = ({ style, pos={ top: 0, left: 0 }, id }) => {

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
        <g 
            id={id}
            // width='10' height='10' 
            stroke='black' strokeWidth='3' fill={pathStyle.fill}
            // style={{ transform: translation }} 
            transform={translation}
        >
            <path 
                id={id+'Body'} className="draggable confine"
                d='M 20,25 L 47,25 C 75,30 75,70 47,75 L 20,75 Z'
            />   
            <circle cx='75' cy='50' r='7' /> 
            <text 
                strokeWidth='1'
                x='30' y='54' 
                // fontFamily='Roboto' 
                fontSize='10' 
                fontWeight='100' 
                // pointerEvents='none'
                style={{ pointerEvents: 'none' }}
            >
                {id}
            </text>    
            <line 
                id={id+'InA'} 
                x1='0' y1='35' x2='20' y2='35' 
                onMouseOver={()=>document.getElementById(id+'InA').style.stroke = style.fill}
                onMouseOut={()=>document.getElementById(id+'InA').style.stroke = 'black'}
            />  
            <line 
                id={id+'InB'} 
                x1='0' y1='65' x2='20' y2='65' 
                onMouseOver={()=>document.getElementById(id+'InB').style.stroke = style.fill}
                onMouseOut={()=>document.getElementById(id+'InB').style.stroke = 'black'}
            />  
            <line 
                id={id+'OutA'} 
                x1='83' y1='50' x2='100' y2='50' 
                onMouseOver={()=>document.getElementById(id+'OutA').style.stroke = style.fill}
                onMouseOut={()=>document.getElementById(id+'OutA').style.stroke = 'black'}
            />          
        </g>
    )
}

export default Nand