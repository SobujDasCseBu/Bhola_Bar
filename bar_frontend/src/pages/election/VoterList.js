import React, { useState } from 'react'
import UnderConstruction from '../UnderConstruction'

const VoterList = () => {

  const [pageStatus, setPageStatus] = useState('construction')
  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div>VoterList</div>
      )}
    </>
  )
}

export default VoterList