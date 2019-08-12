import update from 'immutability-helper'
import { getRelativeXY, getMousePosition } from './BuildFuncs'


export function addWire(evt, state, setState, setFloatingTerminal) {

    const id = evt.target.id
    console.log('WireFuncs > addWire() : id = ', id)

    if (id.includes('_')) return
    
    if (id.includes('Out')) {
        const fromTerminalId = id
        console.log('WireFuncs > addWire() : fromTerminalId = ', fromTerminalId)

        const fromTerminal = document.getElementById(fromTerminalId)
        console.log('WireFuncs > addWire() : fromTerminal = ', fromTerminal)

        const relativePoint = getRelativeXY(
            fromTerminal.x2.baseVal.value, 
            fromTerminal.y2.baseVal.value, 
            document.getElementById('svg'), 
            fromTerminal
        )

        const mousePos = getMousePosition(evt)

        let newState = state
        newState.wires[fromTerminalId+'_floatingTerminal'] = { 
            from: {x: relativePoint.x, y: relativePoint.y}, 
            to: {x: mousePos.x, y: mousePos.y} 
        }
        setState({ ...newState })
        setFloatingTerminal(fromTerminalId+'_floatingTerminal')
    }
    else if (id.includes('In') && !id.includes('Node')) {
        const toTerminalId = id
        console.log('WireFuncs > addWire() : toTerminalId = ', toTerminalId)
        
        const wireIds = Object.keys(state.wires)
        let existingWire
        wireIds.forEach((wireId) => {

            console.log('WireFuncs > addWire() : wireId = ', wireId)

            if (wireId.split('_')[1] === toTerminalId) 
                existingWire = wireId
        })
        console.log('WireFuncs > addWire() : existingWire = ', existingWire)
 
        let newState = state

        if (existingWire) {
            delete newState.wires[existingWire] 

            const fromTerminalId = existingWire.split('_')[0]
            const fromTerminal = document.getElementById(fromTerminalId)
            console.log('WireFuncs > addWire() : fromTerminal = ', fromTerminal)

            const relativePoint = getRelativeXY(
                fromTerminal.x2.baseVal.value, 
                fromTerminal.y2.baseVal.value, 
                document.getElementById('svg'), 
                fromTerminal
            )

            const mousePos = getMousePosition(evt)

            newState.wires[fromTerminalId+'_floatingTerminal'] = { 
                from: {x: relativePoint.x, y: relativePoint.y}, 
                to: {x: mousePos.x, y: mousePos.y} 
            }
            setState({ ...newState })
            setFloatingTerminal(fromTerminalId+'_floatingTerminal')
        }
        else {    
            const toTerminal = document.getElementById(toTerminalId)
            console.log('WireFuncs > addWire() : toTerminal = ', toTerminal)

            const relativePoint = getRelativeXY(
                toTerminal.x1.baseVal.value, 
                toTerminal.y1.baseVal.value, 
                document.getElementById('svg'), 
                toTerminal
            )

            const mousePos = getMousePosition(evt)

            newState.wires['floatingTerminal_'+toTerminalId] = { 
                from: {x: mousePos.x, y: mousePos.y}, 
                to: {x: relativePoint.x, y: relativePoint.y} 
            }
            setState({ ...newState })
            setFloatingTerminal('floatingTerminal_'+toTerminalId)
        }
    }
    else if (id.includes('Node') && id.includes('Center')) {
        const fromTerminalId = id
        console.log('WireFuncs > addWire() : fromTerminalId = ', fromTerminalId)

        const fromTerminal = document.getElementById(fromTerminalId)
        console.log('WireFuncs > addWire() : fromTerminal = ', fromTerminal)

        const relativePoint = getRelativeXY(
            fromTerminal.cx.baseVal.value, 
            fromTerminal.cy.baseVal.value, 
            document.getElementById('svg'), 
            fromTerminal
        )

        const mousePos = getMousePosition(evt)

        let newState = state
        newState.wires[fromTerminalId+'_floatingTerminal'] = { 
            from: {x: relativePoint.x, y: relativePoint.y}, 
            to: {x: mousePos.x, y: mousePos.y} 
        }
        setState({ ...newState })
        setFloatingTerminal(fromTerminalId+'_floatingTerminal')
    }
}

export function connectWire(evt, state, setState, floatingTerminal, setFloatingTerminal) {
    
    console.log('WireFuncs > connectWire() : floatingTerminal = ', floatingTerminal)
    if (floatingTerminal === null) return

    console.log('WireFuncs > connectWire() : evt.target.id = ', evt.target.id)
    const newWireId = floatingTerminal.replace('floatingTerminal', evt.target.id)
    let newWirePoints = state.wires[floatingTerminal]
    console.log('WireFuncs > connectWire() : newWirePoints = ', newWirePoints)

    let newState = state

    if ((floatingTerminal.includes('Out') || floatingTerminal.includes('Node')) && evt.target.id.includes('In')) {

        const toTerminalId = evt.target.id
        console.log('WireFuncs > connectWire() : toTerminalId = ', toTerminalId)

        const toTerminal = document.getElementById(toTerminalId)
        console.log('WireFuncs > connectWire() : toTerminal = ', toTerminal)

        const wireIds = Object.keys(state.wires)
        let existingWire
        wireIds.forEach((wireId) => {

            console.log('WireFuncs > addWire() : wireId = ', wireId)

            if (wireId.split('_')[1] === toTerminalId) 
                existingWire = wireId
        })
        console.log('WireFuncs > addWire() : existingWire = ', existingWire)

        if (existingWire) {
            console.log('WireFuncs > addWire() : input already connected')
        }
        else if (!existingWire) {
            const relativePoint = getRelativeXY(
                toTerminal.x1.baseVal.value, 
                toTerminal.y1.baseVal.value, 
                document.getElementById('svg'), 
                toTerminal
            )

            newWirePoints.to = {x: relativePoint.x, y: relativePoint.y}

            console.log('WireFuncs > connectWire() : newWirePoints = ', newWirePoints)

            newState.wires[newWireId] = newWirePoints
        }
    }
    else if (floatingTerminal.includes('In') && evt.target.id.includes('Out')) {
        
        const fromTerminal = document.getElementById(evt.target.id)
        console.log('WireFuncs > connectWire() : fromTerminal = ', fromTerminal)

        const relativePoint = getRelativeXY(
            fromTerminal.x2.baseVal.value, 
            fromTerminal.y2.baseVal.value, 
            document.getElementById('svg'), 
            fromTerminal
        )

        newWirePoints.from = {x: relativePoint.x, y: relativePoint.y}

        console.log('WireFuncs > connectWire() : newWirePoints = ', newWirePoints)

        newState.wires[newWireId] = newWirePoints
    }
    else {
        console.log('Must connect In to Out or viceversa')
    }

    delete newState.wires[floatingTerminal]
    console.log('WireFuncs > connectWire() > else : newState = ', newState)

    setState({ ...newState })

    setFloatingTerminal(null)
}

// export function updateWires(state, setState, mousePosition) {
//     // console.log('WireFuncs > updateWire() : state = ', state)

//     const wires = state.wires
//     // console.log('WireFuncs > updateWire() : wires = ', wires)

//     const wireIds = Object.keys(wires)        
//     // console.log('WireFuncs > updateWire() : wireIds = ', wireIds)
//     // console.log('WireFuncs > updateWire() : wireIds.length = ', wireIds.length)

//     if (!wireIds.length) return 

//     let wireChanges = {}
//     let wireChange = {}

//     wireIds.forEach(wireId => {

//         // console.log('WireFuncs > updateWire() : wireId = ', wireId)
        
//         const fromId = wireId.split('_')[0]

//         if (wireId.includes('floatingTerminal')) {

//             // console.log('WireFuncs > updateWire() : updating floating terminal')

//             const extreme = fromId === 'floatingTerminal' ? 'from' : 'to'

//             wireChange = {
//                 [wireId]: {
//                     $merge: {
//                         [extreme]: { x: mousePosition.x, y: mousePosition.y }
//                     }
//                 }
//             }
//         }
//         else {

//             // console.log('WireFuncs > updateWire() : updating wiredId = ', wireId)

//             const toId = wireId.split('_')[1]

//             const from = document.getElementById(fromId)
//             const to = document.getElementById(toId)

//             const relativePointFrom = getRelativeXY(
//                 from.x2.baseVal.value, 
//                 from.y2.baseVal.value, 
//                 document.getElementById('svg'), 
//                 from
//             )

//             const relativePointTo = getRelativeXY(
//                 to.x1.baseVal.value, 
//                 to.y1.baseVal.value, 
//                 document.getElementById('svg'), 
//                 to
//             )

//             wireChange = {
//                 [wireId]: {
//                     $merge: {
//                         from: { x: relativePointFrom.x, y: relativePointFrom.y },
//                         to: { x: relativePointTo.x, y: relativePointTo.y }
//                     }
//                 }
//             }
//         }

//         wireChanges = { ...wireChanges, ...wireChange }

//         // console.log('WireFuncs > updateWire : wireChanges = ', wireChanges)
//         setState(update(state, { wires: wireChanges }))
//     })
// }

export function updateWires(state, setState, mousePosition) {
    console.log('WireFuncs > updateWire() : state = ', state)

    const wires = state.wires
    console.log('WireFuncs > updateWire() : wires = ', wires)

    const wireIds = Object.keys(wires)        
    // console.log('WireFuncs > updateWire() : wireIds = ', wireIds)
    // console.log('WireFuncs > updateWire() : wireIds.length = ', wireIds.length)

    if (!wireIds.length) return 

    let wireChanges = {}
    let wireChange = {}

    wireIds.forEach(wireId => {

        console.log('WireFuncs > updateWire() : wireId = ', wireId)
        
        let fromTerminalId = wireId.split('_')[0]
        console.log('WireFuncs > updateWire() : fromTerminalId = ', fromTerminalId)

        if (wireId.includes('floatingTerminal')) {

            console.log('WireFuncs > updateWire() : updating floating terminal')

            const extreme = fromTerminalId === 'floatingTerminal' ? 'from' : 'to'

            wireChange = {
                [wireId]: {
                    $merge: {
                        [extreme]: { x: mousePosition.x, y: mousePosition.y }
                    }
                }
            }
        }
        else {

            if (!wireId.includes('Node')) {
                // console.log('WireFuncs > updateWire() : updating wiredId = ', wireId)

                const toTerminalId = wireId.split('_')[1]

                const fromTerminal = document.getElementById(fromTerminalId)
                const toTerminal = document.getElementById(toTerminalId)

                const relativePointFrom = getRelativeXY(
                    fromTerminal.x2.baseVal.value, 
                    fromTerminal.y2.baseVal.value, 
                    document.getElementById('svg'), 
                    fromTerminal
                )

                const relativePointTo = getRelativeXY(
                    toTerminal.x1.baseVal.value, 
                    toTerminal.y1.baseVal.value, 
                    document.getElementById('svg'), 
                    toTerminal
                )

                wireChange = {
                    [wireId]: {
                        $merge: {
                            from: { x: relativePointFrom.x, y: relativePointFrom.y },
                            to: { x: relativePointTo.x, y: relativePointTo.y }
                        }
                    }
                }
            }
            else if (wireId.includes('Node')) {
                // console.log('WireFuncs > updateWire() : updating wiredId = ', wireId)

                fromTerminalId = wireId.split('_')[0]
                let toTerminalId = wireId.split('_')[1]

                // if (fromTerminalId.includes('Node'))    fromTerminalId = fromTerminalId+'Body'
                // else if (toTerminalId.includes('Node'))    toTerminalId = toTerminalId+'Body'

                const fromTerminal = document.getElementById(fromTerminalId)
                const toTerminal = document.getElementById(toTerminalId)

                console.log('WireFuncs > updateWire() : fromTerminal = ', fromTerminal)
                console.log('WireFuncs > updateWire() : toTerminal = ', toTerminal)


                // const fromTerminal = document.getElementById(
                //     fromTerminalId.includes('Node') 
                //         ? fromTerminalId+'Body'
                //         : fromTerminalId
                // )
                // const toTerminal = document.getElementById(
                //     toTerminalId.includes('Node') 
                //         ? toTerminalId+'Body'
                //         : toTerminalId
                // )

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
            
                    console.log('GateFuncs > updateWire() : fromTerminalId = ', fromTerminalId)

                    console.log('GateFuncs > updateWire() : fromTerminal = ', fromTerminal)
            
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
            
                    console.log('GateFuncs > updateWire() : toTerminal = ', toTerminal)
            
                    relativePointTo = getRelativeXY(
                        toTerminal.cx.baseVal.value, 
                        toTerminal.cy.baseVal.value, 
                        document.getElementById('svg'), 
                        toTerminal
                    )
                }



                wireChange = {
                    [wireId]: {
                        $merge: {
                            from: { x: relativePointFrom.x, y: relativePointFrom.y },
                            to: { x: relativePointTo.x, y: relativePointTo.y }
                        }
                    }
                }
            }
        }

        wireChanges = { ...wireChanges, ...wireChange }

        // console.log('WireFuncs > updateWire : wireChanges = ', wireChanges)
        setState(update(state, { wires: wireChanges }))
    })
}