import React, { useState } from 'react'
import CardHeader from '../../components/CardHeader'

import '../../assets/styles/about-us.css'
import PresidentSpeech from '../../components/Mainbody/PresidentSpeech'
import SecratarySpeech from '../../components/Mainbody/SecratarySpeech'
import UnderConstruction from '../UnderConstruction'

const OfficeStaff = () => {
  const [pageStatus, setPageStatus] = useState('construction')

  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div className='container-9-3 about-us-container'>
          <div className="custom-card common-hover">
            <CardHeader title='Office Staff List' />
            <div className="custom-card-body">
              <div className="about-middle-desc">

              </div>

            </div>

          </div>
          <div className="custom-column">
            <div className="custom-card common-hover">
              <CardHeader title='Speech List' />
              <PresidentSpeech />
              <div className="mt-10"></div>
              <SecratarySpeech />
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default OfficeStaff