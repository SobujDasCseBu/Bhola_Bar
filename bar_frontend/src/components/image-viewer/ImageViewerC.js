import React, { useEffect, useState, useRef } from 'react'
import CaretLeftFill from '../../assets/icons/CaretLeftFill'
import CaretRightFill from '../../assets/icons/CaretRightFill'
import '../../assets/styles/image-viewer-c.css'


const ImageViewerC = ({
  images
}) => {

  const _sliderRef = useRef(null)
  const sliderIntervalRef = useRef(null)

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    initSliderInterval()
    
    return () => {
      console.log('interval cleared')
      clearInterval(sliderIntervalRef.current)
    }
  }, [])

  const initSliderInterval = () => {
    clearInterval(sliderIntervalRef.current)
    sliderIntervalRef.current = setInterval(() => {
      // console.log('internal init currentIndex: ', currentIndex)
      // console.log('internal init images.length: ', images.length)
      // handleSlideClick(currentIndex + 1)
      setCurrentIndex(currentIndex => currentIndex + 1 !== images.length ? currentIndex + 1 : 0)
    }, 4000)
  }

  useEffect(() => {
    _sliderRef.current.style.marginLeft = `-${currentIndex * 650}px`
  }, [currentIndex])

  const handleSlideClick = (move) => {
    const _newIndex = currentIndex + move
    if (_newIndex !== -1 && _newIndex !== currentIndex.length) {
      // _sliderRef.current.style.marginLeft = `-${_newIndex * 650}px`
      setCurrentIndex(_newIndex)
    } else {
      setCurrentIndex(0)
    }
  }
  return (
    <div
      className={`image-viewer-container`}
    >
      <div className='image-viewer-inner-pre'>
        <div className="image-viewer-inner">

          <div
            className="slider-body"
            style={{
              width: `calc(650px * ${images.length}`
            }}
            ref={_sliderRef}
          >
            {images.map((_item, _in) => (
              <div className="slider-body-item" key={_in}>
                <img src={_item} alt="News"/>
              </div>
            ))}

          </div>
          {currentIndex !== 0 && (
            <span
              className='arrow left-arrow'
              onClick={() => handleSlideClick(-1)}
            >
              <CaretLeftFill />
            </span>
          )}
          {currentIndex !== images.length - 1 && (
            <span
              className='arrow right-arrow'
              onClick={() => handleSlideClick(1)}
            >
              <CaretRightFill />
            </span>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default ImageViewerC