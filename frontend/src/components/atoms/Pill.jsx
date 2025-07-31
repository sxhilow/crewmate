import React from 'react'

const Pill = ({text}) => {
  return (
    <div className='flex justify-center items-center w-42 h-10 bg-gradient-to-r from-primary-purple to-primary-blue p-[2px] rounded-full hover:from-primary-blue hover:to-primary-purple transition duration-300'>

      <div className='flex justify-center items-center w-full h-full px-3 py-1 md:px-5 md:py-1 rounded-full bg-bg text-primary-purple-800 text-desktop-p'>

        {text}

      </div>
          
    </div>
  )
}

export default Pill