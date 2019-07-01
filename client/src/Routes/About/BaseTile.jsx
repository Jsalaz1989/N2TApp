import React, { useState } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

import Grid from '@material-ui/core/Grid'

import Carousel from './Carousel';



import './BaseTile.css'

const BaseTile = ({ src, title, subtitle, dialogContent, slides }) => {

	const [expanded, setExpanded] = useState(false)

    let duration = '450ms'
    // let tileWidth = 'auto'
    let tileHeight = '300px'


    const styles = {
        tile: {
            position: 'relative',
            display: 'inline-block',
            height: tileHeight,
            fontSize: '20px',
            cursor: 'pointer',
            transition: duration+' all',
        },
        tileImg: {
            width: 'auto',
            objectFit: 'cover',
            height: '100%'
        },
        tileDetails: {
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            top: '0',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 100%)',

        },
        tileTitle: {
            fontSize: '14px',
            color: 'white',
            width: '100%',
            position: 'absolute',
            bottom: '0',
            padding: '0px',
            textAlign: 'center',
            paddingBottom: '5px',
        },
    }


    const TileDialog = ({ title, subtitle, content }) => {

        return (
            <Dialog open={expanded} fullWidth={true} maxWidth={'lg'} onBackdropClick={() => setExpanded(false)} >
                <DialogTitle disableTypography={true}>{title}</DialogTitle>
                <DialogContent>{subtitle}</DialogContent>
                <Grid container direction='row' justify='space-between' wrap='nowrap' alignItems='center'>
                    <Grid item>
                        <DialogContentText style={{ marginLeft: '25px', }}>
                            {content}
                        </DialogContentText>
                    </Grid>
                    <Grid item>
                        <Carousel slides={slides} style={{ bottom: '30px' }}/>
                    </Grid>
                </Grid>
            </Dialog>
        )
    }


    return (
        <div>
            <div className='zoom' style={styles.tile} onClick={() => setExpanded(!expanded)}>
                <img style={styles.tileImg} src={src} alt="" />
                <div style={styles.tileDetails}>
                    <div style={styles.tileTitle}>{title}</div>
                </div>
            </div>
            <TileDialog title={title} subtitle={subtitle} content={dialogContent} />
        </div>
    )
}


export default BaseTile