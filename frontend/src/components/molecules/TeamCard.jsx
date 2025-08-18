import React from 'react'
import { Link } from 'react-router-dom'

const TeamCard = ({id, name, members}) => {
  return (
    <div className='w-full border-b shadow hover:bg-gray-200 p-5 flex justify-between items-center transition duration-150 group'>

        <span className='block text-lg font-semibold group-hover:underline group-hover:text-primary-blue transition duration-150'>
            {name}
        </span>
         
        <span className='text-neutral-7 text-sm'>
            Member Count: {members}
        </span>              
    </div>
  )
}

export default TeamCard