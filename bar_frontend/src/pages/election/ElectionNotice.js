import React, { useState } from 'react'
import UnderConstruction from '../UnderConstruction'

const ElectionNotice = () => {

  const [pageStatus, setPageStatus] = useState('construction')
  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div>ElectionNotice</div>
      )}
    </>
  )
}

export default ElectionNotice