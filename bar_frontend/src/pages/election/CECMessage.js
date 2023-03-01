import React, { useState } from 'react'
import UnderConstruction from '../UnderConstruction'

const CECMessage = () => {

  const [pageStatus, setPageStatus] = useState('construction')
  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div>CECMessage</div>
      )}
    </>
  )
}

export default CECMessage