import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useUI } from '../context/UIContext'

const ProtectedRoutes = () => {

    const navigate = useNavigate()
    const {authModal, setAuthModal} = useUI();

    const token = localStorage.getItem("token")

    useEffect(() => {
      if(!token){
        navigate('/')
        setAuthModal('login')
      }
    }, [navigate, token])

  return token ? <Outlet/> : null
  
}

export default ProtectedRoutes