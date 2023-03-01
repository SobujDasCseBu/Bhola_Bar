import React from "react"
import ImageViewerC from "../../components/image-viewer/ImageViewerC"
import { getBaseAPIRootUrl } from "../../utils/helper"

const NoticeDetails = ({ notice, setSelectedNotice }) => {

  const getImgUrls = (_notices) => _notices.map((_it) => `${getBaseAPIRootUrl()}notice/${notice._id}_${_it.index + _it.extension}`)

  return (
    <div className="notice-details">
      <div className="notice-header">
        <button
          className="bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-2 px-4  "
          onClick={() => setSelectedNotice({})}
        >
          Back
        </button>
      </div>
      <div className="notice-body">
        <div className="notice-title">
          <h3>{notice.title}</h3>
        </div>
        <ImageViewerC  images={getImgUrls(notice.images)}/>
        <div className="notice-desc">
          <p>{notice.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NoticeDetails
