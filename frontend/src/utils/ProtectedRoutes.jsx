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

    token ? <Outlet/> : null

  ) 
  
}

export default ProtectedRoutes