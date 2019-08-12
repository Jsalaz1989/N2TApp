import React, { useState } from 'react'

// import './Node.css'

export default ({ id }) => {

    const [terminalColor, setTerminalColor] = useState('black')

    return (
        <g id={id}>
            <circle 
                id={id+'Body'} 
                className="draggable confine"
                cx='50' cy='50' r='5'
                stroke='black'
                fill='black'
            />
            <circle 
                id={id+'Center'} 
                // className="draggable confine"
                cx='50' cy='50' r='2'
                stroke={terminalColor}
                fill={terminalColor}
                onMouseOver={()=>setTerminalColor('purple')}
                onMouseOut={()=>setTerminalColor('black')}
            />
        </g> 
    )       
}