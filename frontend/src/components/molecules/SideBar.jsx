import React, { useEffect, useState } from 'react'
import {Logo} from "../../assets"
import {Link, NavLink, useNavigate} from "react-router-dom"
import { Activity, Columns2Icon, HomeIcon, LogOutIcon, TrophyIcon } from "lucide-react"
import { Button } from '../'
import { Box, Columns, Layers, Rocket, Settings, User, Users } from '../../assets/icons'
import { useUser } from '../../context/UserContext'

const SideBar = ({ isopen, toggleSidebar}) => {
    const {user, userLoading} = useUser()
    
    const [username, setUsername] = useState('')

    useEffect(() => {
        if (user) {
            setUsername(user.username)
        }
    }, [user, userLoading])

    const navigate = useNavigate()

    const handleNavClick = () => {
        if(window.innerWidth < 768) {
            toggleSidebar()
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

  return (
    <div className={`w-full md:max-w-3xs lg:border-r border-primary-blue bg-washed-blue min-h-screen flex flex-col justify-between fixed top-0 left-0 z-50 overflow-hidden transition-transform ${isopen ? '-translate-x-0' : '-translate-x-full'} duration-150`}>

        <div>

            <div className='flex items-center justify-between p-2'>
                <div className='flex items-center gap-2'>
                    <img src={Logo} alt="Gainshub" className='w-32'/>
                </div>
                <Button className='cursor-pointer' onClick={toggleSidebar}>
                    <img src={Columns} alt="Column" className='w-8'/>
                </Button>
            </div>

        
            {/* 
                Make this clean by moving navitems to constant
            */}

            <div className='mt-2 p-2'>
                <h2 className='text-xs font-medium text-neutral-10 mb-2 uppercase '>General</h2>

                <ul className='text-neutral-8 p-2 md:p-0 font-medium text-desktop-p'>
                    
                    <NavLink to={'/projects'} onClick={handleNavClick}> 
                        {({isActive}) => (
                            <li className={`${isActive ? "bg-white" : "hover:bg-white"} w-full cursor-pointer transition duration-200 p-1 rounded-lg flex items-center gap-2 my-1`}>
                                <img src={Layers} alt="Box" />
                                <span>Projects</span>                  
                            </li>
                        )}
                    </NavLink> 

                    <NavLink to={'/share-project'} onClick={handleNavClick}> 
                        {({isActive}) => (
                            <li className={`${isActive ? "bg-white" : "hover:bg-white"} w-full cursor-pointer transition duration-200 p-1 rounded-lg flex items-center gap-2 my-1`}>
                                <img src={Rocket} alt="Box" />
                                <span>Share Project</span>                  
                            </li>
                        )}
                    </NavLink> 

                    <NavLink to={'/inbox'} onClick={handleNavClick}> 
                        {({isActive}) => (
                            <li className={`${isActive ? "bg-white" : "hover:bg-white"} w-full cursor-pointer transition duration-200 p-1 rounded-lg flex items-center gap-2 my-1`}>
                                <img src={Box} alt="Box" />
                                <span>Inbox</span>                  
                            </li>
                        )}
                    </NavLink> 

                    <NavLink to={'/teams'} onClick={handleNavClick}> 
                        {({isActive}) => (
                            <li className={`${isActive ? "bg-white" : "hover:bg-white"} w-full cursor-pointer transition duration-200 p-1 rounded-lg flex items-center gap-2 my-1`}>
                                <img src={Users} alt="Box" />
                                <span>Teams</span>                  
                            </li>
                        )}
                    </NavLink> 
                </ul>
            </div>
        </div>

        <div>
            <div className='mt-2 p-2'>

                <ul className='text-neutral-8 p-2 md:p-0 font-medium'>
                    
                    <NavLink to={'/settings'} onClick={handleNavClick}> 
                        {({isActive}) => (
                            <li className={`${isActive ? "bg-white" : "hover:bg-white"} w-full cursor-pointer transition duration-200 p-1 rounded-lg flex items-center gap-2 my-1`}>
                                <img src={Settings} alt="Box" />
                                <span>Settings</span>                  
                            </li>
                        )}
                    </NavLink> 

                    <NavLink to={`/${username}`} onClick={handleNavClick}> 
                        {({isActive}) => (
                            <li className={`${isActive ? "bg-white" : "hover:bg-white"} w-full cursor-pointer transition duration-200 p-1 rounded-lg flex items-center gap-2 my-1`}>
                                <img src={User} alt="Box" />
                                <span>Profile</span>                  
                            </li>
                        )}
                    </NavLink> 

                </ul>
            </div>
        </div>
    </div>
  )
}

export default SideBar