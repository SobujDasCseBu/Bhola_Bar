

import React, { useState } from 'react'
import UnderConstruction from '../UnderConstruction'

const Videos = () => {

  const [pageStatus, setPageStatus] = useState('construction')
  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div>Videos</div>
      )}
    </>
  )
}

export default Videos