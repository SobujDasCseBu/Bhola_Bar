import React, { useState } from 'react'
import UnderConstruction from '../UnderConstruction'

const RetiredMember = () => {

  const [pageStatus, setPageStatus] = useState('construction')
  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div>RetiredMember</div>
      )}
    </>
  )
}

export default RetiredMember