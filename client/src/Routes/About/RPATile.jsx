import React from 'react'

import BaseTile from './BaseTile'

import Typography from '@material-ui/core/Typography'


const RPATile = () => {

    const slides = {
		0: {
			type: 'image',
			src: 'rpa/diploma0.jpg',
			description: 'Advanced Certification Degree'
		},
		1: {
			type: 'image',
			src: 'rpa/diploma1.jpg',
			description: 'UiPath Fundamentals'
		},
		2: {
			type: 'image',
			src: 'rpa/diploma2.jpg',
			description: 'Proficiency with their admin dashboard (UiPath Orchestrator)'
		},
		3: {
			type: 'image',
			src: 'rpa/diploma3.jpg',
			description: 'Understanding their professional project framework (REFramework) and flows'
		},
		4: {
			type: 'video',
			src: 'https://www.youtube.com/embed/i_Wq2fQJ8BE',
			description: 'Extracting client information to generate a hash code and update the database'
		},
	}

    const Content = () => {
        return (
            <div>
				<Typography paragraph>
					Apart from general Bash, PowerShell, Python, and JS scripting, I can apply a professional RPA suite to many, many tasks.
                </Typography>
                <Typography paragraph> 
                    In particular, UiPath provides a somewhat graphical but mostly VB.NET programming to automate processes involving text, images, forms, etc.
                    I've been pretty impressed with its AI capabilities when extracting information from scanned documents, websites, and even virtual machines. 
				</Typography>
				<Typography paragraph>
                    UiPath offers an Advanced Certification consisting of a timed theoretical and practical exam and this diploma will technically last me until about next year. However, I don't expect
                    the concepts learned will become outdated as I believe the general ideas will remain my RPA base for years. In fact, having taken their courses 
                    has made it very easy to then understand most programs such as BluePrism and Automation Anywhere.
				</Typography>
            </div>
        )
    }

    return (
        <BaseTile 
            src="../../../public/images/rpa/diploma0.jpg" 
            title='Robotic Process Automation (RPA)'
            subtitle='Advanced Certification'
            dialogContent={<Content />}
            slides={slides}
        />
    )
}


export default RPATile