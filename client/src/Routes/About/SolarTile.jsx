import React from 'react'

import BaseTile from './BaseTile'

import Typography from '@material-ui/core/Typography'


const SolarTile = () => {

    const slides = {
		0: {
			type: 'image',
			src: 'solar/coolAndCasual.jpg',
			description: 'At the office, with less hair than now'
		},
		1: {
			type: 'image',
			src: 'solar/withMayor.jpg',
			description: 'Municipal award for most solar installations with the Mayor of Washington, DC'
		},
	}

    const Content = () => {
        return (
            <div>
                <Typography paragraph>
					I began as a solar sales representative, climbing up on rooftops for measurements and designing residential systems to propose to our customers. It was a great
                    forray into the world of technology, consulting, and construction.
                </Typography>
                <Typography paragraph>
                    Over time I gained an interest in the technical side of the office as well as our products. I decided I wanted to understand them better, which led me to
                    embark on my Master's education in the following years. This implied taking a few evening classes for general engineering courses at a local community college 
                    while working (!) so I could start building a solid technical base. When I returned to Madrid I continued this preparatory stage at the 'Universidad Poltécnica de Madrid'
                    to make sure I could
                    be successful in getting my Master's degree.
				</Typography>
				<Typography paragraph>
                    While at this position, in the field, I would help diagnose technical issues in our installations, such as a faulty inverter. 
                    At the office, I learned about our day-to-day tasks and business flows, and I imagined these could be optimized.	So I began playing around with
                    Excel macros (VBA) and simple JavaScript in PDFs to automatically generate proposals, electric utility interconnection applications, and anything I could get my lazy 
                    hands on. Back then I wasn't aware of the booming RPA industry so nowadays I hope to apply Python and JS scripts to my tasks, as well as a proper RPA suite
                    like UiPath or BluePrism.
				</Typography>
            </div>
        )
    }

    return (
        <BaseTile 
            src="../../../public/images/solar/coolAndCasual.jpg" 
            title='PV Sales and Tech Support'
            subtitle='Previous Employment'
            dialogContent={<Content />}
            slides={slides}
        />
    )
}


export default SolarTile