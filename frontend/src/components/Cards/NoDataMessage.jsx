import React from 'react'

const NoDataMessage = ({message}) => {
  return (
    <div className=' text-xs text-gray-400 pb-8  flex-1 flex  items-center justify-center '>
        <p>{message}</p>
        
      
    </div>
  )
}

export default NoDataMessage
