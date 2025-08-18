import React from 'react'
import { Button } from '../'
import { Link } from 'react-router-dom'

const ProjectCard = ({id, title, tagline, onClick, requestStatus, logo}) => {
  return (
    <div className='flex justify-between items-center bg-washed-blue/20 shadow rounded-lg px-4 md:px-5 py-3 min-h-25 hover:bg-washed-blue/80 border border-primary-blue transition duration-300'>
        <div className='flex justify-center items-center gap-5'>
            {/* <div className='rounded-full border'>
                 <img src={logo} alt="Logo" className='rounded-full w-12 h-12 bg-white'/> 
            </div> */}
            <div className='flex flex-col'>
                <Link to={`/project/${id}`} className='block text-2xl font-semibold hover:underline hover:text-primary-blue transition duration-150'>
                    {title}
                </Link>
                <p className='text-desktop-p font-medium text-neutral-13 '>{tagline}</p>
            </div>
        </div>
        <div className='p-2'>
            <Link to={`/project/${id}`} className='border-2  border-primary-blue rounded-lg px-2 md:px-4 py-2 font-semibold hover:bg-white/50 hover:border-primary-purple transition duration-200' onClick={onClick} disabled={requestStatus === 'pending'}>
                View & Collaborate
            </Link>
        </div>
    </div>
  )
}

export default ProjectCard