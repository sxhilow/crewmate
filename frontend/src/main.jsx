import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UIProvider } from './context/UIContext.jsx'
import { UserProvider } from './context/UserContext.jsx'


createRoot(document.getElementById('root')).render(
  
    <UIProvider>
      <UserProvider>
        <App />
      </UserProvider>        
    </UIProvider>

)
