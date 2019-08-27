export function getRelativeXY(x, y, svg, element){
    // console.log('Build > getRelativeXY() : x = ', x, ' y = ', y, ' svg = ', svg, ' element = ', element)

    var p = svg.createSVGPoint();
    // console.log('Build > getRelativeXY() : p = ', p)

    p.x = x;
    p.y = y;

    var ctm = element.getCTM();
    // console.log('Build > getRelativeXY() : ctm = ', ctm)

    var pMatrixTransform = p.matrixTransform(ctm)
    // console.log('Build > getRelativeXY() : pMatrixTransform = ', pMatrixTransform)

    return pMatrixTransform
}

export function getTerminalPoint(terminal) {

    console.log('GateFuncs > getPoint() : terminal = ', terminal)

    let x, y
    
    if (terminal.id.includes('Out'))        {x = 'x2'; y = 'y2'}
    else if (terminal.id.includes('In'))    {x = 'x1'; y = 'y1'}
    else if (terminal.id.includes('Node'))  {x = 'cx'; y = 'cy'}
    
    console.log(`GateFuncs > getPoint() : x = ${x}, y = ${y}`)

    x = terminal[x].baseVal.value
    y = terminal[y].baseVal.value

    const relativePoint = getRelativeXY(x, y, document.getElementById('svg'), terminal)

    return relativePoint
}

export function getMousePosition(evt) {
    var CTM = document.getElementById('svg').getScreenCTM();
    if (evt.touches) { evt = evt.touches[0]; }
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}
