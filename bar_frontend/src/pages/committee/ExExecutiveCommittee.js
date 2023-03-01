import React, { useState } from 'react'
import UnderConstruction from '../UnderConstruction'

const ExExecutiveCommittee = () => {

  const [pageStatus, setPageStatus] = useState('construction')
  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div>ExExecutiveCommittee</div>
      )}
    </>
  )
}

export default ExExecutiveCommittee