import React, { useState } from 'react'
import UnderConstruction from '../UnderConstruction'
import CardHeader from '../../components/CardHeader'
import electionCommission from '../../assets/images/election-commission/election-commission.jpeg'

const ElectionCommission = () => {

  const [pageStatus, setPageStatus] = useState('')
  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
          <div className='custom-container common-hover'>
            <CardHeader title="Election Commission" />
            <div className="custom-card">
              <img src={electionCommission} alt="Election Commission Notice" />
            </div>
        </div>
      )}
    </>
  )
}

export default ElectionCommission