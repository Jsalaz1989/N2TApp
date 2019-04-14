import React from 'react'

import Grid from '@material-ui/core/Grid'


import Typography from '@material-ui/core/Typography'

import theme from '../../theme'

import { NavLink } from 'react-router-dom'

import Button from '@material-ui/core/Button'

import Divider from '@material-ui/core/Divider';


import styled from "styled-components"

import Tooltip from '@material-ui/core/Tooltip'

import './About.css'

import RobotTile from './RobotTile'
import SolarTile from './SolarTile'
import RPATile from './RPATile'
import BollosTile from './BollosTile'
import DobotTile from './DobotTile'



const About = ({ history }) => {




    let leftJustify = '100px'


    const styles = {
        avatar: {
            // position: 'absolute', 
            // left: '-500', // r -30, 700, 470
            // top: '70px', // t 90
            height: '200px', 
            width: '200px', 
            borderRadius: '100%',
            // src: '../../public/images/me.jpg',
        },
        header: {
            backgroundColor: theme.palette.primary.main,
            // minHeight: '75vh',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			// justifyContent: 'top',
            color: theme.palette.primary.contrastText,
            marginTop: '30px',
		},
		headerTitle: {
			fontSize: 'calc(20px + 2vmin)',
            textShadow: '-3px 0 black, 0 3px black, 3px 0 black, 0 -3px black',
            // alignItems: 'center',
            // position: 'absolute',
            // left: leftJustify,
		},
		headerSubtitle: {
            display: 'flex', 
            alignItems: 'center',
		},
		logo: {
			animation: 'App-logo-spin infinite 20s linear',
			height: '30vmin',
			pointerEvents: 'none',
			animationTextContent: '@keyframes App-logo-spin { from{transform: rotate(0deg);} to{transform: rotate(360deg);} }',
			fill: theme.palette.primary.light,
		},
        highlight: {
            // textShadow: '0 -1px '+theme.palette.primary.light,
            textShadow: '-3px 0 black, 0 3px black, 3px 0 black, 0 -3px black',
        },
        contact: {
            fontSize: '15px',
            position: 'absolute',
            right: '240px',
            top: '195px',
            textAlign: 'right',
            lineHeight: '3em',
        },
        body: {
            position: 'absolute',
            // display: 'flex',
            top: '420px',
            left: '100px',
            // backgroundColor: theme.palette.primary.main,
        },
        tiles: {
            // overflow: 'scroll',
            // position: 'absolute',
            // paddingBottom: '100px',
            // height: '500px'
        },
        row: {
            width: '100%',
            marginLeft: '0px',
        },
        rowInner: {
            fontSize: '0',
            whiteSpace: 'nowrap',
            overflowX: 'scroll',
            overflowY: 'visible',
            height: '550px',
            marginBottom: '10px',
            paddingLeft: '100px'
        },
    }

    let myImage = '../../public/images/me.jpg'
        
    const NavButton = ({ to, text }) => {
        return <Button to={to}>{text}</Button>;
    }

    const MyButton = styled(Button)`
        && {
            padding-right: 0;
            padding-left: 0;
            max-width: 5px;

            // text-align: right;

            & .label {
                margin-right: 0;
                padding-right: 0;
                padding-left: 0;
                text-align: right;
        }
    `;

    // document.getElementById("myDIV").style.display = "none";


    function copyEmail(ev) {
        let email = ev.currentTarget.children[0].innerHTML
        let dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute('value', email);
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy); 
    }

    function chooseScrollFunc() {
        let isSafari = navigator.userAgent.indexOf("Safari") > -1
        let isIE = /*@cc_on!@*/false || !!document.documentMode
        let isEdge = !isIE && !!window.StyleMedia

        if (isSafari || isEdge || isIE) 
            window.scrollTo(0, 1000)
        else (
            window.scrollTo({
                'behavior': 'smooth',
                'left': 0,
                'top': 1000,
            })
        )
    }

    setTimeout(() => window.scrollTo({
        'behavior': 'smooth',
        'left': 0,
        'top': 0,
    }), 100)    // need about 100 ms for it to work smoothly on Edge

    return (
         <div>
            <div style={styles.header}>
                <span className='avatarContainer'>
                    <img className='avatar' style={styles.avatar} src={myImage} alt='Image not found' />
                </span>
                <p className='title' style={styles.headerTitle}>Jaime Salazar Lahera</p>                   
                <div className='subtitle' style={styles.headerSubtitle}>
                    <span className='revealCursive' style={{ fontFamily: 'Monsieur La Doulaise, cursive',  fontSize: '65px' }}>
                        &nbsp;Master
                    </span>
                    <div style={{ marginLeft: '25px', marginRight: '25px', fontSize: '25px' }}>
                        <span className='revealO'>o</span>
                        <span className='revealF'>f</span>
                    </div> 
                    {/* <span class='type'>of</span> */}
                    <div id='stampContainer'>
                        <code id='stampPrint' style={{ fontSize: '40px', padding: '4px' }}>Engineering</code>
                        <code id='stamp' className='stamp' style={{ fontSize: '40px', padding: '4px' }}>Engineering</code>
                    </div>
                </div>
                <span style={styles.contact}>
                    <span className='cv'>
                        Feel free to take a look at my &nbsp;
                            <Tooltip title='Preview my CV' placement="right">
                                <Button style={{ minWidth: 40 }} onClick={() => history.push('/cv')} to='/cv'>C.V.</Button>
                            </Tooltip>
                    </span>
                    <br />
                    <span className='linkedIn'>
                        And you may also find me on &nbsp;
                            <Tooltip title='Open in new tab' placement="right">
                                <Button target="_blank" href='https://www.linkedin.com/in/jaime-salazar-lahera/'>LinkedIn</Button>
                            </Tooltip>
                    </span>
                    <br />
                    <span className='email'>
                        Or send me an email to &nbsp;
                            <Tooltip title='Copy to clipboard' placement="right">
                                <Button onClick={(ev) => copyEmail(ev)}>jsalaz1989@gmail.com</Button>
                            </Tooltip>
                    </span>
                </span>
			</div>
            <div className='content' style={styles.body}>
                <Typography paragraph>
                    Despite the tongue-in-cheek introduction, I <i>did</i> recently graduate from a '<span style={styles.highlight}>Máster en Ingeniería Electromecánica</span>' 
                    from UPM, here in Madrid, and I am now looking for work in the city.
                    <br />
                    I'm interested in <span style={styles.highlight}>programming, robotics, automation (particularly RPA), solar energy, and 
                    the environment</span>.
                </Typography>
                <br />
                <Typography paragraph>
                    I claim to be a somewhat capable user of <span style={styles.highlight}>Python, C, and JavaScript</span>, and I can find my way 
                    around <span style={styles.highlight}>shell and Office scripts</span>, as well as <span style={styles.highlight}>UiPath</span> and general automation. 
                    <br />
                    In particular, this website consists of a <span style={styles.highlight}>Flask</span> back end with a PostgreSQL database and 
                    a <span style={styles.highlight}>React</span> front end in the spirit of a modern-day SPA. 
                    <br />
                    <span style={{ fontSize: '12px', color: 'grey' }}>
                        If you were to log in - guests can test the app with usersame: guest@fake.com, password: password123 - you would see how far along I am on my 
                        webapp hobby project in which I hope 
                        <br />
                        to create an interactive building tool to follow along with the <a style={{ zIndex: 9999 }} href='https://www.nand2tetris.org/' target='_blank'><code>Nand2Tetris</code> course</a>.
                    </span>
                </Typography>
                <br />
                <Typography paragraph>
                    <Button 
                        onClick={chooseScrollFunc}
                        style={{ paddingLeft: 2, paddingRight: 5, minWidth: 40, zIndex: 99 }}
                    >
                    Below</Button> you can see some of my accomplishments and experiences, most recently the <span style={styles.highlight}>agricultural robot</span> constructed and programmed for my two-person Master's project (TFM).
                </Typography>
            </div>
            <div className='tilesContainer'>
                <RobotTile className='tile' />
                <SolarTile className='tile' />
                <RPATile className='tile' />
                <BollosTile className='tile' />
                <DobotTile className='tile' />
            </div>
        </div>
    )
}


export default About