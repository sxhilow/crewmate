import React from 'react'
import {Outlet} from 'react-router-dom'
import { AccountNavItems } from '../components'

const MyAccountLayout = () => {
  return (
    <div className='flex min-h-screen'>
      
      <div className='flex w-[50%]'>
        <AccountNavItems/>
      </div>

      <div className='border-l border-primary-blue'>
        <Outlet/>
      </div>
      
    </div>
  )
}

export default MyAccountLayout