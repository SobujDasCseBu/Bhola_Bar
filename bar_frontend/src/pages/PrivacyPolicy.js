import React from 'react'
import { privacyPolicyHtml } from './privacyHTML'

var template = { __html: privacyPolicyHtml }

const PrivacyPolicy = () => {
  return (
    <div>
      <span dangerouslySetInnerHTML={template} />
    </div>
  )
}

export default PrivacyPolicy