import React from 'react'
import FacebookIconF from '../assets/icons/FacebookIconF'
import LinkedinIcon from '../assets/icons/LinkedinIcon'
import TwitterIcon from '../assets/icons/TwitterIcon'
import WhatsappIcon from '../assets/icons/WhatsappIcon'

const ShareBottom = ({
  url
}) => {
  return (
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
  )
}

export default ShareBottom