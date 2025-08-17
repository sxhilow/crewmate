import React from 'react'
import { Outlet } from 'react-router-dom'
import { SearchUser } from '../components'

const SearchLayout = () => {

  return (
    <div className='flex max-md:flex-col min-h-screen'>
      
      <div className='flex-2/3 lg:border-r border-primary-blue'>
        <Outlet/>
      </div>

      <div className='flex-1/3'>
        <SearchUser/>
      </div>

      
    </div>
  )
}

export default SearchLayout