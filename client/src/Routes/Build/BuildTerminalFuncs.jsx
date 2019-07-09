import theme from '../../theme' 

import { getRelativeXY, getMousePosition } from './BuildFuncs'
import { node } from 'prop-types';

export function createFloatingTerminal(evt, setFloatingTerminal, wires, setWires) {
    console.log('BuildTerminalFuncs > createFloatingTerminal() : evt.target.id = ', evt.target.id)

    const fromTerminal = document.getElementById(evt.target.id)
    console.log('BuildTerminalFuncs > createFloatingTerminal() : fromTerminal = ', fromTerminal)

    function createNewWire(fromTerminalX, fromTerminalY, firstPoint, secondPoint) {
        const wireId = fromTerminal.id + '_floatingTerminal'
        console.log('BuildTerminalFuncs > createNewWire() : wireId = ', wireId)

        let newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
        newLine.setAttribute('id', wireId);
        // newLine.setAttribute('zIndex', 999999);

        const relativePoint = getRelativeXY(
            fromTerminalX, 
            fromTerminalY, 
            document.getElementById('svg'), 
            fromTerminal
        )
        console.log('BuildTerminalFuncs > createNewWire() : relativePoint = ', relativePoint)
        newLine.setAttribute(firstPoint.x, relativePoint.x);
        newLine.setAttribute(firstPoint.y, relativePoint.y);

        coord = getMousePosition(evt);
        newLine.setAttribute(secondPoint.x, coord.x);
        newLine.setAttribute(secondPoint.y, coord.y);

        newLine.setAttribute("stroke", theme.palette.primary.light)
        newLine.setAttribute("stroke-width", '3')

        newLine.setAttribute('style', 'pointer-events: none;');
        
        // document.getElementById('svg').append(newLine);

        const newWire = {
            [wireId] : {
                from: fromTerminal.id,
                to: {[secondPoint.x]: coord.x, [secondPoint.y]: coord.y}
            }
        }
        
        setWires({ ...wires, ...newWire })

        console.log('BuildTerminalFuncs > createNewWire() : newLine = ', newLine)

        setFloatingTerminal(newLine)
    }

    if (fromTerminal.id.includes('In')) {

        const svg = document.getElementById('svg')
        const lines = svg.querySelectorAll(`line[id$="${fromTerminal.id}"]`)
        console.log('BuildTerminalFuncs > createFloatingTerminal() > if : lines = ', lines)

        let wire
        lines.forEach((line) => {
            if (line.id.includes('_')) 
                wire = line
        }) 

        var coord

        if (!wire) {
            createNewWire(
                fromTerminal.x1.baseVal.value, 
                fromTerminal.y1.baseVal.value,
                {x: 'x1', y: 'y1'},
                {x: 'x2', y: 'y2'}
            )
        }
        else if (wire) {
            console.log('BuildTerminalFuncs > createFloatingTerminal() : In already connected')

            let realFromTerminalId = wire.id.replace('_'+fromTerminal.id, '')
            console.log('BuildTerminalFuncs > createFloatingTerminal() : realFromTerminalId = ', realFromTerminalId)
    
            const connectorId = realFromTerminalId + '_floatingTerminal'
            console.log('BuildTerminalFuncs > createFloatingTerminal() : connectorId = ', connectorId)
    
            wire.setAttribute('id', connectorId);
    
            coord = getMousePosition(evt);
            wire.setAttribute('x1', coord.x);
            wire.setAttribute('y1', coord.y);
    
            wire.setAttribute("stroke", theme.palette.primary.light)

            wire.setAttribute('style', 'pointer-events: none;');
    
            console.log('BuildTerminalFuncs > createFloatingTerminal() : wire = ', wire)
    
            setFloatingTerminal(wire)
        }
    }
    else if (fromTerminal.id.includes('Out')) {     
        // createNewWire(
        //     fromTerminal.x2.baseVal.value, 
        //     fromTerminal.y2.baseVal.value,
        //     {x: 'x2', y: 'y2'},
        //     {x: 'x1', y: 'y1'}
        // )

        console.log('BuildTerminalFuncs > createFloatingTerminal() > if Out : fromTerminal = ', fromTerminal)


        const wireId = fromTerminal.id + '_floatingTerminal'
        coord = getMousePosition(evt)
        const relativePoint = getRelativeXY(
            fromTerminal.x2.baseVal.value, 
            fromTerminal.y2.baseVal.value, 
            document.getElementById('svg'), 
            fromTerminal
        )

        const newWire = {
            [wireId] : {
                from: relativePoint,
                to: coord
            }
        }
        
        setWires({ ...wires, ...newWire })

        console.log('BuildTerminalFuncs > createFloatingTerminal() > if Out : wireId = ', wireId)

        setFloatingTerminal(wireId)        
    }
}

export function moveFloatingTerminal(evt, floatingTerminal) {

    // console.log('BuildTerminalFuncs > handleMouseMoveTerminal() : evt.target.id = ', evt.target.id)
    // console.log('BuildTerminalFuncs > handleMouseMoveTerminal() : floatingTerminal = ', floatingTerminal)

    if (!floatingTerminal) return

    floatingTerminal = document.getElementById(floatingTerminal)
    evt.preventDefault();
    
    const fromTerminal = document.getElementById    (floatingTerminal.id.replace('_floatingTerminal',''))
    // console.log('BuildTerminalFuncs > handleMouseMoveTerminal() : fromTerminal = ', fromTerminal)

    fromTerminal.removeAttribute('style')
    fromTerminal.setAttribute('stroke', theme.palette.primary.light)

    // console.log('BuildTerminalFuncs > handleMouseMoveTerminal() : floatingTerminal = ', floatingTerminal)

    var coord = getMousePosition(evt);

    if (floatingTerminal.id.includes('In')) {
        floatingTerminal.setAttribute('x1', coord.x);
        floatingTerminal.setAttribute('y1', coord.y);	
    }
    else if (floatingTerminal.id.includes('Out')) {
        // floatingTerminal.setAttribute('x2', coord.x);
        // floatingTerminal.setAttribute('y2', coord.y);	

        let newWires =
        coord = getMousePosition(evt)
        const relativePoint = getRelativeXY(
            fromTerminal.x2.baseVal.value, 
            fromTerminal.y2.baseVal.value, 
            document.getElementById('svg'), 
            fromTerminal
        )

        const newWire = {
            [floatingTerminal.id] : {
                from: relativePoint,
                to: coord
            }
        }
        
        setWires({ ...wires, ...newWire })
        setWires()
    }
}


export function connectFloatingTerminal(evt, floatingTerminal, setFloatingTerminal) {
    console.log('BuildTerminalFuncs > connectFloatingTerminal() : evt = ', evt)
    // console.log('BuildTerminalFuncs > connectFloatingTerminal() : x and y = ', evt.clientX, ' ', evt.clientY)

    const toTerminal = document.getElementById(evt.target.id)
    // console.log('BuildTerminalFuncs > connectFloatingTerminal() : toTerminal = ', toTerminal)
    console.log('BuildTerminalFuncs > connectFloatingTerminal() : toTerminal.id = ', toTerminal.id)

    if (!floatingTerminal) return

    console.log('BuildTerminalFuncs > connectFloatingTerminal() : floatingTerminal.id = ', floatingTerminal.id)

    // function myFunction() {
    //     console.log('floatingTerminal onclick')
    // }


    if (floatingTerminal.id.includes('In') && toTerminal.id.includes('Out')) {

        const fromTerminalId = floatingTerminal.id.replace('_floatingTerminal','')
        console.log('BuildTerminalFuncs > connectFloatingTerminal() > else : fromTerminalId = ', fromTerminalId)

        const connectorId = toTerminal.id + '_' + fromTerminalId
        console.log('BuildTerminalFuncs > connectFloatingTerminal() > else : connectorId = ', connectorId)

        floatingTerminal.setAttribute('id', connectorId);

        const relativePoint = getRelativeXY(
            toTerminal.x2.baseVal.value, 
            toTerminal.y2.baseVal.value, 
            document.getElementById('svg'), 
            toTerminal
        )

        floatingTerminal.setAttribute('x2', relativePoint.x);
        floatingTerminal.setAttribute('y2', relativePoint.y);

        document.getElementById(fromTerminalId).setAttribute('stroke', 'black')
        floatingTerminal.setAttribute('stroke', 'black');

        // floatingTerminal.addEventListener("click", myFunction);
        floatingTerminal.setAttribute('style', 'pointer-events: all;');
        floatingTerminal.addEventListener('mouseover', ()=>floatingTerminal.setAttribute("stroke", theme.palette.primary.light))
        floatingTerminal.addEventListener('mouseout', ()=>floatingTerminal.setAttribute("stroke", 'black'))

        console.log('BuildTerminalFuncs > connectFloatingTerminal() > else : floatingTerminal = ', floatingTerminal)
    } 
    else if (floatingTerminal.id.includes('Out') && toTerminal.id.includes('In')) {

        const fromTerminalId = floatingTerminal.id.replace('_floatingTerminal','')
        console.log('BuildTerminalFuncs > connectFloatingTerminal() > else : fromTerminalId = ', fromTerminalId)

        const connectorId = fromTerminalId + '_' + toTerminal.id
        console.log('BuildTerminalFuncs > connectFloatingTerminal() > else : connectorId = ', connectorId)

        const alreadyExists = document.getElementById(connectorId)
        console.log('BuildTerminalFuncs > connectFloatingTerminal() > else : alreadyExists = ', alreadyExists)

        if (alreadyExists) {
            console.log('BuildTerminalFuncs > connectFloatingTerminal() > else > if alreadyExists')
            floatingTerminal.parentNode.removeChild(floatingTerminal)				
            setFloatingTerminal(null)	
            return
        } 

        floatingTerminal.setAttribute('id', connectorId);

        const relativePoint = getRelativeXY(
            toTerminal.x1.baseVal.value, 
            toTerminal.y1.baseVal.value, 
            document.getElementById('svg'), 
            toTerminal
        )

        floatingTerminal.setAttribute('x1', relativePoint.x);
        floatingTerminal.setAttribute('y1', relativePoint.y);

        document.getElementById(fromTerminalId).setAttribute('stroke', 'black')
        floatingTerminal.setAttribute('stroke', 'black');

        // floatingTerminal.addEventListener("click", myFunction);
        floatingTerminal.setAttribute('style', 'pointer-events: all;');
        floatingTerminal.addEventListener('mouseover', ()=>floatingTerminal.setAttribute("stroke", theme.palette.primary.light))
        floatingTerminal.addEventListener('mouseout', ()=>floatingTerminal.setAttribute("stroke", 'black'))

        console.log('BuildTerminalFuncs > connectFloatingTerminal() > else : floatingTerminal = ', floatingTerminal)
    }
    else {
        console.log('BuildTerminalFuncs > connectFloatingTerminal() : incorrect terminal connection')
        // floatingTerminal.parentNode.removeChild(floatingTerminal)				
    }

    setFloatingTerminal(null)	
}

export function createWireNode(evt, gates, setGates, gateTypes) {
    console.log('BuildTerminalFuncs > createWireNode() : evt = ', evt)

    const type = gateTypes['Node']
    const gateType = Object.keys(gateTypes).find(key => gateTypes[key] === type)	// string version of gate type

    let count = 0
    for (let gate in gates) {
        console.log('BuildTerminalFuncs > createWireNode > for : gate = ', gate)

        if (gate.includes(gateType)) count++
    }
    const id = 'New' + gateType + count.toString() + evt.target.id

    const getPos = getMousePosition(evt)

    let position = { 
        left: getPos.x-100/2, 
        top: getPos.y-100/2
    }

    const newNode = {
        [id]: {							// use id as object key for quick lookup
            type: type,					// record gate type (eg. Nand, And, Or, etc.)
            position: position,			// record initial gate position
        }
    }

    setGates({ ...gates, ...newNode })
}

export function connectWireNode(evt, gates, setGates) {
    
    const nodeId = evt.target.id
    console.log('BuildTerminalFuncs > connectWireNode() : nodeId = ', nodeId)

    const wireId = evt.target.id.replace('NewNode0','')
    console.log('BuildTerminalFuncs > connectWireNode() : wireId = ', wireId)

    const fromTerminalId = wireId.split('_')[0]
    console.log('BuildTerminalFuncs > connectWireNode() : fromTerminalId = ', fromTerminalId)

    const toTerminalId = wireId.split('_')[1]
    console.log('BuildTerminalFuncs > connectWireNode() : toTerminalId = ', toTerminalId)

    const wire1Id = fromTerminalId +  '_' + newNodeId
    console.log('BuildTerminalFuncs > connectWireNode() : wire1Id = ', wire1Id)
   
    const wire2Id = newNodeId +  '_' + toTerminalId
    console.log('BuildTerminalFuncs > connectWireNode() : wire2Id = ', wire2Id)

    const svg = document.getElementById('svg')


    function connectSegment(segment) {

        let wire = document.createElementNS('http://www.w3.org/2000/svg','line')
        wire.setAttribute('id', wire1Id)
        // wire.setAttribute('zIndex', -999999)

        wire.setAttribute("stroke", 'black')
        wire.setAttribute("stroke-width", '3')

        let relativePoint1, relativePoint2

        const fromTerminal = document.getElementById(fromTerminalId)
        const node = document.getElementById(nodeId)
        const toTerminal = document.getElementById(toTerminalId)

        if (segment == 1) {

            relativePoint1 = getRelativeXY(
                fromTerminal.x2.baseVal.value, 
                fromTerminal.y2.baseVal.value, 
                svg, 
                fromTerminal
            )

            relativePoint2 = getRelativeXY(
                node.cx.baseVal.value, 
                node.cy.baseVal.value, 
                svg, 
                node
            )
        }
        else if (segment == 2) {

            relativePoint1 = getRelativeXY(
                node.cx.baseVal.value, 
                node.cy.baseVal.value, 
                svg, 
                node
            )
            
            relativePoint2 = getRelativeXY(
                toTerminal.x1.baseVal.value, 
                toTerminal.y2.baseVal.value, 
                svg, 
                toTerminal
            )
        
        }        
        wire.setAttribute('x1', relativePoint1.x)
        wire.setAttribute('y1', relativePoint1.y)

        wire.setAttribute('x2', relativePoint2.x)
        wire.setAttribute('y2', relativePoint2.y)

        wire.setAttribute('style', 'pointer-events: all;');
        wire.addEventListener('mouseover', ()=>wire.setAttribute("stroke", theme.palette.primary.light))
        wire.addEventListener('mouseout', ()=>wire.setAttribute("stroke", 'black'))

        svg.insertBefore(wire, node)
    }

    connectSegment(1)
    connectSegment(2)

    let { [nodeId]: newNode, ...rest } = gates
    const newNodeId = nodeId.replace('New','')
    newNode = {
        [newNodeId]: {
            type: newNode.type,
            position: newNode.position
        }
    }

    setGates({ ...rest, ...newNode })


    svg.removeChild(document.getElementById(wireId))
}