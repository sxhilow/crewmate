import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const SearchCard = ({id, name, username, bio}) => {
    const {user} = useUser()
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        if(user){
            setCurrentUser(user.id)
        }
    }, [user])

  return (
    <Link to={currentUser === id ?  `/me` : `/${username}`} className='block border-b hover:bg-gray-100 transition duration-100'>
        <div className='p-5'>
            <div className='flex gap-2 items-center p'>
            <span className='text-lg font-medium'>{name}</span>
            <span className='text-neutral-9 text-sm'>
                @{username}
            </span>
            </div>
            <div className='max-w-[330px] overflow-hidden truncate whitespace-nowrap'>
                <span className='text-neutral-13'>
                    {!bio && "A happy crewmate user"}
                    {bio}
                </span>
            </div>
        </div>
    </Link>
  )
}

export default SearchCard