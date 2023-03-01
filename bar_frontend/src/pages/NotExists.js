import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotExists = () => {
  const navigate = useNavigate()
  return (
    <div className='page-not-exist-container'>
      <div className='not-exist-body'>
        <h3><strong>404</strong> - Page doesn't exists</h3>
        <button
          className="custom-button"
          onClick={() => {
            navigate(-1)
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default NotExists