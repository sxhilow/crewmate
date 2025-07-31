import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components'
import { useUI } from '../context/UIContext'
import Login from '../pages/public/Login'

const PublicLayout = () => {
  const {authModal, setAuthModal} = useUI();

  return (
    <div className={`relative`}>      
      
        <Header 
          onLogin={() => setAuthModal('login')}
          onSignup={() => setAuthModal('signup')}
        />

        {
          authModal === 'login' && <div className='fixed inset-0 flex justify-center items-center z-50 bg-black/30'>
            <Login onClose={() => setAuthModal(null)}/>
          </div>
        }

        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default PublicLayout