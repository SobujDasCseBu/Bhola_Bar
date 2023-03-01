import React, { useEffect, useState, useRef } from 'react'
import CaretLeftFill from '../../assets/icons/CaretLeftFill'
import CaretRightFill from '../../assets/icons/CaretRightFill'
import TimesIcon from '../../assets/icons/TimesIcon'
import { getBaseAPIRootUrl } from '../../utils/helper'

const ImageViewer = ({
  open,
  setIsOpen,
  album,
  subFolder
}) => {

  const _sliderRef = useRef(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderIntervalRef, setSliderIntervalRef] = useState(null)

  useEffect(() => {
    if (!sliderIntervalRef && open) {
      initSliderInterval()
      console.log('sliderIntervalRef: ', sliderIntervalRef)
    } else {
      clearInterval(sliderIntervalRef)
    }
    
    return () => {
      clearInterval(sliderIntervalRef)
    }
  }, [open])

  const initSliderInterval = () => {
    clearInterval(sliderIntervalRef)
    setSliderIntervalRef(setInterval(() => {
      console.log('internal init currentIndex: ', currentIndex)
      // handleSlideClick(currentIndex + 1)
      setCurrentIndex(currentIndex => currentIndex + 1 !== album.images.length ? currentIndex + 1 : 0)
    }, 4000))
  }

  useEffect(() => {
    _sliderRef.current.style.marginLeft = `-${currentIndex * 650}px`
  }, [currentIndex])

  const handleSlideClick = (move) => {
    const _newIndex = currentIndex + move
    if (_newIndex !== -1 && _newIndex !== album.images.length) {
      // _sliderRef.current.style.marginLeft = `-${_newIndex * 650}px`
      setCurrentIndex(_newIndex)
    } else {
      setCurrentIndex(0)
    }
  }


  const getImgUrl = (_image) =>
    getBaseAPIRootUrl() +
    subFolder +
    '/' +
    album._id +
    '_' +
    _image.index +
    _image.extension


  return (
    <div
      className={`image-viewer-container ${open ? '' : 'hidden'}`}
    >
      <div className='image-viewer-inner-pre overflow-y-scroll   	'>
        <h4 className='top-title'>
          <span>{album.title}</span>
          <span
            className='times-icon'
            onClick={(e) => {
              setIsOpen(false)
            }}
          >
            <TimesIcon />
          </span>
        </h4>
        <div className="image-viewer-inner">

          <div
            className="slider-body	 "
            style={{
             
              width: `calc(650px * ${album.images.length}`
            }}
            ref={_sliderRef}
          >
            {album.images.map((_item, _in) => (
              <div className="slider-body-item" key={_in}>
                <img className='object-cover max-h-[550px]	' src={getImgUrl(_item)} alt={album.title} />
                <h4 className='bottom-title'>{album.title}</h4>
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
          {currentIndex !== album.images.length - 1 && (
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

export default ImageViewer