import React, { useState } from 'react'

import ComponentsDrawer from './ComponentsDrawer'

import theme from '../../theme' 

import Paper from '@material-ui/core/Paper'

import './Build.css'



import DnDApp from './DnD/DnDApp'

import Grid from '@material-ui/core/Grid'

import UpArrow from '@material-ui/icons/KeyboardArrowUp'
import DownArrow from '@material-ui/icons/KeyboardArrowDown'
import Save from '@material-ui/icons/Save'
import PlayArrow from '@material-ui/icons/PlayArrow'



import IconButton from '@material-ui/core/IconButton'

import Input from '@material-ui/core/Input'


export default () => {

	const [shift, setShift] = useState(0)
	// const [dragAreaVisible, setDragAreaVisible] = useState(false)

	const percent = 0.6
	// const factor = 0.9
	// let gateHeight = 900*0.13
	// let gateWidth = 1600*0.13

	const styles = {
		header: {
			backgroundColor: theme.palette.primary.main,
			// minHeight: '90vh',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'top',
			color: theme.palette.primary.contrastText,
			marginLeft: shift,
			paddingTop: 30,
		},
		headerTitle: {
			fontSize: 'calc(14px + 2vmin)',
			textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
			position: 'relative',
			top: '-35px',
		},
		headerSubtitle: {
			fontSize: 'calc(6px + 2vmin)',
			position: 'relative',
			top: '-55px',
		},
		// logo: {
		// 	// height: gateHeight,
		// 	// width: gateWidth,
		// 	pointerEvents: 'auto',
		// 	// cursor: 'grab',
		// 	fill: theme.palette.primary.light,
		// 	position: 'absolute',
		// 	zIndex: 99998,
		// },
		paper: {
			// top: -30, 
			width: 1600*percent, 
			height: 900*percent, 
			position: 'relative', 
			// zIndex: 9999, 
			display: 'flex', 
			alignItems: 'center', 
			justifyContent: 'center',
			textAlign: 'center',
			marginTop: 5,
			marginBottom: 5,
		},
		// svg: { 
		// 	backgroundColor: 'transparent', 
		// 	borderStyle: dragAreaVisible ? 'dashed' : 'hidden', 
		// 	// borderStyle: 'dashed', 
		// 	borderRadius: 3, 
		// 	borderWidth: 1, 
		// 	borderColor: theme.palette.primary.light, 
		// 	width: 1600*percent*factor, 
		// 	height: 900*percent*factor, 
		// 	display: 'flex', 
		// 	justifyContent: 'center',
		// 	overflow: 'overlay' 
		// }
	}	
	
	function handleDragOver(evt) {
		evt.preventDefault()
		// setDragAreaVisible(true)
	}

	const Row = ({ columns }) => (
		<Grid container spacing={0} justify='space-around' alignItems='center'>
			<Grid item className='viewGridMed' md={3} children={columns[0]} />
			<Grid item className='viewGridMed' md={6} children={columns[1]} />
			<Grid item className='viewGridMed' md={3} children={columns[2]} />
		</Grid>
	)

	const [inputs, setInputs] = useState({}) 
	const [outputs, setOutputs] = useState({}) 

	function handleClick(title, incDec) {
		if (title === 'Inputs') {

			let newInputs = inputs
			let numInputs = Object.keys(inputs).length

			if (incDec === 'inc') {

				if (numInputs === 16) return

				numInputs++
				newInputs['in'+numInputs.toString()] = 0
			}
			else if (incDec === 'dec') {
				delete newInputs['in'+numInputs.toString()]
			}
				
			console.log('Build > handleChange() : newInputs = ', newInputs)
			setInputs({ ...newInputs })
		}
		else if (title === 'Outputs') {

			let newOutputs = outputs
			let numOutputs = Object.keys(outputs).length

			if (incDec === 'inc') {

				if (numOutputs === 16) return

				numOutputs++
				newOutputs['out'+numOutputs.toString()] = numOutputs % 10 //0	
			}
			else if (incDec === 'dec') {
				delete newOutputs['out'+numOutputs.toString()]
			}

			console.log('Build > handleChange() : newOutputs = ', newOutputs)
			setOutputs({ ...newOutputs })
		}
	}

	const TerminalHeadings = ({ title, type }) => (
		<Grid container justify='center' alignItems='center' spacing={8}>
			<Grid item>
				<Grid container direction='column' justify='center'>
					<Grid item><IconButton children={<UpArrow fontSize='small' />} size='small' onClick={()=>handleClick(title, 'inc')} /></Grid>
					<Grid item>{Object.keys(type).length}</Grid>
					<Grid item><IconButton children={<DownArrow fontSize='small' />} size='small' onClick={()=>handleClick(title, 'dec')} /></Grid>
				</Grid>
			</Grid>
			<Grid item>{title}</Grid>
		</Grid>
	) 

	const Inputs = ({ name }) => {

		console.log('length = ', name.length)

		return (<svg width='100' height='10' viewBox='0 0 100 10'>
			<text                
				// id={id+'Text'}
				// strokeWidth='1'
				x={name.length == 3 ? '10' : '4'} y='80%' 
				fontSize='11' 
				// fontWeight='100'
				fill='grey'  
			>
				{name}
			</text>
			<text                
				// id={id+'Text'}
				// strokeWidth='1'
				x='40' y='90%' 
				fontSize='12' 
				// fontWeight='100'
				fill='white'  
			>
				{inputs[name]}
			</text>
			<line 
				id={name} 
				x1='60' y1='5' x2='100' y2='5' 
				stroke='black'
				strokeWidth='5'
			/>  
		</svg>)
	}

	const Outputs = ({ name }) => (
		<svg width='100' height='10' viewBox='0 0 100 10'>
			<line 
				id={name} 
				x1='0' y1='5' x2='40' y2='5' 
				stroke='black'
				strokeWidth='5'
			/>  
			<text                
				// id={id+'Text'}
				// strokeWidth='1'
				x={name.length == 3 ? '56' : '52'} y='80%' 
				fontSize='11' 
				// fontWeight='100'
				fill='grey'  
			>
				{name}
			</text>
			<text                
				// id={id+'Text'}
				// strokeWidth='1'
				x='85' y='90%' 
				fontSize='12' 
				// fontWeight='100'
				fill='white'  
			>
				{outputs[name]}
			</text>
		</svg>
	)

	const Terminals = ({ inOuts }) => {
		
		if (Object.keys(inOuts).length === 0) return null
		
		const type = Object.keys(inOuts)[0].includes('in') ? 'in' : 'out'

		if (type === 'in') {
			return (
				<Grid container direction='column' justify='center' alignItems='center' className='viewGridMed'>
					{Object.keys(inOuts).map(child => <Grid item className='viewGridSmall' style={{ verticalAlign: 'center' }} key={child} children={<Inputs name={child} />} />)}
				</Grid>
			)
		}
		else if (type === 'out') {
			return (
				<Grid container direction='column' justify='center' alignItems='center' className='viewGridMed'>
					{Object.keys(inOuts).map(child => <Grid item className='viewGridSmall' key={child} children={<Outputs name={child} />} />)}
				</Grid>
			)
		}	
	}

	const [inputValue, setInputValue] = useState('')

	function validateInputs(val) {
		console.log('Build > validateInputs() : val = ', val)

		const isBool = /^[0-1]+$/.test(val)
		console.log('Build > validateInputs() : isBool = ', isBool)

		const isEmpty = val === ''
		console.log('Build > validateInputs() : isEmpty = ', isEmpty)

		if (!isBool && !isEmpty) return	


		let newInputs = inputs
		for (let i = 0; i < val.length; i++) {
			console.log('Build > validateInputs() : i = ', i)

			newInputs['in'+(i+1).toString()] = Number(val[val.length-1-i])
		}	

		setInputValue(val)
		setInputs({ ...newInputs })
	}

	const TerminalValues = ({ title }) => {

		if (title === 'Inputs')
			return <Input autoFocus inputProps={{ style: {textAlign: 'center'}, maxLength: Object.keys(inputs).length }} value={inputValue} onChange={evt=>validateInputs(evt.target.value)}></Input>
		else if (title === 'Outputs') {

			let val = ''
			const outputsVals = Object.values(outputs)
			const numOutputs = outputsVals.length

			for (let i = 0; i < numOutputs; i++) {

				val = val.concat(outputsVals[numOutputs-1-i])
				console.log('Build > TerminalValues : ')

			}
			console.log('Build > TerminalValues : val = ', val)

			return <Input readOnly inputProps={{ style: {textAlign: 'center'} }} value={val}></Input>
		}
	}

	console.log('Build > inputs = ', inputs)

	const SaveButton = () => (
		<IconButton children={<Save fontSize='large' />} onClick={()=>console.log('trying to save...')} />
	)

	const PlayButton = () => (
		<IconButton children={<PlayArrow fontSize='large' />} onClick={()=>console.log('trying to run...')} />
	)

	return (
		<div style={styles.header} onDragOver={evt=>handleDragOver(evt)}>
			<ComponentsDrawer setShift={setShift} />
			<Paper style={styles.paper}>
                <Grid container direction='column' justify='space-between' spacing={0} className='viewGridLarge' style={{ height: "100%", paddingBottom: 20 }}>
                    <Row columns={[<TerminalHeadings title='Inputs' type={inputs} />, <SaveButton />, <TerminalHeadings title='Outputs' type={outputs} />]} />
					<Row columns={[<Terminals inOuts={inputs} />, <DnDApp />, <Terminals inOuts={outputs} />]} />
					<Row columns={[<TerminalValues title='Inputs' />, <PlayButton />, <TerminalValues title='Outputs' />]} />
                </Grid>
			</Paper>
		</div>
	)
}