import React, { useState } from 'react'
import UnderConstruction from '../UnderConstruction'

const Defaulter = () => {

  const [pageStatus, setPageStatus] = useState('construction')
  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div>Defaulter</div>
      )}
    </>
  )
}

export default Defaulter