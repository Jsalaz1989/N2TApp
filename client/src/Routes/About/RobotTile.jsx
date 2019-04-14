import React from 'react'

import BaseTile from './BaseTile'

import Typography from '@material-ui/core/Typography'


const RobotTile = () => {

    const slides = {
        0: {
            type: 'image',
            src: 'robot/robot0.jpeg',
            description: 'General view'
        },
        1: {
            type: 'image',
            src: 'robot/robot1.jpeg',
            description: "Using a phone's GPS for autonomous navigation"
        },
        2: {
            type: 'image',
            src: 'robot/robot2.jpeg',
            description: 'A Raspberry Pi handles navigation while the other takes on the sampling'
        },
        3: {
            type: 'image',
            src: 'robot/robot3.jpeg',
            description: 'An MPPT charger replenishing the battery with the solar panels'
        },
        4: {
            type: 'image',
            src: 'robot/robot4.jpeg',
            description: 'A relay and Arduino interrupts allow for an automatic disconnect'
        },
        5: {
            type: 'video',
            src: 'https://www.youtube.com/embed/3SSKflnLTFM',
            description: 'Obstacle avoidance'
        },
        6: {
            type: 'video',
            src: 'https://www.youtube.com/embed/Rk9-UadbINs',
            description: 'Executing a complete cycle around and inside a "farm plot"'
        },
        7: {
            type: 'video',
            src: 'https://www.youtube.com/embed/OWlBNlxA_rI',
            description: 'Farm plot creation'
        },
        8: {
            type: 'video',
            src: 'https://www.youtube.com/embed/FOV5NGDlYEM',
            description: 'Manual mode'
        },
        9: {
            type: 'video',
            src: 'https://www.youtube.com/embed/QPjmQsKv16o',
            description: 'Navigation between rows and a safety stop when confronted with a sudden obstacle'
        },
        10: {
            type: 'video',
            src: 'https://www.youtube.com/embed/L75-gIPdzL8',
            description: 'Cage movement to allow for sampling with the linear actuator'
        },
    }

    const Content = () => {
        return (
            <div>
                <Typography paragraph component={'span'}>
                    The robot is controlled via the website (Flask), storing and reporting data from the SQL database. 
                    The server or user communicates with the robot through MQTT and can execute manual and autonomous operations from the webapp.
                    In autonomous mode, it compares its GPS location using a Raspberry Pi module capable of RTK to navigate by itself to an objective point 
                    designated on the map, avoiding obstacles in its way.        
                </Typography>
                <Typography component={'span'}>
                    It is made up of:       
                    <ul style={{'padding': '1em'}}>
                        <li>2 Arduinos and 2 Raspberry Pis</li>
                        <li>brushed DC motors (12 V)</li>
                        <li>linear actuator</li>
                        <li>servomotors</li>
                        <li>GPS module (Real Time Kinematic mode)</li>
                        <li>soil sensor (temp, humidity, salinity, etc.)</li>
                        <li>ultrasonic sensors</li>
                        <li>magnetometer</li>
                        <li>webcam (for manual teleoperation and for autonomous RGB detection)</li>
                        <li>motorcycle battery (with an automatic shutoff system)</li>
                        <li>solar panels (2 x 12 V = 24 V) and MPPT charger</li>
                    </ul> 
                </Typography>
            </div>
        )
    }

    return (
        <BaseTile 
            src="../../../public/images/robot/robot0.jpeg" 
            title='Autonomous Agricultural Robot'
            subtitle="Master's Project (TFM)"
            dialogContent={<Content />}
            slides={slides}
        />
    )
}


export default RobotTile