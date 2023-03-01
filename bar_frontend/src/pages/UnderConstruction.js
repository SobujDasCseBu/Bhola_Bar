import React from 'react'
import constrImg from '../assets/images/un-contruction.png'
import '../assets/styles/under-construction.css'

const UnderConstruction = () => {
  return (
    <div className='contruction-container'>
      <div className="construction-inner">
        {/* <img src={constrImg} alt="Page is in Contruction" /> */}
        <h1>This page in under construction!!</h1>
        <h3>We're coming soon!</h3>
      </div>
      
    </div>
  )
}

export default UnderConstruction