import theme from '../../theme' 

import { getRelativeXY, getMousePosition } from './BuildFuncs'


let percent = 0.44
let factor = 0.8

const svgStyle = { 
    backgroundColor: 'transparent', 
    borderStyle: 'dashed', 
    borderRadius: 3, 
    borderWidth: 1, 
    borderColor: theme.palette.primary.light, 
    width: 1600*percent*factor, 
    height: 900*percent*factor, 
    display: 'flex', 
    justifyContent: 'center',
    overflow: 'overlay' 
}


var selectedElement, offset, transform, bbox, minX, maxX, minY, maxY, confined

var boundaryX1 = 0
var boundaryX2 = svgStyle.width//10
var boundaryY1 = 0
var boundaryY2 = svgStyle.height//10

function followWithWires(id) {
    const svg = document.getElementById('svg')
    let lines = svg.querySelectorAll(`line[id*="${id}"]`)
    // console.log('BuildBodyFuncs > followWithWires() : lines = ', lines)

    let ins = []
    let outs = []
    lines.forEach(line => {
        if (line.id.includes('_')) {
            if (line.id.includes(id+'In'))
                ins.push(line)
            else if (line.id.includes(id+'Out'))
                outs.push(line)
        } 
    })
    // console.log('BuildBodyFuncs > followWithWires() : ins = ', ins)
    // console.log('BuildBodyFuncs > followWithWires() : outs = ', outs)

    ins.forEach(lineIn => {
        let toTerminalId = lineIn.id.split('_')[1]
        let toTerminal = document.getElementById(toTerminalId)
        // console.log('BuildBodyFuncs > followWithWires() > if ins : toTerminal =', toTerminal)


        const relativePoint = getRelativeXY(
            toTerminal.x1.baseVal.value, 
            toTerminal.y1.baseVal.value, 
            document.getElementById('svg'), 
            toTerminal
        )

        lineIn.setAttribute('x1', relativePoint.x)
        lineIn.setAttribute('y1', relativePoint.y)
    })

    outs.forEach(lineOut => {
        let fromTerminalId = lineOut.id.split('_')[0]
        let fromTerminal = document.getElementById(fromTerminalId)
        // console.log('BuildBodyFuncs > followWithWires() > if outs : fromTerminal =', fromTerminal)

        const relativePoint = getRelativeXY(
            fromTerminal.x2.baseVal.value, 
            fromTerminal.y2.baseVal.value, 
            document.getElementById('svg'), 
            fromTerminal
        )

        lineOut.setAttribute('x2', relativePoint.x)
        lineOut.setAttribute('y2', relativePoint.y)
    })
}

export function startDragBody(evt) {

    console.log('Build > startDragBody() : evt.target = ', evt.target)

    if (!evt.target.classList.contains('draggable')) return
    
    selectedElement = evt.target.parentElement;

    console.log('Build > startDragBody() : selectedElement = ', selectedElement)

    offset = getMousePosition(evt);

    // Make sure the first transform on the element is a translate transform
    var transforms = selectedElement.transform.baseVal;

    if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
        // Create an transform that translates by (0, 0)
        var translate = document.getElementById('svg').createSVGTransform();
        translate.setTranslate(0, 0);
        selectedElement.transform.baseVal.insertItemBefore(translate, 0);
    }

    // Get initial translation
    transform = transforms.getItem(0);
    offset.x -= transform.matrix.e;
    offset.y -= transform.matrix.f;


    // console.log('Build > startDrag() : evt.target = ', evt.target)
    confined = evt.target.classList.contains('confine');
    // console.log('Build > startDrag() : confined = ', confined)

    if (confined) {
        bbox = selectedElement.getBBox();
        minX = boundaryX1 - bbox.x;
        maxX = boundaryX2 - bbox.x - bbox.width;
        minY = boundaryY1 - bbox.y;
        maxY = boundaryY2 - bbox.y - bbox.height;
    }
}

export function dragBody(evt) {

    // console.log('Build > dragBody() : selectedElement = ', selectedElement)

    if (!selectedElement) return
        
    evt.preventDefault();

    var coord = getMousePosition(evt);
    var dx = coord.x - offset.x;
    var dy = coord.y - offset.y;

    // console.log('Build > dragBody() : confined = ', confined)

    if (confined) {
        if 			(dx < minX) dx = minX
        else if     (dx > maxX) dx = maxX
        if 			(dy < minY) dy = minY
        else if     (dy > maxY) dy = maxY
    }

    // console.log('Build > dragBody() : (dx, dy) = (', dx, ', ', dy, ')')
    // console.log('Build > dragBody() : transform = ', transform)


    transform.setTranslate(dx, dy);

    followWithWires(selectedElement.id)
}

export function endDragBody() {
    selectedElement = false;
}

export function rotateGate(evt) {

    const gateBodyId = evt.target.id
    console.log('Build > handleDoubleClick() : gateBodyId = ', gateBodyId)

    if (!gateBodyId.includes('Body')) return

    const gateId = document.getElementById(gateBodyId).parentElement.id

    var rotate = document.getElementById('svg').createSVGTransform();
    const gate = document.getElementById(gateId)

    const bbox = gate.getBBox()
    console.log('Build > handleDoubleClick() : bbox = ', bbox)

    rotate.setRotate(90, bbox.width/2, bbox.height)
    gate.transform.baseVal.appendItem(rotate);

    const transformList = document.getElementById(gateId).transform.baseVal
    console.log('Build > handleDoubleClick() : transformList = ', transformList)

    followWithWires(gateId)
}
