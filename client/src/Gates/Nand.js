import React, { useState } from 'react'

// import { renderToStaticMarkup } from 'react-dom/server';

import './Nand.css'

const style  = {
    fill: 'purple', 
    fillOpacity: '0.75', 
    fillRule: 'evenodd', 
    stroke: '#000000', 
    strokeWidth: '3', 
    strokeLinecap: 'square', 
    strokeLinejoin: 'miter', 
    strokeOpacity: '1', 
    strokeMiterlimit: '4', 
    strokeDasharray: 'none'
}

export default ({ id }) => {

    const [terminalColor, setTerminalColor] = useState({
        [id+'InA']: style.stroke,
        [id+'InB']: style.stroke,
        [id+'Out']: style.stroke,
    })

    function highlight(terminalId, color) {
        let newTerminalColor = terminalColor
        newTerminalColor[terminalId] = color
        setTerminalColor({ ...newTerminalColor })
    }

    return (
        <g 
            id={id}
            stroke={style.stroke} 
            strokeWidth={style.strokeWidth} 
            fill={style.fill}
        >     
            <path 
                id={id+'Body'} className='draggable'
                d='M 20,25 L 47,25 C 75,30 75,70 47,75 L 20,75 Z'
            />   
            <circle cx='75' cy='50' r='7' />  
            <line 
                id={id+'InA'} 
                x1='0' y1='35' x2='20' y2='35' 
                onMouseOver={()=>highlight(id+'InA', style.fill)}
                onMouseOut={()=>highlight(id+'InA', style.stroke)}
                stroke={terminalColor[id+'InA']}
            />  
            <line 
                id={id+'InB'} 
                x1='0' y1='65' x2='20' y2='65' 
                onMouseOver={()=>highlight(id+'InB', style.fill)}
                onMouseOut={()=>highlight(id+'InB', style.stroke)}
                stroke={terminalColor[id+'InB']}
            />  
            <line 
                id={id+'Out'} 
                x1='83' y1='50' x2='100' y2='50' 
                onMouseOver={()=>highlight(id+'Out', style.fill)}
                onMouseOut={()=>highlight(id+'Out', style.stroke)}
                stroke={terminalColor[id+'Out']}
            />    
            <text 
                id={id+'Text'}
                strokeWidth='1'
                x='30' y='54' 
                // fontFamily='Roboto' 
                fontSize='10' 
                fontWeight='100' 
                // style={{ pointerEvents: 'none' }}
            >
                {id}
            </text>    
        </g>
    )
}