import React from 'react'

import BaseTile from './BaseTile'

import Typography from '@material-ui/core/Typography'


const BollosTile = () => {

    const slides = {
		0: {
			type: 'image',
			src: 'bollos/wincc.jpg',
			description: 'SCADA with Siemens WinCC'
		},
		1: {
			type: 'image',
			src: 'bollos/grafcet.jpg',
			description: 'Grafcet diagram of the state machine'
		},
	}

    const Content = () => {
        return (
            <div>
				<Typography paragraph>
					This project involved programming a real PLC (Siemens 313C) with STEP7. It can be controlled manually with a physical interface, although it is best monitored and 
					controlled remotely with a WinCC front end.
				</Typography>	
				<Typography paragraph>
					Nowadays I would hope to upgrade to Siemen's TIA Portal for a smoother integration with SCADA.
				</Typography>	
            </div>
        )
    }

    return (
        <BaseTile 
            src="../../../public/images/bollos/wincc.jpg" 
            title='Industrial Automation'
            subtitle='Semester Project'
            dialogContent={<Content />}
            slides={slides}
        />
    )
}


export default BollosTile