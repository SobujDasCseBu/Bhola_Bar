import React, { useState } from 'react'
import CardHeader from '../../components/CardHeader'

import '../../assets/styles/about-us.css'
import missionandvisionImg from '../../assets/images/missionandvision.jpg'
import TwitterIcon from '../../assets/icons/TwitterIcon'
import WhatsappIcon from '../../assets/icons/WhatsappIcon'
import LinkedinIcon from '../../assets/icons/LinkedinIcon'
import FacebookIconF from '../../assets/icons/FacebookIconF'
import MemberSearch from '../../components/Mainbody/MemberSearch'
import VoterSearch from '../../components/Mainbody/VoterSearch'
import Notice from '../../components/Mainbody/Notice'
import UnderConstruction from '../UnderConstruction'

const MissionAndVision = () => {
  const [pageStatus, setPageStatus] = useState('construction')

  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div className='container-9-3 about-us-container'>
          <div className="custom-card common-hover">
            <CardHeader title='Mission & Vision' />
            <div className="custom-card-body">
              <div className="about-middle-img">
                <img src={missionandvisionImg} alt="Group of Bhola Bar Association" />
              </div>
              <div className="about-middle-desc">
                <p className="text-desc">
                  Updating.............
                </p>
              </div>
              <div className="bottom-social-share">
                <h3>Share</h3>
                <div className="share-icons">
                  <a href="#" className='icon-facebook'>
                    <FacebookIconF />
                  </a>
                  <a href="#" className='icon-twitter'>
                    <TwitterIcon />
                  </a>
                  <a href="#" className='icon-whatsapp'>
                    <WhatsappIcon />
                  </a>
                  <a href="#" className='icon-linkedin'>
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            </div>

          </div>
          <div className="custom-column">
            <div className="custom-card common-hover card-box-shadow-inset">
              <CardHeader title='Member Search' />
              <MemberSearch />
            </div>
            <VoterSearch />
            <Notice />
          </div>
        </div>
      )}</>
  )
}

export default MissionAndVision