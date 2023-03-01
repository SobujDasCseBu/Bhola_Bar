import React, { useEffect, useState } from 'react'
import { fetchUtils } from '../apis/utils'
import slider1 from '../assets/slider/slider1.jpg'
import slider2 from '../assets/slider/slider2.jpg'
import slider3 from '../assets/slider/slider3.jpg'
import slider4 from '../assets/slider/slider4.jpg'
import slider5 from '../assets/slider/slider5.jpg'
import { getBaseAPIRootUrl } from '../utils/helper'
import Spinner from './Spinner'
// images must be an array of urls , if using Next JS this could something like
// const images = ['/img/img1.png', '/img/img2.png', '/img/img3.png']
// images must be an array of urls , if using Next JS this could something like
// const images = ['/img/img1.png', '/img/img2.png', '/img/img3.png']

const Carousel = () => {
  const [imagesLoading, setImagesLoading] = useState(true)
  const [images, setImages] = useState([])

  useEffect(() => {
    initFetch()
  }, [])

  const initFetch = async () => {
    const _utils = await fetchUtils()
    const _images = _utils?.home?.sliderImages || []
    setImages(_images)
    setImagesLoading(false)
  }

  return (
    <>
      {imagesLoading ? (
        <Spinner />
      ) : (
        <div
          id="carouselExampleControls"
          class="carousel slide relative"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner relative w-full overflow-hidden">
            {images.length === 0 ? (
              <div class="carousel-item active relative float-left w-full">
                <img src={slider1} class="block w-full" alt="Wild Landscape" />
              </div>
            ) : (
              images.map((_image, _idx) => (
                <div class={`carousel-item relative float-left w-full ${_idx === 0 ? ' active ' : ''}`}>
                  <img
                    src={getBaseAPIRootUrl() + `home-slider/${_image.index + _image.extension}`}
                    class="block w-full"
                    alt="Wild Landscape"
                  />
                </div>
              ))
            )}
          </div>

          <button
            class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              class="carousel-control-prev-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              class="carousel-control-next-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      )}
    </>
  )
}

export default Carousel
