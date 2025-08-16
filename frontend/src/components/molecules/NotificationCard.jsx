import React from 'react'
import Button from '../atoms/Button'
import { Link } from 'react-router-dom'

const NotificationCard = ({projectId, username, projectname, created_at, response, requestId}) => {
  return (
    <div className='border p-2 rounded-lg'>

        <div className='flex justify-between items-center'>
            <span className='text-lg font-medium text-neutral-13'>
            
                <Link to={`/user/${username}`} className='text-primary-blue text-desktop-h5 hover:underline'> sammy </Link>

                requested to join your project "{projectname}" 
            </span>
            <span className='text-neutral-7'>
                {created_at}
            </span>
        </div>
        
        <div className='flex justify-end items-center gap-3 mt-3'>
            <Button className='min-w-20 border-2 p-2 rounded-lg border-primary-blue text-neutral-13 font-medium hover:bg-green-50 tarnsition duration-200' onClick={() => response(projectId, {id:requestId, decision:'accepted'})}>
                Accept
            </Button>

            <Button className='min-w-20 border-2 p-2 rounded-lg border-red-500 text-neutral-13 font-medium hover:bg-red-50 tarnsition duration-200' onClick={() => response(projectId, {id:requestId, decision:'rejected'})}>
                Deny
            </Button>
        </div>
    </div>
  )
}

export default NotificationCard