import React from "react"
import ImageViewerC from "../../components/image-viewer/ImageViewerC"
import { getBaseAPIRootUrl } from "../../utils/helper"

const NewsDetails = ({ news, setSelectedNews }) => {



  const getImgUrls = (_images) => _images.map((_it) => `${getBaseAPIRootUrl()}news/${news._id}_${_it.index + _it.extension}`)

  return (
    <div className="news-details">
      <div className="news-header">
        <button
          className="bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-2 px-4  "
          onClick={() => setSelectedNews({})}
        >
          Back
        </button>
      </div>
      <div className="news-body">
        <div className="news-title my-3">
          <h3>{news.title}</h3>
        </div>
        <ImageViewerC images={getImgUrls(news.images)}/>
        <div className="news-desc my-3">
          <p>{news.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NewsDetails
