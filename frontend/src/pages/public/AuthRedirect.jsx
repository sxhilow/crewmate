import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUI } from '../../context/UIContext'

const AuthRedirect = () => {

    const {authModal, setAuthModal} = useUI()

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if(token){
            localStorage.setItem("token", token)
            navigate('/dashboard')
        }else{
            setAuthModal('/login')
        }
    }, [location, navigate])

  return (
    <div>Processing Login...</div>
  )
}

export default AuthRedirect