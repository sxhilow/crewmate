import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../components/'
import ScrollRestoration from '../utils/ScrollRestoration'

const ProtectedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768)

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <div className='bg-white dark:bg-slate-950 min-h-screen '>
      
        <ScrollRestoration/>

        {/* Sidebar.jsx*/}
        <div className='lg:flex '>
           
          <SideBar 
          className={`${isSidebarOpen ? 'hidden' : 'block'}`}
          isopen={isSidebarOpen}  toggleSidebar={toggleSidebar}/>

          <div className='flex-col w-full'>

            <main className={`flex-1 flex-grow overflow-auto ${isSidebarOpen ? "md:pl-64" : "pl-0"}`}>
              <Outlet/>
            </main>

          </div>

        </div>

        

    </div>
  )
}

export default ProtectedLayout