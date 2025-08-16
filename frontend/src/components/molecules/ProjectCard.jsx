import React from 'react'
import { Button } from '../'

const ProjectCard = ({title, tagline, onClick, requestStatus, logo}) => {
  return (
    <div className='flex justify-between items-center bg-washed-blue rounded-lg px-2 md:px-5 py-3 min-h-25'>
        <div className='flex justify-center items-center gap-5'>
            <div className='rounded-full border'>
                {/* <img src={logo} alt="Logo" className='rounded-full w-12 h-12 bg-white'/> */}
            </div>
            <div className='flex flex-col'>
                <h2 className='text-2xl font-semibold '>{title}</h2>
                <p className='text-desktop-p font-medium text-neutral-13 '>{tagline}</p>
            </div>
        </div>
        <div className='p-2'>
            <Button className='border-2  border-primary-blue rounded-lg px-2 md:px-4 py-2 font-semibold hover:bg-white/50 transition duration-200' onClick={onClick} disabled={requestStatus === 'pending'}>
                {requestStatus === 'pending' ? "Request Sent" : "Collaborate" }
            </Button>
        </div>
    </div>
  )
}

export default ProjectCard