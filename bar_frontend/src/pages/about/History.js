import React, { useState } from 'react'
import CardHeader from '../../components/CardHeader'

import '../../assets/styles/about-us.css'
import aboutUsImg from '../../assets/images/about-us-body.jpg'
import TwitterIcon from '../../assets/icons/TwitterIcon'
import WhatsappIcon from '../../assets/icons/WhatsappIcon'
import LinkedinIcon from '../../assets/icons/LinkedinIcon'
import FacebookIconF from '../../assets/icons/FacebookIconF'
import MemberSearch from '../../components/Mainbody/MemberSearch'
import VoterSearch from '../../components/Mainbody/VoterSearch'
import Notice from '../../components/Mainbody/Notice'
import UnderConstruction from '../UnderConstruction'

const History = () => {


  const [pageStatus, setPageStatus] = useState('construction')

  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div className='container-9-3 about-us-container'>
          <div className="custom-card common-hover">
            <CardHeader title='History' />
            <div className="custom-card-body">
              <div className="about-middle-img">
                <img src={aboutUsImg} alt="Group of Bhola Bar Association" />
              </div>
              <div className="about-middle-desc">
                <p className="text-desc">
                  The Dhaka Bar Association is one of the leading & renounced Bar Association. After getting the establishment in 28 January 1889 A.D. It is holdings an important role up to date to establish the rules of law and establish the perfect or accurate judgment in between of facing to much difficulties. This association created the specie role to remain sighing of Bangladesh at the international world. This bar association make the role of forwardness against each & every works of interest individually. Besides this all of "Gono Andolon". This bar association fail on the road and play the role to get the legal rights as faster. The role of Dhaka Bar Association at the period of "Vasa Andolon" in the year of 1952 A.D. was various glorious. Except this, the learned members of this association participated in the ware of 1971 A.D. as freedom-fighter which are supported by the learned advocates of this association were given veto as firstly safe from the black hands of the country and the hands from the enemy of the abroad.
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
      )}
    </>

  )
}

export default History