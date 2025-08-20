import React from 'react'
import Logo  from "../../assets/Logo.svg"
import { Button } from '../'

const Header = ({onLogin, onSignup}) => {
  return (
    <header className='broder border-b border-dark px-5 md:px-12 py-5'>
      <nav className='flex justify-between items-center'>

        <img src={Logo} alt="Logo" />

        <div className='flex justify-center items-center'>
          
          <Button
              onClick={onLogin}
              className="flex justify-center items-center bg-gradient-to-r from-primary-purple to-primary-blue p-[2px] rounded-xl hover:from-primary-blue hover:to-primary-purple transition duration-300 cursor-pointer"
            >
              <div className="flex justify-center items-center bg-dark w-full h-full px-8 py-2 rounded-xl hover:bg-primary-purple-800 transition duration-300">
                <span className="bg-gradient-to-br from-neutral-5 to-neutral-7 bg-clip-text text-transparent hover:from-neutral-7 hover:to-neutral-5 transition duration-300">
                  Sign in
                </span>
              </div>
            </Button>
        </div>
        
      </nav>
    </header>
  )
}

export default Header