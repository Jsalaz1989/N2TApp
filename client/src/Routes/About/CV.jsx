import React, { useState } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import Button from '@material-ui/core/Button'

import Tooltip from '@material-ui/core/Tooltip'

import './CV.css'

import { pdfjs, Document, Page } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; // workaround



const CV = ({ history }) => {

    const [showToolTip, setShowToolTip] = useState(false)

    function timedToolTip() {
        setTimeout(() => setShowToolTip(true), 1000)
        setTimeout(() => setShowToolTip(false), 3000)
    }

    return (
        <Dialog 
            open={true}
            fullWidth={true}
            maxWidth={'md'}
            onBackdropClick={() => history.push('/about')}
        >	
			<DialogTitle>
                <Tooltip title='Click to download my CV' placement="right" open={showToolTip}>
                    <Button href='../public/cv.pdf' download="CV - Jaime Salazar Lahera">Curriculum Vitae</Button>
                </Tooltip>
            </DialogTitle>
			{/* <DialogContent style={{ scrollbarWidth: 'none' }}> */}
			<DialogContent className='noScrollBars'>
                <Document file="../../../public/cv.pdf" >
                    <Page pageNumber={1} width={950} onLoadSuccess={timedToolTip} />
                </Document>
			</DialogContent>
		</Dialog>
    )
}

export default CV