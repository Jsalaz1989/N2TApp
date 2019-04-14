import React, { useState, Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, browserHistory, Switch, NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

import AddIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';

import theme from '../theme'; 

import ComponentsDrawer from './ComponentsDrawer'

import Button from '@material-ui/core/Button'

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'


const Home = ({ history }) => {

   
    const NavButton = ({ to, text }) => {
        return <Button style={styles.headerButton} component={NavLink} to={to}>{text}</Button>;
    }

	
    const styles = {
        div: {
            backgroundColor: theme.palette.primary.main,
            // backgroundSize: 'cover',
            // position:'relative',
            // width: '100%',
            // height: '100%',
            // flex:'1',
            minHeight: '100vh',
        },
        header: {
            backgroundColor: theme.palette.primary.main,
            // minHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'top',
            color: theme.palette.primary.contrastText,
        },
        headerTitle: {
            fontSize: 'calc(14px + 2vmin)',
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
        },
        headerSubtitle: {
            fontSize: 'calc(6px + 2vmin)',
        },
        headerButton: {
            color: theme.palette.primary.light,
        },
        logo: {
            animation: 'App-logo-spin infinite 20s linear',
            height: '30vmin',
            pointerEvents: 'none',
            animationTextContent: '@keyframes App-logo-spin { from{transform: rotate(0deg);} to{transform: rotate(360deg);} }',
            fill: theme.palette.primary.light,
        },
    }

        
    const logoStyle = {
        ...styles.logo, 
        animationPlayState: window.location.pathname === '/' ? 'running' : 'paused'
	} 

    return (
        <div style={styles.header}>
            {/* <Logo style={logoStyle}/> */}
            <p style={styles.headerTitle}>
                You are at Level 1 
            </p>
            <CircularProgress size={40} variant='static' value={20} thickness={8}/>
            {/* <Progress /> */}
            {/* <Typography style={{ fontSize: '20px' }}>1 / 23 </Typography> */}
            <p style={styles.headerSubtitle}>
                Click <Button style={styles.headerButton} onClick={(evt) => history.push('/build')}>Build</Button> to advance to the next level
            </p>
        </div>
    )
}

export default Home