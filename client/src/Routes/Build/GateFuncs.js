import update from 'immutability-helper'
import { getMousePosition, getRelativeXY } from './BuildFuncs'


export function addGate(evt, state, setState) {

    evt.preventDefault()

    let id = evt.dataTransfer.getData('text')
    console.log('GateFuncs > addGate() : id = ', id)

    if (!id.includes('new')) return 

    id = id.replace('new', '')
    console.log('GateFuncs > addGate() : id = ', id)

    let count = 0
    for (let gate in state.gates) {
        console.log('GateFuncs > addGate() : gate = ', gate)
        if (gate.includes(id)) count++
    }
    id = id + count.toString()
    console.log('GateFuncs > addGate() : id = ', id)

    let newState = state
    const mousePos = getMousePosition(evt)
    const top = mousePos.y - 100/2
    const left = mousePos.x - 100/2

    newState.gates[id] = { top: top, left: left, rotation: 0 }

    console.log('GateFuncs > addGate() : newState = ', newState)
    setState({ ...newState })
}

// export function addNode(evt, state, setState) {

//     evt.preventDefault()

//     let wireId = evt.target.id
//     console.log('GateFuncs > addNode() : wireId = ', wireId)

//     // if (!id.includes('new')) return 

//     // id = id.replace('new', '')
//     // console.log('GateFuncs > addNode() : id = ', id)

//     let count = 0
//     for (let gate in state.gates) {
//         console.log('GateFuncs > addNode() : gate = ', gate)
//         if (gate.includes('Node')) count++
//     }
//     const id = 'Node' + count.toString()
//     console.log('GateFuncs > addNode() : id = ', id)

//     let newState = state
//     const mousePos = getMousePosition(evt)
//     const top = mousePos.y - 100/2
//     const left = mousePos.x - 100/2

//     newState.gates[id] = { top: top, left: left, rotation: 0 }

//     const fromTerminalId = wireId.split('_')[0]
//     const toTerminalId = wireId.split('_')[1]

//     console.log('GateFuncs > addNode() : fromTerminalId = ', fromTerminalId)
//     console.log('GateFuncs > addNode() : toTerminalId = ', toTerminalId)

//     const fromTerminal = document.getElementById(fromTerminalId)
//     const toTerminal = document.getElementById(toTerminalId)

//     let relativePointFrom = getRelativeXY(
//         fromTerminal.x2.baseVal.value, 
//         fromTerminal.y2.baseVal.value, 
//         document.getElementById('svg'), 
//         fromTerminal
//     )

//     let relativePointTo = getRelativeXY(
//         toTerminal.x1.baseVal.value, 
//         toTerminal.y1.baseVal.value, 
//         document.getElementById('svg'), 
//         toTerminal
//     )

//     newState.wires[fromTerminalId + '_' + id] = {
//         from: {x: relativePointFrom.x, y: relativePointFrom.y},
//         to: {x: relativePointTo.x, y: relativePointTo.y}
//     }
    
//     relativePointFrom = getRelativeXY(
//         fromTerminal.x2.baseVal.value, 
//         fromTerminal.y2.baseVal.value, 
//         document.getElementById('svg'), 
//         fromTerminal
//     )
    
//     relativePointTo = getRelativeXY(
//         toTerminal.x1.baseVal.value, 
//         toTerminal.y1.baseVal.value, 
//         document.getElementById('svg'), 
//         toTerminal
//     )

//     newState.wires[id + '_' + toTerminalId] = {
//         from: {x: relativePointFrom.x, y: relativePointFrom.y},
//         to: {x: relativePointTo.x, y: relativePointTo.y}
//     }

//     delete newState.wires[wireId]

//     console.log('GateFuncs > addNode() : newState = ', newState)
//     setState({ ...newState })
// }

export function addNode(evt, state, setState) {

    evt.preventDefault()

    let wireId = evt.target.id
    console.log('GateFuncs > addNode() : wireId = ', wireId)

    // if (!id.includes('new')) return 

    // id = id.replace('new', '')
    // console.log('GateFuncs > addNode() : id = ', id)

    let count = 0
    for (let gate in state.gates) {
        console.log('GateFuncs > addNode() : gate = ', gate)
        if (gate.includes('Node')) count++
    }
    const id = 'Node' + count.toString()
    console.log('GateFuncs > addNode() : id = ', id)

    let newState = state
    const mousePos = getMousePosition(evt)
    const top = mousePos.y - 100/2
    const left = mousePos.x - 100/2

    newState.gates[id] = { top: top, left: left, rotation: 0 }

    const fromTerminalId = wireId.split('_')[0]
    const toTerminalId = wireId.split('_')[1]

    console.log('GateFuncs > addNode() : fromTerminalId = ', fromTerminalId)
    console.log('GateFuncs > addNode() : toTerminalId = ', toTerminalId)

    const fromTerminal = document.getElementById(fromTerminalId)
    const toTerminal = document.getElementById(toTerminalId)

    let relativePointFrom, relativePointTo

    if (!fromTerminalId.includes('Node')) {
        relativePointFrom = getRelativeXY(
            fromTerminal.x2.baseVal.value, 
            fromTerminal.y2.baseVal.value, 
            document.getElementById('svg'), 
            fromTerminal
        )
    }
    else if (fromTerminalId.includes('Node')) {

        console.log('GateFuncs > addNode() : fromTerminal = ', fromTerminal)

        relativePointFrom = getRelativeXY(
            fromTerminal.cx.baseVal.value, 
            fromTerminal.cy.baseVal.value, 
            document.getElementById('svg'), 
            fromTerminal
        )
    }

    if (!toTerminalId.includes('Node')) {
        relativePointTo = getRelativeXY(
            toTerminal.x1.baseVal.value, 
            toTerminal.y1.baseVal.value, 
            document.getElementById('svg'), 
            toTerminal
        )
    }
    else if (toTerminalId.includes('Node')) {

        console.log('GateFuncs > addNode() : toTerminal = ', toTerminal)

        relativePointTo = getRelativeXY(
            toTerminal.cx.baseVal.value, 
            toTerminal.cy.baseVal.value, 
            document.getElementById('svg'), 
            toTerminal
        )
    }

    newState.wires[fromTerminalId + '_' + id+'Center'] = {
        from: {x: relativePointFrom.x, y: relativePointFrom.y},
        to: {x: relativePointTo.x, y: relativePointTo.y}
    }
    
    if (!fromTerminalId.includes('Node')) {
        relativePointFrom = getRelativeXY(
            fromTerminal.x2.baseVal.value, 
            fromTerminal.y2.baseVal.value, 
            document.getElementById('svg'), 
            fromTerminal
        )
    }
    else if (fromTerminalId.includes('Node')) {

        console.log('GateFuncs > addNode() : fromTerminal = ', fromTerminal)

        relativePointFrom = getRelativeXY(
            fromTerminal.cx.baseVal.value, 
            fromTerminal.cy.baseVal.value, 
            document.getElementById('svg'), 
            fromTerminal
        )
    }

    if (!toTerminalId.includes('Node')) {
        relativePointTo = getRelativeXY(
            toTerminal.x1.baseVal.value, 
            toTerminal.y1.baseVal.value, 
            document.getElementById('svg'), 
            toTerminal
        )
    }
    else if (toTerminalId.includes('Node')) {

        console.log('GateFuncs > addNode() : toTerminal = ', toTerminal)

        relativePointTo = getRelativeXY(
            toTerminal.cx.baseVal.value, 
            toTerminal.cy.baseVal.value, 
            document.getElementById('svg'), 
            toTerminal
        )
    }


    
    newState.wires[id+'Center_' + toTerminalId] = {
        from: {x: relativePointFrom.x, y: relativePointFrom.y},
        to: {x: relativePointTo.x, y: relativePointTo.y}
    }

    delete newState.wires[wireId]

    console.log('GateFuncs > addNode() : newState = ', newState)
    setState({ ...newState })
}
   
export function rotateGate(evt, state, setState) {

    const id = evt.target.id.replace('Body', '')
    console.log('GateFuncs > rotateGate() : id = ', id)

    const newRotation = (state.gates[id].rotation + 90) % 360
    console.log('GateFuncs > rotateGate() : newRotation = ', newRotation)

    setState(update(state, {
        gates: {
            [id]: {
                $merge: {
                    rotation: newRotation
                }
            }
        }
    }))
}