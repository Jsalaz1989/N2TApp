import React from 'react'

import BaseTile from './BaseTile'

import Typography from '@material-ui/core/Typography'


const DobotTile = () => {

    const slides = {
		0: {
			type: 'image',
			src: 'dobot/dobot0.jpg',
			description: 'Drawing an arc on a piece of paper'
		},
		1: {
			type: 'image',
			src: 'dobot/dobot1.jpg',
			description: 'The front page of the exercise packet'
		},
		2: {
			type: 'image',
			src: 'dobot/dobot2.jpg',
			description: 'The topics covered in the packet'
		},
		3: {
			type: 'image',
			src: 'dobot/dobot3.jpg',
			description: 'An example of an exercise in direct kinematics'
		},
		4: {
			type: 'image',
			src: 'dobot/dobot4.jpg',
			description: 'The robot can be controlled through Matlab or via its proprietary software'
		},
		5: {
			type: 'image',
			src: 'dobot/dobot5.jpg',
			description: 'The designated trajectory'
		},
		6: {
			type: 'image',
			src: 'dobot/dobot6.jpg',
			description: '...and the code to execute it'
		},
	}

    const Content = () => {
        return (
            <div>
				<Typography paragraph>
					Our robotics professor asked a colleague and I to produce a series of laboratory exercises for his undergraduate classes.
					The university had just purchased a couple of Dobot Magician robotic arms and we were in charge of finding out how it worked
					and how we could make students suffer with it. 
                </Typography>
                <Typography paragraph> 
                   	We came up with exercises regarding the robot's direct and inverse kinematics to execute simple routines such as drawing an arc
					on a piece of paper. We also delved a bit into the Jacobian matrices to study the robot's velocities and we ultimately
					asked the students to create a little process to pick up an item, manipulate and move it around in a certain trajectory, to finally
					drop the object in a specified spot. The robot was controlled through both its proprietary software as well as through Matlab scripts
					accessing the vendor's API.
				</Typography>
				<Typography paragraph> 
                   	I'm a strong believer in learning with real-life practice and I was glad to apply the knowledge gained in my robotics course
					to this little robot. I'm even more glad to have communicated with the Machine and I, for one, welcome our new robot overlords.
				</Typography>
            </div>
        )
    }

    return (
        <BaseTile 
            src="../../../public/images/dobot/dobot0.jpg" 
            title='Robotics Lab'
            subtitle="Master's Internship"
            dialogContent={<Content />}
            slides={slides}
        />
    )
}


export default DobotTile