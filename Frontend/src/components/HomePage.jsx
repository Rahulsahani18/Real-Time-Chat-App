import React from 'react'
import Siderbar from './Siderbar'
import MessageContainer from './MessageContainer'

const HomePage = () => {
  return (
    <div className='flex sm:h-[450px] md:h[550]  rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Siderbar />
      <MessageContainer />
    </div>
  )
}

export default HomePage