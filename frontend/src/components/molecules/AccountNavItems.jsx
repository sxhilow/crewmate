import React from 'react'
import { NavLink } from 'react-router-dom'

const AccountNavItems = () => {
  return (
    <div className='px-10 py-5 flex flex-col w-full'>
        <h1 className='text-desktop-h4 font-bold'>My Account</h1>

        <ul className='py-8'>
          <NavLink to={'/my/account'} end>
            {({isActive}) => (
              <li className={`${isActive ? "bg-washed-blue/60" : "hover:bg-washed-blue/60"} bg-washed-blue p-5 rounded-xl transtition duration-200 my-4`}>
                <span   className='text-neutral-10 text-desktop-p '>Profile</span>
              </li>
            )}
          </NavLink>

          <NavLink to={'/my/account/info'}>
            {({isActive}) => (
              <li className={`${isActive ? "bg-washed-blue/60" : "hover:bg-washed-blue/60"} bg-washed-blue p-5 rounded-xl transtition duration-200 my-4`}>
                <span   className='text-neutral-10 text-desktop-p '>Account Information</span>
              </li>
            )}
          </NavLink>

        </ul>
    </div>
  )
}

export default AccountNavItems