import React from 'react'
import {Outlet} from 'react-router-dom'
import { AccountNavItems } from '../components'

const MyAccountLayout = () => {
  return (
    <div className='flex min-h-screen'>
      
      <div className='flex-1'>
        <AccountNavItems/>
      </div>

      <div className='flex-1 border-l border-primary-blue'>
        <Outlet/>
      </div>
      
    </div>
  )
}

export default MyAccountLayout