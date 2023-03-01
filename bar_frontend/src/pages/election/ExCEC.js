import React, { useState } from 'react'
import UnderConstruction from '../UnderConstruction'

const ExCEC = () => {

  const [pageStatus, setPageStatus] = useState('construction')
  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div>ExCEC</div>
      )}
    </>
  )
}

export default ExCEC