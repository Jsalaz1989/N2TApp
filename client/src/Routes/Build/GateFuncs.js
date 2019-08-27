import update from 'immutability-helper'
import { getMousePosition, getTerminalPoint } from './BuildFuncs'

import snapToGrid from './snapToGrid'

export function addGate(evt, state, setState) {

    evt.preventDefault()

    let gateId = evt.dataTransfer.getData('text')
    console.log('GateFuncs > addGate() : gateId = ', gateId)

    if (!gateId.includes('new')) return 

    gateId = gateId.replace('new', '')
    console.log('GateFuncs > addGate() : gateId = ', gateId)

    gateId = getNextName(gateId, state.gates)
    console.log('GateFuncs > addGate() : gateId = ', gateId)

    let newState = state
    const mousePos = getMousePosition(evt)
    let top = mousePos.y - 100/2
    let left = mousePos.x - 100/2

    // ;[left, top] = snapToGrid(left, top)


    newState.gates[gateId] = { top: top, left: left, rotation: 0 }

    console.log('GateFuncs > addGate() : newState = ', newState)
    setState({ ...newState })
}

function getNextName(gateType, gates) {
    let count = 0
    for (let gate in gates) {
        console.log('GateFuncs > getNextName() : gate = ', gate)
        if (gate.includes(gateType)) count++
    }
    
    return gateType + count.toString()
}

export function addNode(evt, state, setState) {

    evt.preventDefault()

    let wireId = evt.target.id
    console.log('GateFuncs > addNode() : wireId = ', wireId)

    const id = getNextName('Node', state.gates)
    console.log('GateFuncs > addNode() : id = ', id)

    let newState = state
    const mousePos = getMousePosition(evt)
    const top = mousePos.y - 100/2
    const left = mousePos.x - 100/2

    newState.gates[id] = { top: top, left: left, rotation: 0 }

    const fromId = wireId.split('_')[0]
    const toId = wireId.split('_')[1]
    console.log('GateFuncs > addNode() : fromId = ', fromId)
    console.log('GateFuncs > addNode() : toId = ', toId)

    const from = document.getElementById(fromId)
    const to = document.getElementById(toId)
    console.log('GateFuncs > addNode() : from = ', from)
    console.log('GateFuncs > addNode() : to = ', to)

    const fromPoint = getTerminalPoint(from)
    const toPoint = getTerminalPoint(to)

    newState.wires[fromId + '_' + id+'Center'] = {
        from: {x: fromPoint.x, y: fromPoint.y},
        to: {x: mousePos.x, y: mousePos.y}
    }
      
    newState.wires[id+'Center_' + toId] = {
        from: {x: mousePos.x, y: mousePos.y},
        to: {x: toPoint.x, y: toPoint.y}
    }

    delete newState.wires[wireId]

    console.log('GateFuncs > addNode() : newState = ', newState)
    setState({ ...newState })
}
   
export function rotateGate(evt, state, setState) {

    const gateId = evt.target.id.replace('Body', '')
    console.log('GateFuncs > rotateGate() : gateId = ', gateId)

    const newRotation = (state.gates[gateId].rotation + 90) % 360
    console.log('GateFuncs > rotateGate() : newRotation = ', newRotation)

    setState(update(state, {
        gates: {
            [gateId]: {
                $merge: {
                    rotation: newRotation
                }
            }
        }
    }))
}