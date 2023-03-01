import React, { useState, useEffect } from 'react'
import CardHeader from '../../components/CardHeader'

import ShareBottom from '../../components/ShareBottom'
import DownloadIcon from '../../assets/icons/DownloadIcon'
import MemberSearch from '../../components/Mainbody/MemberSearch'
import VoterSearch from '../../components/Mainbody/VoterSearch'

import constitutionPdf from '../../assets/files/gothon-tantro-2022.pdf'

import '../../assets/styles/about-us.css'
import '../../assets/styles/constitution.css'
import Notice from '../../components/Mainbody/Notice'



const Constitution = () => {


  console.log(() => {
    console.log('constitution pdf: ', constitutionPdf)
  }, [constitutionPdf])



  return (
    <div className='container-9-3 about-us-container'>
      <div className="custom-card common-hover">
        <CardHeader title='Constitution' />
        <div className="custom-card-body">
          <div className="about-middle-desc">
            <div className="constitution-iframe">
              <iframe src={constitutionPdf} title='Constitution'></iframe>
            </div>
          </div>
          <div className="about-middle-download-pdf">
            <a
              href={constitutionPdf}
              target="_blank"
              rel='noreferrer'
            >
              <button className='custom-button custom-button-green'>
                <span>Download</span>
                <span><DownloadIcon /></span>
              </button>
            </a>
          </div>
          <ShareBottom />
        </div>
      
      </div>
      <div className="custom-column">
        <div className="member-search-card custom-card common-hover card-box-shadow-inset">
          <CardHeader title='Member Search' />
          <MemberSearch />
        </div>
        
        <VoterSearch />
        <Notice />
      </div>
    </div>
  )
}

export default Constitution