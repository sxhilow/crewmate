import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useUI } from '../context/UIContext'
import { useUser } from '../context/UserContext'

const ProtectedRoutes = () => {

    const navigate = useNavigate()
    const {authModal, setAuthModal} = useUI();
    const { userLoading } = useUser()

    const token = localStorage.getItem("token")

    useEffect(() => {
      if(!token){
        setAuthModal('login')
        navigate('/')        
      }
    }, [navigate, token])

  return(

    token ? (
      userLoading ? (
        <div className='text-desktop-h2 w-full h-screen flex justify-center items-center font-bold'>Loading...</div>
      ) : (
        <Outlet/>
      )
    )  : null

  ) 
  
}

export default ProtectedRoutes