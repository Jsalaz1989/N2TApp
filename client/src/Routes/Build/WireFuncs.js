import update from 'immutability-helper'
import { getMousePosition, getTerminalPoint } from './BuildFuncs'


function terminalAlreadyConnected(terminalId, wires) {
    const wireIds = Object.keys(wires)

    let terminalConnected
    wireIds.forEach((wireId) => {
        console.log('WireFuncs > terminalAlreadyConnected() : wireId = ', wireId)
        if (wireId.split('_')[1] === terminalId) terminalConnected = wireId
    })

    console.log('WireFuncs > terminalAlreadyConnected() : terminalConnected = ', terminalConnected)
    return terminalConnected
}

export function addWire(evt, state, setState, setFloatingWire) {

    const terminalId = evt.target.id
    console.log('WireFuncs > addWire() : terminalId = ', terminalId)

    if (terminalId.includes('_')) return

    let terminalType
    if (terminalId.includes('Out'))         
        terminalType = 'Out'
    else if (terminalId.includes('In'))     
        terminalType = 'In'
    else if (terminalId.includes('Node') && terminalId.includes('Center'))   
        terminalType = 'Center'
    else
        return

    let newState = state
    const mousePos = getMousePosition(evt)
    let floatingWireName

    if (terminalType === 'Out') {
       
        const from = document.getElementById(terminalId)
        const fromPoint = getTerminalPoint(from)

        floatingWireName = terminalId+'_floatingTerminal'
        
        newState.wires[floatingWireName] = { 
            from: {x: fromPoint.x, y: fromPoint.y}, 
            to: {x: mousePos.x, y: mousePos.y} 
        }
    }
    else if (terminalType === 'In') {
        
        const connectedWire = terminalAlreadyConnected(terminalId, state.wires)

        if (connectedWire) {
            delete newState.wires[connectedWire] 

            const fromId = connectedWire.split('_')[0]
            const from = document.getElementById(fromId)
            console.log('WireFuncs > addWire() : from = ', from)

            const fromPoint = getTerminalPoint(from)

            floatingWireName = fromId+'_floatingTerminal'

            newState.wires[floatingWireName] = { 
                from: {x: fromPoint.x, y: fromPoint.y}, 
                to: {x: mousePos.x, y: mousePos.y} 
            }
        }
        else if (!connectedWire) {    
            const to = document.getElementById(terminalId)
            console.log('WireFuncs > addWire() : to = ', to)

            const toPoint = getTerminalPoint(to)

            floatingWireName = 'floatingTerminal_'+terminalId

            newState.wires[floatingWireName] = { 
                from: {x: mousePos.x, y: mousePos.y}, 
                to: {x: toPoint.x, y: toPoint.y} 
            }
        }
    }
    else if (terminalType === 'Center') {
        
        const from = document.getElementById(terminalId)
        console.log('WireFuncs > addWire() : from = ', from)

        const fromPoint = getTerminalPoint(from)

        floatingWireName = terminalId+'_floatingTerminal'

        newState.wires[floatingWireName] = { 
            from: {x: fromPoint.x, y: fromPoint.y}, 
            to: {x: mousePos.x, y: mousePos.y} 
        }
    }

    setState({ ...newState })
    setFloatingWire(floatingWireName)
}

// export function connectWire(evt, state, setState, floatingWire, setFloatingWire) {
    
//     console.log('WireFuncs > connectWire() : floatingWire = ', floatingWire)
//     if (floatingWire === null) return

//     const terminalId = evt.target.id
//     console.log('WireFuncs > addWire() : terminalId = ', terminalId)

//     const newWireId = floatingWire.replace('floatingTerminal', terminalId)
//     let newWirePoints = state.wires[floatingWire]
//     console.log('WireFuncs > connectWire() : newWirePoints = ', newWirePoints)

//     let terminalType
//     if (floatingWire.includes('Out'))         
//         terminalType = 'Out'
//     else if (floatingWire.includes('In'))     
//         terminalType = 'In'
//     else if (floatingWire.includes('Node'))   
//         terminalType = 'Center'
//     else
//         return

//     let newState = state

//     if ((terminalType === 'Out' || terminalType === 'Center') && terminalId.includes('In')) {

//         const toId = terminalId
//         console.log('WireFuncs > connectWire() : toId = ', toId)

//         const to = document.getElementById(toId)
//         console.log('WireFuncs > connectWire() : to = ', to)

//         const connectedWire = terminalAlreadyConnected(terminalId, state.wires)
//         console.log('WireFuncs > addWire() : connectedWire = ', connectedWire)

//         if (connectedWire) {
//             console.log('WireFuncs > addWire() : input already connected')
//         }
//         else if (!connectedWire) {

//             const toPoint = getTerminalPoint(to)

//             newWirePoints.to = {x: toPoint.x, y: toPoint.y}
//             console.log('WireFuncs > connectWire() : newWirePoints = ', newWirePoints)

//             newState.wires[newWireId] = newWirePoints
//         }
//     }
//     else if (terminalType === 'In' && terminalId.includes('Out')) {
        
//         const from = document.getElementById(terminalId)
//         console.log('WireFuncs > connectWire() : from = ', from)

//         const fromPoint = getTerminalPoint(from)

//         newWirePoints.from = {x: fromPoint.x, y: fromPoint.y}
//         console.log('WireFuncs > connectWire() : newWirePoints = ', newWirePoints)

//         newState.wires[newWireId] = newWirePoints
//     }
//     else {
//         console.log('Must connect In to Out or viceversa')
//     }

//     delete newState.wires[floatingWire]
//     console.log('WireFuncs > connectWire() > else : newState = ', newState)

//     setState({ ...newState })
//     setFloatingWire(null)
// }


function nodeConnectedToOut(nodeId, wires) {
    const wireIds = Object.keys(wires)

    return wireIds.some(wireId => (
        wireId.includes('Out') && wireId.includes(nodeId))
    )
}

export function connectWire(evt, state, setState, floatingWire, setFloatingWire) {
    
    console.log('WireFuncs > connectWire() : floatingWire = ', floatingWire)
    if (floatingWire === null) return

    const sourceTerminalId = floatingWire.replace('floatingTerminal', '').replace('_', '')
    console.log('WireFuncs > connectWire() : sourceTerminalId = ', sourceTerminalId)

    const targetTerminalId = evt.target.id
    console.log('WireFuncs > connectWire() : targetTerminalId = ', targetTerminalId)

    let newWireId = floatingWire.replace('floatingTerminal', targetTerminalId)
    let newWirePoints = state.wires[floatingWire]
    console.log('WireFuncs > connectWire() : newWirePoints = ', newWirePoints)

    let newState = state
    

    // console.log('WireFuncs > connectWire() : sourceTerminalId.includes(Node) && targetTerminalId.includes(Out) = ', sourceTerminalId.includes('Node') && targetTerminalId.includes('Out'))


    if (sourceTerminalId.includes('Out') && targetTerminalId.includes('Out')) {
        console.log('WireFuncs > connectWire() : cannot connect Out to Out')
    }
    else if (sourceTerminalId.includes('Out') && targetTerminalId.includes('Node')) {
        const targetNodeConnectedToOut = nodeConnectedToOut(targetTerminalId, state.wires)
        console.log('WireFuncs > connectWire() : targetNodeConnectedToOut = ', targetNodeConnectedToOut)

        if (targetNodeConnectedToOut) {
            console.log('WireFuncs > connectWire() : cannot connect Out to Node already connected to Out')
        }
    }
    else if (sourceTerminalId.includes('Node') && targetTerminalId.includes('Out')) {
        const sourceNodeConnectedToOut = nodeConnectedToOut(sourceTerminalId, state.wires)
        console.log('WireFuncs > connectWire() : sourceNodeConnectedToOut = ', sourceNodeConnectedToOut)

        if (sourceNodeConnectedToOut) {
            console.log('WireFuncs > connectWire() : cannot connect Node already connected to Out to Out')
        }
        else {
            const toId = targetTerminalId
            console.log('WireFuncs > connectWire() : toId = ', toId)

            const to = document.getElementById(toId)
            console.log('WireFuncs > connectWire() : to = ', to)

            const toPoint = getTerminalPoint(to)

            newWirePoints.to = {x: toPoint.x, y: toPoint.y}
            console.log('WireFuncs > connectWire() : newWirePoints = ', newWirePoints)

            newState.wires[newWireId] = newWirePoints
        }
    }
    else if ((sourceTerminalId.includes('Out') || sourceTerminalId.includes('Node')) && targetTerminalId.includes('In')) {

        const toId = targetTerminalId
        console.log('WireFuncs > connectWire() : toId = ', toId)

        const to = document.getElementById(toId)
        console.log('WireFuncs > connectWire() : to = ', to)

        const connectedWire = terminalAlreadyConnected(targetTerminalId, state.wires)
        console.log('WireFuncs > connectWire() : connectedWire = ', connectedWire)

        if (connectedWire) {
            console.log('WireFuncs > connectWire() : input already connected')
        }
        else if (!connectedWire) {

            const toPoint = getTerminalPoint(to)

            newWirePoints.to = {x: toPoint.x, y: toPoint.y}
            console.log('WireFuncs > connectWire() : newWirePoints = ', newWirePoints)

            newState.wires[newWireId] = newWirePoints
        }
    }
    else if (sourceTerminalId.includes('In') && targetTerminalId.includes('Out')) {
        
        const from = document.getElementById(targetTerminalId)
        console.log('WireFuncs > connectWire() : from = ', from)

        const fromPoint = getTerminalPoint(from)

        newWirePoints.from = {x: fromPoint.x, y: fromPoint.y}
        console.log('WireFuncs > connectWire() : newWirePoints = ', newWirePoints)

        newState.wires[newWireId] = newWirePoints
    }
    

    delete newState.wires[floatingWire]
    console.log('WireFuncs > connectWire() > newState = ', newState)

    setState({ ...newState })
    setFloatingWire(null)
}

export function updateWires(state, setState, mousePosition=null) {
    console.log('WireFuncs > updateWire() : state = ', state)

    const wires = state.wires
    console.log('WireFuncs > updateWire() : wires = ', wires)

    const wireIds = Object.keys(wires)        
    // console.log('WireFuncs > updateWire() : wireIds = ', wireIds)
    // console.log('WireFuncs > updateWire() : wireIds.length = ', wireIds.length)

    // if (!wireIds.length) return 

    let wireChanges = {}
    let wireChange = {}

    wireIds.forEach(wireId => {

        console.log('WireFuncs > updateWire() : wireId = ', wireId)
        
        let fromId = wireId.split('_')[0]
        console.log('WireFuncs > updateWire() : fromId = ', fromId)

        let wireType
        if (wireId.includes('floatingTerminal'))
            wireType = 'Floating'
        else if (wireId.includes('Node'))
            wireType = 'Node'

        if (wireType === 'Floating') {

            console.log('WireFuncs > updateWire() : updating floating terminal')

            const extreme = fromId === 'floatingTerminal' ? 'from' : 'to'

            wireChange = {
                [wireId]: {
                    $merge: {
                        [extreme]: { x: mousePosition.x, y: mousePosition.y }
                    }
                }
            }
        }
        else if (wireType !== 'Floating') {

            // console.log('WireFuncs > updateWire() : updating wiredId = ', wireId)

            const toId = wireId.split('_')[1]

            const from = document.getElementById(fromId)
            const to = document.getElementById(toId)

            const fromPoint = getTerminalPoint(from)
            const toPoint = getTerminalPoint(to)

            wireChange = {
                [wireId]: {
                    $merge: {
                        from: { x: fromPoint.x, y: fromPoint.y },
                        to: { x: toPoint.x, y: toPoint.y }
                    }
                }
            }
        }

        wireChanges = { ...wireChanges, ...wireChange }

        console.log('WireFuncs > updateWire : wireChanges = ', wireChanges)
        setState(update(state, { wires: wireChanges }))
    })
}