import React from 'react'
import Logo  from "../../assets/Logo.svg"
import { Button } from '../'

const Header = () => {
  return (
    <header className='broder border-b border-dark px-5 md:px-12 py-5'>
      <nav className='flex justify-between items-center'>

        <img src={Logo} alt="Logo" />

        <div className='flex justify-center items-center'>
          <Button to={'/login'} children={"Login"} className='text-dark px-2 font-medium'/>
          
          <Button to={'/register'} className='flex justify-center items-center bg-gradient-to-r from-primary-purple to-primary-blue p-[2px] rounded-lg hover:from-primary-blue hover:to-primary-purple transition duration-300'>

          <div className='flex justify-center items-center bg-gradient-to-b from-primary-purple-800 to-dark w-full h-full px-3 py-1 md:px-5 md:py-1 rounded-lg hover:from-dark hover:to-primary-purple-800 transition duration-300'>
            <span className='bg-gradient-to-br bg-clip-text from-neutral-5 to-neutral-7 text-transparent hover:from-neutral-7 hover:to-neutral-5 transition duration-300'>
              Sign up
            </span>
          </div>
            
          
          </Button>
        </div>
        
      </nav>
    </header>
  )
}

export default Header