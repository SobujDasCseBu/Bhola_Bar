import React, { useEffect, useState } from 'react'
import { getBaseAPIRootUrl } from '../../utils/helper'
import ImageViewer from './ImageViewer'

const ImageCard = ({ album, subFolder }) => {
  const [isViewerOpened, setIsViewerOpened] = useState(false)

  useEffect(() => {
    // if (isViewerOpened) {
    //   document.body.style.overflow = 'hidden'
    //   document.body.style.height = '100vh'
    // } else {
    //   document.body.style.overflow = 'initial'
    //   document.body.style.height = 'initial'
    // }
  }, [isViewerOpened])

  const handleImageViewerOpen = (e) => {
    const _elem = e.target
    if (
      _elem.classList.contains('times-icon') ||
      _elem.parentElement.classList.contains('times-icon') ||
      _elem.parentElement.parentElement.classList.contains('times-icon')
    ) {
      console.log('it is times icon')
    } else {
      console.log('elem: ', _elem)
      setIsViewerOpened(true)
    }
  }

  const getImgUrl = () =>
    getBaseAPIRootUrl() +
    subFolder +
    '/' +
    album._id +
    '_' +
    album.images?.[0].index +
    album.images?.[0].extension

  return (
    <div className="image-card-container" onClick={handleImageViewerOpen}>
      <ImageViewer
        open={isViewerOpened}
        setIsOpen={setIsViewerOpened}
        album={album}
        subFolder={subFolder}
      />
      <span className="card-count">{album.images.length} Photos</span>
      <img src={getImgUrl()} alt={album.title} />
      <h4 className="card-footer">{album.title}</h4>
    </div>
  )
}

export default ImageCard
