import React from 'react'
// import Helmet from "react-helmet"
import { Helmet } from 'react-helmet-async'

const MetaData = ({title}) => {
  return (
      
      <Helmet>
          <title>{title}</title>
          <meta name="description" content={`${title} - Explore amazing content!`} />

    </Helmet>
  )
}

export default MetaData;