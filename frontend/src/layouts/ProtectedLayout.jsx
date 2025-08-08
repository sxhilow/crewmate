import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../components/'
import ScrollRestoration from '../utils/ScrollRestoration'
import { useUser } from '../context/UserContext'

const ProtectedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const {userLoading} = useUser()

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768
      setIsMobile(isNowMobile)

      if(!isNowMobile){
        isSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  const toggleSidebar = () => {
    if(isMobile){
      setIsSidebarOpen(prev => !prev)
    }
  }

  return (
    <div className='min-h-screen '>
      
        <ScrollRestoration/>

        {/* Sidebar.jsx*/}
        {
          userLoading ? (
            <div className='text-desktop-h2 w-full h-screen flex justify-center items-center font-bold'>Loading...</div>
          ) : (
            <div className='lg:flex '>
           

              <SideBar 
                className={`${isMobile && !isSidebarOpen ? "hidden" : "block"}`}
                isopen={isSidebarOpen}  toggleSidebar={toggleSidebar} isMobile={isMobile}/>

              <div className='flex-col w-full'>

                <main className={`flex-1 flex-grow overflow-auto ${isSidebarOpen ? "md:pl-64" : "pl-0"} ${isMobile ? 'px-4' : 'px-2'}`}>
                  <Outlet/>
                </main>

              </div>

            </div>
          )
        }        

    </div>
  )
}

export default ProtectedLayout