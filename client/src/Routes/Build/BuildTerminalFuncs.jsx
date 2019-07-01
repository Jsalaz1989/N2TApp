import theme from '../../theme' 

import { getRelativeXY, getMousePosition } from './BuildFuncs'

export function createFloatingTerminal(evt, setFloatingTerminal) {
    console.log('Build > createFloatingTerminal() : evt = ', evt)

    const fromTerminal = document.getElementById(evt.target.id)
    console.log('Build > createFloatingTerminal() : fromTerminal = ', fromTerminal)

    function createNewWire(fromTerminalX, fromTerminalY, firstPoint, secondPoint) {
        const connectorId = fromTerminal.id + '_floatingTerminal'
        console.log('Build > createNewWire() : connectorId = ', connectorId)

        let newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
        newLine.setAttribute('id', connectorId);
        newLine.setAttribute('zIndex', 999999);

        const relativePoint = getRelativeXY(
            fromTerminalX, 
            fromTerminalY, 
            document.getElementById('svg'), 
            fromTerminal
        )
        console.log('Build > createFloatingTerminal() : relativePoint = ', relativePoint)
        newLine.setAttribute(firstPoint.x, relativePoint.x);
        newLine.setAttribute(firstPoint.y, relativePoint.y);

        coord = getMousePosition(evt);
        newLine.setAttribute(secondPoint.x, coord.x);
        newLine.setAttribute(secondPoint.y, coord.y);

        newLine.setAttribute("stroke", theme.palette.primary.light)
        newLine.setAttribute("stroke-width", '3')

        newLine.setAttribute('style', 'pointer-events: none;');
        
        document.getElementById('svg').append(newLine);

        console.log('Build > createFloatingTerminal() : newLine = ', newLine)

        setFloatingTerminal(newLine)
    }

    if (fromTerminal.id.includes('In')) {

        const svg = document.getElementById('svg')
        const lines = svg.querySelectorAll(`line[id$="${fromTerminal.id}"]`)
        console.log('Build > createFloatingTerminal() > if : lines = ', lines)

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
            console.log('Build > createFloatingTerminal() : In already connected')

            let realFromTerminalId = wire.id.replace('_'+fromTerminal.id, '')
            console.log('Build > createFloatingTerminal() : realFromTerminalId = ', realFromTerminalId)
    
            const connectorId = realFromTerminalId + '_floatingTerminal'
            console.log('Build > createFloatingTerminal() : connectorId = ', connectorId)
    
            wire.setAttribute('id', connectorId);
    
            coord = getMousePosition(evt);
            wire.setAttribute('x1', coord.x);
            wire.setAttribute('y1', coord.y);
    
            wire.setAttribute("stroke", theme.palette.primary.light)
    
            console.log('Build > createFloatingTerminal() : wire = ', wire)
    
            setFloatingTerminal(wire)
        }
    }
    else if (fromTerminal.id.includes('Out')) {     
        createNewWire(
            fromTerminal.x2.baseVal.value, 
            fromTerminal.y2.baseVal.value,
            {x: 'x2', y: 'y2'},
            {x: 'x1', y: 'y1'}
        )
    }
}

export function moveFloatingTerminal(evt, floatingTerminal) {

    // console.log('Build > handleMouseMoveTerminal() : evt.target.id = ', evt.target.id)
    // console.log('Build > handleMouseMoveTerminal() : floatingTerminal = ', floatingTerminal)

    if (!floatingTerminal) return

    evt.preventDefault();
    
    const fromTerminal = document.getElementById(floatingTerminal.id.replace('_floatingTerminal',""))
    // console.log('Build > handleMouseMoveTerminal() : fromTerminal = ', fromTerminal)

    fromTerminal.removeAttribute('style')
    fromTerminal.setAttribute('stroke', theme.palette.primary.light)

    // console.log('Build > handleMouseMoveTerminal() : floatingTerminal = ', floatingTerminal)

    var coord = getMousePosition(evt);

    if (floatingTerminal.id.includes('In')) {
        floatingTerminal.setAttribute('x2', coord.x);
        floatingTerminal.setAttribute('y2', coord.y);	
    }
    else if (floatingTerminal.id.includes('Out')) {
        floatingTerminal.setAttribute('x1', coord.x);
        floatingTerminal.setAttribute('y1', coord.y);	
    }
}


export function connectFloatingTerminal(evt, floatingTerminal, setFloatingTerminal) {
    console.log('Build > handleMouseUpTerminal() : evt = ', evt)
    console.log('Build > handleMouseUpTerminal() : x and y = ', evt.clientX, ' ', evt.clientY)

    const toTerminal = document.getElementById(evt.target.id)
    console.log('Build > handleMouseUpTerminal() : toTerminal = ', toTerminal)
    console.log('Build > handleMouseUpTerminal() : toTerminal.id = ', toTerminal.id)

    if (!floatingTerminal) return

    console.log('Build > handleMouseUpTerminal() : floatingTerminal.id = ', floatingTerminal.id)

    if (floatingTerminal.id.includes('In')) {

        if (!toTerminal.id.includes('Out')) {
            console.log('Build > handleMouseUpTerminal() : attempting to connect In to not an Out')
            floatingTerminal.parentNode.removeChild(floatingTerminal)				
        }
        else if (toTerminal.id.includes('Out')) {
            const fromTerminalId = floatingTerminal.id.replace('_floatingTerminal','')
            console.log('Build > handleMouseUpTerminal() > else : fromTerminalId = ', fromTerminalId)

            const connectorId = toTerminal.id + '_' + fromTerminalId
            console.log('Build > handleMouseUpTerminal() > else : connectorId = ', connectorId)

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

            console.log('Build > handleMouseUpTerminal() > else : floatingTerminal = ', floatingTerminal)
        }

        // setFloatingTerminal(null)	
    } 
    else if (floatingTerminal.id.includes('Out')) {

        if (!toTerminal.id.includes('In')) {
            console.log('Build > handleMouseUpTerminal() : attempting to connect Out to not an In')
            floatingTerminal.parentNode.removeChild(floatingTerminal)				
        }
        else if (toTerminal.id.includes('In')) {
            const fromTerminalId = floatingTerminal.id.replace('_floatingTerminal','')
            console.log('Build > handleMouseUpTerminal() > else : fromTerminalId = ', fromTerminalId)

            const connectorId = fromTerminalId + '_' + toTerminal.id
            console.log('Build > handleMouseUpTerminal() > else : connectorId = ', connectorId)

            const alreadyExists = document.getElementById(connectorId)
            console.log('Build > handleMouseUpTerminal() > else : alreadyExists = ', alreadyExists)

            if (alreadyExists) {
                console.log('Build > handleMouseUpTerminal() > else > if alreadyExists')
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

            console.log('Build > handleMouseUpTerminal() > else : floatingTerminal = ', floatingTerminal)
        }

        // setFloatingTerminal(null)	
    }

    setFloatingTerminal(null)	
}