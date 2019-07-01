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

export function getMousePosition(evt) {
    var CTM = document.getElementById('svg').getScreenCTM();
    if (evt.touches) { evt = evt.touches[0]; }
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}
