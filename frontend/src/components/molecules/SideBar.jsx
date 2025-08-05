import React from 'react'
import {Logo} from "../../assets"
import {Link, useNavigate} from "react-router-dom"
import { Activity, Columns2Icon, HomeIcon, LogOutIcon, TrophyIcon } from "lucide-react"
import { Button } from '../'

const SideBar = ({ isopen, toggleSidebar}) => {
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
    <div className={`w-full md:max-w-3xs lg:border-r border-primary-blue bg-washed-blue min-h-screen flex flex-col fixed top-0 left-0 z-50 overflow-hidden transition-transform ${isopen ? '-translate-x-0' : '-translate-x-full'} duration-150`}>
        <div className='flex items-center justify-between p-2'>
            <div className='flex items-center gap-2'>
                <img src={Logo} alt="Gainshub" className='w-10'/>
                <div className='flex flex-col'> 
                    <span className='text-xl md:text-2xl font-bold text-transparent bg-gradient-to-br from-[#27c2ff] to-[#0d76de] bg-clip-text '>Gainshub</span>                    
                </div>
            </div>
            <Button className='cursor-pointer' onClick={toggleSidebar}>
                <Columns2Icon 
                className='text-[#27c2ff]'
                size={26}/>
            </Button>
        </div>

        

        <div className='mt-2 p-2'>
            <h2 className='text-sm text-slate-400 mb-2 '>Navigation</h2>
            <ul className='text-white p-2 md:p-0'>
                <li className='hover:bg-gray-400/10 hover:backdrop-blur-2xl w-full cursor-pointer transition duration-100 p-1 rounded'>
                    <Link 
                    to={'/dashboard'} 
                    className='flex items-center gap-2'
                    onClick={handleNavClick}>
                        <HomeIcon size={16}/>
                        Dashboard
                    </Link>
                </li>
                 <li className='hover:bg-gray-400/10 hover:backdrop-blur-2xl w-full cursor-pointer transition duration-100 p-1 rounded'>
                    <Link 
                    to={'/workouts'} 
                    className='flex items-center gap-2' 
                    onClick={handleNavClick}>
                        <Activity size={16}/>
                        Workouts
                    </Link>
                </li>
                 <li className='hover:bg-gray-400/10 hover:backdrop-blur-2xl w-full cursor-pointer transition duration-100 p-1 rounded'>
                    <Link 
                    to={'/pr-form'} 
                    className='flex items-center gap-2'
                    onClick={handleNavClick}>
                        <TrophyIcon size={16}/>
                        Add PR
                    </Link>
                </li>
                 <li className='hover:bg-gray-400/10 hover:backdrop-blur-2xl w-full cursor-pointer transition duration-100 p-1 rounded'>
                    <Link 
                    className='flex items-center gap-2'
                    onClick={handleLogOut}>
                        <LogOutIcon size={16}/>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default SideBar