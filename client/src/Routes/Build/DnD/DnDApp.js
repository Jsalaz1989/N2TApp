import React, { useState } from 'react'

import { DndProvider } from 'react-dnd'
import MouseBackEnd from 'react-dnd-mouse-backend'

import DragPreview from './DragPreview'
import Target from './Target'


export default () => {

    const [state, setState] = useState({
        gates: {}, 
		wires: {}
    })

    return (
        <DndProvider backend={MouseBackEnd}>
            <Target hideSourceOnDrag={false} state={state} setState={setState} />
            <DragPreview state={state} setState={setState} />
        </DndProvider>
    )
}