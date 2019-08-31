import React from 'react'


export default ({ id, floatingWire, creatingNode, from, to, setCreatingNode, selected }) => (
    <svg>
        <defs>
            <filter id="f1" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
                <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
                <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
        </defs>
        <line 
            key={id}
            id={id}
            stroke={
                (floatingWire && floatingWire.includes(id)) ||
                (creatingNode === id) ||
                selected
                    ? 'purple' 
                    : 'black'
            }  
            strokeWidth='3' 
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            style={{ pointerEvents: floatingWire ? 'none' : 'all', boxShadow:'10px 10px' }}
            onMouseOver={()=>setCreatingNode(id)}
            onMouseOut={()=>setCreatingNode(null)}
            filter={ selected ? "url(#f1)" : null}
        />
    </svg>
)