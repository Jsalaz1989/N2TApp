import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Memory from '@material-ui/icons/Memory';

import Typography from '@material-ui/core/Typography'

import theme from '../theme'

import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton'
import ChevronLeft from '@material-ui/icons/ChevronLeft'


const ComponentsDrawer = ({ setShift }) => {

	const [open, setOpen] = useState(false)

	const [expanded, setExpanded] = useState({ zero: false })

	
	const styles = {
		open: {
			width: 200,
			zIndex: 100,
		},
		closed: {
			// width: '70%',
			// zIndex : -100,
		},
        header: {
			backgroundColor: theme.palette.primary.main,
			// minHeight: '90vh',
			// display: 'flex',
			// flexDirection: 'column',
			// alignItems: 'center',
			// justifyContent: 'top',
			color: theme.palette.primary.contrastText,
		},
		chapter: {
			fontSize: '0.7em'
		},
		component: {

		}
    }	

	function onDragStartFunc(ev) {
		console.log('e.target.id = ', ev.target.id)
		ev.dataTransfer.setData('text/plain', ev.target.id)
	}

	function onDragOverFunc(ev) {
		ev.preventDefault()
	}

	function onDropFunc(ev) {
		ev.preventDefault()
		console.log('onDrop id = ', ev.dataTransfer.getData('text'))
	}

	const ExpandedDrawer = (
		<div>
			<Grid container spacing={8} alignItems='center' justify='space-between'>
				<Grid item><Memory style={{ color: 'white', height: '1.5em', marginLeft: '0.45em' }} /></Grid>
				<Grid item><Typography>My Components</Typography></Grid>
				<Grid item>
					<IconButton onClick={()=> {setOpen(false); setShift(0)}}>
						<ChevronLeft />
					</IconButton>
				</Grid>
			</Grid>
			<List>
				<ListItem button key='Nand Gate' onClick={() => setExpanded({zero: !expanded.zero})}>
					<Typography>0</Typography>
					<ListItemText primary='Nand Gate' />
				</ListItem>
				{expanded.zero && 
					<div style={{ backgroundColor: '#b596c5'}}>
						{/* <ListItem button key='Nand' style={{ left: '41px' }}> */}
						<ListItem button key='Nand'>
							<ListItemText secondary='Nand' id='nand' draggable onDragStart={(e) => onDragStartFunc(e)}/>				
						</ListItem>
						<ListItem button key='Nand2'>
							<ListItemText secondary='Nand2' />			
						</ListItem>
					</div>
				}	
				<Divider />
				{['Basic Gates', 'Arithmetic', 'Memory', 'Machine Language', 'Computer Architecture', 'Assembler'].map((text, index) => (
					<ListItem button key={text}>
						<Typography>{index+1}</Typography>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['Virtual Machine I', 'Virtual Machine II', 'High-Level Language', 'Compiler I', 'Compiler II', 'Operating System', 'More Fun'].map((text, index) => (
					<ListItem button key={text}>
						<Typography>{index+7}</Typography>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	)

	const CollapsedDrawer = (
		<Button style={{ minHeight: '25vh' }} onClick={(evt) => {setOpen(true); setShift(240)}}>
			<Memory style={{ color: 'white', height: '1.5em', transform: 'translate(0px, -60px)'}} />
			<Typography style={{ transform: 'rotate(90deg) translate(20px, 0px)',  position: 'fixed' }} component={'span'}>My Components</Typography> 
		</Button>
	)


	console.log('open = ', open)

	return (
		<div>
			<Drawer style={styles.open} open={true} onClose={() => {console.log('trying'); setOpen(false)}}>
				<div
					tabIndex={0}
					role="button"
					onClick={() => console.log('onClick')}
					onKeyDown={() => console.log('onKeyDown')}
				>
					{open ? ExpandedDrawer : CollapsedDrawer}
				</div>
			</Drawer>
			{/* <div style={{ color: 'white', textAlign: 'center', position: 'absolute', top: '400px', left: '450px', height: '100px', width: '100px', border: "thick solid #FFFFFF"  }} onDragOver={(e) => onDragOverFunc(e)} onDrop={(e) => onDropFunc(e)}>
				Drag here to start building
			</div> */}
		</div>
	)
}

export default ComponentsDrawer;