import React, { useEffect, useState } from "react"
import CardHeader from "../CardHeader"
import newsImage from "../../assets/images/newsImage.jpg"
import { fetchNewses } from "../../apis/news"
import { Link } from "react-router-dom"
import { DDMMYYYY, getBaseAPIRootUrl } from "../../utils/helper"
import "./../../assets/styles/news-sidebar.css"
import moment from "moment"

const News = () => {
  const [newses, setNewses] = useState([])

  useEffect(() => {
    initFetch()
  }, [])

  const initFetch = async () => {
    const _newses = await fetchNewses()
    const _sortedNews = _newses
      .map((_it) => ({ ..._it, sortingDate: moment(_it.readableDate, DDMMYYYY).format('YYYY-MM-DD') }))
      .sort((_a, _b) => _a.sortingDate > _b.sortingDate ? -1 : _a.sortingDate < _b.sortingDate ? 1 : 0)
    setNewses(_sortedNews)
  }
  const getImgUrl = ({ _id, images }) =>
    images.length > 0
      ? `${getBaseAPIRootUrl()}news/${_id}_${
          images[0].index + images[0].extension
        }`
      : newsImage
  return (
    <div className="sidebar-news-container common-hover  box-border shadow-[0px_0px_5px_rgb(162,123,108)] mb-[30px] rounded-[3px] card-box-shadow-inset">
      <CardHeader classNm={"text-18"} title={"News"} />
      <div className="h-[350px] common-hover overflow-y-auto">
        <div className="sidebar-news-items">
          {newses.map((_item) => (
            <Link
              to={`/news?id=${_item._id}`}
              key={_item._id}
              className="sidebar-news-link"
            >
              <div className="sidebar-news-item p-1 pt-0 border-b border-dashed border-light-blue-900">
                <div className="img-left">
                  <img src={getImgUrl(_item)} alt="News" />
                </div>
                <div className="pl-2 img-desc">
                  <div className="text-[13px] sm:text-[15px] lg:text-[13px] leading-[17px] text-[#333]">
                    <p>{_item.title}</p>
                  </div>

                  <div className="text-[11px] sm:text-[12px] lg:text-[10px] text-[#F42A41] p-1 ">
                    <i className="pr-1 fas fa-calendar-alt"></i>
                    {_item.readableDate}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default News
