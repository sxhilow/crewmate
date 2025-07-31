import React from 'react'
import { useContext, createContext, useState } from 'react'

const UIContext = createContext();

export const UIProvider = ({children}) => {
    const [authModal, setAuthModal] = useState(null)
  return (
    <UIContext.Provider value={{authModal, setAuthModal}}>
        {children}
    </UIContext.Provider>
  )
}

export const useUI = () => useContext(UIContext)

