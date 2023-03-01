import React, { useState } from 'react'
import UnderConstruction from '../UnderConstruction'

const TransferredMember = () => {

  const [pageStatus, setPageStatus] = useState('construction')
  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div>TransferredMember</div>
      )}
    </>
  )
}

export default TransferredMember