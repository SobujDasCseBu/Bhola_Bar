import React, { useEffect, useState } from 'react'
import CardHeader from '../../components/CardHeader'
import MemberSearch from '../../components/Mainbody/MemberSearch'
import VoterSearch from '../../components/Mainbody/VoterSearch'

import '../../assets/styles/gallery.css'
import ImageCard from './ImageCard'
import Notice from '../../components/Mainbody/Notice'
import UnderConstruction from '../UnderConstruction'
import { fetchGalleries } from '../../apis/gallery'
import Spinner from '../../components/Spinner'


const Images = () => {
  const [pageStatus, setPageStatus] = useState('construction')
  const [albumLoading, setAlbumLoading] = useState(true)
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    initFetch()
  }, [])

  const initFetch = async () => {
    const _albums = await fetchGalleries()
    setAlbums(_albums.filter((_it) => _it.images.length > 0))
    setAlbumLoading(false)
  }

  return (
    <>
      {pageStatus === 'construction' && false ? (
        <UnderConstruction />
      ) : (
        <div className="container-9-3 custom-container gallery-container">
          <div className="custom-card common-hover">
            <CardHeader title="Photo Gallery" />
            {albumLoading ? (
              <Spinner />
            ) : (
              <div className="custom-card-body">
                {albums.map((_item) => (
                  <ImageCard album={_item} subFolder='gallery' />
                ))}
              </div>
            )}
          </div>
          <div className="custom-column">
            <div className="common-hover card-box-shadow-inset">
              <CardHeader title="Member Search" />
              <MemberSearch />
            </div>

            <VoterSearch />
            <Notice />
          </div>
        </div>
      )}
    </>
  )
}

export default Images
