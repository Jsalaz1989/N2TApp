import React, { useState } from "react";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import { DialogContentText } from '@material-ui/core';

import theme from '../../theme'

const Carousel = ({ slides }) => {


	const [currImgIndex, setCurrImgIndex] = useState(0)

	let mediaWidth = '650px'
	let mediaHeight = '400px'

	const ImageSlide = ({ url }) => {

		let imgFolder = '../../../public/images/'
		let fullPath = imgFolder+url

		const styles = {
			backgroundImage: `url(${fullPath})`,
			backgroundSize: 'contain',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			width: mediaWidth,
			height: mediaHeight,
		}

		return <div className="image-slide" style={styles}></div>
	}

	const VideoSlide = ({ url }) => {
		return (
			<iframe 
				width={mediaWidth} 
				height={mediaHeight}
				src={url} 
				frameBorder="0" 
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
				allowFullScreen
				title={url}
			/>
		)
	}

	let slidesLength = Object.keys(slides).length

	const Arrow = ({ direction }) => {
	
		const transition = (direction) => {

			let lastIndex = slidesLength - 1
			let shouldResetIndex
			let index
	
			if (direction === 'left')
			{
				shouldResetIndex = currImgIndex === 0
				index = shouldResetIndex ? lastIndex : currImgIndex - 1
			}
			else if (direction === 'right')
			{
				shouldResetIndex = currImgIndex === lastIndex
				index = shouldResetIndex ? 0 : currImgIndex + 1
			}

			setCurrImgIndex(index)
		}

		let styles = {
			position: 'absolute', 
			top: '50%', 
			zIndex: '3',
			color: theme.palette.primary.light,
		}
		if (direction === 'left') 		styles.left = '35px'
		else if (direction === 'right')	styles.right = '35px'
		
		return (
			<div
				style={styles}
				onClick={() => transition(direction)}
			>
				{direction === 'right' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</div>
		)
	}

	return (
		<span>
			{/* <DialogContentText style={{ position: 'relative', maxWidth: mediaWidth, left: '105px', paddingBottom: '10px'}}>{slides[currImgIndex].description}</DialogContentText> */}
			<div className="carousel" style={{ 'position': 'relative', 'zIndex': '1', display: 'flex', justifyContent: 'center'}}>
				{slidesLength > 1 && <Arrow direction="left" />}
				{slides[currImgIndex].type === 'image' && <ImageSlide url={slides[currImgIndex].src} />}
				{slides[currImgIndex].type === 'video' && <VideoSlide url={slides[currImgIndex].src} />}
				{slidesLength > 1 && <Arrow direction="right" />}
			</div>
			<DialogContentText style={{ textAlign: 'center', paddingBottom: '20px' }}>{slides[currImgIndex].description}</DialogContentText>

		</span>
	)
}

export default Carousel