import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const Spinner = () => {
  return (
    <div className='spinner-container'>
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  )
}

export default Spinner