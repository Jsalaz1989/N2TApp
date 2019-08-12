import React from 'react'

import { DndProvider } from 'react-dnd'
import MouseBackEnd from 'react-dnd-mouse-backend'

// import NestedTargets from './WithDragPreview'
import DragPreview from './DragPreview'
import Target from './Target'


export default ({ dragAreaVisible }) => (
    // <div style={{ display: 'flex', height: '50vh', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <DndProvider backend={MouseBackEnd}>
            <Target hideSourceOnDrag={false} />
            <DragPreview />
        </DndProvider>
    // </div>
)