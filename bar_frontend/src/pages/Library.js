

import React, { useState } from 'react'
import UnderConstruction from './UnderConstruction'

const Library = () => {

  const [pageStatus, setPageStatus] = useState('construction')
  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div>Library</div>
      )}
    </>
  )
}

export default Library