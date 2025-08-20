import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import { SearchUser } from '../components'

const SearchLayout = () => {

  const {isMobile} = useOutletContext()

  if(isMobile){
    return <Outlet/>
  }

  return (
    <div className='flex max-md:flex-col min-h-screen'>
      
      <div className='flex-2/3 border-r border-primary-blue'>
        <Outlet/>
      </div>


      <div className="flex-1/3">
        <SearchUser />
      </div>

      
    </div>
  )
}

export default SearchLayout